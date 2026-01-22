"use client";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function DeleteConfirm({ data, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 w-full max-w-md text-center shadow-2xl"
      >
        <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 flex items-center justify-center rounded-full mb-4">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Are you sure?</h2>
        <p className="text-gray-500 mt-2">
          You are about to delete <span className="font-bold text-gray-700">"{data.title}"</span>. This action cannot be undone.
        </p>

        <div className="flex gap-4 mt-8">
          <button onClick={onClose} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
            Cancel
          </button>
          <button onClick={() => { onDelete(data.id); onClose(); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 shadow-lg shadow-red-200 transition-all">
            Yes, Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}