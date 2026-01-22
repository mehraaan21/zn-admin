// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import AddGallery from "./AddGallery";
// import EditGallery from "./EditGallery";
// import DeleteGallery from "./DeleteGallery";

// export default function GalleryClient({ gallery = [] }) {
//   const [showAdd, setShowAdd] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   return (
//     <>
//       {/* HEADER */}
//       <div className="mb-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Gallery</h1>

//         <button
//           onClick={() => setShowAdd(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           + Add Image
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto border rounded">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2 text-center">ID</th>
//               <th className="border p-2 text-center">Sequence</th>
//               <th className="border p-2 text-center">Image</th>
//               <th className="border p-2 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {gallery.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="p-4 text-center text-gray-500">
//                   No images found
//                 </td>
//               </tr>
//             ) : (
//               gallery.map((item) => (
//                 <tr key={item.id} className="text-center">
//                   <td className="border p-2">{item.id}</td>

//                   <td className="border p-2 font-medium">
//                     {item.sequence ?? "-"}
//                   </td>

//                   <td className="border p-2">
//                     <Image
//                       src={item.image_url || "/placeholder.png"}
//                       alt="Gallery Image"
//                       width={56}
//                       height={56}
//                       className="h-14 w-14 mx-auto rounded object-cover"
//                     />
//                   </td>

//                   <td className="border p-2">
//                     <div className="flex justify-center gap-3">
//                       <button
//                         onClick={() => setEditItem(item)}
//                         className="text-blue-600 hover:underline"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => setDeleteId(item.id)}
//                         className="text-red-600 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* MODALS */}
//       {showAdd && <AddGallery onClose={() => setShowAdd(false)} />}

//       {editItem && (
//         <EditGallery
//           item={editItem}
//           onClose={() => setEditItem(null)}
//         />
//       )}

//       {deleteId && (
//         <DeleteGallery
//           id={deleteId}
//           onClose={() => setDeleteId(null)}
//         />
//       )}
//     </>
//   );
// }



"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Image as ImageIcon, Plus, Hash } from "lucide-react"; // Icons
import AddGallery from "./AddGallery";
import EditGallery from "./EditGallery";
import DeleteGallery from "./DeleteGallery";

export default function GalleryClient({ gallery = [] }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER SECTION - Consistent with other dashboard pages */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <ImageIcon className="text-blue-600" />
            Image Gallery
          </h1>
          <p className="text-gray-500 mt-1">Manage website gallery images and display sequences.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95 font-medium"
        >
          <Plus size={20} />
          Add Image
        </button>
      </div>

      {/* TABLE CONTAINER - Modern Card Style */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr.No</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Sequence</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {gallery.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                    No images found. Click "Add Image" to populate your gallery.
                  </td>
                </tr>
              ) : (
                gallery.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {/* <Hash size={14} className="text-gray-400" /> */}
                        {item.sequence ?? "0"}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="h-16 w-16 mx-auto border-2 border-gray-50 rounded-lg overflow-hidden shadow-sm bg-gray-50">
                        <Image
                          src={item.image_url || "/placeholder.png"}
                          alt="Gallery Preview"
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditItem(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit Image"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Image"
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
      {showAdd && <AddGallery onClose={() => setShowAdd(false)} />}
      
      {editItem && (
        <EditGallery
          item={editItem}
          onClose={() => setEditItem(null)}
        />
      )}

      {deleteId && (
        <DeleteGallery
          id={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}