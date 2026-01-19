"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function EditSpecialization({ data, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: data.title,
    description: data.description,
    bullet_points: data.bullet_points?.join("\n") || "",
    icon: data.icon || "",
    number: data.number || "",
    image: null,
  });

  const submit = async () => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append(
      "bullet_points",
      JSON.stringify(form.bullet_points.split("\n"))
    );
    fd.append("icon", form.icon);
    fd.append("number", form.number);
    if (form.image) fd.append("image", form.image);

    try {
      setLoading(true);
      const res = await fetch(`/api/ourspecialization/${data.id}`, {
        method: "PUT",
        body: fd,
      });

      if (!res.ok) throw new Error("Update failed");

      toast("Updated successfully");
      onClose();
      router.refresh();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[420px] space-y-3">
        <h2 className="font-bold text-lg">Edit Specialization</h2>

        <input
          className="border p-2 w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="border p-2 w-full"
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <textarea
          className="border p-2 w-full"
          rows={3}
          value={form.bullet_points}
          onChange={(e) =>
            setForm({ ...form, bullet_points: e.target.value })
          }
        />

        <input
          className="border p-2 w-full"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          type="number"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
        />

        <input
          type="file"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
