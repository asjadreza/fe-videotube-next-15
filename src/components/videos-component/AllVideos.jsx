"use client"

import React, { useEffect, useState } from "react";
import { VideoService } from "@/services/video-service";

const DisplayAllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log(token);

        if (!token) {
          setError("User is not authenticated.");
          return;
        }
        const response = await VideoService.getAllVideos(token);
        setVideos(response.data.videos);
      } catch (err) {
        setError("Failed to load videos");
      }
    };

    fetchVideos();
  }, []);



  const handleThumbnailClick = (videoId) => {
    setPlayingVideo(videoId);
  };

  console.log(videos);

  return (
    <div className="container">
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-3 gap-4 mt-4">
        {videos.map((video) => (
          <div key={video._id} className="border p-4 rounded">
            <h2 className="font-semibold mb-2">{video.title}</h2>
            <p className="mb-2">{video.description}</p>

            {playingVideo === video._id ? (
              <video
                width="100%"
                controls
                autoPlay
                src={video.videoFile} // URL to the video file
                onEnded={() => setPlayingVideo(null)} // Reset when the video ends
              />
            ) : (
              <img
                src={video.thumbnail}
                alt={video.title}
                className="cursor-pointer"
                onClick={() => handleThumbnailClick(video._id)}
              />
            )}

            <p className="mt-2 text-sm text-gray-600">
              Click thumbnail to play video
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayAllVideos;
