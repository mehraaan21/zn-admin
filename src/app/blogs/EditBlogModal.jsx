"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function EditBlogModal({ blog, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    // IMPORTANT: backend usually expects _method=PUT
    formData.append("_method", "PUT");

    const res = await fetch(`/api/blogs/${blog.id}`, {
      method: "POST", // method override
      body: formData,
    });

    if (!res.ok) {
      toast("Failed to update blog", "error");
      setLoading(false);
      return;
    }

    toast("Blog updated");
    router.refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded w-[520px]"
      >
        <h2 className="text-lg font-bold mb-4">Edit Blog</h2>

        <input
          name="title"
          defaultValue={blog.title}
          className="input"
          required
        />

        <input
          name="slug"
          defaultValue={blog.slug}
          className="input"
          required
        />

        <textarea
          name="description"
          defaultValue={blog.description}
          className="input"
        />

        <input
          name="seo_title"
          defaultValue={blog.seo_title}
          className="input"
        />

        <input
          name="seo_keywords"
          defaultValue={blog.seo_keywords}
          className="input"
        />

        <textarea
          name="seo_description"
          defaultValue={blog.seo_description}
          className="input"
        />

        {/* Current image preview */}
        {blog.image_url && (
          <img
            src={blog.image_url}
            alt="Current"
            className="w-32 h-20 object-cover rounded mb-2"
          />
        )}

        {/* Optional new image */}
        <input type="file" name="image" />

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="border px-3 py-1 rounded"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
