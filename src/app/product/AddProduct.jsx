

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { X, Plus, Upload, Type, Globe, Layers, FileText, RefreshCcw } from "lucide-react";
import Image from "next/image";

export default function AddProduct() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    website_url: "",
    category: "",
    description: "",
    image: null,
  });

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async () => {
    if (!form.title || !form.website_url || !form.category || !form.description || !form.image) {
      toast("All fields are required", "error");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", form.title);
      // Auto-generating slug from title for the API call
      data.append("slug", form.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
      data.append("url", form.website_url);
      data.append("category", form.category);
      data.append("description", form.description);
      data.append("images", form.image);

      const res = await fetch("/api/products", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add product");
      }

      toast("Product added successfully");
      setOpen(false);
      setForm({ title: "", slug: "", website_url: "", category: "", description: "", image: null });
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
        Add Product
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Layers className="text-blue-600" size={22} />
                Create New Product
              </h2>
              <button 
                onClick={() => setOpen(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Upload Area */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                  <Upload size={14} /> Product Image
                </label>
                <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-all bg-gray-50 flex flex-col items-center justify-center min-h-[180px]">
                  {preview ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border shadow-sm">
                      <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto text-gray-300 mb-2" size={40} />
                      <p className="text-sm text-gray-500 font-medium">Click to upload product image</p>
                    </div>
                  )}
                  <label className="absolute inset-0 cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <Type size={14} /> Product Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <Layers size={14} /> Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fintech, SaaS"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <Globe size={14} /> Website URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourproduct.com"
                    value={form.website_url}
                    onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <FileText size={14} /> Description
                </label>
                <textarea
                  placeholder="Tell us about this product..."
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
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
                    "Publish Product"
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