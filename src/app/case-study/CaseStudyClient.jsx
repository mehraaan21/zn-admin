// "use client";

// import { useState } from "react";
// import { Pencil, Trash2, FolderKanban, Eye, Users, Clock, Plus } from "lucide-react"; 
// import Image from "next/image";
// import ViewCaseStudy from "./ViewCaseStudy";
// import { AnimatePresence } from "framer-motion";
// import AddCaseStudy from "./AddCaseStudy";
// import EditCaseStudy from "./EditCaseStudy";
// import DeleteCaseStudy from "./DeleteCaseStudy";

// export default function CaseStudyClient({ caseStudies = [] }) {
//   const [viewCase, setViewCase] = useState(null);
// const [AddCaseStudy, setAddCaseStudy] = useState(false);
// const [EditCaseStudy, setEditCaseStudy] = useState(null);
// const [DeleteCaseStudy, setDeleteCaseStudy] = useState(null);

//   const dataList = caseStudies?.data || [];

//   return (
//     <div className="p-4 md:p-8 max-w-7xl mx-auto">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
//             <FolderKanban className="text-purple-600" size={32} />
//             Case Studies
//           </h1>
//           <p className="text-gray-500 mt-1">Total {caseStudies?.total || 0} success stories published.</p>
//         </div>
//         <button onClick={() => setOpen(true)} className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg">
//                 <Plus size={20} />
//           + Add Case Study
//         </button>

        
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50/50">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Project</th>
//                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Client Info</th>
//                 <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Stats</th>
//                 <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {dataList.map((item) => (
//                 <tr key={item.id} className="hover:bg-purple-50/30 transition-colors group">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="h-12 w-20 relative rounded-lg overflow-hidden border bg-gray-100">
//                         <Image src={item.banner_url || "/placeholder.png"} alt="banner" fill className="object-cover" />
//                       </div>
//                       <div>
//                         <span className="font-bold text-gray-900 block">{item.title}</span>
//                         <span className="text-xs text-purple-600">{item.services}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex flex-col">
//                       <span className="text-sm font-semibold text-gray-800">{item.client_name}</span>
//                       <span className="text-xs text-gray-500">{item.position}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex justify-center gap-4">
//                       <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
//                         <Users size={12} /> {item.team_size}
//                       </div>
//                       <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
//                         <Clock size={12} /> {item.duration}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex justify-center items-center gap-2">
//                       <button onClick={() => setViewCase(item)} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
//                         <Eye size={18} />
//                       </button>
//                       <button onClick={() => setEditCaseStudy(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
//                         <Pencil size={18} />
//                       </button>
//                       <button onClick={() => setAddCaseStudy(item)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {viewCase && <ViewCaseStudy data={viewCase} onClose={() => setViewCase(null)} />}
//         {AddCaseStudy && <AddCaseStudy onClose={() => setAddCaseStudy(false)} />}
//   {EditCaseStudy && <EditCaseStudy data={EditCaseStudy} onClose={() => setEditCaseStudy(null)}  />}
//   {DeleteCaseStudy && <DeleteCaseStudy data={DeleteCaseStudy} onClose={() => setDeleteCaseStudy(null)} />}
//       </AnimatePresence>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Pencil, Trash2, FolderKanban, Eye, Users, Clock, Plus } from "lucide-react"; 
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

// Components (Make sure paths are correct)
import ViewCaseStudy from "./ViewCaseStudy";
import AddCaseStudy from "./AddCaseStudy";
import EditCaseStudy from "./EditCaseStudy";
import DeleteCaseStudy from "./DeleteCaseStudy";

export default function CaseStudyClient({ caseStudies = [] }) {
  // State names changed to lowercase to avoid conflict with Component names
  const [viewData, setViewData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const dataList = caseStudies?.data || [];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FolderKanban className="text-blue-600" size={32} />
            Case Studies
          </h1>
          <p className="text-gray-500 mt-1">Total {caseStudies?.total || 0} success stories published.</p>
        </div>
        
        {/* FIX 1: Changed setOpen to setIsAdding */}
       <AddCaseStudy/>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Project</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Client Info</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Stats</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {dataList.map((item) => (
                <tr key={item.id} className="hover:bg-purple-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-20 relative rounded-lg overflow-hidden border bg-gray-100">
                        <Image src={item.banner_url || "/placeholder.png"} alt="banner" fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">{item.title}</span>
                        <span className="text-xs text-purple-600">{item.services}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">{item.client_name}</span>
                      <span className="text-xs text-gray-500">{item.position}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-4 text-xs text-gray-600">
                       <span className="flex items-center gap-1"><Users size={12}/>{item.team_size}</span>
                       <span className="flex items-center gap-1"><Clock size={12}/>{item.duration}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      {/* View Button */}
                      <button onClick={() => setViewData(item)} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                        <Eye size={18} />
                      </button>
                      
                      {/* FIX 2: Correct state for Edit */}
                      <button onClick={() => setEditData(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Pencil size={18} />
                      </button>
                      
                      {/* FIX 3: Correct state for Delete */}
                      <button onClick={() => setDeleteData(item)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {/* Render View Modal */}
        {viewData && <ViewCaseStudy data={viewData} onClose={() => setViewData(null)} />}

        {/* FIX 4: Boolean state check for Add */}
        {isAdding && <AddCaseStudy onClose={() => setIsAdding(false)} />}

        {/* FIX 5: Data object check for Edit/Delete */}
        {editData && <EditCaseStudy data={editData} onClose={() => setEditData(null)} />}
        
        {deleteData && <DeleteCaseStudy data={deleteData} onClose={() => setDeleteData(null)} onDelete={(id) => console.log("Delete ID:", id)} />}
      </AnimatePresence>
    </div>
  );
}