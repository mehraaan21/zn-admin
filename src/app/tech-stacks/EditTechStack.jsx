// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "@/lib/toast";

// export default function EditTechStack({ tech, onClose }) {
//   const router = useRouter();
//   const [name, setName] = useState(tech.Name);
//   const [category, setCategory] = useState(tech.Category);
//   const [image, setImage] = useState(null);

//   const submit = async () => {
//     const fd = new FormData();
//     fd.append("Name", name);
//     fd.append("Category", category);
//     if (image) fd.append("Image", image);

//     try {
//       const res = await fetch(`/api/techs/${tech.id}`, {
//         method: "PUT",
//         body: fd,
//       });

//       if (!res.ok) throw new Error("Update failed");

//       toast("Updated successfully");
//       onClose();
//       router.refresh();
//     } catch (err) {
//       toast(err.message, "error");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//       <div className="bg-white p-6 rounded w-96">
//         <h2 className="font-bold mb-4">Edit Tech Stack</h2>

//         <input
//           className="border p-2 w-full mb-3"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           className="border p-2 w-full mb-3"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         />

//         <input
//           type="file"
//           className="border p-2 w-full mb-4"
//           onChange={(e) => setImage(e.target.files[0])}
//         />

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose}>Cancel</button>
//           <button
//             onClick={submit}
//             className="bg-blue-600 text-white px-4 py-1 rounded"
//           >
//             Update
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
import { X, Upload, Layout, Layers, Type, RefreshCcw } from "lucide-react";

export default function EditTechStack({ tech, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(tech.Name);
  const [category, setCategory] = useState(tech.Category);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(tech.image_url || "/placeholder.png");
  

  // Handle live image preview for the logo
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

//  const submit = async () => {
//   const formData = new FormData();
//  formData.append("Name", name);
// formData.append("Category", category);



//   if (image) {
//    formData.append("image", image);
//   }





//   try {
//     setLoading(true);
    
//     // 2. Change the method to POST
//     const res = await fetch(`/api/tech-stacks/${tech.id}`, {
//       method: "PUT", 
//       body: formData,
//       // Note: Do NOT set 'Content-Type' header. 
//       // The browser will set it automatically with the boundary.
//     });

//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.message || "Update failed");
//     }

//     toast("Tech Stack updated successfully");
//     onClose();
//     router.refresh();
//   } catch (err) {
//     toast(err.message, "error");
//   } finally {
//     setLoading(false);
//   }
// };
  
const submit = async () => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("category", category);

  if (image) {
    formData.append("image", image);
  }

  try {
    setLoading(true);


     // Debug (optional)
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

    const res = await fetch(`/api/tech-stacks/${tech.id}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(formData);
      throw new Error(errorData.message || "Update failed");
    }

    toast("Tech Stack updated successfully");
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header - Matching previous modern UI updates */}
        <div className="flex justify-between items-center p-6 border-b bg-white">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Layout className="text-blue-600" size={22} />
            Edit Tech Stack
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Logo Preview Section */}
          <div className="flex flex-col items-center justify-center mb-2">
            <label className="text-sm font-semibold text-gray-700 mb-2 self-start">Technology Logo</label>
            <div className="relative group h-24 w-24 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center hover:border-blue-400 transition-all">
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-contain p-2"
              />
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                <Upload size={20} />
                <span className="text-[10px] font-bold mt-1 uppercase">Change</span>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleImageChange} 
                  accept="image/*" 
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Type size={14} /> Technology Name
              </label>
              <input
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                value={name}
                placeholder="e.g. Next.js"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Layers size={14} /> Category
              </label>
              <input
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                value={category}
                placeholder="e.g. Frontend Framework"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={loading}
              className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center gap-2 active:scale-95"
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