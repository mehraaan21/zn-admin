"use client";

import { toast } from "@/lib/toast";

export default function DeleteSpecialization({ id, onClose, onSuccess }) {
  const remove = async () => {
    try {
      const res = await fetch(`/api/specialization/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        toast(error.message || "Delete failed", "error");
        return;
      }

      toast("Specialization deleted successfully");
      if (onSuccess) onSuccess(id); // remove from UI
      onClose();
    } catch (err) {
      toast("Something went wrong", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-xl">
        <p className="mb-4">Are you sure you want to delete this specialization?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border px-3 py-1 rounded">
            Cancel
          </button>
          <button
            onClick={remove}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
