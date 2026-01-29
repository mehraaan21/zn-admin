// "use client";

// import { useState } from "react";
// import { toast } from "@/lib/toast";
// import { useRouter } from "next/navigation";

// export default function AddSpecialization() {
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     bullet_points: "",
//     icon: "",
//     number: "",
//     image: null,
//   });

// const submit = async () => {
//   if (!form.title || !form.description) {
//     toast("Title & Description are required", "error");
//     return;
//   }

//   const data = new FormData();
//   data.append("title", form.title);
//   data.append("description", form.description);
//   data.append(
//     "bullet_points",
//     JSON.stringify(form.bullet_points.split(",").map(s => s.trim()))
//   );
//   data.append("icon", form.icon);
//   data.append("number", form.number);
//   if (form.image) data.append("image", form.image);

//   try {
//     setLoading(true);

//     const res = await fetch("/api/specialization", {
//       method: "POST",
//       body: data,
//     });

//     if (!res.ok) {
//       const err = await res.json();
//       throw new Error(err.message || "Failed to add specialization");
//     }

//     toast("Specialization added successfully");

//     setOpen(false);
//     setForm({
//       title: "",
//       description: "",
//       bullet_points: "",
//       icon: "",
//       number: "",
//       image: null,
//     });

//     // ✅ REFRESH PAGE
//     router.refresh();

//   } catch (error) {
//     toast(error.message, "error");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <>
//       <button
//         onClick={() => setOpen(true)}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         + Add Specialization
//       </button>

//       {open && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded w-96">
//             <h2 className="text-lg font-bold mb-4">Add Specialization</h2>

//             <input
//               className="border p-2 w-full mb-2 rounded"
//               placeholder="Title"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />

//             <textarea
//               className="border p-2 w-full mb-2 rounded"
//               placeholder="Description"
//               rows={3}
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//             />

//             <input
//               className="border p-2 w-full mb-2 rounded"
//               placeholder="Bullet Points (comma separated)"
//               value={form.bullet_points}
//               onChange={(e) => setForm({ ...form, bullet_points: e.target.value })}
//             />

//             <input
//               className="border p-2 w-full mb-2 rounded"
//               placeholder="Icon"
//               value={form.icon}
//               onChange={(e) => setForm({ ...form, icon: e.target.value })}
//             />

//             <input
//               type="number"
//               className="border p-2 w-full mb-2 rounded"
//               placeholder="Order Number"
//               value={form.number}
//               onChange={(e) => setForm({ ...form, number: e.target.value })}
//             />

//             <input
//               type="file"
//               className="border p-2 w-full mb-4 rounded"
//               onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setOpen(false)}
//                 className="border px-3 py-1 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={submit}
//                 disabled={loading}
//                 className="bg-blue-600 text-white px-4 py-1 rounded"
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
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { X, Plus, Upload, Type, FileText, List, Hash, RefreshCcw, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AddSpecialization() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    bullet_points: "",
    number: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async () => {
    if (!form.title || !form.description) {
      toast("Title & Description are required", "error");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append(
        "bullet_points",
        JSON.stringify(form.bullet_points.split(",").map((s) => s.trim()))
      );
      data.append("number", form.number);
      if (form.image) data.append("image", form.image);

      const res = await fetch("/api/specialization", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add specialization");
      }

      toast("Specialization added successfully");
      setOpen(false);
      setForm({ title: "", description: "", bullet_points: "", number: "", image: null });
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
        Add Specialization
      </button>

      {open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="text-blue-600" size={22} />
                New Specialization
              </h2>
              <button 
                onClick={() => setOpen(false)} 
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Upload Area */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
                  <Upload size={14} /> Cover Image
                </label>
                <div className="relative group border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-blue-400 transition-all bg-slate-50 flex flex-col items-center justify-center min-h-[160px]">
                  {preview ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border shadow-sm">
                      <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto text-slate-300 mb-2" size={40} />
                      <p className="text-sm text-slate-500 font-medium">Upload service illustration</p>
                    </div>
                  )}
                  <label className="absolute inset-0 cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Type size={14} /> Service Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UI/UX Design"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <List size={14} /> Bullet Points
                  </label>
                  <input
                    type="text"
                    placeholder="Fast Delivery, User Centric, Modern UI (comma separated)"
                    value={form.bullet_points}
                    onChange={(e) => setForm({ ...form, bullet_points: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Hash size={14} /> Display Order
                  </label>
                  <input
                    type="number"
                    placeholder="1, 2, 3..."
                    value={form.number}
                    onChange={(e) => setForm({ ...form, number: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <FileText size={14} /> Description
                </label>
                <textarea
                  placeholder="Explain what this specialization includes..."
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
                  onClick={() => setOpen(false)}
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
                    "Publish Service"
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