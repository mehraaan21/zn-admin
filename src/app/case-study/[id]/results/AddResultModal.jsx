"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Upload, RefreshCcw } from "lucide-react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function AddResultModal({ caseStudyId, onClose }) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    bullet_points: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // IMAGE CHANGE
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  // SUBMIT
  const submit = async () => {

    if (!form.title || !form.bullet_points || !form.image) {
      toast("All fields are required", "error");
      return;
    }

    try {
      setLoading(true);

   const formData = new FormData();

formData.append("title", form.title);
formData.append("case_study_id", caseStudyId);

form.bullet_points
  .split(",")
  .map(b => b.trim())
  .filter(Boolean)
  .forEach(point => {
    formData.append("bullet_points", point);
  });

formData.append("image", form.image);

      const res = await fetch(`/api/case-studies/${caseStudyId}/results`, {
        method: "POST",
        body: formData,
      });
      

     const data = await res.json();
console.log("Add Result API Response:", data);

if (!res.ok) {
  throw new Error(data.message || "Failed to add result");
}

      toast("Result added successfully 🚀");

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
          <h2 className="text-xl font-bold">
            Create Result
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* IMAGE */}
          <div className="space-y-3">
            <label className="font-semibold text-sm">
              Result Image
            </label>

            <div className="relative border-2 border-dashed rounded-xl p-6 flex items-center justify-center bg-gray-50 border-blue-200  hover:border-blue-500 transition">

              {preview ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden">
                  <Image
                    src={preview}
                    fill
                    alt=""
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Upload className="mx-auto mb-2" size={32} />
                  Click to upload image
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

          {/* TITLE */}
          <input
            placeholder="Result Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
          />

          {/* BULLETS */}
          <textarea
            placeholder="Bullet Points (comma separated)"
            value={form.bullet_points}
            onChange={(e) =>
              setForm({ ...form, bullet_points: e.target.value })
            }
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            rows={4}
          />

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-4 border-t">

            <button
              onClick={onClose}
              className="px-6 cursor-pointer py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={submit}
              disabled={loading}
              className="px-8 py-2.5 bg-blue-400 text-white cursor-pointer rounded-lg font-bold hover:bg-blue-500 disabled:bg-purple-300 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCcw size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Publish Result"
              )}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}