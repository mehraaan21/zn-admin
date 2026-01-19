"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

const EditProfileModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("Mehran");
  const [username, setUsername] = useState("mehran123");
  const [email, setEmail] = useState("mehran@example.com");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { name, username, email, password };
    console.log("Updated Profile:", updatedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md sm:max-w-xl rounded-lg shadow-lg relative p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black dark:text-gray-300"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
