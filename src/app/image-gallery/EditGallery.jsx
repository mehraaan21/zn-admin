"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { X, Upload, Image as ImageIcon, RefreshCcw } from "lucide-react";

export default function EditGallery({ item, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(item.image_url);

  // Handle live image preview when a new file is selected
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch(`/api/gallery/${item.id}`, {
        method: "PUT", // Often used with _method append for file uploads
        body: formData,
      });

      if (!res.ok) {
        toast("Update failed", "error");
        return;
      }

      toast("Gallery updated successfully");
      onClose();
      router.refresh();
    } catch (error) {
      toast("An unexpected error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header - Consistent with previous modern UI updates */}
        <div className="flex justify-between items-center p-6 border-b bg-white">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ImageIcon className="text-blue-600" size={22} />
            Edit Gallery Image
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-6">
          {/* Image Preview and Upload Area */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Image Preview
            </label>
            <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-2 hover:border-blue-400 transition-all bg-gray-50">
              <img
                src={preview || "/placeholder.png"}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg shadow-sm"
              />
              <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer text-white">
                <Upload size={28} className="mb-2" />
                <span className="text-sm font-bold">Replace Image</span>
                <input
                  type="file"
                  name="image"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>
            <p className="text-xs text-gray-400 text-center italic">
              Click the image to upload a new version
            </p>
          </div>

          {/* If your gallery has sequence/order, you can add it here as well */}
          {item.sequence !== undefined && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Display Order (Sequence)
              </label>
              <input
                type="number"
                name="sequence"
                defaultValue={item.sequence}
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCcw size={18} className="animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Image"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
