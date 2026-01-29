"use client";

import { X, Sparkles, Layout, ListChecks, FileText, Calendar, Hash, Award } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewSpecialization({ data, onClose }) {
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
        >
          {/* STYLISH HEADER */}
          <div className="relative p-8 border-b bg-gradient-to-r from-slate-50 to-white flex justify-between items-center overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-[-20px] left-[-20px] w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                  Specialization Details
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                    Record ID: #{data.id}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer border border-transparent hover:border-slate-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Content Area */}
              <div className="lg:col-span-2 space-y-8">
                {/* Title & Badge */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                      {data.icon || "Expertise"}
                    </span>
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 leading-tight">
                    {data.title}
                  </h1>
                </div>

                {/* Cover Image Preview */}
                <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 group">
                   <Image 
                      src={data.image_url || "/placeholder.png"} 
                      alt={data.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FileText size={12} /> Overview
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {data.description}
                  </p>
                </div>

                {/* Bullet Points Grid */}
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ListChecks size={12} /> Core Features & Focus
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.bullet_points?.map((point, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                          <ListChecks size={14} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 leading-tight">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Metadata Card */}
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-6 h-fit">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Priority Order
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        <Hash size={18} className="text-blue-600" />
                      </div>
                      <span className="text-xl font-black text-slate-800">Rank #{data.number || "0"}</span>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-200 space-y-5">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                          <Award size={16} className="text-blue-500" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Status</p>
                          <p className="text-xs font-bold text-green-600 uppercase">Live on Web</p>
                       </div>
                    </div>

                    {/* <div className="flex items-center gap-3">
                       <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                          <Calendar size={16} className="text-slate-400" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Last Update</p>
                          <p className="text-xs font-bold text-slate-700">Jan 27, 2026</p>
                       </div>
                    </div> */}
                  </div>
                </div>

                {/* <div className="bg-slate-900 rounded-3xl p-6 text-white/70">
                   <div className="flex items-center gap-2 mb-4">
                      <Layout size={14} className="text-blue-400" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">System Metadata</p>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between text-[10px] uppercase font-bold tracking-tighter">
                        <span>Visibility</span>
                        <span className="text-white">Public</span>
                      </div>
                      <div className="flex justify-between text-[10px] uppercase font-bold tracking-tighter">
                        <span>Module</span>
                        <span className="text-white italic underline decoration-blue-500/50">Services</span>
                      </div>
                   </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-6 border-t bg-white flex justify-end gap-3 px-8">
            <button 
              onClick={onClose}
              className="px-10 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95 cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </AnimatePresence>
  );
}