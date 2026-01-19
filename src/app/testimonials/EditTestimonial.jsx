"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function EditTestimonial({ testimonial, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    client_name: testimonial.client_name || "",
    designation: testimonial.designation || "",
    company: testimonial.company || "",
    quote: testimonial.quote || "",
    status: testimonial.status || "active",
    image: null, // Placeholder for the file object
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const update = async () => {
    if (!form.client_name || !form.quote) {
      toast("Name & message are required", "error");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("client_name", form.client_name);
      data.append("designation", form.designation);
      data.append("company", form.company);
      data.append("quote", form.quote);
      data.append("status", form.status);

      // Only append the photo if a new one was selected
      if (form.image) {
        data.append("photo", form.image);
      }

      const res = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: "PUT",
        body: data, 
        // Important: Fetch handles Content-Type for FormData automatically
      });

      if (!res.ok) {
        const err = await res.json();
        toast(err.message || "Update failed", "error");
        return;
      }

      toast("Testimonial updated successfully!");
      setOpen(false);
      router.refresh();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast("An unexpected error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 hover:underline text-sm"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit Testimonial</h2>

            <div className="space-y-3">
              <input
                className="border p-2 w-full rounded"
                placeholder="Client Name"
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
              />

              <input
                className="border p-2 w-full rounded"
                placeholder="Designation"
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
              />

              <input
                className="border p-2 w-full rounded"
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />

              <textarea
                className="border p-2 w-full rounded"
                placeholder="Message"
                rows={3}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
              />

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Update Photo (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm w-full"
                  onChange={handleFileChange}
                />
              </div>

              <select
                className="border p-2 w-full rounded"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button 
                onClick={() => setOpen(false)} 
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={update}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded font-medium disabled:bg-blue-300 transition-colors"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}