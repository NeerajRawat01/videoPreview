"use client"; // Ensures it's a Client Component

import ThumbnailExtractor from "@/components/ui/ThumbnailExtractor";
import { useEffect, useState } from "react";

const VideoGallery = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component is only rendered on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a fallback (could be a loading spinner or placeholder) during SSR
    return <div>Loading video...</div>;
  }
  const videoUrls = [
    "https://www.youtube.com/watch?v=G1qUazfWK8o",
    "https://www.youtube.com/watch?v=Hl4Ongw1vg4",
    "https://www.youtube.com/watch?v=G1qUazfWK8o",
    "https://www.youtube.com/watch?v=Hl4Ongw1vg4",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10">
      {/* {videoUrls.map((videoUrl, index) => (
        <VideoThumbnail key={index} videoUrl={videoUrl} />
      ))} */}
      <ThumbnailExtractor videoUrl="https://www.youtube.com/watch?v=Hl4Ongw1vg4" />
    </div>
  );
};

export default VideoGallery;
