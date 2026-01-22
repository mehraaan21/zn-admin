

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddHome() {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // ✅ boolean status (true = active, false = inactive)
//   const [status, setStatus] = useState(true);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.target);

//     // ❗ FormData only supports strings → convert properly
//     formData.set("status", status ? "true" : "false");

//     try {
//       const res = await fetch("/api/homes", {
//         method: "POST",
//         body: formData,
//       });

//       setLoading(false);

//       if (!res.ok) {
//         const err = await res.json();
//         console.error("API Error:", err);
//         alert("Failed to add home");
//         return;
//       }

//       setOpen(false);
//       router.refresh();
//     } catch (err) {
//       setLoading(false);
//       console.error(err);
//       alert("Something went wrong");
//     }
//   }

//   return (
//     <>
//       <button
//         onClick={() => setOpen(true)}
//         className="bg-black text-white px-4 py-2 rounded"
//       >
//         Add Home
//       </button>

//       {open && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white p-6 rounded w-96 space-y-3"
//           >
//             <h2 className="text-lg font-bold">Add Home</h2>

//             <input
//               name="title"
//               placeholder="Title"
//               required
//               className="border p-2 w-full"
//             />

//             <textarea
//               name="description"
//               placeholder="Description"
//               required
//               className="border p-2 w-full"
//             />

//             <input
//               type="file"
//               name="images[]"
//               multiple
//               required
//               accept="image/*"
//               className="border p-2 w-full"
//             />

//             {/* ✅ Boolean status */}
//             <select
//               value={status ? "true" : "false"}
//               onChange={(e) => setStatus(e.target.value === "true")}
//               className="border p-2 w-full"
//             >
//               <option value="true">Active</option>
//               <option value="false">Inactive</option>
//             </select>

//             <div className="flex gap-3 justify-end pt-2">
//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className="border px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 disabled={loading}
//                 className="bg-black text-white px-4 py-2 rounded"
//               >
//                 {loading ? "Saving..." : "Save"}
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
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function AddHome() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
const [form, setForm] = useState({
  title: "",
  description: "",
  status: true,
  images: null, // String "" ko hata kar null karein
});

  // const submit = async () => {
  //   if (!form.title || !form.description || !form.images) {
  //     toast("Title, Description & Image are required", "error");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const formData = new FormData();
  //     formData.append("title", form.title);
  //     formData.append("description", form.description);
  //     formData.append("status", form.status ? "true" : "false");

  //     if (form.images) {
  //       if (form.images.length) {
  //         // multiple files
  //         Array.from(form.images).forEach((file) => formData.append("images[]", file));
  //       } else {
  //         formData.append("images[]", form.images);
  //       }
  //     }

  //     const res = await fetch("/api/homes", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!res.ok) {
  //       const err = await res.json();
  //       throw new Error(err.message || "Failed to add home");
  //     }

  //     toast("Home added successfully");
  //     setOpen(false);

  //     // Reset form
  //     setForm({
  //       title: "",
  //       description: "",
  //       status: true,
  //       images: null,
  //     });

  //     router.refresh();
  //   } catch (error) {
  //     toast(error.message, "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  


  const submit = async () => {
  // Validation
  if (!form.title || !form.description || (!form.images || form.images.length === 0) ) {
    toast("Title, Description & Image are required", "error");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    // formData.append("image_url", form.images);
    formData.append("status", form.status ? "true" : "false");

if (form.images && form.images.length > 0) {
    Array.from(form.images).forEach((file) => {
        formData.append("images[]", file); 
    });
} else {
    console.error("No images found in state!");
}
    const res = await fetch("/api/homes", {
      method: "POST",
      body: formData, // Browser automatically sets Content-Type to multipart/form-data
    });


    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to add home");
    }

    toast("Home added successfully");
    setOpen(false);

    // Reset form
    setForm({
      title: "",
      description: "",
      status: true,
      images: null,
    });

    router.refresh();
  } catch (error) {
    toast(error.message, "error");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded">
        + Add Home
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded p-5 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Add Home</h2>

            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border p-2 w-full mb-3 rounded"
              required
            />

            <textarea
              placeholder="Description"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="border p-2 w-full mb-3 rounded"
              required
              
            />
            
            

            {/* <div className="mb-3">
              <label className="text-sm text-gray-500 mb-1 block">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="border p-1 w-full text-sm"
                onChange={(e) => setForm({ ...form, images: e.target.files[0] })}
                required
              />

              {form.images && (
                <p className="text-green-600 text-xs mt-1">
                  {form.images.length ? `${form.images.length} file(s) selected` : form.images.name}
                </p>
              )}
            </div> */}

            <div className="mb-3">
  <label className="text-sm text-gray-500 mb-1 block">Image</label>
<input
  type="file"
  accept="image/*"
  multiple
  className="border p-1 w-full text-sm"
  onChange={(e) => {
    // files[0] mat likhiye, pura files object store karein
    setForm({ ...form, images: e.target.files });
  }}
  required
/>

{/* Debugging ke liye ye line help karegi */}
{form.images && form.images.length > 0 && (
  <p className="text-green-600 text-xs mt-1">
    {form.images.length} images selected
  </p>
)}
</div>

            <select
              value={form.status ? "true" : "false"}
              onChange={(e) => setForm({ ...form, status: e.target.value === "true" })}
              className="border p-2 w-full mb-4 rounded"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border cursor-pointer rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white px-4 py-1 rounded disabled:bg-gray-400"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
