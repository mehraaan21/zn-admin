"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";

export default function EditCaseStudyTestimonial({ item, onClose }) {
  const [feedback, setFeedback] = useState(item.feedback);
  const [loading, setLoading] = useState(false);

  const updateTestimonial = async () => {
    setLoading(true);

    const res = await fetch(
      `/api/case-study-testimonials/${item.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      toast("Update failed", "error");
      return;
    }

    toast("Testimonial updated");
    onClose();
    location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Testimonial</h2>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={5}
          className="border p-2 w-full mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={updateTestimonial}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
