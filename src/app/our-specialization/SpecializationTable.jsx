// // "use client";

// // import { useState } from "react";
// // import EditSpecialization from "./EditSpecialization";
// // import DeleteSpecialization from "./DeleteSpecialization";
// // import Image from "next/image";

// // export default function SpecializationTable({ data }) {
// //   const [editItem, setEditItem] = useState(null);
// //   const [deleteItem, setDeleteItem] = useState(null);

// //   return (
    
// //     <div className="overflow-x-auto border rounded">
// //       <table className="min-w-full border-collapse">
// //         <thead className="bg-gray-100">
// //           <tr>
// //             <th className="border p-2">Id</th>
// //             <th className="border p-2">Image</th>
// //             <th className="border p-2">Title</th>
// //             <th className="border p-2">Description</th>
// //             <th className="border p-2">Bullet Points</th>
// //             <th className="border p-2">Icon</th>
// //             <th className="border p-2">Order</th>
// //             <th className="border p-2">Actions</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {data.length === 0 ? (
// //             <tr>
// //               <td colSpan="8" className="text-center p-4 text-gray-500">
// //                 No specializations found
// //               </td>
// //             </tr>
// //           ) : (
// //             data.map((item, index) => (
// //               <tr key={item.id} className="text-sm">
// //                 <td className="border p-2 text-center">{index + 1}</td>

// //                  <td className="border p-2 text-center">
// //                                       <Image
// //                                         src={item.image_url || "/placeholder.png"}
// //                                         alt={item.title}
// //                                         width={56}
// //                                         height={56}
// //                                         className="h-14 w-14 rounded mx-auto object-cover"
// //                                       />
// //                   </td>

// //                 <td className="border p-2 font-semibold">{item.title}</td>

// //                 <td className="border p-2 max-w-xs">{item.description}</td>

// //                 <td className="border p-2">
// //                   <ul className="list-disc list-inside space-y-1">
// //                     {item.bullet_points?.map((point, i) => (
// //                       <li key={i}>{point}</li>
// //                     ))}
// //                   </ul>
// //                 </td>

// //                 <td className="border p-2 text-center capitalize">
// //                   {item.icon || "-"}
// //                 </td>

// //                 <td className="border p-2 text-center">{item.number}</td>

// //                 <td className="border p-2">
// //                       <div className="flex justify-center gap-3">
// //                         <button
// //                           onClick={() => setEditItem(item)}
// //                           className="text-blue-600"
// //                         >
// //                           Edit
// //                         </button>
// //                         <button
// //                           onClick={() => setDeleteId(item.id)}
// //                           className="text-red-600"
// //                         >
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //               </tr>
// //             ))
// //           )}
// //         </tbody>
// //       </table>

// //       {/* Edit Modal */}
// //       {editItem && (
// //         <EditSpecialization
// //           data={editItem}
// //           onClose={() => setEditItem(null)}
// //         />
// //       )}

// //       {/* Delete Modal */}
// //       {deleteItem && (
// //         <DeleteSpecialization
// //           id={deleteItem.id}
// //           onClose={() => setDeleteItem(null)}
// //         />
// //       )}
// //     </div>
// //   );
// // }



// "use client";

// import { useState } from "react";
// import EditSpecialization from "./EditSpecialization";
// import DeleteSpecialization from "./DeleteSpecialization";
// import Image from "next/image";

// export default function SpecializationTable({ data: initialData }) {
//   const [data, setData] = useState(initialData || []);
//   const [editItem, setEditItem] = useState(null);
//   const [deleteItem, setDeleteItem] = useState(null);

//   // Remove deleted item from UI
//   const handleDeleteSuccess = (id) => {
//     setData(prev => prev.filter(item => item.id !== id));
//     setDeleteItem(null);
//   };

//   // Update edited item in UI
//   const handleEditSuccess = (updatedItem) => {
//     setData(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
//     setEditItem(null);
//   };

//   // Add new item to UI
//   const handleAddSuccess = (newItem) => {
//     setData(prev => [...prev, newItem]);
//   };

