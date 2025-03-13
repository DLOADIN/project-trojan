"use client"

import React, { useState, useEffect } from 'react';
import { Upload, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import VideoPlayer from '../ui/videoplayer';
import { Card, CardContent } from '../ui/card';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface UploadStatus {
  message: string;
  isError: boolean;
}

interface ProcessingStatus {
  status: 'processing' | 'completed' | 'error';
  progress: number;
  processed?: boolean;
}

const VideoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoFilename, setVideoFilename] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 800 * 1024 * 1024) {
        setUploadStatus({ message: 'File size exceeds 800MB limit', isError: true });
        return;
      }
      setFile(selectedFile);
      setUploadStatus(null);
    }
  };

  useEffect(() => {
    // Poll for processing status if we have a videoFilename
    if (videoFilename && processing) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`${API_URL}/processing_status/${videoFilename}`);
          const status: ProcessingStatus = await response.json();
          
          setProcessingStatus(status);
          setProgress(status.progress);
          
          if (status.status !== 'processing') {
            setProcessing(false);
            clearInterval(interval);
            
            if (status.status === 'completed') {
              setUploadStatus({ message: 'Analysis complete!', isError: false });
              window.dispatchEvent(new CustomEvent('refreshDataTable'));
            } else {
              setUploadStatus({ message: 'Processing failed. Please try again.', isError: true });
            }
          }
        } catch (error) {
          console.error('Error checking status:', error);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [videoFilename, processing]);

  const uploadFile = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      setProcessing(true);
      setProgress(0);
      
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      setVideoFilename(data.videoUrl);
      setVideoUrl(`${API_URL}/get_video/${data.videoUrl}`);
      setProcessingStatus({ status: 'processing', progress: 10 });
      
    } catch (error) {
      setUploadStatus({ message: 'Upload failed. Please try again.', isError: true });
      setProcessing(false);
      setProgress(0);
    }
  };

  return (
    <Card className="w-full mb-8">
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-col space-y-4">
          <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <Upload className="w-8 h-8 mb-2 text-gray-500" />
            <span className="text-gray-600">Click to upload or drag and drop</span>
            <input 
              type="file" 
              accept="video/*" 
              onChange={handleFileChange}
              className="hidden" 
            />
          </label>

          {file && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{file.name}</span>
                <span className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>

              <Progress value={progress} className="h-2" />

              <Button 
                onClick={uploadFile}
                disabled={processing}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {processing ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                {processing ? 'Processing...' : 'Start Analysis'}
              </Button>

              {uploadStatus && (
                <div className={`flex items-center p-3 rounded-md ${
                  uploadStatus.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {uploadStatus.isError ? (
                    <AlertCircle className="w-5 h-5 mr-2" />
                  ) : (
                    <CheckCircle className="w-5 h-5 mr-2" />
                  )}
                  <span>{uploadStatus.message}</span>
                </div>
              )}

              {videoUrl && videoFilename && (
                  <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">Video Analysis</h3>
                      {processingStatus?.status === 'completed' && (
                          <div className="mt-2 text-sm text-green-600">
                              Analysis complete! Accuracy
                          </div>
                      )}
                      {processing && processingStatus?.status === 'processing' && (
                          <div className="mt-2 text-sm text-blue-600">
                              Streaming real-time analysis...
                          </div>
                      )}
                  </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoUpload;