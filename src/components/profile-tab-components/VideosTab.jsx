import React, { useState, useEffect } from "react";
import { VideoService } from "@/services/video-service";

const UserVideos = ({ token, loggedInUserId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    useEffect(() => {
      if (token) {
        fetchUserVideos();
      }
    }, [token]);
    
  const fetchUserVideos = async () => {
    try {
      const response = await VideoService.getAllVideos(token);

      // Access the videos array from the response
      const { videos } = response.data;

      // Filter videos to display only those uploaded by the logged-in user
      const userVideos = videos.filter(
        (video) => video.owner._id === loggedInUserId
      );

      setVideos(userVideos);
      setError("");
    } catch (err) {
      setError("Error fetching user videos");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading videos...</div>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!videos.length) return <p className="text-gray-500">No videos found</p>;

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div key={video._id} className="w-full">
          {/* Video player for each video */}
          <video
            controls
            width="100%"
            className="rounded-md"
            poster={video.thumbnail} // Display the thumbnail as the poster
          >
            <source src={video.videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video details */}
          <div className="mt-2">
            <p className="text-white font-semibold">{video.title}</p>
            <p className="text-gray-500">
              {video.views} views ·{" "}
              {new Date(video.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-400">{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserVideos;
