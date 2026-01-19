// "use client";

// import { useRouter } from "next/navigation";
// import { toast } from "@/lib/toast";

// export default function EditGallery({ item, onClose }) {
//   const router = useRouter();

//   const submit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     const res = await fetch(`/api/gallery/${item.id}`, {
//       method: "PUT",
//       body: formData,
//     });

//     if (!res.ok) {
//       toast("Update failed", "error");
//       return;
//     }

//     toast("Updated");
//     onClose();
//     router.refresh();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//       <form onSubmit={submit} className="bg-white p-6 rounded">
//         <input type="file" name="image" />
//         <div className="mt-4 flex gap-2">
//           <input
//             type="file"
//             name="image"
//             required
//             className="border p-2 w-full rounded"
//           />
//           <button className="bg-black text-white px-4 py-1 rounded">
//             Update
//           </button>
//           <button onClick={onClose} type="button">
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function EditGallery({ item, onClose }) {
  const router = useRouter();


  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
      console.log(formData);

    // 👇 VERY IMPORTANT
    formData.append("_method", "PUT");

   const res = await fetch(`/api/gallery/${item.id}`, {
  method: "PUT", // Match this to your API export
  body: formData,
});

    if (!res.ok) {
      toast("Update failed", "error");
      return;
    }

    toast("Gallery updated");
    onClose();
    router.refresh();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded space-y-4">
        {/* ✅ ONLY ONE FILE INPUT */}
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="border p-2 w-full rounded"
        />

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-1 rounded"
          >
            Cancel
          </button>

          <button className="bg-black text-white px-4 py-1 rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
