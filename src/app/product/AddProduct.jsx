"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function AddProduct() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

 const [form, setForm] = useState({
  title: "",
  slug: "",
  website_url: "",
  category: "",
  description: "",
  image: null,
});

const submit = async () => {
  if (
    !form.title ||
    !form.slug ||
    !form.website_url ||
    !form.category ||
    !form.description ||
    !form.image
  ) {
    toast("All fields are required", "error");
    return;
  }

  try {
    setLoading(true);

    const data = new FormData(); // ✅ REQUIRED
    data.append("title", form.title);
    data.append("slug", form.slug);
  data.append("url", form.website_url);
    data.append("category", form.category);
    data.append("description", form.description);
    data.append("images", form.image);

    const res = await fetch("/api/products", {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to add product");
    }

    toast("Product added successfully");
    setOpen(false);

    setForm({
      title: "",
      slug: "",
      website_url: "",
      category: "",
      description: "",
      image: null,
    });

    router.refresh();
  } catch (error) {
    toast(error.message, "error");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded"
      >
        + Add Product
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded p-5 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Add Product</h2>

            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            

            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <textarea
              className="border p-2 w-full mb-3 rounded"
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
  className="border p-2 w-full mb-3 rounded"
  placeholder="Slug (e.g. smart-collect)"
  value={form.slug}
  onChange={(e) =>
    setForm({ ...form, slug: e.target.value })
  }
/>


            <input
  className="border p-2 w-full mb-3 rounded"
  placeholder="Website URL"
  value={form.website_url}
  onChange={(e) =>
    setForm({ ...form, website_url: e.target.value })
  }
/>

            <div className="mb-3">
              <label className="text-sm text-gray-500 mb-1 block">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="border p-1 w-full text-sm"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
              />
              {form.image && (
                <p className="text-green-600 text-xs mt-1">
                  Image selected: {form.image.name}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border cursor-pointer hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white px-4 py-1 rounded disabled:bg-blue-300"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
