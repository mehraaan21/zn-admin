"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function DeleteGallery({ id, onClose }) {
  const router = useRouter();

  const remove = async () => {
    const res = await fetch(`/api/gallery/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast("Delete failed", "error");
      return;
    }

    toast("Deleted");
    onClose();
    router.refresh();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <p className="mb-4">Delete this image?</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={remove}
            className="bg-red-600 text-white px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
