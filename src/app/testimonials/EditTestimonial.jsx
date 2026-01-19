"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";

export default function EditTestimonial({ testimonial, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: testimonial.client_name || "",
    designation: testimonial.designation || "",
    company: testimonial.company || "",
    message: testimonial.quote || "",
    status: testimonial.status || "active",
  });

  const update = async () => {
    if (!form.name || !form.message) {
      toast("Name & message are required", "error");
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/testimonials/${testimonial.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      toast("Update failed", "error");
      return;
    }

    toast("Testimonial updated");
    setOpen(false);
    onSuccess?.();
  };

  return (
    <>
      {/* Edit Button */}
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 hover:underline text-sm"
      >
        Edit
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded p-5">
            <h2 className="text-lg font-semibold mb-4">
              Edit Testimonial
            </h2>

            <input
              className="border p-2 w-full mb-3"
              placeholder="Client Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="border p-2 w-full mb-3"
              placeholder="Designation"
              value={form.designation}
              onChange={(e) =>
                setForm({ ...form, designation: e.target.value })
              }
            />

            <input
              className="border p-2 w-full mb-3"
              placeholder="Company"
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
            />

            <textarea
              className="border p-2 w-full mb-3"
              placeholder="Message"
              rows={4}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />

            <select
              className="border p-2 w-full mb-4"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={update}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
