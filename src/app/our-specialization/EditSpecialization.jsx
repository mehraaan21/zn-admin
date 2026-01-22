// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "@/lib/toast";

// export default function EditSpecialization({ data, onClose }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: data.title,
//     description: data.description,
//     bullet_points: data.bullet_points?.join("\n") || "",
//     icon: data.icon || "",
//     number: data.number || "",
//     image: null,
//   });

//   const submit = async () => {
//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("description", form.description);
//     fd.append(
//       "bullet_points",
//       JSON.stringify(form.bullet_points.split("\n"))
//     );
//     fd.append("icon", form.icon);
//     fd.append("number", form.number);
//     if (form.image) fd.append("image", form.image);

//     try {
//       setLoading(true);
//       const res = await fetch(`/api/ourspecialization/${data.id}`, {
//         method: "PUT",
//         body: fd,
//       });

//       if (!res.ok) throw new Error("Update failed");

//       toast("Updated successfully");
//       onClose();
//       router.refresh();
//     } catch (e) {
//       toast(e.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded w-[420px] space-y-3">
//         <h2 className="font-bold text-lg">Edit Specialization</h2>

//         <input
//           className="border p-2 w-full"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />

//         <textarea
//           className="border p-2 w-full"
//           rows={3}
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//         />

//         <textarea
//           className="border p-2 w-full"
//           rows={3}
//           value={form.bullet_points}
//           onChange={(e) =>
//             setForm({ ...form, bullet_points: e.target.value })
//           }
//         />

//         <input
//           className="border p-2 w-full"
//           value={form.icon}
//           onChange={(e) => setForm({ ...form, icon: e.target.value })}
//         />

//         <input
//           className="border p-2 w-full"
//           type="number"
//           value={form.number}
//           onChange={(e) => setForm({ ...form, number: e.target.value })}
//         />

//         <input
//           type="file"
//           className="border p-2 w-full"
//           onChange={(e) =>
//             setForm({ ...form, image: e.target.files[0] })
//           }
//         />

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose}>Cancel</button>
//           <button
//             onClick={submit}
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-1 rounded"
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
import { X, Upload, Award, ListChecks, Hash, Type, AlignLeft } from "lucide-react";

export default function EditSpecialization({ data, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(data.image_url);

  const [form, setForm] = useState({
    title: data.title,
    description: data.description,
    bullet_points: data.bullet_points?.join("\n") || "",
    icon: data.icon || "",
    number: data.number || "",
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
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    // Formatting bullet points as JSON for backend consistency
    fd.append(
      "bullet_points",
      JSON.stringify(form.bullet_points.split("\n").filter(p => p.trim() !== ""))
    );
    fd.append("icon", form.icon);
    fd.append("number", form.number);
    if (form.image) fd.append("image", form.image);

    try {
      setLoading(true);
      const res = await fetch(`/api/specialization/${data.id}`, {
        method: "PUT", // API expectations for update
        body: fd,
      });

      if (!res.ok) throw new Error("Update failed");

      toast("Specialization updated successfully");
      onClose(); // Close modal on success
      router.refresh(); // Trigger server data refresh
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header - Matching previous UI updates */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Award className="text-blue-600" />
            Edit Specialization
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Main Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Type size={14} /> Title
                </label>
                <input
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <Award size={14} /> Icon Label
                  </label>
                  <input
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={form.icon}
                    placeholder="e.g. Shield"
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <Hash size={14} /> Order
                  </label>
                  <input
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    type="number"
                    value={form.number}
                    onChange={(e) => setForm({ ...form, number: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Display Image</label>
              <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-2 hover:border-blue-400 transition-all bg-gray-50">
                <img
                  src={preview || "/placeholder.png"}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg shadow-sm"
                />
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer text-white">
                  <Upload size={20} className="mb-1" />
                  <span className="text-xs font-bold">Change Image</span>
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <AlignLeft size={14} /> Short Description
            </label>
            <textarea
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2">
            <label className="text-sm font-bold text-blue-700 mb-1 flex items-center gap-1">
              <ListChecks size={16} /> Key Bullet Points
            </label>
            <textarea
              className="w-full border-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] text-sm shadow-inner bg-white/80"
              placeholder="Enter each point on a new line..."
              rows={4}
              value={form.bullet_points}
              onChange={(e) => setForm({ ...form, bullet_points: e.target.value })}
            />
            <p className="text-[10px] text-blue-400 italic font-medium">Tip: Press Enter to create a new point</p>
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
              className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-blue-300 transition-all active:scale-95"
            >
              {loading ? "Saving Changes..." : "Update Specialization"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}