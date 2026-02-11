"use client";

import { X, MessageSquare, Quote, Calendar, User } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewTestimonialModal({ testimonial, onClose }) {
  if (!testimonial) return null;

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
          className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
        >
          {/* HEADER */}
          <div className="relative p-8 border-b flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-600 rounded-2xl">
                <MessageSquare className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold">Testimonial Details</h2>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                  Review ID: #{testimonial.id}
                </span>
              </div>
            </div>

            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition">
              <X size={22} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-8 overflow-y-auto">
            <div className="grid lg:grid-cols-3 gap-10">
              
              {/* LEFT: CONTENT */}
              <div className="lg:col-span-2 space-y-8">
                <div className="relative p-8 bg-slate-50 rounded-[2rem] border border-slate-100 italic text-slate-700 text-xl leading-relaxed">
                  <Quote size={40} className="text-purple-200 absolute -top-2 -left-2" />
                  <p className="relative z-10 font-medium">
                    {testimonial.feedback}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                    <Calendar className="text-purple-500" size={20} />
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400">Published On</p>
                      <p className="font-bold text-sm">
                        {new Date(testimonial.created_at).toLocaleDateString(undefined, {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                    <User className="text-blue-500" size={20} />
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400">Source</p>
                      <p className="font-bold text-sm">Verified Client</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: CLIENT PROFILE IMAGE */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">
                  Client Profile
                </h3>
                {testimonial.image_url ? (
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                    <Image
                      src={testimonial.image_url}
                      alt="client"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-slate-100 rounded-[2rem] flex items-center justify-center text-5xl">
                    👤
                  </div>
                )}
                <div className="text-center p-4 bg-purple-50 rounded-2xl border border-purple-100">
                  <p className="text-purple-700 text-xs font-bold">Associated Case Study</p>
                  <p className="text-slate-500 text-[10px]">Project ID: #{testimonial.case_study_id}</p>
                </div>
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <div className="p-6 border-t bg-slate-50/50 flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              Close Preview
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}