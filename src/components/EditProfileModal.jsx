"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react"; // Added useEffect import
import { LayoutDashboard, User, X, Loader2 } from "lucide-react";

const EditProfileModal = ({ isOpen, onClose }) => {
  // 1. All hooks must be at the very top
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" && isOpen) {
      router.push("/log-in");
    }
  }, [status, router, isOpen]);

  // 2. Conditional returns come AFTER hooks
  if (!isOpen) return null;

  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg flex items-center gap-3">
          <Loader2 className="animate-spin text-blue-600" />
          <p>Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-8 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl relative p-8  max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4  text-gray-500 cursor-pointer hover:text-black dark:text-gray-300 z-20"
        >
          <X size={24} />
        </button>

        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in zoom-in duration-300">
          {/* WELCOME HEADER SECTION */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-3">
                <LayoutDashboard size={28} />
                Admin Log-In
              </h1>
              <p className="mt-2 text-blue-100 flex items-center gap-2 text-sm md:text-base">
                <User size={16} />
                Logged in as: <span className="font-bold cursor-pointer underline">{session?.user?.email}</span>
              </p>
              
              <div className="mt-4 flex items-center cursor-pointer gap-2 bg-white/10 w-fit px-3 py-1.5 rounded-full text-xs backdrop-blur-sm border border-white/20">
                <span className="h-2 w-2 bg-green-400 rounded-full  animate-pulse">

                </span >
                System Online
              </div>
            </div>
            
            {/* Decorative Background Pattern */}
            <div className="absolute -top-10 -right-10 opacity-10">
              <LayoutDashboard size={180} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;