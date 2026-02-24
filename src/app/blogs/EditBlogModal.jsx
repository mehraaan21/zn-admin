"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { X, Upload, Globe, FileText, Search, Tags } from "lucide-react"; // Icons for UI
import RichTextEditor from "@/components/RichTextEditor";

export default function EditBlogModal({ blog, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(blog.image_url);

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
    formData.append("_method", "PUT"); // Laravel-safe

    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      toast("Blog updated successfully");
      router.refresh();
      onClose();
    } catch (error) {
      toast(error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-blue-600" />
            Edit Blog Post
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-6">
          {/* Main Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Blog Title
                </label>
                <input
                  name="title"
                  defaultValue={blog.title}
                  className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1  items-center gap-1">
                  <Globe size={14} /> URL Slug
                </label>
                <input
                  name="slug"
                  defaultValue={blog.slug}
                  className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                  required
                />
              </div>


               <div className="space-y-1">
                              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                                <Tags size={14} /> Category
                              </label>
              
                              {/* ✅ Category Dropdown */}
                              <select
                                name="blog_category_id"
                                required
                                defaultValue=""
                                className="w-full appearance-none border border-slate-200 rounded-xl p-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white text-slate-700"
                              >
                                <option value="" disabled>
                                  Select a category
                                </option>
              
                                <option value={1}>AI & ML</option>
                                <option value={2}>Development</option>
                                <option value={3}>Security</option>
                                <option value={4}>Data Science</option>
                              </select>
                            </div>


            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Cover Image
              </label>
              <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-2 hover:border-blue-400 transition-colors">
                <img
                  src={preview || "/placeholder.png"}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer text-white text-sm font-medium">
                  <Upload size={20} className="text-center p-5" /> Change Image
                  <input
                    type="file"
                    name="image" // 👈 REQUIRED
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Content Description
            </label>

            <RichTextEditor
              name="description"
              defaultValue={blog.description}
              rows={4}
            />

          </div>

          {/* SEO Section */}
          <div className="bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 flex items-center gap-2 uppercase tracking-wider">
              <Search size={16} /> SEO Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">
                  SEO Title
                </label>
                <input
                  name="seo_title"
                  defaultValue={blog.seo_title}
                  className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">
                  Keywords
                </label>
                <input
                  name="seo_keywords"
                  defaultValue={blog.seo_keywords}
                  className="  w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">
                SEO Meta Description
              </label>

              <textarea
                name="seo_description"
                defaultValue={blog.seo_description}
                rows={2}
                className="   w-full   border border-gray-300   rounded-xl   p-3   shadow-sm   outline-none   resize-none  transition-all  focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
              />
              
            </div>
          </div>

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
              className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:bg-blue-300 transition-all active:scale-95"
            >
              {loading ? "Saving Changes..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
