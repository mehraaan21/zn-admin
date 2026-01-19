// // // "use client";

// // // import Image from "next/image";
// // // import { useRouter } from "next/navigation";
// // // import { toast } from "@/lib/toast";
// // // import CaseStudyAdd from "./case-study-add";

// // // export default function CaseStudyClient({ caseStudies }) {
// // //   const router = useRouter();

// // //   const handleDelete = async (id) => {
// // //     const confirm = window.confirm(
// // //       "Are you sure you want to delete this case study?"
// // //     );

// // //     if (!confirm) return;

// // //     try {
// // //       const res = await fetch(`/api/case-studies/${id}`, {
// // //         method: "DELETE",
// // //       });

// // //       if (!res.ok) {
// // //         toast("Delete failed", "error");
// // //         return;
// // //       }

// // //       toast("Case study deleted");
// // //       router.refresh();
// // //     } catch (err) {
// // //       toast("Something went wrong", "error");
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-6">
// // //       {/* HEADER */}
// // //       <div className="flex justify-between items-center mb-4">
// // //         <h1 className="text-2xl font-bold">Case Studies</h1>

// // //         {/* ADD BUTTON */}
// // //                 <CaseStudyAdd />

// // //     </div>

// // //       <div className="overflow-x-auto">
// // //         <table className="min-w-full border border-gray-300">
// // //           <thead className="bg-gray-100">
// // //             <tr>
// // //               <th className="border p-2">ID</th>
// // //               <th className="border p-2">Banner</th>
// // //               <th className="border p-2">Title</th>
// // //               <th className="border p-2">Client</th>
// // //               <th className="border p-2">Position</th>
// // //               <th className="border p-2">Services</th>
// // //               <th className="border p-2">Duration</th>
// // //               <th className="border p-2">Team Size</th>
// // //               <th className="border p-2">Description</th>
// // //               <th className="border p-2">Images</th>
// // //               <th className="border p-2">Actions</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {caseStudies.length === 0 ? (
// // //               <tr>
// // //                 <td colSpan="12" className="text-center p-4 text-gray-500">
// // //                   No case studies found
// // //                 </td>
// // //               </tr>
// // //             ) : (
// // //               caseStudies.map((item) => {
// // //                 const bannerPath = item.banner
// // //                   ?.replace(/\\/g, "/")
// // //                   .replace(/^public\//, "");

// // //                 return (
// // //                   <tr key={item.id} className="align-top">
// // //                     <td className="border p-2 text-center">{item.id}</td>

// // //                     {/* BANNER */}
// // //                     <td className="border p-2 text-center">
// // //                       {item.banner ? (
// // //                         <Image
// // //                           src={`${process.env.NEXT_PUBLIC_API_URL}/${bannerPath}`}
// // //                           alt={item.title}
// // //                           width={60}
// // //                           height={60}
// // //                           className="rounded object-cover mx-auto"
// // //                         />
// // //                       ) : (
// // //                         <span className="text-xs text-gray-400">No banner</span>
// // //                       )}
// // //                     </td>

// // //                     <td className="border p-2 font-semibold">{item.title}</td>
// // //                     <td className="border p-2">{item.client_name || "—"}</td>
// // //                     <td className="border p-2">{item.position || "—"}</td>
// // //                     <td className="border p-2 text-sm">{item.services || "—"}</td>
// // //                     <td className="border p-2 text-center text-sm">
// // //                       {item.duration || "—"}
// // //                     </td>
// // //                     <td className="border p-2 text-center text-sm">
// // //                       {item.team_size || "—"}
// // //                     </td>
// // //                     <td className="border p-2 text-sm max-w-xs">
// // //                       {item.description}
// // //                     </td>

// // //                     {/* IMAGES */}
// // //                      <td className="border p-2 text-center">
// // //                                           <Image
// // //                                             src={item.image_url || "/placeholder.png"}
// // //                                             alt={item.title}
// // //                                             width={56}
// // //                                             height={56}
// // //                                             className="h-14 w-14 rounded mx-auto object-cover"
// // //                                           />
// // //                                         </td>

// // //                     {/* ACTIONS */}
// // //                     <td className="border p-2">
// // //                       <div className="flex gap-2 justify-center">
// // //                         <button
// // //                           onClick={() =>
// // //                             router.push(`/case-studies/edit/${item.id}`)
// // //                           }
// // //                           className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
// // //                         >
// // //                           Edit
// // //                         </button>

// // //                         <button
// // //                           onClick={() => handleDelete(item.id)}
// // //                           className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 );
// // //               })
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // "use client";

// // import Image from "next/image";
// // import { useRouter } from "next/navigation";
// // import { toast } from "@/lib/toast";
// // import CaseStudyAdd from "./case-study-add";

// // export default function CaseStudyClient({ caseStudies = [] }) {
// //   const router = useRouter();

