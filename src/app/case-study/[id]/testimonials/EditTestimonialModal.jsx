"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Upload, RefreshCcw, Save } from "lucide-react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditTestimonialModal({ testimonial, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    feedback: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // PRE-FILL DATA
  useEffect(() => {
    if (testimonial) {
      setForm({
        feedback: testimonial.feedback || "",
        image: null, // Keep null unless user changes it
      });
      setPreview(testimonial.image_url);
    }
  }, [testimonial]);

  // IMAGE CHANGE
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  // SUBMIT (UPDATE)
  const submit = async () => {
    if (!form.feedback) {
      toast("Feedback is required", "error");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("case_study_id", testimonial.CaseStudyID);
      formData.append("feedback", form.feedback);

      // Only append image if a new file was selected
      if (form.image) {
        formData.append("image", form.image);
      }

      // Add this inside your submit function to debug
console.log("Full Testimonial Object:", testimonial);

// Update your fetch URL to be more robust:
const caseId = testimonial.CaseStudyID || testimonial.case_study_id;

if (!caseId) {
    toast("Error: Case Study ID is missing", "error");
    return;
}

const res = await fetch(`/api/case-studies/${caseId}/testimonials/${testimonial.id}`, {
  method: "PUT",
  body: formData,
});

    //   // Using the standard update pattern
    //   const res = await fetch(
    //     `/api/case-studies/${testimonial.CaseStudyID}/testimonials/${testimonial.id}`,
    //     {
    //       method: "PUT",
    //       body: formData,
    //     },
    //   );

      const data = await res.json();
      console.log("edit data", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to update testimonial");
      }

      toast("Testimonial updated successfully ✨");
      router.refresh();
      onClose();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Edit Testimonial
            </h2>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">
              Updating ID: #{testimonial.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* IMAGE SECTION */}
          <div className="space-y-4">
            <label className="font-bold text-sm text-slate-700 flex items-center gap-2">
              <Upload size={16} className="text-blue-500" />
              Update Client Photo
            </label>

            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 shrink-0">
                {preview ? (
                  <Image
                    src={preview}
                    fill
                    alt="Current client"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    👤
                  </div>
                )}
              </div>

              <div className="flex-1">
                <label className="inline-block px-4 py-2 border-2 border-purple-100 text-blue-600 rounded-xl font-bold text-sm cursor-pointer hover:bg-purple-50 transition">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImage}
                  />
                </label>
                <p className="text-[10px] text-slate-400 mt-2">
                  Recommended: Square image, minimum 400x400px.
                </p>
              </div>
            </div>
          </div>

          {/* FEEDBACK SECTION */}
          <div className="space-y-3">
            <label className="font-bold text-sm text-slate-700">
              Client Feedback
            </label>
           <RichTextEditor
  placeholder="Update the client's feedback here..."
  value={form.feedback || ""}
  onChange={(value) =>
    setForm((prev) => ({
      ...prev,
      feedback: value,
    }))
  }
  className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
  rows={6}
/>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-5 py-2.5 font-bold text-slate-400 border-2 cursor-pointer rounded-2xl hover:text-slate-600 transition"
            >
              Discard Changes
            </button>

            <button
              onClick={submit}
              disabled={loading}
              className="px-8 py-2.5 bg-blue-500 text-white cursor-pointer rounded-2xl font-bold hover:bg-blue-600 disabled:bg-slate-300 flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              {loading ? (
                <>
                  <RefreshCcw size={18} className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
