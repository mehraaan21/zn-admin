"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import {
  X,
  MessageSquare,
  Plus,
  Upload,
  User,
  Briefcase,
  Building2,
  RefreshCcw,
} from "lucide-react";
import Image from "next/image";
import RichTextEditor from "@/components/RichTextEditor";

export default function AddTestimonial() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    company: "",
    message: "",
    status: "active",
    image: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async () => {

    
    // Check if message is truly empty (RichTextEditor can return empty HTML)
    const messageIsEmpty = !form.message || form.message === "<p></p>" || form.message.trim() === "";
    
    if (!form.name || messageIsEmpty) {
      toast("Name & Message are required", "error");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("client_name", form.name);
      data.append("designation", form.designation);
      data.append("company", form.company);
      data.append("quote", form.message);
      data.append("status", form.status);

      if (form.image) {
        data.append("photo", form.image);
      }

      const res = await fetch("/api/testimonials", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add testimonial");
      }

      toast("Testimonial added successfully");
      
      // Reset form properly
      setForm({
        name: "",
        designation: "",
        company: "",
        message: "",
        status: "active",
        image: null,
      });
      setPreview(null);
      setOpen(false);
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
        Add Testimonial
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare className="text-blue-600" size={22} />
                Create Testimonial
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side: Profile Picture Upload */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700  items-center gap-1">
                    <Upload size={14} /> Client Photo
                  </label>
                  <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-all bg-gray-50 flex flex-col items-center justify-center min-h-160px">
                    {preview ? (
                      <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-md">
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
                        <div className="mx-auto bg-gray-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                          <User className="text-gray-400" size={32} />
                        </div>
                        <p className="text-xs text-gray-500 font-medium italic">
                          Click to upload avatar
                        </p>
                      </div>
                    )}
                    <label className="absolute inset-0 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Right Side: Identity Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <User size={14} /> Client Name
                    </label>
                    <input
                      className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700
      "
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <Briefcase size={14} /> Designation
                    </label>
                    <input
                      className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                      placeholder="CEO"
                      value={form.designation}
                      onChange={(e) =>
                        setForm({ ...form, designation: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <Building2 size={14} /> Company Name
                    </label>
                    <input
                      className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                      placeholder="Tech Solutions"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Full Width Message */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <MessageSquare size={14} /> Testimonial Quote
                </label>
                <RichTextEditor
                  value={form.message}
                  onChange={(content) =>
                    setForm({ ...form, message: content })
                  }
                />
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setForm({
                      name: "",
                      designation: "",
                      company: "",
                      message: "",
                      status: "active",
                      image: null,
                    });
                    setPreview(null);
                    setOpen(false);
                  }}
                  className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50 text-gray-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={submit}
                  disabled={loading}
                  className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCcw size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Testimonial"
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