// //   const handleDelete = async (id) => {
// //     if (!confirm("Are you sure you want to delete this case study?")) return;

// //     const res = await fetch(`/api/case-studies/${id}`, {
// //       method: "DELETE",
// //     });

// //     if (!res.ok) {
// //       toast("Delete failed", "error");
// //       return;
// //     }

// //     toast("Case study deleted");
// //     router.refresh();
// //   };

// //   return (
// //     <div className="p-6">
// //       {/* HEADER */}
// //       <div className="flex justify-between items-center mb-4">
// //         <h1 className="text-2xl font-bold">Case Studies</h1>

// //        <CaseStudyAdd/>
// //       </div>

// //       {/* TABLE */}
// //       <div className="overflow-x-auto">
// //         <table className="min-w-full border">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="border p-2">ID</th>
// //               <th className="border p-2">Banner</th>
// //               <th className="border p-2">Title</th>
// //               <th className="border p-2">Client</th>
// //               <th className="border p-2">Services</th>
// //               <th className="border p-2">Duration</th>
// //               <th className="border p-2">Team</th>
// //               <th className="border p-2">Images</th>
// //               <th className="border p-2">Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {caseStudies.length === 0 ? (
// //               <tr>
// //                 <td colSpan="9" className="p-4 text-center text-gray-500">
// //                   No case studies found
// //                 </td>
// //               </tr>
// //             ) : (
// //               caseStudies.map((item) => {
// //                 const bannerPath = item.banner
// //                   ?.replace(/\\/g, "/")
// //                   .replace(/^public\//, "");

// //                 return (
// //                   <tr key={item.id} className="text-center">
// //                     <td className="border p-2">{item.id}</td>

// //                     <td className="border p-2">
// //                       {item.banner ? (
// //                         <Image
// //                           src={`${process.env.NEXT_PUBLIC_API_URL}/${bannerPath}`}
// //                           alt={item.title}
// //                           width={60}
// //                           height={60}
// //                           className="rounded mx-auto"
// //                         />
// //                       ) : (
// //                         "—"
// //                       )}
// //                     </td>

// //                     <td className="border p-2 font-semibold">{item.title}</td>
// //                     <td className="border p-2">{item.client_name || "—"}</td>
// //                     <td className="border p-2">{item.services || "—"}</td>
// //                     <td className="border p-2">{item.duration || "—"}</td>
// //                     <td className="border p-2">{item.team_size || "—"}</td>

// //                     {/* IMAGES */}
// //                     <td className="border p-2">
// //                       <div className="flex gap-1 justify-center">
// //                         {item.Images?.length ? (
// //                           item.Images.map((img) => (
// //                             <Image
// //                               key={img.id}
// //                               src={img.image_url}
// //                               alt="case"
// //                               width={40}
// //                               height={40}
// //                               className="rounded"
// //                             />
// //                           ))
// //                         ) : (
// //                           <span className="text-xs text-gray-400">
// //                             No images
// //                           </span>
// //                         )}
// //                       </div>
// //                     </td>

// //                     {/* ACTIONS */}
// //                     <td className="border p-2">
// //                       <div className="flex gap-2 justify-center">
// //                         <button
// //                           onClick={() =>
// //                             router.push(`/case-studies/edit/${item.id}`)
// //                           }
// //                           className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
// //                         >
// //                           Edit
// //                         </button>

// //                         <button
// //                           onClick={() => handleDelete(item.id)}
// //                           className="px-3 py-1 text-sm bg-red-600 text-white rounded"
// //                         >
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 );
// //               })
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import CaseStudyAdd from "./case-study-add";
// import CaseStudyEdit from "./case-study-edit";
// import CaseStudyDelete from "./case-study-delete";
// import { Eye, Pencil, Trash } from "lucide-react";
// import Link from "next/link";

// export default function CaseStudyClient({ caseStudies = [] }) {
//   const [editItem, setEditItem] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   return (
//     <div className="p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Case Studies</h1>
//         <CaseStudyAdd />
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Banner</th>
//               <th className="border p-2">Title</th>
//               <th className="border p-2">Client</th>
//               <th className="border p-2">Services</th>
//               <th className="border p-2">Duration</th>
//               <th className="border p-2">Team</th>
//               <th className="border p-2">Images</th>
             
//                 <th className="border p-2">Testimonial</th>
//                   <th className="border p-2">Tech-stacks</th>
//                   <th className="border p-2">Challenges</th>
//                     <th className="border p-2">Results</th>
//                      <th className="border p-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {caseStudies.length === 0 ? (
//               <tr>
//                 <td colSpan="9" className="text-center p-4 text-gray-500">
//                   No case studies found
//                 </td>
//               </tr>
//             ) : (
//               caseStudies.map((item) => {
//                 const bannerPath = item.banner
//                   ?.replace(/\\/g, "/")
//                   .replace(/^public\//, "");

