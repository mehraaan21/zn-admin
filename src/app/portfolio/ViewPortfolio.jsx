"use client";

import { X, Briefcase, Globe, Calendar, Layout, ExternalLink, Layers, FileText, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewPortfolio({ data, onClose }) {
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
          className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl border border-slate-200 custom-scrollbar"
        >
          {/* HEADER */}
          
          <div className="sticky top-2 z-20 p-8 border-b bg-white/90 backdrop-blur-md flex justify-between items-center overflow-hidden">
            <div className="absolute top-20px left-20px w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 text-white">
                <Briefcase size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Project Details</h2>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">ID: #{data.id}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer relative z-10">
              <X size={24} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8 space-y-8 grow">
            {/* Hero Image */}
            <div className="relative aspect-video w-full bg-slate-100 rounded-3xl overflow-hidden border-4 border-white shadow-xl group">
               <Image 
                 src={data.image_url || "/placeholder.png"} 
                 alt={data.title} 
                 fill 
                 className="object-cover group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm">
                    {data.category}
                  </span>
               </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <FileText size={12} /> Case Study Overview
                  </h3>
                  <h1 className="text-3xl font-black text-slate-900 leading-tight">{data.title}</h1>
                </div>

                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                   {data.description}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Project Link</p>
                    {data.website_url ? (
                      <a href={data.website_url} target="_blank" className="flex items-center justify-between p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-100 group">
                        <span className="text-xs font-bold">Visit Live Site</span>
                        <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="text-xs italic text-slate-400">No public link available</span>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-200 space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                          <Globe size={16} className="text-blue-500" />
                       </div>
                       <div className="overflow-hidden">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Slug Path</p>
                          <p className="text-xs font-mono font-bold text-slate-700 truncate">/{data.slug}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                          <CheckCircle2 size={16} className="text-green-500" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Status</p>
                          <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">Active Showcase</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="sticky bottom-0 z-20 p-6 border-t bg-slate-50/80 backdrop-blur-md flex justify-end px-8">
            <button onClick={onClose} className="px-8 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95 cursor-pointer">
              Close Preview
            </button>
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </AnimatePresence>
  );
}