"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import {
  X,
  Plus,
  Upload,
  Type,
  FileText,
  List,
  Hash,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import RichTextEditor from "@/components/RichTextEditor";

export default function AddSpecialization() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    bullet_points: "",
    number: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async () => {
    if (!form.title || !form.description) {
      toast("Title & Description are required", "error");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append(
        "bullet_points",
        JSON.stringify(form.bullet_points.split(",").map((s) => s.trim())),
      );
      data.append("number", form.number);
      if (form.image) data.append("image", form.image);

      const res = await fetch("/api/specialization", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add specialization");
      }

      toast("Specialization added successfully");
      setOpen(false);
      setForm({
        title: "",
        description: "",
        bullet_points: "",
        number: "",
        image: null,
      });
      setPreview(null);
      router.refresh();
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95 font-medium cursor-pointer"
      >
        <Plus size={20} />
        Add Specialization
      </button>

      {open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="text-blue-600" size={22} />
                New Specialization
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Upload Area */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 items-center gap-1">
                  <Upload size={14} /> Cover Image
                </label>
                <div className="relative group border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-blue-400 transition-all bg-slate-50 flex flex-col items-center justify-center min-h-160px">
                  {preview ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border shadow-sm">
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
                      <Upload
                        className="mx-auto text-slate-300 mb-2"
                        size={40}
                      />
                      <p className="text-sm text-slate-500 font-medium">
                        Upload service illustration
                      </p>
                    </div>
                  )}
                  <label className="absolute inset-0 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1 items-center gap-1">
                    <Type size={14} /> Service Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UI/UX Design"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1  items-center gap-1">
                    <List size={14} /> Bullet Points
                  </label>
                  {/* <input
                    type="text"
                    placeholder="Fast Delivery, User Centric, Modern UI (comma separated)"
                    value={form.bullet_points}
                    onChange={(e) =>
                      setForm({ ...form, bullet_points: e.target.value })
                    }
                    className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                  /> */}


                   <textarea
              className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
              placeholder="Enter each bullet point on comma seprated..."
              rows={4}
              value={form.bullet_points}
              onChange={(e) =>
                setForm({ ...form, bullet_points: e.target.value })
              }
            />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1 items-center gap-1">
                    <Hash size={14} /> Display Order
                  </label>
                  <input
                    type="number"
                    placeholder="1, 2, 3..."
                    value={form.number}
                    onChange={(e) =>
                      setForm({ ...form, number: e.target.value })
                    }
                    className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 items-center gap-1">
                  <FileText size={14} /> Description
                </label>
                
                <RichTextEditor
                  placeholder="Explain what this specialization includes..."
                  value={form.description || ""}
                  onChange={(content) =>
                    setForm((prev) => ({
                      ...prev,
                      description: content,
                    }))
                  }
                />
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={submit}
                  disabled={loading}
                  className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCcw size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Publish Service"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