//                 return (
//                   <tr key={item.id} className="text-center">
//                     <td className="border p-2">{item.id}</td>

//                     {/* BANNER */}
//                     <td className="border p-2">
//                       {item.banner ? (
//                         <Image
//                           src={`${process.env.NEXT_PUBLIC_API_URL}/${bannerPath}`}
//                           alt={item.title}
//                           width={56}
//                           height={56}
//                           className="h-14 w-14 rounded mx-auto object-cover"
//                         />
//                       ) : (
//                         <span className="text-xs text-gray-400">No banner</span>
//                       )}
//                     </td>

//                     <td className="border p-2 font-semibold">
//                       {item.title}
//                     </td>

//                     <td className="border p-2">
//                       {item.client_name || "—"}
//                     </td>

//                     <td className="border p-2 text-sm">
//                       {item.services || "—"}
//                     </td>

//                     <td className="border p-2 text-sm">
//                       {item.duration || "—"}
//                     </td>

//                     <td className="border p-2 text-sm">
//                       {item.team_size || "—"}
//                     </td>

//                     {/* IMAGES */}
//                     <td className="border p-2">
//                       <div className="flex justify-center gap-1">
//                         {item.Images?.length ? (
//                           item.Images.map((img) => (
//                             <Image
//                               key={img.id}
//                               src={img.image_url}
//                               alt="case"
//                               width={40}
//                               height={40}
//                               className="h-10 w-10 rounded object-cover"
//                             />
//                           ))
//                         ) : (
//                           <span className="text-xs text-gray-400">
//                             No images
//                           </span>
//                         )}
//                       </div>
//                     </td>

                   


//                        {/* VIEW */}
//                       <td className="border p-2">
//                       <Link href={`/case-study-testimonials${item._id}`}>
//                         {/* <Eye className="w-5 h-5 text-blue-600 text-center cursor-pointer hover:scale-110 " /> */}
//                         view
//                       </Link>
//                       </td>

//                          {/* VIEW */}
//                       <td className="border p-2">
//                       <Link href={`/case-study-testimonials${item._id}`}>
//                         {/* <Eye className="w-5 h-5 text-blue-600 text-center cursor-pointer hover:scale-110 " /> */}
//                         view
//                       </Link>
//                       </td>


//                          {/* VIEW */}
//                       <td className="border p-2">
//                       <Link href={`/case-study-testimonials${item._id}`}>
//                         {/* <Eye className="w-5 h-5 text-blue-600 text-center cursor-pointer hover:scale-110 " /> */}
//                         view
//                       </Link>
//                       </td>


//                          {/* VIEW */}
//                       <td className="border p-2">
//                       <Link href={`/case-study-testimonials${item._id}`}>
//                         {/* <Eye className="w-5 h-5 text-blue-600 text-center cursor-pointer hover:scale-110 " /> */}
//                         view
//                       </Link>
//                       </td>


//                        {/* ACTIONS */}
//                     <td className="border p-2">
//                       <div className="flex justify-center gap-3">
//                         <button
//                           onClick={() => setEditItem(item)}
//                           className="text-blue-600"
//                         >
//                           Edit
//                         </button>

//                         <button
//                           onClick={() => setDeleteId(item.id)}
//                           className="text-red-600"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>

//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* MODALS */}
//       {editItem && (
//         <CaseStudyEdit
//           item={editItem}
//           onClose={() => setEditItem(null)}
//         />
//       )}

//       {deleteId && (
//         <CaseStudyDelete
//           id={deleteId}
//           onClose={() => setDeleteId(null)}
//         />
//       )}
//     </div>
//   );
// }



"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import CaseStudyAdd from "./case-study-add";
import CaseStudyEdit from "./case-study-edit";
import CaseStudyDelete from "./case-study-delete";

export default function CaseStudyClient({ data = [], meta }) {
  console.log(data , meta)
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const caseStudies = Array.isArray(data) ? data : [];

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Case Studies</h1>
        <CaseStudyAdd />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Client</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {caseStudies.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No case studies found
                </td>
              </tr>
            ) : (
              caseStudies.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2 text-center">{item.id}</td>
                  <td className="border p-2">{item.title}</td>
                  <td className="border p-2">{item.client_name || "—"}</td>

                  <td className="border p-2 text-center flex gap-3 justify-center">
                    <Link
                      href={`/case-study/${item.id}`}
                      className="text-blue-600"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => setEditItem(item)}
                      className="text-green-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {editItem && (
        <CaseStudyEdit item={editItem} onClose={() => setEditItem(null)} />
      )}

      {deleteId && (
        <CaseStudyDelete id={deleteId} onClose={() => setDeleteId(null)} />
      )}
    </div>
  );
}
