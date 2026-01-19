// "use client";

// import { toast } from "@/lib/toast";

// export default function DeleteConfirm({ id, onClose, onSuccess }) {
//   const remove = async () => {
//     const res = await fetch(`/opening/${id}`, { method: "DELETE" });

//     if (!res.ok) {
//       toast("Delete failed", "error");
//       return;
//     }

//     toast("Job deleted");
//     onSuccess();
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//       <div className="bg-white p-4 rounded">
//         <p>Are you sure?</p>
//         <div className="flex justify-end gap-2 mt-3">
//           <button onClick={onClose}>Cancel</button>
//           <button className="bg-red-600 text-white px-3" onClick={remove}>
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { toast } from "@/lib/toast";

// export default function DeleteConfirm({ id, onClose, onSuccess }) {
//   const remove = async () => {
//     const res = await fetch(`/api/openings/${id}`, {
//       method: "DELETE",
//     });

//     if (!res.ok) {
//       toast("Delete failed", "error");
//       return;
//     }

//     toast("Job deleted");
//     onSuccess();
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//       <div className="bg-white p-4 rounded">
//         <p>Are you sure?</p>
//         <div className="flex justify-end gap-2 mt-3">
//           <button onClick={onClose}>Cancel</button>
//           <button
//             className="bg-red-600 text-white px-3"
//             onClick={remove}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { toast } from "@/lib/toast";

export default function DeleteConfirm({ id, onClose, onSuccess }) {
  const remove = async () => {
    try {
      const res = await fetch(`/api/openings/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast("Delete failed", "error");
        return;
      }

      toast("Job deleted");
      onSuccess();
      onClose();
    } catch (error) {
      toast("Something went wrong", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <p>Are you sure?</p>
        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose}>Cancel</button>
          <button
            className="bg-red-600 text-white px-3"
            onClick={remove}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
