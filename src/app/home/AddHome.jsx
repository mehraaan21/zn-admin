// // "use client";

// // import { useState } from "react";
// // import { toast } from "@/lib/toast";
// // import { useRouter } from "next/navigation";
// // import {
// //   X,
// //   Layout,
// //   Plus,
// //   Upload,
// //   Type,
// //   FileText,
// //   CheckCircle2,
// //   RefreshCcw,
// // } from "lucide-react";
// // import Image from "next/image";
// // import RichTextEditor from "@/components/RichTextEditor";

// // export default function AddHome() {
// //   const router = useRouter();
// //   const [open, setOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [ publicBanner, setpublicBanner] = useState(false) ;

// //   // Form state
// //   const [form, setForm] = useState({
// //     title: "",
// //     description: "",
// //     images: null,
// //   });

// //   const [previews, setPreviews] = useState([]);

// //   const handleFileChange = (e) => {
// //     if (e.target.files) {
// //       const files = Array.from(e.target.files);
// //       setForm({ ...form, images: e.target.files });

// //       // Generate preview URLs
// //       const previewUrls = files.map((file) => URL.createObjectURL(file));
// //       setPreviews(previewUrls);
// //     }
// //   };

// //   // const submit = async () => {
// //   //   if (
// //   //     !form.title ||
// //   //     !form.description ||
// //   //     !form.images ||
// //   //     form.images.length === 0
// //   //   ) {
// //   //     toast("Title, Description & Image are required", "error");
// //   //     return;
// //   //   }

// //   //   try {
// //   //     setLoading(true);
// //   //     const formData = new FormData();
// //   //     formData.append("title", form.title);
// //   //     formData.append("description", form.description);

// //   //     Array.from(form.images).forEach((file) => {
// //   //       formData.append("images[]", file);
// //   //     });

// //   //     const res = await fetch("/api/homes", {
// //   //       method: "POST",
// //   //       body: formData,
// //   //     });

// //   //     if (!res.ok) {
// //   //       const err = await res.json();
// //   //       throw new Error(err.message || "Failed to add home");
// //   //     }

// //   //     toast("Home banner added successfully");
// //   //     setOpen(false);
// //   //     setForm({ title: "", description: "", images: null });
// //   //     setPreviews([]);
// //   //     router.refresh();
// //   //   } catch (error) {
// //   //     toast(error.message, "error");
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };

// //   const submit = async () => {
// //   // ... validation check ...

// //   try {
// //     setLoading(true);
// //     const formData = new FormData();
// //     formData.append("title", form.title);
// //     formData.append("description", form.description);

// //     // FIX: Ensure you are appending to the correct key.
// //     // Most PHP/Laravel backends expect 'images[]'
// //     // Most Node.js backends expect 'images'
// //     Array.from(form.images).forEach((file) => {
// //       formData.append("images", file); // Or "images[]" depending on backend
// //     });

// //     const res = await fetch("/api/homes", {
// //       method: "POST",
// //       body: formData,
// //     });

// //     const result = await res.json();

// //     if (!res.ok) {
// //       // This will now show you the validation message from the backend
// //       throw new Error(result.message || "Failed to add home");
// //     }

