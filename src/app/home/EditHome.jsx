// "use client";

// import { useState } from "react";

// export default function EditHome({ home }) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.target);

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/home/${home.id}`,
//       {
//         method: "PUT",
//         body: formData,
//       }
//     );

//     setLoading(false);

//     if (res.ok) {
//       setOpen(false);
//       window.location.reload();
//     } else {
//       alert("Failed to update home");
//     }
//   }


// //   async function handleSubmit(e) {
// //   e.preventDefault();
// //   setLoading(true);

// //   const body = {
// //     title: e.target.title.value,
// //     description: e.target.description.value,
// //   };

// //   const res = await fetch(`/api/homes/${home.id}`, {
// //     method: "PUT",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify(body),
// //   });

// //   setLoading(false);

// //   if (res.ok) {
// //     setOpen(false);
// //     window.location.reload();
// //   } else {
// //     alert("Failed to update home");
// //   }
// // }


//   return (
//     <>
//       <button
//         onClick={() => setOpen(true)}
//         className="text-blue-600"
//       >
//         Edit
//       </button>

//       {open && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white p-6 rounded w-96 space-y-3"
//           >
//             <h2 className="text-lg font-bold">Edit Home</h2>

//             <input
//               name="title"
//               defaultValue={home.title}
//               required
//               className="border p-2 w-full"
//             />

//             <textarea
//               name="description"
//               defaultValue={home.description}
//               required
//               className="border p-2 w-full"
//             />

//             <input
//               type="file"
//               name="images[]"
//               multiple
//               className="border p-2 w-full"
//             />

//             <div className="flex gap-3 justify-end">
//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className="border px-4 py-2"
//               >
//                 Cancel
//               </button>

//               <button
//                 disabled={loading}
//                 className="bg-black text-white px-4 py-2"
//               >
//                 {loading ? "Updating..." : "Update"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </>
//   );
// }






























// "use client";

// import { useState } from "react";

// export default function EditHome({ home }) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);

//     // 1. Use FormData to capture text AND files
//     const formData = new FormData(e.currentTarget);

//     try {
//       // 2. We call our internal Next.js API route
//       // Note: We use POST here because our route.js is export async function POST
//       const res = await fetch(`/api/homes/${home.id}`, {
//         method: "POST", 
//         body: formData,
//       });

//       const result = await res.json();

//       if (res.ok) {
//         setOpen(false);
//         // Better than reload: you might want to use router.refresh() from next/navigation
//         window.location.reload(); 
//       } else {
//         alert(result.message || "Failed to update home");
//       }
//     } catch (error) {
//       alert("An error occurred during update.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <button onClick={() => setOpen(true)} className="text-blue-600">
//         Edit
//       </button>

//       {open && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96 space-y-3">
//             <h2 className="text-lg font-bold">Edit Gallery Item</h2>

//             <label className="block text-sm">Sequence</label>
//             <input
//               name="sequence"
//               type="number"
//               defaultValue={home.sequence}
//               required
//               className="border p-2 w-full"
//             />

//             <label className="block text-sm">Update Image</label>
//             <input
//               type="file"
//               name="image" 
//               className="border p-2 w-full"
//             />
//             <p className="text-xs text-gray-500">Leave empty to keep current image</p>

//             <div className="flex gap-3 justify-end mt-4">
//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className="border px-4 py-2"
//               >
//                 Cancel
//               </button>

//               <button
//                 disabled={loading}
//                 className="bg-black text-white px-4 py-2 disabled:bg-gray-400"
//               >
//                 {loading ? "Updating..." : "Update"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </>
//   );
// }














































"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; // Or your custom toast path
import CustomEditor from "@/components/Editor";

export default function EditHome({ home, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 1️⃣ Initialize state with existing home data
  const [form, setForm] = useState({
    title: home.title || "",
    description: home.description || "",
    images: [], // For new file uploads
  });

  const handleFileChange = (e) => {
    if (e.target.files) {
      // Convert FileList to Array
      setForm({ ...form, images: Array.from(e.target.files) });
    }
  };

  const update = async () => {
    // Basic Validation
    if (!form.title || !form.description) {
      alert("Title and Description are required");
      return;
    }

    setLoading(true);

    try {
      // 2️⃣ Use FormData just like the working example
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);

      // 3️⃣ Append multiple images if they exist
      if (form.images.length > 0) {
        form.images.forEach((file) => {
          data.append("images[]", file);
        });
      }

      // 4️⃣ Call your local API route
      const res = await fetch(`/api/homes/${home.id}`, {
        method: "PUT",
        body: data,
        // No headers needed, fetch sets boundary for FormData automatically
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Update failed");
        return;
      }

      // Success handling
      setOpen(false);
      router.refresh(); // Refreshes server components data
      onSuccess?.();
      
    } catch (error) {
      console.error("Client Error:", error);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 hover:underline font-medium"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit Home</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-start text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  className="border p-2 w-full rounded focus:ring-1 outline-none"
                  placeholder="Property Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block  text-start text-sm font-medium text-gray-700 mb-1">Description</label>
                <CustomEditor  
                  value={form.description} 
                  onChange={(htmlValue) => setForm({ ...form, description: htmlValue })} 
                  placeholder="Property Description"
                />
              </div>

              <div>
                <label className="block text-start text-sm font-medium text-gray-700 mb-1">
                  Upload New Images (Optional)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="text-sm w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={update}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded font-medium disabled:bg-blue-300 transition-colors"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}