"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import {
  X,
  Upload,
  Hash,
  RefreshCcw,
  ImageIcon,
  Image as LucideImage,
} from "lucide-react";
import Image from "next/image";

export default function AddGallery({ onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.errors) {
          setErrors(data.errors);
        }
        throw new Error(data.message || "Upload failed");
      }

      toast("Image added to gallery successfully", "success");
      router.refresh();
      onClose();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-linear-to-r from-slate-50 to-white relative overflow-hidden">
          <div className="absolute top-10px left-10px w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-60" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 text-white">
              <LucideImage size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              Add Gallery Image
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-full"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-6">
          {/* IMAGE UPLOAD AREA */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700 items-center gap-1">
              <Upload size={14} /> Select Visual Asset
            </label>
            <div className="relative group border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:border-blue-400 transition-all bg-slate-50 flex flex-col items-center justify-center min-h-[200px]">
              {preview ? (
                <div className="relative w-full aspect-square max-h-[250px] rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon
                    className="mx-auto text-slate-300 mb-2"
                    size={48}
                  />
                  <p className="text-sm text-slate-500 font-medium">
                    Click to upload image
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">
                    PNG, JPG, or WEBP
                  </p>
                </div>
              )}
              <input
                type="file"
                name="image"
                required
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* SEQUENCE INPUT */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700 items-center gap-1">
              <Hash size={14} /> Display Sequence
            </label>
            <input
              type="number"
              name="sequence"
              placeholder="e.g. 1"
              className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm ${
                errors?.sequence ? "border-red-500" : "border-slate-200"
              }`}
            />
            {errors?.sequence && (
              <p className="text-[11px] font-bold text-red-600 mt-1 uppercase tracking-tighter">
                {errors.sequence.required}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors text-slate-600 cursor-pointer active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-slate-200 hover:bg-blue-600 disabled:bg-slate-400 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCcw size={18} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                "Add to Gallery"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
