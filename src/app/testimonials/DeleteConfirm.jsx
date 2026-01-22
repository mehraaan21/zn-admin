


"use client";

import { toast } from "@/lib/toast";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteConfirm({ id }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const remove = async () => {
    setLoading(true);
    try {
      // Calling your local Next.js API route
      const res = await axios.delete(`/api/testimonials/${id}`);

      if (res.status === 200) {
        toast("Testimonial deleted", "success");
        setOpen(false);
        router.refresh(); // Automatically refreshes the server component data
      }
    } catch (error) {
      toast(error.response?.data?.message || "Delete failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-red-600 cursor-pointer hover:underline text-sm"
      >
      
  <Trash2 size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-80 shadow-xl">
            <h3 className="font-semibold mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={remove}
                disabled={loading}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:bg-red-300"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}