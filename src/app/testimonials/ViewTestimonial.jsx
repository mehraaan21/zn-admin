"use client";

import { useState } from "react";
import {
  Eye,
  X,
  MessageSquare,
  User,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Quote,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewTestimonial({ data }) {
  const [open, setOpen] = useState(false);

  if (!data) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
        title="View Testimonial"
      >
        <Eye size={18} />
      </button>

      <AnimatePresence>
        {open && (
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
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
            >
              {/* STYLISH HEADER */}
              <div className="relative p-8 border-b bg-linear-to-r from-slate-50 to-white flex justify-between items-center overflow-hidden">
                <div className="absolute top-20px left--20px w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60" />

                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                      Testimonial Details
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                        Reference ID: #{data.id}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer border border-transparent hover:border-slate-200"
                >
                  <X size={24} />
                </button>
              </div>

              {/* BODY - PREMIUM LAYOUT */}
              <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Content Area */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Client Identity Hero */}
                    <div className="flex flex-col md:flex-row items-center gap-6 bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0">
                        <Image
                          src={data.picture_url || "/placeholder.png"}
                          alt={data.client_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center md:text-left space-y-1">
                        <h3 className="text-3xl font-black text-slate-900 leading-tight">
                          {data.client_name}
                        </h3>
                        <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-4 text-sm text-slate-600 font-semibold">
                          <span className="flex items-center gap-1.5 italic font-bold tracking-tight">
                            <Briefcase size={14} className="text-blue-500" />{" "}
                            {data.designation}
                          </span>
                          <span className="flex items-center gap-1.5 italic font-bold tracking-tight">
                            <Building2 size={14} className="text-blue-500" />{" "}
                            {data.company}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* The Quote Section */}
                    <div className="relative pt-4">
                      <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Quote size={12} /> Client Feedback
                      </h3>
                      <div className="relative">
                        <span className="absolute -top-6 -left-4 text-8xl text-blue-100/60 font-serif leading-none select-none">
                          “
                        </span>
                        {/* <p className="text-xl text-slate-700 leading-relaxed italic relative z-10 font-medium px-4">
                          {data.quote}
                        </p> */}
                          <div
                        className="text-xl text-slate-700 leading-relaxed italic relative z-10 font-medium px-4"
                        dangerouslySetInnerHTML={{ __html: data.quote }}
                      />
                        <span className="absolute -bottom-14 -right-4 text-8xl text-blue-100/60 font-serif leading-none rotate-180 select-none">
                          “
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Metadata Card */}
                  <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-6 h-fit">
                    <div className="pt-6 border-t border-slate-200 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <User size={16} className="text-slate-400" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            Verification
                          </p>
                          <p className="text-xs font-bold text-green-500 uppercase tracking-tighter">
                            Verified Client
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="p-6 border-t bg-white flex justify-end gap-3 px-8">
                <button
                  onClick={() => setOpen(false)}
                  className="px-8 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95 cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
}
