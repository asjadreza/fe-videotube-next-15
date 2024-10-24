import React from "react";
import { AuthService } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import ThemeToggle from "../theme-toggle";
import Cookies from "js-cookie";

const UserModal = ({ isOpen, onClose, user, onLogout, accessToken }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      const response = await AuthService.logout(accessToken);
      localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");
      onLogout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const goToChannelProfile = () => {
    router.push(`/channel/${user.username}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end"
      onClick={onClose}
    >
      <div
        className="absolute right-2 mt-2 w-72 dark:bg-[#282828] bg-slate-300 shadow-lg rounded-lg z-50"
        onClick={(e) => e.stopPropagation()}
        style={{
          top: "7%",
        }}
      >
        {/* User Info Section */}
        {user && (
          <div className="p-4 border-b border-gray-300 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt="User avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {user.fullname}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  @{user.username}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <a
                onClick={goToChannelProfile}
                className="text-blue-600 dark:text-blue-400 text-sm font-semibold cursor-pointer"
                style={{ textDecoration: "none" }}
              >
                View your channel
              </a>
            </div>
          </div>
        )}

        {user && (
          <div className="py-2">
            <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <a
                onClick={handleLogout}
                className="flex items-center space-x-3 cursor-pointer"
                style={{ textDecoration: "none" }}
              >
                <span className="material-icons text-gray-700 dark:text-gray-300">
                  Sign out
                </span>
              </a>
            </div>

            <div>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
