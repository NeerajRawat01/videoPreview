import React, { useEffect, useState } from "react";

interface ThumbnailExtractorProps {
  videoUrl: string; // URL of the video
}

const ThumbnailExtractor: React.FC<ThumbnailExtractorProps> = ({
  videoUrl,
}) => {
  const [thumbnail, setThumbnail] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Extract Video ID based on the platform
  const extractVideoId = (url: string): string | null => {
    const youtubeRegex = /[?&]v=([^&#]*)|youtu\.be\/([^&#]*)/;
    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const dailymotionRegex = /dailymotion\.com\/video\/([^_]+)/;

    let matches: RegExpMatchArray | null;
    if ((matches = url.match(youtubeRegex))) {
      return matches[1] || matches[2]; // YouTube
    } else if ((matches = url.match(vimeoRegex))) {
      return matches[1]; // Vimeo
    } else if ((matches = url.match(dailymotionRegex))) {
      return matches[1]; // Dailymotion
    } else {
      return null; // Invalid URL
    }
  };

  const getThumbnailUrl = (
    videoId: string,
    platform: string
  ): string | null => {
    switch (platform) {
      case "youtube":
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      case "vimeo":
        return `https://vimeo.com/api/v2/video/${videoId}.json`; // API endpoint for thumbnail
      case "dailymotion":
        return `https://www.dailymotion.com/thumbnail/video/${videoId}`; // Dailymotion thumbnail
      default:
        return null;
    }
  };

  useEffect(() => {
    const videoId = extractVideoId(videoUrl);
    let platform: string | undefined;

    if (videoId) {
      // Determine platform based on URL
      if (videoUrl.includes("youtube")) {
        platform = "youtube";
      } else if (videoUrl.includes("vimeo")) {
        platform = "vimeo";
      } else if (videoUrl.includes("dailymotion")) {
        platform = "dailymotion";
      }

      if (platform === "youtube") {
        const thumbnailUrl = getThumbnailUrl(videoId, platform);
        setThumbnail(thumbnailUrl || "");
      } else if (platform === "vimeo") {
        fetch(getThumbnailUrl(videoId, platform) as string)
          .then((response) => response.json())
          .then((data) => {
            setThumbnail(data[0].thumbnail_large); // Extract thumbnail from response
          })
          .catch(() => {
            setError("Failed to load Vimeo thumbnail.");
          });
      } else if (platform === "dailymotion") {
        const thumbnailUrl = getThumbnailUrl(videoId, platform);
        setThumbnail(thumbnailUrl || "");
      }
    } else {
      setError("Invalid video URL.");
    }
  }, [videoUrl]);

  return (
    <div>
      {thumbnail && (
        <div>
          <h3>Video Thumbnail:</h3>
          <img src={thumbnail} alt="Video Thumbnail" />
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ThumbnailExtractor;
