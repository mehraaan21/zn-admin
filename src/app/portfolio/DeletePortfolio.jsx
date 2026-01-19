"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function DeletePortfolio({ id, onClose }) {
  const router = useRouter();

  const remove = async () => {
    try {
      const res = await fetch(`/api/portfolios/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast("Portfolio deleted");
      onClose();
      router.refresh();
    } catch (err) {
      toast(err.message, "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-80 text-center">
        <h2 className="font-bold mb-4">Delete Portfolio?</h2>
        <p className="mb-4 text-sm text-gray-600">
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-3">
          <button onClick={onClose}>Cancel</button>
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
