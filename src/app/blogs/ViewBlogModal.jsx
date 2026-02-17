"use client";

import { useState } from "react";
import {
  X,
  Newspaper,
  FileText,
  Search,
  Tag,
  Calendar,
  Globe,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewBlogModal({ data, onClose }) {
  const [activeTab, setActiveTab] = useState("content"); // 'content' or 'seo'

  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
        >
          {/* HEADER */}
          <div className="relative p-6 border-b bg-linear-to-r from-slate-50 to-white flex justify-between items-center overflow-hidden">
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white">
                <Newspaper size={24} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                  Blog Preview
                </h2>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  ID: #{data.id}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          {/* TAB NAVIGATION - Keeps page clean */}
          <div className="flex border-b bg-slate-50/50 px-6">
            <button
              onClick={() => setActiveTab("content")}
              className={`flex items-center gap-2 py-4 px-4 text-sm font-bold border-b-2 transition-all ${
                activeTab === "content"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400"
              }`}
            >
              <FileText size={16} /> Main Content
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={`flex items-center gap-2 py-4 px-4 text-sm font-bold border-b-2 transition-all ${
                activeTab === "seo"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400"
              }`}
            >
              <Search size={16} /> SEO & Discovery
            </button>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar bg-white">
            {activeTab === "content" ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Image Section */}
                <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 group">
                  <Image
                    src={data.image_url || "/placeholder.png"}
                    alt={data.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm">
                      {data.category || "General"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl font-black text-slate-900 leading-tight">
                    {data.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-blue-500" /> Jan 27,
                      2026
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Globe size={14} className="text-blue-500" /> {data.slug}
                    </span>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 leading-relaxed text-slate-600 prose prose-slate max-w-none">
                    {data.description}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-blue-500 uppercase mb-2">
                      Meta Title
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {data.seo_title || "Not Set"}
                    </p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-blue-500 uppercase mb-2">
                      Meta Keywords
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {data.seo_keywords?.split(",").map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500"
                        >
                          {tag.trim()}
                        </span>
                      )) || "None"}
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">
                    Search Result Snippet
                  </p>
                  <p className="text-xs text-blue-400 font-medium mb-1 truncate">{`https://znsoftech.com/blogs/${data.slug}`}</p>
                  <p className="text-sm font-bold text-white mb-2 leading-tight">
                    {data.seo_title || data.title}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 italic">
                    {data.seo_description ||
                      "No SEO description provided. Search engines will pull from main content."}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* FOOTER */}
          <div className="p-6 border-t bg-slate-50/50 flex justify-end px-8">
            <button
              onClick={onClose}
              className="px-8 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95 cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </AnimatePresence>
  );
}
