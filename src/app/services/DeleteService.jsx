"use client";

import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function DeleteService({ id, onClose }) {
  const router = useRouter();

  const remove = async () => {
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    if (!res.ok) return toast("Delete failed", "error");

    toast("Service deleted");
    router.refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded">
        <p className="mb-4">Delete this service?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button onClick={remove} className="bg-red-600 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
