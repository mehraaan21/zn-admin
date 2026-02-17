"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
// import CustomEditor from "@/components/Editor";
import {
  Pencil,
  X,
  Layout,
  Upload,
  RefreshCcw,
  Type,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditHome({ home, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    title: home.title || "",
    description: home.description || "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setForm({ ...form, images: files });

      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const update = async () => {
    if (!form.title || !form.description) {
      toast.error("Title and Description are required");
      return;
    }

    setLoading(true);

    try {
      // EditHome.js
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);

      if (form.images.length > 0) {
        form.images.forEach((file) => {
          // Check if it's a valid file object
          if (file instanceof File) {
            data.append("images[]", file); // Key must have []
          }
        });
      }

      const res = await fetch(`/api/homes/${home.id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Update failed");
        return;
      }

      toast.success("Home updated successfully!");
      setOpen(false);
      router.refresh();
      onSuccess?.();
    } catch (error) {
      console.error("Client Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
        title="Edit Home Item"
      >
        <Pencil size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6  border-b bg-white sticky top-0 z-10">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Layout className="text-blue-600" size={22} />
                Edit Home Banner
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Existing Images Preview Section */}
              {home.image_url && home.image_url.length > 0 && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 items-center gap-1">
                    <ImageIcon size={14} /> Current Images
                  </label>
                  <div className="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    {home.image_url.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-md overflow-hidden border shadow-sm"
                      >
                        <Image
                          src={url}
                          alt={`Current banner ${idx}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Title Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1  items-center gap-1">
                  <Type size={14} /> Banner Title
                </label>
                <input
                  className="
        w-full
        border border-gray-300
        rounded-xl
        p-3
        shadow-sm
        outline-none
        resize-none
        transition-all
        focus:ring-2
        focus:ring-blue-500
        focus:border-blue-500
        hover:border-gray-400
        text-gray-700
      "
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-1">
                  <FileText size={14} /> Description
                </label>

                <div className="relative">

                <RichTextEditor
                    placeholder="Write banner description..."
                    value={form.description || ""}
                    onChange={(content) =>
                      setForm((prev) => ({
                        ...prev,
                        description: content,
                      }))
                    }
                  />
                </div>
              </div>

              {/* New Image Upload Area */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700  items-center gap-1">
                  <Upload size={14} /> Upload New Images
                </label>

                <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-all bg-gray-50 flex flex-col items-center justify-center">
                  {previewImages.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2 w-full mb-4">
                      {previewImages.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative h-20 w-full rounded-lg overflow-hidden border"
                        >
                          <Image
                            src={src}
                            className="h-full w-full object-cover"
                            alt="New upload preview"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload
                        className="mx-auto text-gray-300 mb-2"
                        size={32}
                      />
                      <p className="text-sm text-gray-500">
                        Click to replace or add images
                      </p>
                    </div>
                  )}

                  <label className="absolute inset-0 cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50 text-gray-600 cursor-pointer"
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
