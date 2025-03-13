import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
    videoUrl: string;
    isProcessing: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, isProcessing }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = videoUrl;
        }
    }, [videoUrl]);

    return (
        <div className="relative">
            <video ref={videoRef} controls autoPlay muted className="w-full h-auto" />
            {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <span className="text-white">Processing...</span>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;