// "use client";

// import { useState } from "react";
// import AddPortfolio from "./AddPortfolio";
// import EditPortfolio from "./EditPortfolio";
// import DeletePortfolio from "./DeletePortfolio";
// import { truncateDescription } from "@/lib/wordcut";
// import { Pencil, Trash2 } from "lucide-react";

// export default function PortfolioClient({ portfolios }) {
//   const [editItem, setEditItem] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Portfolio</h1>
//         <AddPortfolio />
//       </div>

//       <div className="overflow-x-auto border rounded">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Image</th>
//               <th className="border p-2">Title</th>
//               <th className="border p-2">Slug</th>
//               <th className="border p-2">Category</th>
//               <th className="border p-2">Description</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {portfolios.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="p-4 text-center text-gray-500">
//                   No portfolio items found
//                 </td>
//               </tr>
//             ) : (
//               portfolios.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50 text-sm">
//                   <td className="border p-2 text-center">{item.id}</td>

//                   <td className="border p-2 text-center">
//                     {item.image_url ? (
//                       <img
//                         src={item.image_url}
//                         className="h-10 w-10 rounded-full mx-auto object-cover"
//                         alt={item.title}
//                       />
//                     ) : "-"}
//                   </td>

//                   <td className="border p-2 font-semibold">{item.title}</td>
//                   <td className="border p-2">{item.slug}</td>
//                   <td className="border p-2">{item.category}</td>
//                   <td className="border p-3 text-sm text-left max-w-[300px]">
//                                         <div className="line-clamp-2 text-gray-500" title={item.description.replace(/<[^>]*>/g, "")}>
//                                           {truncateDescription(item.description, 50)}
//                                         </div>
//                                       </td>

//                   <td className="border p-2 text-center">
//                     <div className="flex justify-center p-3 gap-4">
//                       <button
//                         onClick={() => setEditItem(item)}
//                         className="text-blue-600 cursor-pointer hover:underline"
//                       >
                        
//                       <Pencil size={18} />
//                       </button>
//                       <button
//                         onClick={() => setDeleteId(item.id)}
//                         className="text-red-600 cursor-pointer hover:underline"
//                       >
                       
//                        <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {editItem && (
//         <EditPortfolio
//           portfolio={editItem}
//           onClose={() => setEditItem(null)}
//         />
//       )}

//       {deleteId && (
//         <DeletePortfolio
//           id={deleteId}
//           onClose={() => setDeleteId(null)}
//         />
//       )}
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Briefcase, Plus, Layers } from "lucide-react";
import AddPortfolio from "./AddPortfolio";
import EditPortfolio from "./EditPortfolio";
import DeletePortfolio from "./DeletePortfolio";
import { truncateDescription } from "@/lib/wordcut";

export default function PortfolioClient({ portfolios }) {
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER SECTION - Consistent with other dashboard pages */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <Briefcase className="text-blue-600" />
            Portfolio
          </h1>
          <p className="text-gray-500 mt-1">Manage your work showcase and project categories.</p>
        </div>
        <AddPortfolio />
      </div>

      {/* TABLE CONTAINER - Modern Card Style */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr.No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {portfolios.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                    No portfolio items found. Click "Add Portfolio" to start.
                  </td>
                </tr>
              ) : (
                portfolios.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 flex-shrink-0 border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-300">
                              <Briefcase size={20} />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900">{item.title}</span>
                          <span className="text-xs text-gray-500 font-mono">{item.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 uppercase tracking-wide">
                        <Layers size={12} />
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div 
                        className="text-sm text-gray-500 line-clamp-2 max-w-[250px]" 
                        title={item.description?.replace(/<[^>]*>/g, "")}
                      >
                        {truncateDescription(item.description, 40)}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditItem(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit Portfolio"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Portfolio"
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
        <EditPortfolio
          portfolio={editItem}
          onClose={() => setEditItem(null)}
        />
      )}

      {deleteId && (
        <DeletePortfolio
          id={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}