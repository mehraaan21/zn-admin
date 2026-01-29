"use client";

import { X, Info, ShoppingBag, ImageIcon, Link as LinkIcon, Layers, FileText, ExternalLink } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewProduct({ data, onClose }) {
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
            <div className="absolute top-[-20px] left-[-20px] w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                  Product Details
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                    Product ID: #{data.id}
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
                    <Layers size={12} /> Product Name
                  </h3>
                  <h1 className="text-4xl font-black text-slate-900 leading-tight">
                    {data.title}
                  </h1>
                </div>

                {/* Main Product Image Preview */}
                <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 group">
                   <Image 
                      src={data.image_url || "/placeholder.png"} 
                      alt={data.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                   />
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FileText size={12} /> Product Description
                  </h3>
                  <div 
                    className="text-slate-600 leading-relaxed text-base prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: data.description }} 
                  />
                </div>
              </div>

              {/* Sidebar Metadata Card */}
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Category
                    </p>
                    <span className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm block w-fit">
                      {data.category || "General"}
                    </span>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-200 space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                          <LinkIcon size={16} className="text-blue-500" />
                       </div>
                       <div className="overflow-hidden">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">URL Slug</p>
                          <p className="text-xs font-mono font-bold text-slate-700 truncate">{data.slug}</p>
                       </div>
                    </div>
                    
                    {data.website_url && (
                      <a 
                        href={data.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all group shadow-lg shadow-blue-100"
                      >
                         <span className="text-xs font-bold">Visit Live Website</span>
                         <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>

                {/* <div className="bg-slate-900 rounded-3xl p-6 text-white/70">
                   <p className="text-[10px] font-bold uppercase text-white/30 mb-4 tracking-widest">Administrative Data</p>
                   <div className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <span>Created At</span>
                        <span className="text-white font-medium">Jan 27, 2026</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Visibility</span>
                        <span className="text-green-400 font-bold">Public</span>
                      </div>
                   </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-6 border-t bg-white flex justify-end px-8">
            <button 
              onClick={onClose}
              className="px-10 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95 cursor-pointer"
            >
              Close Details
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