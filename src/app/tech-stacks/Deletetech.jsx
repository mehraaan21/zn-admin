// "use client";

// import { toast } from "@/lib/toast";

// export default function DeleteTechStack({ id, onClose, onSuccess }) {
//   const remove = async () => {
//     try {
//       const res = await fetch(`/api/tech-stacks/${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         const error = await res.json();
//         toast(error.message || "Delete failed", "error");
//         return;
//       }

//       toast("Tech stack deleted successfully");
//       onClose();
//       if (onSuccess) onSuccess(id); // update UI
//     } catch (err) {
//       toast("Something went wrong", "error");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow-xl">
//         <p className="mb-4">Are you sure you want to delete this tech stack?</p>
//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="border px-3 py-1 rounded">
//             Cancel
//           </button>
//           <button
//             onClick={remove}
//             className="bg-red-600 text-white px-4 py-1 rounded"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function DeletePortfolio({ id, onClose }) {
  const router = useRouter();

  const remove = async () => {
    try {
      const res = await fetch(`/api/tech-stacks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast("Tech stack deleted");
      onClose();
      router.refresh();
    } catch (err) {
      toast(err.message, "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-80 text-center">
        <h2 className="font-bold mb-4">Delete Portfolio?</h2>
        <p className="mb-4 text-sm text-gray-600">
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={remove}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
