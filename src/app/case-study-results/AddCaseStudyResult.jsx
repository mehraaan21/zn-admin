"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function AddCaseStudyResult({ caseStudyId, onClose }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [points, setPoints] = useState([""]);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!title || points.some(p => !p)) {
      toast("All fields required", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/api/case-studies/${caseStudyId}/results`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Title: title,
            bullet_points: points,
          }),
        }
      );

      if (!res.ok) throw new Error();

      toast("Results added");
      router.refresh();
      onClose();
    } catch {
      toast("Failed to add results", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="font-bold mb-4">Add Results</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {points.map((p, i) => (
          <input
            key={i}
            className="border p-2 w-full mb-2"
            placeholder={`Bullet point ${i + 1}`}
            value={p}
            onChange={(e) => {
              const copy = [...points];
              copy[i] = e.target.value;
              setPoints(copy);
            }}
          />
        ))}

        <button
          onClick={() => setPoints([...points, ""])}
          className="text-sm text-blue-600 mb-3"
        >
          + Add point
        </button>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
