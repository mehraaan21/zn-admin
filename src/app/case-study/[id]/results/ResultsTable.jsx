// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Eye, Pencil, Trash2, Plus, Rocket, X } from "lucide-react";

// export default function ResultsTable({ data, caseStudyId, token }) {
//   const [selected, setSelected] = useState(null);
//   const [mode, setMode] = useState(null); // view | edit | delete | add

//   return (
//     <div className="max-w-7xl mx-auto py-12 px-6">

//       {/* HEADER */}
//       <div className="flex justify-between mb-8">
//         <h1 className="text-3xl font-bold flex gap-3">
//           <Rocket className="text-purple-600" />
//           Project Results
//         </h1>

//         <button
//           onClick={() => {
//             setMode("add");
//             setSelected(null);
//           }}
//           className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl"
//         >
//           <Plus size={18} />
//           Add Result
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl border shadow-sm overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="p-4">Image</th>
//               <th className="p-4">Title</th>
//               <th className="p-4">Key Points</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data?.map((result) => (
//               <tr key={result.id} className="border-b hover:bg-gray-50">

//                 {/* IMAGE */}
//                 <td className="p-4">
//                   {result.image_url ? (
//                     <div className="relative w-14 h-14 rounded-lg overflow-hidden">
//                       <Image
//                         src={result.image_url}
//                         fill
//                         alt=""
//                         className="object-cover"
//                       />
//                     </div>
//                   ) : (
//                     "No Image"
//                   )}
//                 </td>

//                 <td className="font-semibold">{result.Title}</td>

//                 <td className="max-w-md">
//                   {result.bullet_points?.[0]?.slice(0, 60)}...
//                 </td>

//                 {/* ACTIONS */}
//                 <td>
//                   <div className="flex justify-center gap-3">

//                     <button
//                       onClick={() => {
//                         setSelected(result);
//                         setMode("view");
//                       }}
//                       className="p-2 bg-blue-50 rounded-lg"
//                     >
//                       <Eye size={18} />
//                     </button>

//                     <button
//                       onClick={() => {
//                         setSelected(result);
//                         setMode("edit");
//                       }}
//                       className="p-2 bg-yellow-50 rounded-lg"
//                     >
//                       <Pencil size={18} />
//                     </button>

//                     <button
//                       onClick={() => {
//                         setSelected(result);
//                         setMode("delete");
//                       }}
//                       className="p-2 bg-red-50 rounded-lg"
//                     >
//                       <Trash2 size={18} />
//                     </button>

//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ================= MODAL ================= */}

//       {mode && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

//           <div className="bg-white w-[600px] max-w-[95%] rounded-2xl p-8 relative">

//             <button
//               onClick={() => setMode(null)}
//               className="absolute top-4 right-4"
//             >
//               <X />
//             </button>

//             {/* VIEW */}
//             {mode === "view" && selected && (
//               <>
//                 <h2 className="text-2xl font-bold mb-6">
//                   {selected.Title}
//                 </h2>

//                 {selected.image_url && (
//                   <div className="relative w-full h-60 mb-6 rounded-xl overflow-hidden">
//                     <Image
//                       src={selected.image_url}
//                       fill
//                       alt=""
//                       className="object-cover"
//                     />
//                   </div>
//                 )}

//                 <ul className="space-y-3">
//                   {selected.bullet_points?.map((p, i) => (
//                     <li key={i} className="bg-gray-50 p-3 rounded-lg">
//                       {p}
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}

//             {/* ADD / EDIT FORM */}
//             {(mode === "add" || mode === "edit") && (
//               <div className="space-y-4">
//                 <h2 className="text-xl font-bold">
//                   {mode === "add" ? "Add Result" : "Edit Result"}
//                 </h2>

//                 <input
//                   placeholder="Title"
//                   defaultValue={selected?.Title}
//                   className="w-full border p-3 rounded-lg"
//                 />

