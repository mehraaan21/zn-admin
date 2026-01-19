"use client";

import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function DeleteProduct({ id, onClose }) {
  const router = useRouter();

  const remove = async () => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast("Delete failed", "error");
      return;
    }

    toast("Product deleted");
    onClose();
    router.refresh();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-xl">
        <p className="mb-4">Are you sure?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border px-3 py-1 rounded">
            Cancel
          </button>
          <button onClick={remove} className="bg-red-600 text-white px-4 py-1 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
