
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { Trash2, AlertTriangle, X, RefreshCcw } from "lucide-react";

export default function DeleteConfirm({ id }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const remove = async () => {
    setLoading(true);
    try {
      // Calling local Next.js API route
      const res = await axios.delete(`/api/homes/${id}`);

      if (res.status === 200) {
        toast("Deleted successfully", "success");
        setOpen(false);
        router.refresh(); // Refresh server component data
      }
    } catch (error) {
      toast(error.response?.data?.message || "Delete failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TRIGGER BUTTON - Standardized with your other table actions */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 cursor-pointer active:scale-90"
        title="Delete Item"
      >
        <Trash2 size={18} />
      </button>

      {/* MODAL OVERLAY */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          
          {/* MODAL CARD */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-200">
            
            {/* TOP DECORATIVE STRIP */}
            <div className="h-1.5 bg-red-500 w-full" />

            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                {/* WARNING ICON */}
                <div className="bg-red-100 p-3 rounded-full text-red-600 mb-4">
                  <AlertTriangle size={32} />
                </div>

                <h3 className="text-xl font-bold text-gray-900">Are you sure?</h3>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                  Do you really want to delete this record? This process cannot be undone and the data will be permanently removed.
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                <button
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
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

            {/* CLOSE ICON (TOP RIGHT) */}
            <button 
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}