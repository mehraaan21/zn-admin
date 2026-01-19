"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function AddGallery({ onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        // ✅ capture backend validation errors
        if (data?.errors) {
          setErrors(data.errors);
        }
        throw new Error(data.message || "Upload failed");
      }

      toast("Image added successfully");
      router.refresh();
      onClose();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4">
          Add Gallery Image
        </h2>

        <form onSubmit={submit} className="space-y-4">
          {/* IMAGE */}
          <input
            type="file"
            name="image"
            required
            className="border p-2 w-full rounded"
          />

          {/* SEQUENCE */}
          <div>
            <input
              type="number"
              name="sequence"
              placeholder="Sequence"
              className="border p-2 w-full rounded"
            />
            {errors?.sequence && (
              <p className="text-sm text-red-600 mt-1">
                {errors.sequence.required}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-3 py-1.5 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-4 py-1.5 rounded disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Add Image"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
