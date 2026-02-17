"use client";

import { X, Code2, Info, Layers, Calendar, User, Layout } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewTechStack({ data, onClose }) {
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
          className="bg-white rounded-3xl w-full max-w-lg overflow-hidden flex flex-col shadow-2xl border border-slate-200"
        >
          {/* STYLISH HEADER */}
          <div className="relative p-6 border-b bg-linrar-to-r from-slate-50 to-white flex justify-between items-center overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-20px left-20px w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60" />
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 text-white">
                <Code2 size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Technology Details
                </h2>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Tech ID: #{data.id}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer border border-transparent hover:border-slate-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-8 space-y-8">
            {/* Tech Logo Preview Card */}
            <div className="flex flex-col items-center justify-center p-10 bg-slate-50 rounded-3xl border border-slate-100 relative group">
               <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm">
                    {data.Category}
                  </span>
               </div>
               
               <div className="relative h-28 w-28 bg-white rounded-2xl p-4 shadow-xl border border-white group-hover:scale-105 transition-transform duration-500">
                  <Image 
                    src={data.image_url || "/placeholder.png"} 
                    alt={data.Name} 
                    fill 
                    className="object-contain p-2"
                  />
               </div>
               
               <h3 className="mt-6 text-2xl font-black text-slate-900 tracking-tight">
                 {data.Name}
               </h3>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Layers size={14} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Classification</span>
                  </div>
                  <p className="text-sm font-bold text-slate-700">{data.Category}</p>
               </div>
            </div>
          </div>

          {/* Action Footer */}
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
    </AnimatePresence>
  );
}