"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";

export default function OpeningForm({ initialData, onClose, onSuccess }) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      position: "",
      opening: "",
      description: "",
      status: "active",
    }
  );

  const isEdit = !!initialData;

  // const submit = async () => {
  //   const res = await fetch(
  //     isEdit ? `/opening/${initialData.id}` : "opening",
  //     {
  //       method: isEdit ? "PUT" : "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(form),
  //     }
  //   );

  //   if (!res.ok) {
  //     toast("Operation failed", "error");
  //     return;
  //   }

  //   toast(isEdit ? "Job updated" : "Job added");
  //   onSuccess();
  //   onClose();
  // };



  const submit = async () => {
  const url = isEdit
    ? `/api/openings/${initialData.id}`
    : `/api/openings`;

  const res = await fetch(url, {
    method: isEdit ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    toast("Operation failed", "error");
    return;
  }

  toast(isEdit ? "Job updated" : "Job added");
  onSuccess();
  onClose();
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="font-bold mb-2">
          {isEdit ? "Edit Job" : "Add Job"}
        </h2>

        {["title", "position", "description"].map((f) => (
          <input
            key={f}
            placeholder={f}
            className="border p-2 w-full mb-2"
            value={form[f]}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
          />
        ))}

        <input
          type="number"
          className="border p-2 w-full mb-2"
          value={form.opening}
          onChange={(e) =>
            setForm({ ...form, opening: Number(e.target.value) })
          }
        />

        <select
          className="border p-2 w-full mb-3"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button className="bg-blue-600 text-white px-3 py-1" onClick={submit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
