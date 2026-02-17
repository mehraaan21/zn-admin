"use client";

import {
  X,
  Layout,
  Image as ImageIcon,
  Layers,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewResults({ result, onClose }) {
  if (!result) return null;

  const images = result.image_url ? [result.image_url] : [];

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
              <div className="p-3 bg-blue-600 rounded-2xl">
                <Layout className="text-white" size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold">
                  Results Preview
                </h2>

                <span className="text-xs text-slate-500">
                  Record ID: #{result.id}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full"
            >
              <X size={22} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-8 overflow-y-auto space-y-10">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* LEFT */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-blue-500 uppercase mb-2 flex gap-2">
                    <Layers size={14} /> Result Title
                  </h3>

                  <h1 className="text-3xl font-black">
                    {result.Title}
                  </h1>
                </div>

                {/* BULLETS */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex gap-2">
                    <CheckCircle2 size={14} /> Key Impact
                  </h3>

                  <ul className="space-y-3">
                    {result.bullet_points?.map((point, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2
                          size={18}
                          className="text-green-500 mt-1"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="bg-slate-50 rounded-3xl p-6 h-fit">
                <div className="flex items-center gap-3">
                  <ImageIcon size={16} />
                  <div>
                    <p className="text-xs text-slate-400 uppercase">
                      Total Media
                    </p>
                    <p className="font-bold">
                      {images.length} Asset
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* IMAGE */}
            {images.length ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden border">
                <Image
                  src={images[0]}
                  alt="result"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-50 rounded-3xl border-dashed border">
                No media found
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="p-6 border-t flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-2.5  bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-xl"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}