"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Upload, RefreshCcw } from "lucide-react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function AddTestimonialModal({ caseStudyId, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    feedback: "",
    image: null,
  });

  // IMAGE CHANGE
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  // SUBMIT
  const submit = async () => {
    if (!form.feedback || !form.image) {
      toast("Client feedback and image are required", "error");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("feedback", form.feedback);
      formData.append("case_study_id", caseStudyId);
      formData.append("image", form.image);

      // Using your API route pattern
      const res = await fetch(`/api/case-studies/${caseStudyId}/testimonials`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("data parse", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to add testimonial");
      }

      toast("Testimonial added successfully! 💬");
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">New Client Testimonial</h2>
          <button onClick={onClose} className="hover:text-red-500 transition">
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* IMAGE / CLIENT AVATAR */}
          <div className="space-y-3">
            <label className="font-semibold text-sm text-slate-600">
              Client Image
            </label>
            <div className="relative border-2 border-dashed rounded-xl p-6 flex items-center justify-center bg-gray-50 hover:border-purple-400 transition">
              {preview ? (
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={preview}
                    fill
                    alt="preview"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Upload className="mx-auto mb-2" size={32} />
                  Click to upload client photo
                </div>
              )}
              <label className="absolute inset-0 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
            </div>
          </div>

          {/* FEEDBACK */}
          <div className="space-y-2">
            <label className="font-semibold text-sm text-slate-600">
              Testimonial Feedback
            </label>
            <textarea
              placeholder="What did the client say about this project?"
              value={form.feedback}
              onChange={(e) => setForm({ ...form, feedback: e.target.value })}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none text-slate-700"
              rows={5}
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-slate-50 transition">
              Cancel
            </button>

            <button
              onClick={submit}
              disabled={loading}
              className="px-8 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 disabled:bg-purple-300 flex items-center gap-2 transition shadow-md"
            >
              {loading ? (
                <>
                  <RefreshCcw size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Publish Testimonial"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}