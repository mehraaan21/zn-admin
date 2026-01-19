"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function EditCaseStudyResult({ result, onClose }) {
  const router = useRouter();

  const [title, setTitle] = useState(result.Title || "");
  const [points, setPoints] = useState(
    Array.isArray(result.bullet_points)
      ? result.bullet_points
      : []
  );
  const [loading, setLoading] = useState(false);

  const updatePoint = (index, value) => {
    const updated = [...points];
    updated[index] = value;
    setPoints(updated);
  };

  const submit = async () => {
    if (!title || points.some((p) => !p)) {
      toast("All fields are required", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/api/case-study-results/${result.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Title: title,
            bullet_points: points,
          }),
        }
      );

      if (!res.ok) throw new Error();

      toast("Results updated successfully");
      router.refresh();
      onClose();
    } catch {
      toast("Failed to update results", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[420px] max-h-[90vh] overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">Edit Results</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="space-y-2 mb-3">
          {points.map((point, index) => (
            <div key={index} className="flex gap-2">
              <input
                className="border p-2 w-full"
                placeholder={`Bullet point ${index + 1}`}
                value={point}
                onChange={(e) =>
                  updatePoint(index, e.target.value)
                }
              />
              <button
                onClick={() =>
                  setPoints(points.filter((_, i) => i !== index))
                }
                className="text-red-600 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPoints([...points, ""])}
          className="text-blue-600 text-sm mb-4"
        >
          + Add bullet point
        </button>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={submit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-60"
          >
            {loading ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
