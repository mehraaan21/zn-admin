// // "use client";

// // import { useState } from "react";

// // export default function EditHome({ home }) {
// //   const [open, setOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setLoading(true);

// //     const formData = new FormData(e.target);

// //     const res = await fetch(
// //       `${process.env.NEXT_PUBLIC_API_URL}/home/${home.id}`,
// //       {
// //         method: "PUT",
// //         body: formData,
// //       }
// //     );

// //     setLoading(false);

// //     if (res.ok) {
// //       setOpen(false);
// //       window.location.reload();
// //     } else {
// //       alert("Failed to update home");
// //     }
// //   }


// // //   async function handleSubmit(e) {
// // //   e.preventDefault();
// // //   setLoading(true);

// // //   const body = {
// // //     title: e.target.title.value,
// // //     description: e.target.description.value,
// // //   };

// // //   const res = await fetch(`/api/homes/${home.id}`, {
// // //     method: "PUT",
// // //     headers: {
// // //       "Content-Type": "application/json",
// // //     },
// // //     body: JSON.stringify(body),
// // //   });

// // //   setLoading(false);

// // //   if (res.ok) {
// // //     setOpen(false);
// // //     window.location.reload();
// // //   } else {
// // //     alert("Failed to update home");
// // //   }
// // // }


// //   return (
// //     <>
// //       <button
// //         onClick={() => setOpen(true)}
// //         className="text-blue-600"
// //       >
// //         Edit
// //       </button>

// //       {open && (
// //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
// //           <form
// //             onSubmit={handleSubmit}
// //             className="bg-white p-6 rounded w-96 space-y-3"
// //           >
// //             <h2 className="text-lg font-bold">Edit Home</h2>

// //             <input
// //               name="title"
// //               defaultValue={home.title}
// //               required
// //               className="border p-2 w-full"
// //             />

// //             <textarea
// //               name="description"
// //               defaultValue={home.description}
// //               required
// //               className="border p-2 w-full"
// //             />

// //             <input
// //               type="file"
// //               name="images[]"
// //               multiple
// //               className="border p-2 w-full"
// //             />

// //             <div className="flex gap-3 justify-end">
// //               <button
// //                 type="button"
// //                 onClick={() => setOpen(false)}
// //                 className="border px-4 py-2"
// //               >
// //                 Cancel
// //               </button>

// //               <button
// //                 disabled={loading}
// //                 className="bg-black text-white px-4 py-2"
// //               >
// //                 {loading ? "Updating..." : "Update"}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       )}
// //     </>
// //   );
// // }






























// // "use client";

// // import { useState } from "react";

// // export default function EditHome({ home }) {
// //   const [open, setOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setLoading(true);

// //     // 1. Use FormData to capture text AND files
// //     const formData = new FormData(e.currentTarget);

// //     try {
// //       // 2. We call our internal Next.js API route
// //       // Note: We use POST here because our route.js is export async function POST
// //       const res = await fetch(`/api/homes/${home.id}`, {
// //         method: "POST", 
// //         body: formData,
// //       });

// //       const result = await res.json();

// //       if (res.ok) {
// //         setOpen(false);
// //         // Better than reload: you might want to use router.refresh() from next/navigation
// //         window.location.reload(); 
// //       } else {
// //         alert(result.message || "Failed to update home");
// //       }
// //     } catch (error) {
// //       alert("An error occurred during update.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   return (
// //     <>
// //       <button onClick={() => setOpen(true)} className="text-blue-600">
// //         Edit
// //       </button>

// //       {open && (
// //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
// //           <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96 space-y-3">
// //             <h2 className="text-lg font-bold">Edit Gallery Item</h2>

// //             <label className="block text-sm">Sequence</label>
// //             <input
// //               name="sequence"
// //               type="number"
// //               defaultValue={home.sequence}
// //               required
// //               className="border p-2 w-full"
// //             />

// //             <label className="block text-sm">Update Image</label>
// //             <input
// //               type="file"
// //               name="image" 
// //               className="border p-2 w-full"
// //             />
// //             <p className="text-xs text-gray-500">Leave empty to keep current image</p>

// //             <div className="flex gap-3 justify-end mt-4">
// //               <button
// //                 type="button"
// //                 onClick={() => setOpen(false)}
// //                 className="border px-4 py-2"
// //               >
// //                 Cancel
// //               </button>

// //               <button
// //                 disabled={loading}
// //                 className="bg-black text-white px-4 py-2 disabled:bg-gray-400"
// //               >
// //                 {loading ? "Updating..." : "Update"}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       )}
// //     </>
// //   );
// // }














































// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast"; // Or your custom toast path
// import CustomEditor from "@/components/Editor";
// import { Pencil } from "lucide-react";

// export default function EditHome({ home, onSuccess }) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // 1️⃣ Initialize state with existing home data
//   const [form, setForm] = useState({
//     title: home.title || "",
//     description: home.description || "",
//     images: [], // For new file uploads
//   });

//   const handleFileChange = (e) => {
//     if (e.target.files) {
//       // Convert FileList to Array
//       setForm({ ...form, images: Array.from(e.target.files) });
//     }
//   };

