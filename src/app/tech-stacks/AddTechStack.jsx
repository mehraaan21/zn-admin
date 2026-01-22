    
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function AddTechStack() {
  const router = useRouter();
  const fileRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    image: null,
  });

  const resetForm = () => {
    setForm({ name: "", category: "", image: null });
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = async () => {
    if (loading) return;

    if (!form.name || !form.category || !form.image) {
      toast("All fields required", "error");
      return;
    }

   const fd = new FormData();
fd.append("name", form.name);
fd.append("category", form.category);
fd.append("image", form.image);

// comments
console.log("FormData entries:");
for (let pair of fd.entries()) {
  console.log(pair[0] + ": " + pair[1]);
}


    try {
      setLoading(true);

      const res = await fetch("/api/tech-stacks", {
        method: "POST",
        body: fd,
      });

      

      if (!res.ok) throw new Error("Failed to add tech stack");

      toast("Tech stack added successfully");
      resetForm();
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast(err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Tech
       </button>
      </>


      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="font-bold mb-4">Add Tech Stack</h2>

            <input
              className="border p-2 w-full mb-3"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="border p-2 w-full mb-3"
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <input
              ref={fileRef}
              type="file"
              className="border p-2 w-full mb-4"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files?.[0] })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
              >
                Cancel
              </button>

              <button
                onClick={submit}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-60"
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
