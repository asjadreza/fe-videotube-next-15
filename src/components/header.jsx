"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UserModal from "./user-component/UserModal";

const Header = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const tokenFromLocalStorage = localStorage.getItem("accessToken");
    const tokenFromCookies = Cookies.get("accessToken");

    if (tokenFromLocalStorage) {
      setAccessToken(tokenFromLocalStorage);
    } else if (tokenFromCookies) {
      setAccessToken(tokenFromCookies); 
    }
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      }
      const updatedToken = localStorage.getItem("accessToken");
      if (updatedToken) {
        setAccessToken(updatedToken);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  const handleLogout = () => {
    setUser(null);
    Cookies.remove("accessToken"); 
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <header className="flex justify-between p-3 bg-gray-200 dark:bg-gray-800">
        <h1 className="text-2xl font-bold">videotube</h1>
        {user && (
          <div className="cursor-pointer">
            <img
              src={user?.avatar}
              alt="User avatar"
              className="w-12 h-12 rounded-full"
              onClick={toggleModal}
            />
          </div>
        )}
      </header>
      <main>{children}</main>

      <UserModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        user={user}
        onLogout={handleLogout}
        accessToken={accessToken}
      />
    </div>
  );
};

export default Header;
