"use client";

import {
  X,
  Briefcase,
  Users,
  FileText,
  Calendar,
  CheckCircle2,
  MapPin,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from "dompurify";

export default function ViewOpening({ data, onClose }) {
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
          className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
        >
          {/* STYLISH HEADER */}
          <div className="relative p-8 border-b bg-linear-to-r from-slate-50 to-white flex justify-between items-center overflow-hidden">
            <div className="absolute top-20px left-20px w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white">
                <Briefcase size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                  Opening Details
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                    Vacancy ID: #{data.id}
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
                <div>
                  <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Briefcase size={12} /> Job Title
                  </h3>
                  <h1 className="text-3xl font-black text-slate-900 leading-tight">
                    {data.title}
                  </h1>
                  <p className="text-blue-600 font-bold mt-1 flex items-center gap-2">
                    <MapPin size={14} /> {data.position}
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FileText size={12} /> Role Description
                  </h3>
                  <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      <div
                        className="prose prose-slate max-w-none text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            data?.description ||
                              "No description provided for this role.",
                          ),
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar Metadata Card */}
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-6">
                  <div className="pt-6 border-t border-slate-200 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Users size={16} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Available Slots
                        </p>
                        <p className="text-sm font-bold text-slate-700">
                          {data.opening} Openings
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Clock size={16} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Job Type
                        </p>
                        <p className="text-sm font-bold text-slate-700">
                          Full Time / Remote
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-6 border-t bg-white flex justify-end gap-3 px-8">
            <button
              onClick={onClose}
              className="px-8 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95 cursor-pointer"
            >
              Close Preview
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
