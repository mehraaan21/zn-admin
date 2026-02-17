"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import {
  X,
  Pencil,
  User,
  Briefcase,
  Building2,
  MessageSquare,
  Upload,
  RefreshCcw,
} from "lucide-react";
import Image from "next/image";
import RichTextEditor from "@/components/RichTextEditor";

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
    image: null,
  });

  const [preview, setPreview] = useState(
    testimonial.picture_url || "/placeholder.png",
  );

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file)); // Live preview logic
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
      // data.append("status", form.status);

      if (form.image) {
        data.append("photo", form.image);
      }

      const res = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: "PUT",
        body: data,
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
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
        title="Edit Testimonial"
      >
        <Pencil size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare className="text-blue-600" size={22} />
                Edit Testimonial
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Top Section: Client Info and Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
                      <User size={14} /> Client Name
                    </label>
                    <input
                      className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                      value={form.client_name}
                      onChange={(e) =>
                        setForm({ ...form, client_name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
                      <Briefcase size={14} /> Designation
                    </label>
                    <input
                      className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                      value={form.designation}
                      onChange={(e) =>
                        setForm({ ...form, designation: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1  items-center gap-1">
                      <Building2 size={14} /> Company
                    </label>
                    <input
                      className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Avatar Upload Area */}
                <div className="space-y-2 flex flex-col items-center justify-center">
                  <label className="text-sm font-semibold text-gray-700 self-start">
                    Client Photo
                  </label>
                  <div className="relative group h-32 w-32 border-2 border-dashed border-gray-200 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center hover:border-blue-400 transition-all">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                      <Upload size={20} className="mb-1" />
                      <span className="text-[10px] font-bold uppercase">
                        Change
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <p className="text-[10px] text-gray-400 italic">
                    Recommended: Square 1:1 ratio
                  </p>
                </div>
              </div>

              {/* Quote Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
                  <MessageSquare size={14} /> Testimonial Message
                </label>
             <RichTextEditor
              className="w-full border border-gray-300 rounded-xl p-3 shadow-sm outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
              value={form.quote || ""}
              onChange={(content) =>
                setForm((prev) => ({
                  ...prev,
                  quote: content,
                }))
              }
            />


                
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={update}
                  disabled={loading}
                  className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCcw size={18} className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
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
