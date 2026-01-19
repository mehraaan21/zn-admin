"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function AddSpecialization() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    bullet_points: "",
    icon: "",
    number: "",
    image: null,
  });

//  const submit = async () => {
//   if (!form.title || !form.description) {
//     toast("Title & Description are required", "error");
//     return;
//   }

//   const data = new FormData();
//   data.append("title", form.title);
//   data.append("description", form.description);
//   data.append("bullet_points", JSON.stringify(form.bullet_points.split(",").map(s => s.trim())));
//   data.append("icon", form.icon);
//   data.append("number", form.number);
//   if (form.image) data.append("image", form.image);

//   try {
//     setLoading(true);
//     const res = await fetch("/api/specialization", { method: "POST", body: data });
//     if (!res.ok) {
//       const err = await res.json();
//       throw new Error(err.message || "Failed to add specialization");
//     }

//     const newItem = await res.json();

//     toast("Specialization added successfully");
//     setOpen(false);
//     setForm({ title: "", description: "", bullet_points: "", icon: "", number: "", image: null });

//     if (onSuccess) onSuccess(newItem); // push to UI
//   } catch (error) {
//     toast(error.message, "error");
//   } finally {
//     setLoading(false);
//   }
// };



const submit = async () => {
  if (!form.title || !form.description) {
    toast("Title & Description are required", "error");
    return;
  }

  const data = new FormData();
  data.append("title", form.title);
  data.append("description", form.description);
  data.append(
    "bullet_points",
    JSON.stringify(form.bullet_points.split(",").map(s => s.trim()))
  );
  data.append("icon", form.icon);
  data.append("number", form.number);
  if (form.image) data.append("image", form.image);

  try {
    setLoading(true);

    const res = await fetch("/api/specialization", {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to add specialization");
    }

    toast("Specialization added successfully");

    setOpen(false);
    setForm({
      title: "",
      description: "",
      bullet_points: "",
      icon: "",
      number: "",
      image: null,
    });

    // ✅ REFRESH PAGE
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
        + Add Specialization
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">Add Specialization</h2>

            <input
              className="border p-2 w-full mb-2 rounded"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              className="border p-2 w-full mb-2 rounded"
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-2 rounded"
              placeholder="Bullet Points (comma separated)"
              value={form.bullet_points}
              onChange={(e) => setForm({ ...form, bullet_points: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-2 rounded"
              placeholder="Icon"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            />

            <input
              type="number"
              className="border p-2 w-full mb-2 rounded"
              placeholder="Order Number"
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
            />

            <input
              type="file"
              className="border p-2 w-full mb-4 rounded"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="border px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-1 rounded"
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
