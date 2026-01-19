"use client";

import { useState } from "react";
import AddService from "./AddService";
import EditService from "./EditService";
import DeleteService from "./DeleteService";

export default function ServicesClient({ services }) {
  const [editService, setEditService] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Our Services</h1>
        <AddService />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2">Icon</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No services found
                </td>
              </tr>
            ) : (
              services.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">{item.id}</td>
                  <td className="border p-2 font-semibold">{item.title}</td>
                  <td className="border p-2 text-sm">{item.description}</td>
                  <td className="border p-2 text-xl text-center">{item.icon}</td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditService(item)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="text-red-600 hover:underline"
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
      </div>

      {/* MODALS */}
      {editService && (
        <EditService
          service={editService}
          onClose={() => setEditService(null)}
        />
      )}

      {deleteId && (
        <DeleteService
          id={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}




// "use client";

// import { useState } from "react";
// import AddService from "./AddService";
// import EditService from "./EditService";
// import DeleteService from "./DeleteService";
// import Image from "next/image";

// export default function OurServicesPage({ services }) {
//   const [editService, setEditService] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   return (
//     <div className="p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Our Services</h1>
//         <AddService />
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Title</th>
//               <th className="border p-2 text-left">Description</th>
//               <th className="border p-2">Icon</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {services.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center p-4 text-gray-500">
//                   No services found
//                 </td>
//               </tr>
//             ) : (
//               services.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="border p-2 text-center">{item.id}</td>
//                   <td className="border p-2 font-semibold">{item.title}</td>
//                   <td className="border p-2 text-sm">{item.description}</td>
//                     <td className="border p-2">
//                                       <Image
//                                         src={item.icon_url || "/placeholder.png"}
//                                         alt="Gallery Image"
//                                         width={56}
//                                         height={56}
//                                         className="h-14 w-14 mx-auto rounded object-cover"
//                                       />
//                                     </td>
//                   <td className="border p-2 text-center">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() => setEditService(item)}
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
//       {editService && (
//         <EditService
//           service={editService}
//           onClose={() => setEditService(null)}
//         />
//       )}

//       {deleteId && (
//         <DeleteService
//           id={deleteId}
//           onClose={() => setDeleteId(null)}
//         />
//       )}
//     </div>
//   );
// }
