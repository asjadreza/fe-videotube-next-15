"use client";

import React, { useEffect, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import DisplayAllVideos from "@/components/videos-component/AllVideos";

const HomePage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") || Cookies.get("accessToken");
      console.log(token);

    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  console.log(isAuthenticated);

  return (
    <>
      {!isAuthenticated ? (
        <div
          className={`flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900`}
        >
          <h1 className="text-gray-900 dark:text-white mb-6 text-4xl">
            Please login to see the content
          </h1>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleLogin}
              className="text-purple-700 dark:text-white font-semibold
            py-2 px-6 rounded-lg shadow-lg hover:bg-purple-700
            hover:text-white dark:hover:bg-purple-500
            transition duration-300 ease-in-out dark:bg-gray-800"
            >
              Login
            </button>

            <button
              onClick={handleRegister}
              className="text-purple-700 dark:text-white font-semibold
            py-2 px-6 rounded-lg shadow-lg hover:bg-purple-700
            hover:text-white dark:hover:bg-purple-500
            transition duration-300 ease-in-out dark:bg-gray-800"
            >
              Register
            </button>
          </div>
        </div>
      ) : (
        <DisplayAllVideos />
      )}
    </>
  );
};

export default HomePage;