//                 <textarea
//                   placeholder="Bullet Points (comma separated)"
//                   defaultValue={selected?.bullet_points?.join(",")}
//                   className="w-full border p-3 rounded-lg"
//                 />

//                 <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">
//                   Save
//                 </button>
//               </div>
//             )}

//             {/* DELETE */}
//             {mode === "delete" && (
//               <div className="text-center space-y-6">
//                 <h2 className="text-xl font-bold">
//                   Delete this result?
//                 </h2>

//                 <button className="bg-red-600 text-white px-6 py-2 rounded-lg">
//                   Confirm Delete
//                 </button>
//               </div>
//             )}

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Pencil, Trash2, Plus, Rocket } from "lucide-react";
import AddResultModal from "./AddResultModal";
import EditResults from "./EditResults";
import DeleteResults from "./DeleteResults";
import ViewResults from "./ViewResults";

import { useRouter } from "next/navigation";

export default function ResultsTable({ data, caseStudyId }) {
  console.log("ResultsTable data:", data);

  const [openAdd, setOpenAdd] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold flex gap-3">
          <Rocket className="text-purple-600" />
          Project Results
        </h1>

        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl shadow active:scale-95 transition"
        >
          <Plus size={18} />
          Add Result
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Key Points</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((result) => (
              <tr key={result.id} className="border-b hover:bg-gray-50">

                <td className="p-4">
                  {result.image_url ? (
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden">
                      <Image
                        src={result.image_url}
                        fill
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  ) : "No Image"}
                </td>

                <td className="font-semibold">{result.Title}</td>

                <td className="max-w-md">
                  {result.bullet_points?.[0]?.slice(0, 60)}...
                </td>

                {/* <td className="px-6 py-4 text-center"> */}
                  {/* <div className="flex justify-center gap-3">
                    <button className="p-2 bg-blue-50 rounded-lg">
                      <Eye size={18} />
                    </button>

                    <button className="p-2 bg-yellow-50 rounded-lg">
                      <Pencil size={18} />
                    </button>

                    <button className="p-2 bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div> */}



  {/* <div className="flex justify-center gap-3"> */}

    {/* VIEW */}
    {/* <button
      onClick={() => router.push(`/dashboard/results/view/${result.id}`)}
      className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition cursor-pointer"
    >
      <Eye size={18} />
    </button> */}

    {/* EDIT */}
    {/* <button
      onClick={() => router.push(`/dashboard/results/edit/${result.id}`)}
      className="p-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 rounded-lg transition cursor-pointer"
    >
      <Pencil size={18} />
    </button> */}

    {/* DELETE */}
    {/* <button
      onClick={() => router.push(`/dashboard/results/delete/${result.id}`)}
      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition cursor-pointer"
    >
      <Trash2 size={18} />
    </button> */}

    <td className="px-6 py-4 text-center">
                          <div className="flex justify-center items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            {/* VIEW BUTTON */}
                            <button
                              onClick={() => setViewItem(result)}
                              className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            
                            <button
                              onClick={() => setEditItem(result)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                              title="Edit Portfolio"
                            >
                              <Pencil size={18} />
                            </button>
                            
                            <button
                              onClick={() => setDeleteId(result.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                              title="Delete Portfolio"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>

  {/* </div> */}
                {/* // </td> */}

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {openAdd && (
        <AddResultModal
          caseStudyId={caseStudyId}
          onClose={() => setOpenAdd(false)}
        />
      )}


         {/* MODALS */}
            {viewItem && (
              <ViewResults
                result={viewItem}
                onClose={() => setViewItem(null)}
              />
            )}
      
            {editItem && (
              <EditResults
                result={editItem}
                onClose={() => setEditItem(null)}
              />
            )}
      
            {deleteId && (
              <DeleteResults
                id={deleteId}
                onClose={() => setDeleteId(null)}
              />
            )}

    </div>
  );
}