// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import AddTechStack from "./AddTechStack";
// import EditTechStack from "./EditTechStack";
// import DeleteTechStack from "./Deletetech";

// export default function TechStacksClient({ techStacks = [] }) {

//   const [editItem, setEditItem] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   return (
//     <div className="p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Tech Stacks</h1>
//         <AddTechStack />
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Image</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Category</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {techStacks.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center p-4 text-gray-500">
//                   No tech stacks found
//                 </td>
//               </tr>
//             ) : (
//               techStacks.map((item) => {
//                 const imagePath = item.Image
//                   ?.replace(/\\/g, "/")
//                   .replace(/^public\//, "");

//                 return (
//                   <tr key={item.id} className="text-center">
//                     <td className="border p-2">{item.id}</td>

//                     <td className="border p-2 text-center">
//                       <Image
//                         src={item.image_url || "/placeholder.png"}
//                         alt={item.title}
//                         width={56}
//                         height={56}
//                         className="h-14 w-14 rounded mx-auto object-cover"
//                       />
//                     </td>
                    

//                     <td className="border p-2 font-semibold">
//                       {item.Name}
//                     </td>

//                     <td className="border p-2 capitalize">
//                       {item.Category}
//                     </td>

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
//         <EditTechStack
//           tech={editItem}
//           onClose={() => setEditItem(null)}
//         />
//       )}

//       {deleteId && (
//         <DeleteTechStack
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
import { Pencil, Trash2, Plus, Layout, Layers } from "lucide-react"; // Icons
import AddTechStack from "./AddTechStack";
import EditTechStack from "./EditTechStack";
import DeleteTechStack from "./Deletetech";

export default function TechStacksClient({ techStacks = [] }) {
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <Layout className="text-blue-600" />
            Tech Stacks
          </h1>
          <p className="text-gray-500 mt-1">Manage the technologies and tools used in your projects.</p>
        </div>
        <AddTechStack />
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr.NO</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Technology</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {techStacks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                    No tech stacks found. Click "Add Tech Stack" to create one.
                  </td>
                </tr>
              ) : (
                techStacks.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                      #{index+1}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 flex-shrink-0 border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                          <Image
                            src={item.image_url || "/placeholder.png"}
                            alt={item.Name}
                            width={48}
                            height={48}
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <span className="font-bold text-gray-900">{item.Name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 uppercase tracking-wide">
                        <Layers size={12} />
                        {item.Category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditItem(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit Technology"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Technology"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      {editItem && (
        <EditTechStack
          tech={editItem}
          onClose={() => setEditItem(null)}
        />
      )}

      {deleteId && (
        <DeleteTechStack
          id={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}