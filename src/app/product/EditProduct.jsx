"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import {
  X,
  Upload,
  ShoppingBag,
  Tag,
  FileText,
  RefreshCcw,
  Type,
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditProduct({ product, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(
    product.image_url || "/placeholder.png",
  );

  const [form, setForm] = useState({
    title: product.title,
    description: product.description,
    category: product.category,
    image: null,
  });

  // Handle live image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    try {
      setLoading(true);

      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast("Product updated successfully");
      onClose();
      router.refresh();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="text-blue-600" size={22} />
            Edit Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Top Section: Title, Category and Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
                  <Type size={14} /> Product Title
                </label>
                <input
                  className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
                  <Tag size={14} /> Category
                </label>
                <input
                  className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Image Upload Area with Preview */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Product Image
              </label>
              <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-2 hover:border-blue-400 transition-all bg-gray-50 flex items-center justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-32 object-contain rounded-lg shadow-sm"
                />
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white rounded-lg">
                  <Upload size={20} className="mb-1" />
                  <span className="text-xs font-bold uppercase">
                    Change Image
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1  items-center gap-1">
              <FileText size={14} /> Description
            </label>
            {/* <RichTextEditor
                          rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            /> */}

                          <RichTextEditor
              placeholder="Tell us about this product..."
              value={form.description}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  description: value,
                }))
              }
              className="w-full min-h-[180px] rounded-xl border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-600 cursor-pointer"
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
  );
}
