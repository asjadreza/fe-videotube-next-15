"use client";

import React, { useState } from "react";
import { AuthService } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login(formData);
      const { accessToken, user } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      Cookies.set("accessToken", accessToken);
      console.log(accessToken)
      setSuccess("Login successful");
      setError("");
      window.dispatchEvent(new Event("storage"));
      router.push("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error logging in");
      setSuccess("");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center justify-content-center">
        <div className="col-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome Page</h1>
            <p className="text-lg mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              pharetra lacinia maximus. Integer pulvinar lacus.
            </p>
          </div>
        </div>

        <div className="col-6" style={{ marginTop: "5rem" }}>
          <div className="text-center">
            <h1 className="text-gray-900 dark:text-white text-2xl md:text-4xl">
              Login
            </h1>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <form onSubmit={handleSubmit} className="my-3 mx-auto w-[70%]">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 font-semibold text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mb-4 px-4 py-2 rounded-lg shadow-lg border border-gray-300 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-1 font-semibold text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="mb-4 px-4 py-2 rounded-lg shadow-lg border border-gray-300 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center mt-5">
              <button
                type="submit"
                className="text-purple-700 dark:text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-purple-700 hover:text-white dark:hover:bg-purple-500 transition duration-300 ease-in-out dark:bg-gray-800 w-full md:w-auto"
              >
                Login
              </button>
            </div>

            <div className="text-center mt-4">
              <span>Don't have an account? </span>
              <a
                className="cursor-pointer"
                onClick={() => router.push("/register")}
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
