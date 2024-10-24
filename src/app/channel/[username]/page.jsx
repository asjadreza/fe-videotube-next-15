"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChannelService } from "@/services/channel-service";
import UserVideos from "@/components/profile-tab-components/videosTab";

const ChannelProfile = () => {
  const router = useRouter();
  const { username } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("videos");
  const [user, setUser] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    if (username && token) {
      fetchChannelProfile(username);
    }
  }, [username, token]);

  const fetchChannelProfile = async (username) => {
    try {
      const response = await ChannelService.getChannelProfile(username, token);
      setChannelData(response.data);
      setError("");
    } catch (err) {
      setError(err.message || "Error fetching channel profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!channelData) return <div>No channel data found</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case "videos":
        return <UserVideos token={token} loggedInUserId={channelData._id} />;
      case "home":
      default:
        return (
          <p className="text-white mt-4">
            Welcome to {channelData.username}'s channel!
          </p>
        );
    }
  };

  console.log(channelData);

  return (
    <div className="p-4 max-w-4xl">
      <div
        className="d-flex flex-row text-left"
        style={{ marginLeft: "10rem" }}
      >
        <img
          src={channelData.avatar}
          alt={`${channelData.username} avatar`}
          className="w-32 h-32 rounded-full"
        />

        <div className="ml-4 flex flex-col" style={{}}>
          <h1 className="text-4xl font-bold">{user.fullname}</h1>
          <div className="flex flex-row">
            <span className="dark:text-white after:content-['\2022'] after:mx-1 after:text-gray-500">
              @{user.username}
            </span>
            <span className="dark:text-white after:content-['\2022'] after:mx-1 after:text-gray-500">
              {channelData.subscribersCount} Subscriber
            </span>
            <span className="dark:text-white">
              Subscribed To: {channelData.channelsSubscribedToCount}
            </span>
          </div>
        </div>

        {/* TODO: Add button to edit profile */}
        {/* TODO: Add video upload component */}
      </div>
      <div
        className="flex justify-left space-x-6 mt-8 border-b border-gray-600 pb-2"
        style={{ marginLeft: "10rem" }}
      >
        {/* <button
          className={`font-semibold transition-colors custom-tab ${
            activeTab === "home"
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("home")}
        >
          Home
        </button>
        <button
          className={`font-semibold transition-colors custom-tab ${
            activeTab === "videos"
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button> */}

<button
  className={`dark:text-white font-semibold transition-colors custom-tab ${
    activeTab === "home" ? "underline dark:underline" : ""
  }`}
  onClick={() => setActiveTab("home")}
>
  Home
</button>
<button
  className={`dark:text-white font-semibold transition-colors custom-tab ${
    activeTab === "videos" ? "underline dark:underline" : ""
  }`}
  onClick={() => setActiveTab("videos")}
>
  Videos
</button>
        <button className="dark:text-white font-semibold transition-colors custom-tab">
          Playlists
        </button>
        <button className=" dark:text-white font-semibold transition-colors custom-tab">
          Community
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-8" style={{ marginLeft: "10rem" }}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ChannelProfile;