//   const update = async () => {
//     // Basic Validation
//     if (!form.title || !form.description) {
//       alert("Title and Description are required");
//       return;
//     }

//     setLoading(true);

//     try {
//       // 2️⃣ Use FormData just like the working example
//       const data = new FormData();
//       data.append("title", form.title);
//       data.append("description", form.description);

//       // 3️⃣ Append multiple images if they exist
//       if (form.images.length > 0) {
//         form.images.forEach((file) => {
//           data.append("images[]", file);
//         });
//       }

//       // 4️⃣ Call your local API route
//       const res = await fetch(`/api/homes/${home.id}`, {
//         method: "PUT",
//         body: data,
//         // No headers needed, fetch sets boundary for FormData automatically
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         alert(err.message || "Update failed");
//         return;
//       }

//       // Success handling
//       setOpen(false);
//       router.refresh(); // Refreshes server components data
//       onSuccess?.();
      
//     } catch (error) {
//       console.error("Client Error:", error);
//       alert("An unexpected error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//      <button
//   onClick={() => setOpen(true)}
//   className="p-2 text-blue-600 align-center cursor-pointer hover:bg-blue-50 rounded-full transition-colors"
//   title="Edit Home Item"
// >
//   <Pencil size={18} />
// </button>

//       {open && (
//         <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4">
//           <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl">
//             <h2 className="text-xl font-bold mb-4">Edit Home</h2>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-start text-sm font-medium text-gray-700 mb-1">Title</label>
//                 <input
//                   className="border p-2 w-full rounded focus:ring-1 outline-none"
//                   placeholder="Property Title"
//                   value={form.title}
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 />
//               </div>

//               <div>
//                 <label className="block  text-start text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <CustomEditor  
//                   value={form.description} 
//                   onChange={(htmlValue) => setForm({ ...form, description: htmlValue })} 
//                   placeholder="Property Description"
//                 />
//               </div>

//               <div>
//                 <label className="block text-start text-sm font-medium text-gray-700 mb-1">
//                   Upload New Images (Optional)
//                 </label>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   className="text-sm w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                   onChange={handleFileChange}
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 mt-8">
//               <button
//                 onClick={() => setOpen(false)}
//                 className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-100 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={update}
//                 disabled={loading}
//                 className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded font-medium disabled:bg-blue-300 transition-colors"
//               >
//                 {loading ? "Updating..." : "Save Changes"}
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
import { toast } from "react-hot-toast"; 
// import CustomEditor from "@/components/Editor";
import { Pencil, X, Layout, Upload, RefreshCcw, Type, FileText, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function EditHome({ home, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    title: home.title || "",
    description: home.description || "",
    images: [], 
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setForm({ ...form, images: files });
      
      const previews = files.map(file => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const update = async () => {
    if (!form.title || !form.description) {
      toast.error("Title and Description are required");
      return;
    }

    setLoading(true);

    try {
      // const data = new FormData();
      // data.append("title", form.title);
      // data.append("description", form.description);

      // if (form.images.length > 0) {
      //   form.images.forEach((file) => {
      //     data.append("images[]", file);
      //   });
      // }

// EditHome.js
const data = new FormData();
data.append("title", form.title);
data.append("description", form.description);

if (form.images.length > 0) {
  form.images.forEach((file) => {
    // Check if it's a valid file object
    if (file instanceof File) {
      data.append("images[]", file); // Key must have []
    }
  });
}

      const res = await fetch(`/api/homes/${home.id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Update failed");
        return;
      }

      toast.success("Home updated successfully!");
      setOpen(false);
      router.refresh();
      onSuccess?.();
      
    } catch (error) {
      console.error("Client Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
        title="Edit Home Item"
      >
        <Pencil size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            
            <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Layout className="text-blue-600" size={22} />
                Edit Home Banner
              </h2>
              <button 
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Existing Images Preview Section */}
              {home.image_url && home.image_url.length > 0 && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 items-center gap-1">
                    <ImageIcon size={14} /> Current Images
                  </label>
                  <div className="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    {home.image_url.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-md overflow-hidden border shadow-sm">
                        <Image 
                          src={url} 
                          alt={`Current banner ${idx}`} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Title Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1  items-center gap-1">
                  <Type size={14} /> Banner Title
                </label>
                <input
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              {/* Rich Text Editor */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 items-center gap-1">
                  <FileText size={14} /> Description
                </label>
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <textarea 
                    value={form.description}
                    onChange={(htmlValue) => setForm({ ...form, description: htmlValue })}
                  />
                </div>
              </div>

              {/* New Image Upload Area */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700  items-center gap-1">
                  <Upload size={14} /> Upload New Images
                </label>
                
                <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-all bg-gray-50 flex flex-col items-center justify-center">
                  {previewImages.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2 w-full mb-4">
                      {previewImages.map((src, idx) => (
                        <div key={idx} className="relative h-20 w-full rounded-lg overflow-hidden border">
                          <Image src={src} className="h-full w-full object-cover" alt="New upload preview" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto text-gray-300 mb-2" size={32} />
                      <p className="text-sm text-gray-500">Click to replace or add images</p>
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

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50 text-gray-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={update}
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
      )}
    </>
  );
}