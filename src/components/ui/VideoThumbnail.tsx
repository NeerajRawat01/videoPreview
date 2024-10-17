"use client"; // Ensures it's a Client Component

import React, { useRef } from "react";
import ReactPlayer from "react-player";

interface VideoThumbnailProps {
  videoUrl: string;
  lightThumbnailUrl?: string; // Optional custom thumbnail URL
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  videoUrl = "https://www.youtube.com/watch?v=G1qUazfWK8o",
  lightThumbnailUrl,
}) => {
  const ref = useRef<any>(null);

  console.log("reff", ref.current);
  return (
    <div className="relative w-full pb-[56.25%] overflow-hidden rounded-3xl shadow-lg">
      <ReactPlayer
        ref={ref}
        url={videoUrl}
        width="100%"
        height="100%"
        light={true}
        controls={true}
        onReady={() => ref.current?.seekTo(1)}
        className="absolute top-0 left-0"
      />
      {/* Optional light thumbnail placeholder */}
      {lightThumbnailUrl && (
        <img
          src={lightThumbnailUrl}
          alt="Video Thumbnail"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl opacity-50"
        />
      )}
    </div>
  );
};

export default VideoThumbnail;
