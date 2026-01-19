"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function AddService() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: null, // FILE
  });

  const submit = async () => {
    if (!form.title || !form.description || !form.icon) {
      toast("All fields are required", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("icon", form.icon); // FILE

    try {
      setLoading(true);

      const res = await fetch("/api/services", {
        method: "POST",
        body: formData, // ✅ NO headers
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add service");
      }

      toast("Service added successfully");
      setOpen(false);
      setForm({ title: "", description: "", icon: null });
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
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Service
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded p-5 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
              Add Our Service
            </h2>

            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              className="border p-2 w-full mb-3 rounded"
              placeholder="Description"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            {/* FILE INPUT */}
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full mb-4 rounded"
              onChange={(e) =>
                setForm({ ...form, icon: e.target.files[0] })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-1 rounded disabled:bg-blue-300"
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
