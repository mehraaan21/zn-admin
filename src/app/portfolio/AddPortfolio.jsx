"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function AddPortfolio() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });

  const submit = async () => {
    if (!form.title || !form.category || !form.image) {
      toast("All fields required", "error");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("description", form.description);
    fd.append("image", form.image);
    
    console.log("FormData entries:");
    for (let pair of fd.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      setLoading(true);
      const res = await fetch("/api/portfolios", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to add portfolio");

      toast("Portfolio added");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast(err.message, "error");
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
        + Add Portfolio
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="font-bold mb-4">Add Portfolio</h2>

            <input
              className="border p-2 w-full mb-3"
              placeholder="Title"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-3"
              placeholder="Category"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <textarea
              className="border p-2 w-full mb-3"
              placeholder="Description"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              type="file"
              className="border p-2 w-full mb-4"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
            />

            <div className="flex justify-end gap-2">


              <button
               className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setOpen(false)}>
                Cancel
                </button>
              <button
                onClick={submit}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-1 rounded"
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
