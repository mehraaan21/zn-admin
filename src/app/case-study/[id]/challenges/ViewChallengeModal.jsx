"use client";

import { X, AlertTriangle, CheckCircle2, ShieldAlert, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewChallengeModal({ item, onClose }) {
  if (!item) return null;

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
          className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
        >
          {/* HEADER */}
          <div className="relative p-8 border-b flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500 rounded-2xl shadow-lg shadow-orange-100">
                <ShieldAlert className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-800">Challenge Analysis</h2>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Entry ID: #{item.id}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-10 overflow-y-auto space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* CHALLENGE BOX */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-600 font-black uppercase text-xs tracking-widest">
                  <AlertTriangle size={16} /> The Problem
                </div>
                <div className="bg-red-50 border-2 border-red-100 p-8 rounded-2rem min-h-[250px] shadow-inner">
                  <p className="text-red-900 leading-relaxed font-medium text-lg">
                    {item.challenge}
                  </p>
                </div>
              </div>

              {/* SOLUTION BOX */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600 font-black uppercase text-xs tracking-widest">
                  <Zap size={16} /> The Execution
                </div>
                <div className="bg-green-50 border-2 border-green-100 p-8 rounded-2rem min-h-[250px] shadow-inner">
                  <p className="text-green-900 leading-relaxed font-medium text-lg">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-8 border-t bg-slate-50/50 flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-2.5 bg-blue-500 cursor-pointer text-white rounded-xl font-black text-md tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              Close Preview
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}