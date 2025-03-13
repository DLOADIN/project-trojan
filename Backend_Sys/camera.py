import os
import sys
import cv2
import numpy as np
from datetime import datetime
import mysql.connector
from twilio.rest import Client
import pytz
from dotenv import load_dotenv
from contextlib import contextmanager
import threading
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import secrets
import mysql.connector
from twilio.rest import Client
import pytz
import logging


# Load environment variables
load_dotenv()

# Twilio credentials
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
ADMIN_PHONE_NUMBER = os.getenv("ADMIN_PHONE_NUMBER")

# Database credentials
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_DATABASE = os.getenv("DB_DATABASE", "accident_detection")
DB_PORT = int(os.getenv("DB_PORT", 3306))
LOCATION = os.getenv("LOCATION", "Kigali")

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Twilio alert template
TWILIO_ALERT_TEMPLATE = """🚨 Accident Detected!
Time: {timestamp}
Location: {location}
Severity: {severity_level.capitalize()} ({severity_score}%)
Immediate attention is required!"""

app = Flask(__name__)
CORS(app)

UPLOAD_DIRECTORY = "uploads"
PROCESSED_DIRECTORY = "processed_videos"
processing_videos = {}

def send_twilio_alert(timestamp, location, severity_level, severity_score):
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=TWILIO_ALERT_TEMPLATE.format(
                timestamp=timestamp,
                location=location,
                severity_level=severity_level,
                severity_score=severity_score
            ),
            from_=TWILIO_PHONE_NUMBER,
            to=ADMIN_PHONE_NUMBER
        )
        logging.info(f"Twilio alert sent: {message.sid}")
    except Exception as e:
        logging.error(f"Twilio error: {str(e)}")

@contextmanager
def db_connection():
    conn = get_db_connection()
    try:
        yield conn
    finally:
        if conn:
            conn.close()

def get_db_connection():
    try:
        return mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_DATABASE,
            port=DB_PORT
        )
    except mysql.connector.Error as err:
        logging.error(f"Database connection error: {err}")
        return None

def save_accident_data(timestamp, location, severity_level, severity_score, video_filename, accuracy):
    with db_connection() as conn:
        if conn is None:
            return
        try:
            cursor = conn.cursor()
            query = """
            INSERT INTO accidents (timestamp, location, severity_level, severity_score, video_path, accuracy)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (timestamp, location, severity_level, float(severity_score), video_filename, float(accuracy)))
            conn.commit()
            logging.info(f"Data saved to database: {timestamp}, {location}, {severity_level}, {severity_score}, {video_filename}, {accuracy}")
            send_twilio_alert(timestamp, location, severity_level, severity_score)
        except mysql.connector.Error as err:
            logging.error(f"Error saving accident data: {err}")

@app.route("/upload", methods=["POST"])
def upload_video():
    if "file" not in request.files:
        return jsonify({"status": "error", "message": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"status": "error", "message": "No file selected"}), 400

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    video_filename = f"video_{timestamp}.mp4"
    video_path = os.path.join(UPLOAD_DIRECTORY, video_filename)
    file.save(video_path)

    processing_videos[video_filename] = {"status": "processing", "progress": 0}
    threading.Thread(target=process_single_video, args=(video_path, video_filename), daemon=True).start()
    return jsonify({"status": "success", "videoUrl": video_filename}), 200

def process_single_video(video_path, filename):
    try:
        processing_videos[filename]["progress"] = 10
        output_path = os.path.join(PROCESSED_DIRECTORY, filename)
        result = subprocess.run(["python", "camera.py", video_path], capture_output=True, text=True)
        
        if result.returncode == 0:
            processing_videos[filename]["status"] = "completed"
            processing_videos[filename]["progress"] = 100
            logging.info(f"Processed video: {output_path}")
        else:
            processing_videos[filename]["status"] = "error"
            logging.error(f"Error processing video: {result.stderr}")
    except Exception as e:
        processing_videos[filename]["status"] = "error"
        logging.exception(f"Exception processing video: {e}")
    finally:
        if os.path.exists(video_path):
            os.remove(video_path)

def process_video(video_path, output_path=None):
    video = cv2.VideoCapture(video_path)
    if not video.isOpened():
        logging.error(f"Error: Could not open {video_path}")
        return

    video_filename = os.path.basename(video_path)
    fps = video.get(cv2.CAP_PROP_FPS)
    width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    if output_path:
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    
    frame_count = 0
    writer = None
    accident_detected = False
    severity_scores = []
    accuracies = []
    accident_clip_path = None
    accident_start = None

    while True:
        ret, frame = video.read()
        if not ret:
            break

        # Process frame (simulated logic)
        if frame_count % 100 == 0:  # Simulate accident every 100 frames
            pred = "Accident"
            severity_score = np.random.randint(50, 100)
            accuracy = np.random.randint(80, 100)
            accident_detected = True
        else:
            pred = "No Accident"
            severity_score = 0.0
            accuracy = 95.0

        # Collect data only if accident is detected
        if pred == "Accident":
            if writer is None:
                timestamp = datetime.now(pytz.timezone('Africa/Kigali')).strftime("%Y%m%d_%H%M%S")
                accident_clip_path = os.path.join("accident_clips", f"accident_{timestamp}.mp4")
                os.makedirs(os.path.dirname(accident_clip_path), exist_ok=True)
                writer = cv2.VideoWriter(accident_clip_path, fourcc, fps, (width, height))
                accident_start = datetime.now(pytz.timezone('Africa/Kigali'))

            writer.write(frame)
            severity_scores.append(severity_score)
            accuracies.append(accuracy)

        # Write frame to output video (if needed)
        if output_path:
            out.write(frame)

        frame_count += 1

    # After processing ALL frames, save data if accident occurred
    if accident_detected:
        avg_severity = sum(severity_scores) / len(severity_scores)
        avg_accuracy = sum(accuracies) / len(accuracies)

        if avg_accuracy <= 70:
            severity_level = "low"
        elif 70 < avg_accuracy <= 80:
            severity_level = "medium"
        else:
            severity_level = "fatal"

        save_accident_data(
            timestamp=accident_start.strftime("%Y-%m-%d %H:%M:%S"),
            location=LOCATION,
            severity_level=severity_level,
            severity_score=avg_severity,
            video_filename=accident_clip_path,
            accuracy=avg_accuracy
        )

    # Cleanup resources
    video.release()
    if output_path:
        out.release()
    if writer is not None:
        writer.release()

    logging.info(f"Video processing completed: {video_filename}")
    return os.path.basename(output_path) if output_path else video_filename

if __name__ == "__main__":
    if len(sys.argv) > 1:
        VIDEO_PATH = sys.argv[1]
        if not os.path.isfile(VIDEO_PATH):
            logging.error(f"Video file not found: {VIDEO_PATH}")
            sys.exit(1)
        OUTPUT_PATH = os.path.join("processed_videos", os.path.basename(VIDEO_PATH))
        process_video(VIDEO_PATH, OUTPUT_PATH)
    else:
        logging.error("No video path provided")
        sys.exit(1)