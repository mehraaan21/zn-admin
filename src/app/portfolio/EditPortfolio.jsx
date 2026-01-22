// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "@/lib/toast";

// export default function EditPortfolio({ portfolio, onClose }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: portfolio.title,
//     category: portfolio.category,
//     description: portfolio.description,
//     image: null,
//   });

//   const submit = async () => {
//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("category", form.category);
//     fd.append("description", form.description);
//     if (form.image) fd.append("image", form.image);

//     try {
//       setLoading(true);
//       const res = await fetch(`/api/portfolios/${portfolio.id}`, {
//         method: "PUT",
//         body: fd,
//       });

//       if (!res.ok) throw new Error("Failed to update");

//       toast("Portfolio updated");
//       onClose();
//       router.refresh();
//     } catch (err) {
//       toast(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded w-96">
//         <h2 className="font-bold mb-4">Edit Portfolio</h2>

//         <input
//           className="border p-2 w-full mb-3"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />

//         <input
//           className="border p-2 w-full mb-3"
//           value={form.category}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//         />

//         <textarea
//           className="border p-2 w-full mb-3"
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//         />

//         <input
//           type="file"
//           className="border p-2 w-full mb-4"
//           onChange={(e) =>
//             setForm({ ...form, image: e.target.files[0] })
//           }
//         />

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose}
//            className="px-3 py-1 border cursor-pointer rounded hover:bg-gray-100"
          
//           >Cancel
//           </button>
//           <button
//             onClick={submit}
//             disabled={loading}
//             className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-1 rounded"
//           >
//             {loading ? "Updating..." : "Update"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { X, Upload, Briefcase, Layers, Type, FileText, RefreshCcw } from "lucide-react"; // Icons for consistency

export default function EditPortfolio({ portfolio, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(portfolio.image_url || "/placeholder.png");

  const [form, setForm] = useState({
    title: portfolio.title,
    category: portfolio.category,
    description: portfolio.description,
    image: null,
  });

  // Handle live image preview for the portfolio item
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async () => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("description", form.description);
    if (form.image) fd.append("image", form.image);

    try {
      setLoading(true);
      const res = await fetch(`/api/portfolios/${portfolio.id}`, {
        method: "PUT",
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to update");

      toast("Portfolio updated successfully");
      onClose();
      router.refresh();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header - Matching previous modern UI updates */}
        <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Briefcase className="text-blue-600" size={22} />
            Edit Portfolio Item
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Top Section: Title/Category and Image Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Type size={14} /> Project Title
                </label>
                <input
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Layers size={14} /> Category
                </label>
                <input
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
            </div>

            {/* Image Preview Area */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Project Image</label>
              <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-2 hover:border-blue-400 transition-all bg-gray-50 flex items-center justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg shadow-sm"
                />
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white rounded-lg">
                  <Upload size={20} className="mb-1" />
                  <span className="text-xs font-bold uppercase">Change Image</span>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <FileText size={14} /> Project Description
            </label>
            <textarea
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm min-h-[100px]"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
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
  );
}