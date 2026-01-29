"use client";

import { useState } from "react";
import {
  Eye,
  X,
  Layout,
  Image as ImageIcon,
  FileText,
  Calendar,
  Layers,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import StatusBadge from "@/components/StatusToggle";

export default function ViewHome({ home }) {
  const [open, setOpen] = useState(false);

  if (!home) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
        title="View Details"
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
              <div className="relative p-8 border-b bg-gradient-to-r from-slate-50 to-white flex justify-between items-center overflow-hidden">
                {/* Abstract Background Decoration */}
                <div className="absolute top-[-20px] left-[-20px] w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60" />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                    <Layout className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                      Banner Preview
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                        Record ID: #{home.id}
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
                {/* TOP SECTION: Content & Stats */}
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Layers size={12} /> Main Heading
                      </h3>
                      <h1 className="text-3xl font-black text-slate-900 leading-tight">
                        {home.title}
                      </h1>
                    </div>

                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FileText size={12} /> Content Description
                      </h3>
                      <div
                        className="text-slate-600 leading-relaxed text-base prose prose-slate"
                        dangerouslySetInnerHTML={{ __html: home.description }}
                      />
                    </div>
                  </div>

                  {/* Sidebar Metadata Card */}
                  <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-6 h-fit">
                    {/* <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                        Visibility
                      </p>
                      <StatusBadge status={home.status} />
                    </div> */}
                    
                    <div className="pt-6 border-t border-slate-200">
                      <div className="flex items-center gap-3 mb-4">
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-white rounded-lg shadow-sm">
                            <ImageIcon size={16} className="text-slate-400" />
                         </div>
                         <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Media</p>
                            <p className="text-sm font-bold text-slate-700">{home.image_url?.length || 0} Assets</p>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* IMAGES GALLERY */}
                <section>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ImageIcon size={14} /> Banner Visuals
                  </h3>

                  {home.image_url?.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {home.image_url.map((url, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ y: -5 }}
                          className="group relative aspect-video rounded-2xl overflow-hidden border-4 border-white shadow-md hover:shadow-xl transition-all"
                        >
                          <Image
                            src={url}
                            alt="banner"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <ImageIcon className="text-slate-300 mb-2" size={32} />
                        <p className="text-sm text-slate-400 italic">No media assets found</p>
                    </div>
                  )}
                </section>
              </div>

              {/* FOOTER */}
              <div className="p-6 border-t bg-white flex justify-end gap-3 px-8">
                <button
                  onClick={() => setOpen(false)}
                  className="px-8 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95 cursor-pointer"
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