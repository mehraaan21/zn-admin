"use client";

import { X, Cpu, Layers, ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewTechModal({ tech, onClose }) {
  if (!tech) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl border border-slate-200"
        >
          {/* TOP DESIGN BAR */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* HEADER */}
          <div className="relative p-8 flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
                <Cpu className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-800 uppercase">Tech Detail</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Technology Specifications</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* BODY */}
          <div className="px-8 pb-10 space-y-8">
            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
              <div className="relative h-32 w-32 bg-white rounded-3xl p-5 shadow-xl mb-6 flex items-center justify-center group hover:scale-105 transition-transform">
                <Image
                  src={tech.image_url || "/placeholder.png"}
                  alt={tech.Name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <h1 className="text-3xl font-black text-slate-800 mb-2">{tech.Name}</h1>
              <span className="px-6 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100">
                {tech.Category}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-slate-100 rounded-2xl flex items-center gap-3 shadow-sm">
                <Layers className="text-indigo-500" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400">Layer</p>
                  <p className="font-bold text-sm text-slate-700">{tech.Category} Stack</p>
                </div>
              </div>
              <div className="p-5 bg-white border border-slate-100 rounded-2xl flex items-center gap-3 shadow-sm">
                <ShieldCheck className="text-green-500" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400">Status</p>
                  <p className="font-bold text-sm text-slate-700">Verified Tech</p>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-6 border-t bg-slate-50/50 flex justify-end">
            <button
              onClick={onClose}
              className="px-10 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95"
            >
              Back to Stack
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}