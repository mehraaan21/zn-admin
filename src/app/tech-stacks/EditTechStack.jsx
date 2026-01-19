"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function EditTechStack({ tech, onClose }) {
  const router = useRouter();
  const [name, setName] = useState(tech.Name);
  const [category, setCategory] = useState(tech.Category);
  const [image, setImage] = useState(null);

  const submit = async () => {
    const fd = new FormData();
    fd.append("Name", name);
    fd.append("Category", category);
    if (image) fd.append("Image", image);

    try {
      const res = await fetch(`/api/techs/${tech.id}`, {
        method: "PUT",
        body: fd,
      });

      if (!res.ok) throw new Error("Update failed");

      toast("Updated successfully");
      onClose();
      router.refresh();
    } catch (err) {
      toast(err.message, "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="font-bold mb-4">Edit Tech Stack</h2>

        <input
          className="border p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="file"
          className="border p-2 w-full mb-4"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
