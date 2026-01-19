"use client";

import { toast } from "@/lib/toast";
import axios from "axios";
import { useState } from "react";

export default function DeleteConfirm({ id, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const remove = async () => {
    setLoading(true);

    const res = await axios.delete(`/api/testimonials/${id}`, {
      // method: "DELETE",
    });

    setLoading(false);

    if (!res.ok) {
      toast("Delete failed", "error");
      return;
    }

    toast("Testimonial deleted");
    setOpen(false);
    onSuccess?.();
  };

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={() => setOpen(true)}
        className="text-red-600 hover:underline text-sm"
      >
        Delete
      </button>

      {/* Confirm Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-4 w-80">
            <h3 className="font-semibold mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this testimonial?
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={remove}
                disabled={loading}
                className="bg-red-600 text-white px-3 py-1 rounded"
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
