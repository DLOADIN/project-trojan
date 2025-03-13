"use client"

import VideoUpload from "../components/video-upload"
import MainDataTable from "../components/maindatatable"
import { useState } from "react";

export default function UploadPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Accident Detection System</h2>
        <VideoUpload />
      </div>
    </div>
  );
}