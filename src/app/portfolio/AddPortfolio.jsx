// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "@/lib/toast";

// export default function AddPortfolio() {
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     category: "",
//     description: "",
//     image: null,
//   });

//   const submit = async () => {
//     if (!form.title || !form.category || !form.image) {
//       toast("All fields required", "error");
//       return;
//     }

//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("category", form.category);
//     fd.append("description", form.description);
//     fd.append("image", form.image);
    
//     console.log("FormData entries:");
//     for (let pair of fd.entries()) {
//       console.log(pair[0] + ": " + pair[1]);
//     }

//     try {
//       setLoading(true);
//       const res = await fetch("/api/portfolios", {
//         method: "POST",
//         body: fd,
//       });

//       if (!res.ok) throw new Error("Failed to add portfolio");

//       toast("Portfolio added");
//       setOpen(false);
//       router.refresh();
//     } catch (err) {
//       toast(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={() => setOpen(true)}
//         className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded"
//       >
//         + Add Portfolio
//       </button>

//       {open && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded w-96">
//             <h2 className="font-bold mb-4">Add Portfolio</h2>

//             <input
//               className="border p-2 w-full mb-3"
//               placeholder="Title"
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />

//             <input
//               className="border p-2 w-full mb-3"
//               placeholder="Category"
//               onChange={(e) => setForm({ ...form, category: e.target.value })}
//             />

//             <textarea
//               className="border p-2 w-full mb-3"
//               placeholder="Description"
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//             />

//             <input
//               type="file"
//               className="border p-2 w-full mb-4"
//               onChange={(e) =>
//                 setForm({ ...form, image: e.target.files[0] })
//               }
//             />

//             <div className="flex justify-end gap-2">


//               <button
//                className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
//               onClick={() => setOpen(false)}>
//                 Cancel
//                 </button>
//               <button
//                 onClick={submit}
//                 disabled={loading}
//                 className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-1 rounded"
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { X, Plus, Upload, Type, Layers, FileText, RefreshCcw, Briefcase } from "lucide-react";
import Image from "next/image";

export default function AddPortfolio() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setForm({ title: "", category: "", description: "", image: null });
    setPreview(null);
  };

  const submit = async () => {
    if (!form.title || !form.category || !form.image) {
      toast("All fields required", "error");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("description", form.description);
    fd.append("image", form.image);

    try {
      setLoading(true);
      const res = await fetch("/api/portfolios", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to add portfolio");

      toast("Portfolio item added successfully", "success");
      resetForm();
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast(err.message, "error");
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
        Add Portfolio
      </button>

      {open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Briefcase className="text-blue-600" size={22} />
                New Portfolio Item
              </h2>
              <button 
                onClick={() => { resetForm(); setOpen(false); }} 
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Upload Area */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
                  <Upload size={14} /> Project Cover Image
                </label>
                <div className="relative group border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-blue-400 transition-all bg-slate-50 flex flex-col items-center justify-center min-h-[180px]">
                  {preview ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border shadow-sm">
                      <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto text-slate-300 mb-2" size={40} />
                      <p className="text-sm text-slate-500 font-medium">Click to upload showcase image</p>
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
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Type size={14} /> Project Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. E-commerce Platform"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Layers size={14} /> Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Web Development"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <FileText size={14} /> Project Description
                </label>
                <textarea
                  placeholder="Describe the project goals and technologies used..."
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => { resetForm(); setOpen(false); }}
                  className="px-6 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors text-slate-600 cursor-pointer"
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
                    "Publish Project"
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