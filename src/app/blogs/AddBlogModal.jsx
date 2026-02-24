// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "@/lib/toast";
// import {
//   X,
//   Upload,
//   Type,
//   FileText,
//   Search,
//   Tag,
//   RefreshCcw,
//   Newspaper,
// } from "lucide-react";
// import Image from "next/image";
// import RichTextEditor from "@/components/RichTextEditor";

// export default function AddBlogModal({ onClose }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState(null);

//   // Handle image preview
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.target);

//     try {
//       const res = await fetch("/api/blogs", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to create blog");
//       }

//       toast("Blog created successfully");
//       router.refresh();
//       onClose();
//     } catch (error) {
//       toast(error.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
//               <Newspaper size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-slate-800">Add New Post</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-slate-400 hover:text-slate-600 transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <form onSubmit={submit} className="p-6 space-y-6">
//           {/* Main Content Section */}
//           <div className="space-y-4">
//             <h3 className="text-xs font-black text-blue-500 uppercase tracking-widest">
//               General Information
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
//                   <Type size={14} /> Blog Title
//                 </label>
//                 <input
//                   name="title"
//                   placeholder="Enter catchy title..."
//                   required
//                   className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
//                   <Tag size={14} /> Category
//                 </label>
//                 <input
//                   name="category"
//                   placeholder="e.g. Technology, Life"
//                   required
//                   className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
//                 <FileText size={14} /> Description
//               </label>

//               <textarea
//                 name="description"
//                 placeholder="Write a brief summary..."
//                 rows={3}
//                 required
//                 className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
//               />

//             </div>
//           </div>

//           {/* Image Upload Area */}
//           <div className="space-y-3">
//             <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
//               <Upload size={14} /> Featured Image
//             </label>
//             <div className="relative group border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:border-blue-400 transition-all bg-slate-50 flex flex-col items-center justify-center min-h-160px">
//               {preview ? (
//                 <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
//                   <Image
//                     src={preview}
//                     alt="Preview"
//                     fill
//                     className="object-cover"
//                     unoptimized
//                   />
//                 </div>
//               ) : (
//                 <div className="text-center">
//                   <Upload className="mx-auto text-slate-300 mb-2" size={40} />
//                   <p className="text-sm text-slate-500 font-medium">
//                     Click to upload cover image
//                   </p>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 name="image"
//                 required
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 onChange={handleImageChange}
//               />
//             </div>
//           </div>

//           {/* SEO Section */}
//           <div className="space-y-4 pt-4 border-t border-slate-100">
//             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//               <Search size={14} /> SEO Metadata (Optional)
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 name="seo_title"
//                 placeholder="SEO Meta Title"
//                 className="border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
//               />
//               <input
//                 name="seo_keywords"
//                 placeholder="SEO Keywords (comma separated)"
//                 className="border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
//               />
//             </div>

//             <textarea
//               name="seo_description"
//               placeholder="SEO Meta Description"
//               rows={2}
//               className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
//             />
//           </div>

//           {/* Footer Actions */}
//           <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors text-slate-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-8 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center gap-2 active:scale-95"
//             >
//               {loading ? (
//                 <>
//                   <RefreshCcw size={18} className="animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 "Publish Blog"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import {
  X,
  Upload,
  Type,
  FileText,
  Search,
  Tag,
  RefreshCcw,
  Newspaper,
  ChevronDown,
  Tags,
} from "lucide-react";
import Image from "next/image";
import RichTextEditor from "@/components/RichTextEditor";

export default function AddBlogModal({ onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // ✅ Fetch categories from API on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/blog-categories"); // ← your categories endpoint
        const data = await res.json();
        // Handle both { data: [...] } and [...] response shapes
        setCategories(data.data || data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        toast("Failed to load categories", "error");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    // ✅ Validate description
    if (
      !description ||
      description.trim() === "" ||
      description === "<p></p>"
    ) {
      toast("Blog content is required", "error");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("description", description);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create blog");
      }

      toast("Blog created successfully");
      router.refresh();
      onClose();
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Newspaper size={22} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Add New Post</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-blue-500 uppercase tracking-widest">
              General Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                  <Type size={14} /> Blog Title
                </label>
                <input
                  name="title"
                  placeholder="Enter catchy title..."
                  required
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
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

            {/* Blog Content */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                <FileText size={14} /> Blog Content
                <span className="text-red-500 ml-1">*</span>
              </label>
              <RichTextEditor
                value={description}
                onChange={(val) => setDescription(val)}
              />
              {(!description ||
                description.trim() === "" ||
                description === "<p></p>") && (
                <p className="text-xs text-red-400 mt-1">Content is required</p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              <Upload size={14} /> Featured Image
            </label>
            <div className="relative group border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:border-blue-400 transition-all bg-slate-50 flex flex-col items-center justify-center min-h-140">
              {preview ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
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
                  <Upload className="mx-auto text-slate-300 mb-2" size={40} />
                  <p className="text-sm text-slate-500 font-medium">
                    Click to upload cover image
                  </p>
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* SEO Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Search size={14} /> SEO Metadata (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="seo_title"
                placeholder="SEO Meta Title"
                className="border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              />
              <input
                name="seo_keywords"
                placeholder="SEO Keywords (comma separated)"
                className="border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              />
            </div>
            <textarea
              name="seo_description"
              placeholder="SEO Meta Description"
              rows={2}
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center gap-2 active:scale-95"
            >
              {loading ? (
                <>
                  <RefreshCcw size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Publish Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