// //     toast.success("Home banner added successfully");
// //     // ... rest of success logic ...
// //   } catch (error) {
// //     toast.error(error.message);
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   return (
// //     <>
// //       <button
// //         onClick={() => setOpen(true)}
// //         className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95 font-medium cursor-pointer"
// //       >
// //         <Plus size={20} />
// //         Add Home
// //       </button>

// //       {open && (
// //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
// //             {/* Header */}
// //             <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10">
// //               <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
// //                 <Layout className="text-blue-600" size={22} />
// //                 Create Home
// //               </h2>
// //               <button
// //                 onClick={() => setOpen(false)}
// //                 className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
// //               >
// //                 <X size={24} />
// //               </button>
// //             </div>

// //             <div className="p-6 space-y-6">
// //               {/* Image Upload Area - Modern & Multi-Preview */}
// //               <div className="space-y-3">
// //                 <label className="block text-sm font-semibold text-gray-700 items-center gap-1">
// //                   <Upload size={14} /> Banner Images
// //                 </label>
// //                 <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-all bg-gray-50 flex flex-col items-center justify-center min-h-160px">
// //                   {previews.length > 0 ? (
// //                     <div className="grid grid-cols-3 gap-3 w-full">
// //                       {previews.map((url, idx) => (
// //                         <div
// //                           key={idx}
// //                           className="relative aspect-video rounded-lg overflow-hidden border shadow-sm"
// //                         >
// //                           {/* Next.js Optimized Image */}
// //                           <Image
// //                             src={url}
// //                             alt={`Preview ${idx}`}
// //                             fill
// //                             className="object-cover"
// //                             unoptimized // Required for blob/local URLs to prevent external loader errors
// //                           />
// //                         </div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <div className="text-center">
// //                       <Upload
// //                         className="mx-auto text-gray-300 mb-2"
// //                         size={40}
// //                       />
// //                       <p className="text-sm text-gray-500 font-medium">
// //                         Click to upload multiple images
// //                       </p>
// //                       <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
// //                         JPG, PNG or WEBP
// //                       </p>
// //                     </div>
// //                   )}
// //                   <label className="absolute inset-0 cursor-pointer">
// //                     <input
// //                       type="file"
// //                       multiple
// //                       accept="image/*"
// //                       className="hidden"
// //                       onChange={handleFileChange}
// //                     />
// //                   </label>
// //                 </div>
// //               </div>
// //               {/* Title */}
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
// //                   <Type size={14} /> Banner Title
// //                 </label>
// //                 <input
// //                   type="text"
// //                   placeholder="Enter main heading"
// //                   value={form.title}
// //                   onChange={(e) => setForm({ ...form, title: e.target.value })}
// //                   className=" w-full   border border-gray-300 rounded-xl p-3 shadow-sm outline-none   resize-none  transition-all focus:ring-2  focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 text-gray-700"
// //                 />
// //               </div>
// //               {/* </div> */}

// //               {/* Description */}
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
// //                   <FileText size={14} /> Description
// //                 </label>

// //              <RichTextEditor
// //                 value={form.description}
// //                 onChange={(content) =>
// //                   setForm((prev) => ({ ...prev, description: content }))
// //                 }
// //               />

// //               </div>

// //               {/* Footer Actions */}
// //               <div className="flex justify-end gap-3 pt-4 border-t">
// //                 <button
// //                   type="button"
// //                   onClick={() => setOpen(false)}
// //                   className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-600 cursor-pointer"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={submit}
// //                   disabled={loading}
// //                   className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
// //                 >
// //                   {loading ? (
// //                     <>
// //                       <RefreshCcw size={18} className="animate-spin" />
// //                       Saving...
// //                     </>
// //                   ) : (
// //                     "Publish Banner"
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { toast } from "@/lib/toast";
// import { useRouter } from "next/navigation";
// import {
//   X,
//   Layout,
//   Plus,
//   Upload,
//   Type,
//   FileText,
//   RefreshCcw,
// } from "lucide-react";
// import Image from "next/image";
// import RichTextEditor from "@/components/RichTextEditor";

// export default function AddHome() {
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     images: [], // Initialize as empty array to match EditHome style
//   });

//   const [previews, setPreviews] = useState([]);

//   const handleFileChange = (e) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setForm({ ...form, images: files });

//       const previewUrls = files.map((file) => URL.createObjectURL(file));
//       setPreviews(previewUrls);
//     }
//   };

//   const submit = async () => {
//     // 1. Validation - Check if description is truly empty (RichTextEditor returns HTML)
//     const descriptionIsEmpty = !form.description || form.description === "<p></p>" || form.description.trim() === "";

//     if (!form.title || descriptionIsEmpty || form.images.length === 0) {
//       toast("Title, Description & at least one Image are required", "error");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("title", form.title);
//       formData.append("description", form.description);

//       // 2. Exact same logic as EditHome
//       if (form.images.length > 0) {
//         form.images.forEach((file) => {
//           if (file instanceof File) {
//             formData.append("images[]", file); // Using the array key format
//           }
//         });
//       }

//       const res = await fetch("/api/homes", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         toast(result.message || "Failed to add home", "error");
//         return;
//       }

//       toast("Home banner added successfully!", "success");

//       // 3. Reset State
//       setForm({ title: "", description: "", images: [] });
//       setPreviews([]);
//       setOpen(false);
//       router.refresh();

//     } catch (error) {
//       console.error("AddHome Error:", error);
//       toast("An unexpected error occurred", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={() => setOpen(true)}
//         className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95 font-medium cursor-pointer"
//       >
//         <Plus size={20} /> Add Home
//       </button>

//       {open && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
//             {/* Header */}
//             <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10">
//               <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                 <Layout className="text-blue-600" size={22} /> Create Home
//               </h2>
//               <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Image Upload Area */}
//               <div className="space-y-3">
//                 <label className="flex text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
//                   <Upload size={14} /> Banner Images
//                 </label>
//                 <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-all bg-gray-50 flex flex-col items-center justify-center min-h-40">
//                   {previews.length > 0 ? (
//                     <div className="grid grid-cols-3 gap-3 w-full">
//                       {previews.map((url, idx) => (
//                         <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border shadow-sm">
//                           <Image src={url} alt={`Preview ${idx}`} fill className="object-cover" unoptimized />
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center">
//                       <Upload className="mx-auto text-gray-300 mb-2" size={40} />
//                       <p className="text-sm text-gray-500 font-medium">Click to upload multiple images</p>
//                     </div>
//                   )}
//                   <label className="absolute inset-0 cursor-pointer">
//                     <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
//                   </label>
//                 </div>
//               </div>

//               {/* Title Input */}
//               <div>
//                 <label className="flex text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
//                   <Type size={14} /> Banner Title
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter main heading"
//                   value={form.title}
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                   className="w-full border border-gray-300 rounded-xl p-3 shadow-sm outline-none transition-all focus:ring-2 focus:ring-blue-500 hover:border-gray-400 text-gray-700"
//                 />
//               </div>

//               {/* Description Input */}
//               <div>
//                 <label className="flex text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
//                   <FileText size={14} /> Description
//                 </label>
//                 <RichTextEditor
//                   value={form.description}
//                   onChange={(content) => setForm((prev) => ({ ...prev, description: content }))}
//                 />
//               </div>

//               {/* Actions */}
//               <div className="flex justify-end gap-3 pt-4 border-t">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setForm({ title: "", description: "", images: [] });
//                     setPreviews([]);
//                     setOpen(false);
//                   }}
//                   className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50 text-gray-600 cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={submit}
//                   disabled={loading}
//                   className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
//                 >
//                   {loading ? (
//                     <><RefreshCcw size={18} className="animate-spin" /> Saving...</>
//                   ) : (
//                     "Publish Banner"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import {
  X,
  Layout,
  Plus,
  Upload,
  Type,
  FileText,
  RefreshCcw,
} from "lucide-react";
import Image from "next/image";
import RichTextEditor from "@/components/RichTextEditor";

export default function AddHome() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    images: [],
    status: true, // true = active// ✅ Added status
  });

  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setForm({ ...form, images: files });

      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    }
  };

  const submit = async () => {
    const descriptionIsEmpty =
      !form.description ||
      form.description === "<p></p>" ||
      form.description.trim() === "";

    if (!form.title || descriptionIsEmpty || form.images.length === 0) {
      toast("Title, Description & at least one Image are required", "error");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("status", form.status ? "true" : "false");

      form.images.forEach((file) => {
        if (file instanceof File) {
          formData.append("images[]", file);
        }
      });

      const res = await fetch("/api/homes", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast(result.message || "Failed to add home", "error");
        return;
      }

      toast("Home banner added successfully!", "success");

      // Reset form
      setForm({
        title: "",
        description: "",
        images: [],
        status: "active",
      });
      setPreviews([]);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("AddHome Error:", error);
      toast("An unexpected error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95 font-medium cursor-pointer"
      >
        <Plus size={20} /> Add Home
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Layout className="text-blue-600" size={22} />
                Create Home
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Upload */}
              <div className="space-y-3">
                <label className="flex text-sm font-semibold text-gray-700 items-center gap-1">
                  <Upload size={14} /> Banner Images
                </label>

                <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-all bg-gray-50 flex flex-col items-center justify-center min-h-40">
                  {previews.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3 w-full">
                      {previews.map((url, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video rounded-lg overflow-hidden border shadow-sm"
                        >
                          <Image
                            src={url}
                            alt={`Preview ${idx}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload
                        className="mx-auto text-gray-300 mb-2"
                        size={40}
                      />
                      <p className="text-sm text-gray-500 font-medium">
                        Click to upload multiple images
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

              {/* Title */}
              <div>
                <label className="flex text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
                  <Type size={14} /> Banner Title
                </label>
                <input
                  type="text"
                  placeholder="Enter main heading"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl p-3 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
                  <FileText size={14} /> Description
                </label>
                <RichTextEditor
                  value={form.description}
                  onChange={(content) =>
                    setForm((prev) => ({
                      ...prev,
                      description: content,
                    }))
                  }
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Status
                </label>
                <select
                  value={form.status ? "active" : "inactive"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value === "active", // convert to boolean
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setForm({
                      title: "",
                      description: "",
                      images: [],
                      status: "active",
                    });
                    setPreviews([]);
                    setOpen(false);
                  }}
                  className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50 text-gray-600"
                >
                  Cancel
                </button>

                <button
                  onClick={submit}
                  disabled={loading}
                  className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCcw size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Publish Banner"
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
