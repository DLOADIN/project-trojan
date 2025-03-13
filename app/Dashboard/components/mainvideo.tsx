"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const UploadedVideos = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [accidents, setAccidents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch uploaded videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ videos: string[] }>(`${API_URL}/get_uploaded_videos`);
        setVideos(response.data.videos);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch videos. Please try again later.");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Fetch accident data when video is selected
  useEffect(() => {
    if (selectedVideo) {
      const fetchAccidents = async () => {
        try {
          const response = await axios.get<{ data: any[] }>(`${API_URL}/fetch_database`);
          const filteredAccidents = response.data.data.filter(
            (accident) => accident.video_path.includes(selectedVideo)
          );
          setAccidents(filteredAccidents);
        } catch (err) {
          console.error("Failed to fetch accident data:", err);
        }
      };

      fetchAccidents();
    }
  }, [selectedVideo]);

  if (loading) {
    return <div className="text-center py-8">Loading videos...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>

      {/* Video List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {videos.map((video, index) => (
          <div
            key={index}
            className="cursor-pointer p-4 border rounded-lg hover:bg-gray-100"
            onClick={() => setSelectedVideo(video)}
          >
            <p className="text-lg font-medium">{video}</p>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Now Playing: {selectedVideo}</h3>
          <video
            controls
            autoPlay
            className="w-full h-auto rounded-lg shadow-lg"
            src={`${API_URL}/get_video/${selectedVideo}`}
          >
            Your browser does not support the video tag.
          </video>


          {accidents.length > 0 && (
            <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
              <h4 className="font-bold mb-2">Accident Detected</h4>
              {accidents.map((accident, index) => (
                <div key={index} className="mb-2">
                  <p>Time: {new Date(accident.timestamp).toLocaleString()}</p>
                  <p>Severity: {accident.severity_level} ({accident.severity_score}%)</p>
                  <p>Confidence: {accident.accuracy}%</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadedVideos;