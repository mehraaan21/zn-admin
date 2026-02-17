"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { Trash2, AlertTriangle, X, RefreshCcw } from "lucide-react";

export default function DeleteSpecialization({ id, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const remove = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/specialization/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        toast(error.message || "Delete failed", "error");
        return;
      }

      toast("Specialization deleted successfully", "success");
      if (onSuccess) onSuccess(id); // Update UI state
      onClose(); // Close the modal
    } catch (err) {
      toast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-100 p-4 animate-in fade-in duration-300">
      
      {/* MODAL CARD */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-200 relative border border-slate-200">
        
        {/* TOP DANGER ACCENT */}
        <div className="h-1.5 bg-red-500 w-full" />

        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            {/* WARNING ICON */}
            <div className="bg-red-50 p-4 rounded-full text-red-600 mb-4 shadow-inner">
              <AlertTriangle size={32} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Remove Specialization?
            </h3>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Are you sure you want to delete this specialization? This action is permanent and will remove it from your services list.
            </p>
          </div>

          {/* ACTION BUTTON GRID */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={remove}
              disabled={loading}
              className="px-4 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:bg-red-300"
            >
              {loading ? (
                <>
                  <RefreshCcw size={18} className="animate-spin" />
                  Deleting
                </>
              ) : (
                "Yes, Delete"
              )}
            </button>
          </div>
        </div>

        {/* QUICK CLOSE ICON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}