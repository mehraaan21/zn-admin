"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function AddBlogModal({ onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create blog");
      }

      toast("Blog created successfully");
      router.refresh();
      onClose();
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4">
          Add Blog
        </h2>

        <form onSubmit={submit} className="space-y-3">
          {/* ROW 1 */}
          <div className="grid grid-cols-2 gap-3">
            <input
              name="title"
              placeholder="Title"
              required
              className="border p-2 rounded"
            />

            <input
              name="slug"
              placeholder="Slug"
              required
              className="border p-2 rounded"
            />
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            rows={3}
            className="border p-2 w-full rounded"
          />

          {/* ROW 2 */}
          <div className="grid grid-cols-2 gap-3">
            <input
              name="seo_title"
              placeholder="SEO Title"
              className="border p-2 rounded"
            />

            <input
              name="seo_keywords"
              placeholder="SEO Keywords"
              className="border p-2 rounded"
            />
          </div>

          <textarea
            name="seo_description"
            placeholder="SEO Description"
            rows={2}
            className="border p-2 w-full rounded"
          />

          <input
            type="file"
            name="image"
            required
            className="border p-2 w-full rounded"
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-2">
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
              className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
