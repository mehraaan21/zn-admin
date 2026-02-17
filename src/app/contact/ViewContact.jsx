"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  User,
  MessageSquare,
  Calendar,
  ShieldCheck,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/lib/toast";

export default function ViewContact({ data, onClose }) {
  if (!data) return null;

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast(`${label} copied to clipboard!`, "success");
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-xl rounded-2rem shadow-2xl overflow-hidden border border-slate-100"
        >
          {/* Header with Gradient Accent */}
          <div className="relative p-8 border-b border-slate-50 bg-slate-50/50">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                    Inquiry Details
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  {data.name}
                </h2>
                <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-1">
                  <Calendar size={14} /> Received on{" "}
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:shadow-md text-slate-400 hover:text-red-500 rounded-full transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Contact Content Grid */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              icon={<Mail className="text-blue-500" size={18} />}
              label="Email Address"
              value={data.email}
              onCopy={() => copyToClipboard(data.email, "Email")}
            />
            <InfoCard
              icon={<Phone className="text-emerald-500" size={18} />}
              label="Phone Number"
              value={data.phone || "Not Provided"}
              onCopy={
                data.phone ? () => copyToClipboard(data.phone, "Phone") : null
              }
            />

            <div className="md:col-span-2 group">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex gap-2 items-center mb-2">
                <MessageSquare size={14} className="text-slate-300" /> Client
                Message
              </label>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 leading-relaxed italic relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/20" />
                "{data.message}"
              </div>
            </div>
          </div>

          {/* Footer with Status */}
          <div className="px-8 py-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
              <ShieldCheck size={18} /> Verified Submission
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-8 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-95 text-md"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function InfoCard({ icon, label, value, onCopy }) {
  return (
    <div className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-100 hover:shadow-sm transition-all group relative">
      <div className="flex items-center gap-3 mb-1">
        {icon}
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      </div>
      <div className="flex justify-between items-center gap-2">
        <p className="font-bold text-slate-800 truncate text-sm">{value}</p>
        {onCopy && (
          <button
            onClick={onCopy}
            className="p-1.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Copy"
          >
            <Copy size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
