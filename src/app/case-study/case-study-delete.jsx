// "use client";

// import { toast } from "@/lib/toast";
// import { useRouter } from "next/navigation";

// export default function DeleteCaseStudy({ id, onClose }) {
//   const router = useRouter();

//   const remove = async () => {
//     const res = await fetch(`/api/case-studies-challenge/${id}`, {
//       method: "DELETE",
//     });

//     if (!res.ok) {
//       toast("Delete failed", "error");
//       return;
//     }

//     toast("Case study deleted");
//     router.refresh();
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded">
//         <p className="mb-4">Delete this case study?</p>

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="border px-3 py-1 rounded">
//             Cancel
//           </button>
//           <button onClick={remove} className="bg-red-600 text-white px-4 py-1 rounded">
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
