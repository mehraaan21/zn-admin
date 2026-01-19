"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Moon,
  Sun,
  Bell,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";

import EditProfileModal from "./EditProfileModal";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const router = useRouter();

const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const notifications = [
    "New user signed up",
    "Order #2045 shipped",
    "Backup completed",
    "Payment received",
    "Server reboot successful",
  ];

  const messages = [
    "New report ready",
    "Message from Admin",
    "Server stable",
    "Performance report available",
  ];

  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("isAuth");
  //   router.push("/log-in"); // Next.js route navigation
  // };

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-br from-blue-500 to-blue-500 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">

        {/* LEFT - LOGO */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/542313.png"
            alt="Logo"
            width={120}
            height={50}
            className="rounded-md"
            priority
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

          {/* Messages */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMessages((p) => !p);
                setShowNotifications(false);
              }}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-400 transition"
            >
              <MessageSquare size={18} className="text-gray-700 " />
            </button>

            <AnimatePresence>
              {showMessages && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-64 bg-white  rounded-lg shadow-lg border z-50"
                >
                  <div className="px-4 py-2 border-b font-semibold">Messages</div>
                  {messages.map((m, i) => (
                    <div key={i} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      {m}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications((p) => !p);
                setShowMessages(false);
              }}
              className="p-2 rounded-full bg-gray-100  hover:bg-gray-200 transition"
            >
              <Bell size={18} className="text-gray-700 " />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-64 bg-white  rounded-lg shadow-lg border z-50"
                >
                  <div className="px-4 py-2 border-b font-semibold">Notifications</div>
                  {notifications.map((n, i) => (
                    <div key={i} className="px-4 py-2 hover:bg-gray-200">
                      {n}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100  hover:bg-gray-200 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((p) => !p)}
              className="flex items-center gap-2"
            >
              <Image
                src="/images/hacker.png"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />

              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">Admin</div>
                <div className="text-xs text-gray-800">admin@gmail.com</div>
              </div>

              {profileOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50"
                >
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User size={16} /> Edit profile
                  </button>

                {/* logout */}
                   <LogoutButton />

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <EditProfileModal
            isOpen={showEditProfile}
            onClose={() => setShowEditProfile(false)}
          />
        </div>
      </div>
    </header>
  );
}
