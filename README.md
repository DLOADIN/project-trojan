# **Accident Detection System**

This is an **Accident Detection System** that uses machine learning to detect accidents in video footage. The system consists of a **frontend** built with **Next.js**, a **backend** built with **Flask** for managing and analyzing accident data.

---

## **Features**

1. **Accident Detection**:
   - Detects accidents in uploaded video footage.
   - Displays the severity score and accuracy in real-time.

2. **Admin Dashboard**:
   - Upload and process video footage.
   - View live video analysis with severity and accuracy overlays.
   - View accident statistics and data in interactive charts.

3. **Database Integration**:
   - Saves accident data (timestamp, location, severity, etc.) to a MySQL database.

4. **Real-Time Notifications**:
   - Simulates real-time accident notifications for testing purposes.

---

## **Technologies Used**

- **Frontend**: Next.js
- **Backend**: Flask
- **Admin Dashboard**: Streamlit
- **Machine Learning**: TensorFlow/Keras (for accident detection)
- **Database**: MySQL
- **Video Processing**: OpenCV

---

## **How to Run the Application**

### **1. Prerequisites**

Before running the application, ensure you have the following installed:

- **Python 3.8+**
- **Node.js** (for Next.js frontend)
- **MySQL** (for the database)
- **Git** (optional, for cloning the repository)

---

### **2. Clone the Repository**

Clone the repository to your local machine:

```bash
git clone https://github.com/DLOADIN/RoadGuard-Rwanda
cd RoadGuard-Rwanda
```

---

### **3. Set Up the Backend (Flask)**

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up the MySQL database:
   - Create a database named `accident_detection`.
   - Update the database credentials in `backend/config.py`.

4. Run the Flask server:
   ```bash
   python app.py
   ```

   The backend will be running at `http://localhost:5000`.

---

### **4. Set Up the Frontend (Next.js)**

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Run the Next.js development server:
   ```bash
   npm run dev
   ```

   The frontend will be running at `http://localhost:3000`.

---

### **5. Set Up the Admin Dashboard (Streamlit)**

1. Navigate to the `admin` folder:
   ```bash
   cd admin
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

   The admin dashboard will be running at `http://localhost:8501`.

---

### **6. Set Up the Database**

1. Ensure MySQL is running on your machine.
2. Create a database named `accident_detection`.
3. Run the following SQL query to create the `accidents` table:

   ```sql
   SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

CREATE TABLE accidents (
   id int(11) NOT NULL,
   timestamp datetime DEFAULT NULL,
   location varchar(255) DEFAULT NULL,
   severity_level varchar(50) DEFAULT NULL,
   severity_score float DEFAULT NULL,
   video_path varchar(255) DEFAULT NULL,
   accuracy float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    session_token varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DB_HOST = "your_localhost"
DB_USER = "your_name"
DB_PASSWORD = "your_password"
DB_DATABASE = "accident_detection"
DB_PORT = your_number_port
   ```

4. Update the database credentials in `backend/config.py` and `admin/admin.py`.

---

### **7. Run the Application**

1. Start the Flask backend:
   ```bash
   cd Backend_Sys
   python app.py
   ```

2. Start the Next.js frontend:
   ```bash
   cd ../
   npm run dev
   ```

3. Open your browser and navigate to:
   - **Frontend**: `http://localhost:3000`
   - **Admin Dashboard**: `http://localhost:8501`

---

## **Folder Structure**

```
/RoadGuard-Rwanda/
.project
├── app
│   ├── Dashboard
│   │   ├── Analytics
│   ├── components
│   │   ├── dashboard-charts.tsx
│   │   ├── dashboard-content.tsx
│   │   ├── header.tsx
│   │   ├── maindatatable.tsx
│   │   ├── notifications-table.tsx
│   │   ├── overview-cards.tsx
│   │   ├── overview-section.tsx
│   │   ├── search.tsx
│   │   ├── trend-charts.tsx
│   │   ├── user-nav.tsx
│   │   ├── video-highlights.tsx
│   │   ├── video-upload.tsx
│   ├── highlights
│   ├── styles
│   ├── ui
│   ├── upload
│   ├── layout.tsx
│   ├── page.tsx
│   ├── sidebar.tsx
│   ├── styles.css
├── utils
│   ├── favicon.ico
│   ├── global.ts
│   ├── layout.tsx
├── components/ui
│   ├── aurora-background.tsx
│   ├── backgrounditem.tsx
│   ├── benjostick.tsx
│   ├── fact.tsx
│   ├── footer.tsx
│   ├── globalcoverage.tsx
│   ├── hero.tsx
│   ├── navbar.tsx
│   ├── roadadvisory.tsx
├── node_modules
├── public
├── .gitignore
├── AUTHORS
├── CI components.json
├── declarations.d.ts
├── depcheck.ts
├── get-commits.sh
├── next.config.ts
├── package.json
├── package-lock.json
├── backend/                # Flask backend
│   ├── app.py              # Flask application
│   ├── config.py           # Database configuration
│   └── requirements.txt    # Python dependencies
│
├── frontend/               # Next.js frontend
│   ├── pages/              # Next.js pages
│   ├── public/             # Static assets
│   ├── styles/             # CSS files
│   └── package.json        # Node.js dependencies
│
├── admin/                  # Streamlit admin dashboard
│   ├── camera.py           # Video processing script
│   └── requirements.txt    # Python dependencies
│
└── README.md               # Project documentation
```

---

## **Usage**

### **1. Upload Video Footage**

1. Go to the **Admin Dashboard** (`http://localhost:8501`).
2. Navigate to the **Upload Footage** page.
3. Upload a video file (supported formats: `.mp4`, `.avi`, `.mov`).
4. The video will be processed, and the analysis will be displayed in real-time.

### **2. View Accident Data**

1. Go to the **Admin Dashboard** (`http://localhost:8501`).
2. Navigate to the **Data** page to view accident records from the database.

### **3. View Statistics**

1. Go to the **Admin Dashboard** (`http://localhost:8501`).
2. Navigate to the **Statistics** page to view interactive charts and graphs.

---

## **Troubleshooting**

1. **Database Connection Issues**:
   - Ensure MySQL is running and the database credentials are correct.
   - Check the logs for any errors related to the database connection.

2. **Video Processing Issues**:
   - Ensure OpenCV is installed correctly (`pip install opencv-python`).
   - Check the logs for any errors related to video processing.

3. **Streamlit App Not Running**:
   - Ensure all dependencies are installed (`pip install -r requirements.txt`).
   - Check the logs for any errors related to Streamlit.

---

## **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---
---

## **Contact**

For any questions or issues, please contact:

- **Your Name**: [m.david@alustudent.com](mailto:m.david@alustudent.com)
- **GitHub**: [DLOADIN](https://github.com/DLOADIN)

---

Enjoy using the **RoadGuard Rwanda**! 🚀