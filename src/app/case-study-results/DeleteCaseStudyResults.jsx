"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function DeleteCaseStudyResults({ id, onClose }) {
  const router = useRouter();

  const remove = async () => {
    try {
      const res = await fetch(
        `/admin/case-study-challenges/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed");

      toast("Challenge deleted");
      router.refresh();
      onClose();
    } catch (err) {
      toast(err.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[380px]">
        <h2 className="font-bold text-lg mb-3">
          Delete Challenge
        </h2>

        <p className="mb-4 text-gray-600">
          Are you sure you want to delete this challenge?
        </p>

        <div className="flex justify-end gap-2">
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