//   return (
//     <div className="overflow-x-auto border rounded">
//       <table className="min-w-full border-collapse">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Id</th>
//             <th className="border p-2">Image</th>
//             <th className="border p-2">Title</th>
//             <th className="border p-2">Description</th>
//             <th className="border p-2">Bullet Points</th>
//             <th className="border p-2">Icon</th>
//             <th className="border p-2">Order</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="text-center p-4 text-gray-500">
//                 No specializations found
//               </td>
//             </tr>
//           ) : (
//             data.map((item, index) => (
//               <tr key={item.id} className="text-sm">
//                 <td className="border p-2 text-center">{index + 1}</td>

//                 <td className="border p-2 text-center">
//                   <Image
//                     src={item.image_url || "/placeholder.png"}
//                     alt={item.title}
//                     width={56}
//                     height={56}
//                     className="h-14 w-14 rounded mx-auto object-cover"
//                   />
//                 </td>

//                 <td className="border p-2 font-semibold">{item.title}</td>

//                 <td className="border p-2 max-w-xs">{item.description}</td>

//                 <td className="border p-2">
//                   <ul className="list-disc list-inside space-y-1">
//                     {item.bullet_points?.map((point, i) => (
//                       <li key={i}>{point}</li>
//                     ))}
//                   </ul>
//                 </td>

//                 <td className="border p-2 text-center capitalize">{item.icon || "-"}</td>

//                 <td className="border p-2 text-center">{item.number}</td>

//                 <td className="border p-2">
//                   <div className="flex justify-center gap-3">
//                     <button
//                       onClick={() => setEditItem(item)}
//                       className="text-blue-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => setDeleteItem(item)}
//                       className="text-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Edit Modal */}
//       {editItem && (
//         <EditSpecialization
//           data={editItem}
//           onClose={() => setEditItem(null)}
//           onSuccess={handleEditSuccess} // Pass success callback
//         />
//       )}

//       {/* Delete Modal */}
//       {deleteItem && (
//         <DeleteSpecialization
//           id={deleteItem.id}
//           onClose={() => setDeleteItem(null)}
//           onSuccess={handleDeleteSuccess} // Pass success callback
//         />
//       )}
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import EditSpecialization from "./EditSpecialization";
import DeleteSpecialization from "./DeleteSpecialization";
import Image from "next/image";
import { Pencil, Trash2, Award, ListChecks } from "lucide-react"; // Icons
import { truncateDescription } from "@/lib/wordcut";

export default function SpecializationTable({ data: initialData }) {
  const [data, setData] = useState(initialData || []);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const handleDeleteSuccess = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
    setDeleteItem(null);
  };

  const handleEditSuccess = (updatedItem) => {
    setData(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditItem(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr.No</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Features</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                  No specializations found.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                    #{ index + 1}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 flex-shrink-0 border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                        <Image
                          src={item.image_url || "/placeholder.png"}
                          alt={item.title}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{item.title}</span>
                        <span className="text-xs text-blue-600 font-medium uppercase tracking-tight flex items-center gap-1">
                          <Award size={12} /> {item.icon || "Default"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p 
                      className="text-sm text-gray-500 line-clamp-2 max-w-[250px]" 
                      title={item.description}
                    >
                      {truncateDescription(item.description, 40)}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <ul className="text-xs text-gray-600 space-y-1">
                      {item.bullet_points?.slice(0, 2).map((point, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <ListChecks size={12} className="text-green-500" />
                          <span className="truncate max-w-[150px]">{point}</span>
                        </li>
                      ))}
                      {item.bullet_points?.length > 2 && (
                        <li className="text-gray-400 italic">+{item.bullet_points.length - 2} more...</li>
                      )}
                    </ul>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditItem(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Edit Specialization"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteItem(item)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Specialization"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {editItem && (
        <EditSpecialization
          data={editItem}
          onClose={() => setEditItem(null)}
          onSuccess={handleEditSuccess}
        />
      )}

      {deleteItem && (
        <DeleteSpecialization
          id={deleteItem.id}
          onClose={() => setDeleteItem(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}