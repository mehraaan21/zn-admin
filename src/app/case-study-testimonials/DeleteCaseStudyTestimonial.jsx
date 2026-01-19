"use client";

import { toast } from "@/lib/toast";

export default function DeleteCaseStudyTestimonial({ id, onClose }) {
  const remove = async () => {
    const res = await fetch(
      `/api/case-study-testimonials/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      toast("Delete failed", "error");
      return;
    }

    toast("Testimonial deleted");
    onClose();
    location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <p className="mb-4">Are you sure you want to delete this testimonial?</p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={remove}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
