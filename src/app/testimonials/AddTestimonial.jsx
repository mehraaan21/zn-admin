"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";


export default function AddTestimonial() {
    const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);


  

  const [form, setForm] = useState({
    name: "",
    designation: "",
    company: "",
    message: "",
    picture: "",
    status: "active",
  });

 const submit = async () => {
  if (!form.name || !form.message) {
    toast("Name & message are required", "error");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      throw new Error("Failed to add testimonial");
    }

    toast("Testimonial added successfully");
    setOpen(false);
    setForm({
      name: "",
      designation: "",
      company: "",
      message: "",
      picture: "",
      status: "active",
    });

    router.refresh();
  } catch (error) {
    toast(error.message || "Something went wrong", "error");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      {/* Add Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Testimonial
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded p-5">
            <h2 className="text-lg font-semibold mb-4">
              Add Testimonial
            </h2>

            <input
              className="border p-2 w-full mb-3"
              placeholder="Name"
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


             <input
                type="file"
                accept="image/*"
                className="border p-2 w-full mb-3"
                value={form.picture}
                onChange={(e) => {
                  setForm({ ...form, image: e.target.files?.[0] });
                  setUploadSuccess(true);
                
                }}
              />

              {uploadSuccess && (
                <p className="text-green-600 text-sm mb-3">
                  Image uploaded successfully ✅
                </p>
              )}

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
                onClick={submit}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
