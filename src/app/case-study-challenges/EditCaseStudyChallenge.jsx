"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function EditCaseStudyChallenge({ item, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    challenge: item.challenge || "",
    solution: item.solution || "",
  });

  const submit = async () => {
    if (!form.challenge || !form.solution) {
      toast("Challenge & Solution are required", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/admin/case-study-challenges/${item.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to update challenge");

      toast("Challenge updated successfully");
      router.refresh();
      onClose();
    } catch (err) {
      toast(err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[500px]">
        <h2 className="font-bold text-lg mb-4">Edit Challenge</h2>

        <textarea
          className="border p-2 w-full mb-3"
          rows={4}
          value={form.challenge}
          onChange={(e) =>
            setForm({ ...form, challenge: e.target.value })
          }
        />

        <textarea
          className="border p-2 w-full mb-4"
          rows={4}
          value={form.solution}
          onChange={(e) =>
            setForm({ ...form, solution: e.target.value })
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
