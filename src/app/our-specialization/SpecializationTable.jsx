// "use client";

// import { useState } from "react";
// import EditSpecialization from "./EditSpecialization";
// import DeleteSpecialization from "./DeleteSpecialization";
// import Image from "next/image";

// export default function SpecializationTable({ data }) {
//   const [editItem, setEditItem] = useState(null);
//   const [deleteItem, setDeleteItem] = useState(null);

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

//                  <td className="border p-2 text-center">
//                                       <Image
//                                         src={item.image_url || "/placeholder.png"}
//                                         alt={item.title}
//                                         width={56}
//                                         height={56}
//                                         className="h-14 w-14 rounded mx-auto object-cover"
//                                       />
//                   </td>

//                 <td className="border p-2 font-semibold">{item.title}</td>

//                 <td className="border p-2 max-w-xs">{item.description}</td>

//                 <td className="border p-2">
//                   <ul className="list-disc list-inside space-y-1">
//                     {item.bullet_points?.map((point, i) => (
//                       <li key={i}>{point}</li>
//                     ))}
//                   </ul>
//                 </td>

//                 <td className="border p-2 text-center capitalize">
//                   {item.icon || "-"}
//                 </td>

//                 <td className="border p-2 text-center">{item.number}</td>

//                 <td className="border p-2">
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
//         />
//       )}

//       {/* Delete Modal */}
//       {deleteItem && (
//         <DeleteSpecialization
//           id={deleteItem.id}
//           onClose={() => setDeleteItem(null)}
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

export default function SpecializationTable({ data: initialData }) {
  const [data, setData] = useState(initialData || []);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // Remove deleted item from UI
  const handleDeleteSuccess = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
    setDeleteItem(null);
  };

  // Update edited item in UI
  const handleEditSuccess = (updatedItem) => {
    setData(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditItem(null);
  };

  // Add new item to UI
  const handleAddSuccess = (newItem) => {
    setData(prev => [...prev, newItem]);
  };

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Id</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Bullet Points</th>
            <th className="border p-2">Icon</th>
            <th className="border p-2">Order</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                No specializations found
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id} className="text-sm">
                <td className="border p-2 text-center">{index + 1}</td>

                <td className="border p-2 text-center">
                  <Image
                    src={item.image_url || "/placeholder.png"}
                    alt={item.title}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded mx-auto object-cover"
                  />
                </td>

                <td className="border p-2 font-semibold">{item.title}</td>

                <td className="border p-2 max-w-xs">{item.description}</td>

                <td className="border p-2">
                  <ul className="list-disc list-inside space-y-1">
                    {item.bullet_points?.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </td>

                <td className="border p-2 text-center capitalize">{item.icon || "-"}</td>

                <td className="border p-2 text-center">{item.number}</td>

                <td className="border p-2">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setEditItem(item)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteItem(item)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editItem && (
        <EditSpecialization
          data={editItem}
          onClose={() => setEditItem(null)}
          onSuccess={handleEditSuccess} // Pass success callback
        />
      )}

      {/* Delete Modal */}
      {deleteItem && (
        <DeleteSpecialization
          id={deleteItem.id}
          onClose={() => setDeleteItem(null)}
          onSuccess={handleDeleteSuccess} // Pass success callback
        />
      )}
    </div>
  );
}
