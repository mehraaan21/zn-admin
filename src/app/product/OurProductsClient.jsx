// "use client";

// import { useState } from "react";
// import AddProduct from "./AddProduct";
// import EditProduct from "./EditProduct";
// import DeleteProduct from "./DeleteProduct";
// import Image from "next/image";
// import { Pencil, Trash2 } from "lucide-react";
// import { truncateDescription } from "@/lib/wordcut";

// export default function OurProductsClient({ products }) {
//   const [editProduct, setEditProduct] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);
  

//   return (
//     <div className="p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Our Products</h1>
//         <AddProduct />
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Sr.No</th>
//               <th className="border p-2">Images</th>
//               <th className="border p-2">Title</th>
//               <th className="border p-2">Slug</th>
//               <th className="border p-2">Website</th>
//               <th className="border p-2 text-left">Description</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center p-4 text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             ) : (
//               products.map((item, index) => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="border p-2 text-center"> #{index+1}</td>
// <td className="border p-2 text-center">
//   <Image
//     src={item.image_url || "/placeholder.png"}
//     alt={item.title}
//     width={56}
//     height={56}
//     className="h-10 w-10 rounded-full mx-auto object-cover"
//   />
// </td>



//                   <td className="border p-2 font-semibold">{item.title}</td>
//                   <td className="border p-2 text-sm text-gray-600">
//   {item.slug}
// </td>

// <td className="border p-2 text-center">
//   {item.website_url ? (
//     <a
//       href={item.website_url}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-blue-600 underline hover:text-blue-800"
//     >
//       Visit
//     </a>
//   ) : (
//     <span className="text-gray-400">N/A</span>
//   )}
// </td>
//  <td className="border p-3 text-sm text-left max-w-[300px]">
//                       <div className="line-clamp-2 text-gray-500" title={item.description.replace(/<[^>]*>/g, "")}>
//                         {truncateDescription(item.description, 50)}
//                       </div>
//                     </td>

//                   <td className="border p-4 text-center">
//                     <div className="flex justify-center gap-4">
//                       <button
//                         onClick={() => setEditProduct(item)}
//                          className="text-blue-500 cursor-pointer hover:underline text-sm"
//                       >
//                           <Pencil size={18} />
//                       </button>
//                       <button
//                         onClick={() => setDeleteId(item.id)}
//                          className="text-red-500 cursor-pointer hover:underline text-sm"
//                       >
                        
//   <Trash2 size={18} />
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
//       {editProduct && (
//         <EditProduct
//           product={editProduct}
//           onClose={() => setEditProduct(null)}
//         />
//       )}
//       {deleteId && (
//         <DeleteProduct id={deleteId} onClose={() => setDeleteId(null)} />
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import Image from "next/image";
import { Pencil, Trash2, ShoppingBag, ExternalLink } from "lucide-react"; // Icons for modern look
import { truncateDescription } from "@/lib/wordcut";

export default function OurProductsClient({ products }) {
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER SECTION - Consistent with Career/Tech pages */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="text-blue-600" />
            Our Products
          </h1>
          <p className="text-gray-500 mt-1">Manage your product catalog and website links.</p>
        </div>
        <AddProduct />
      </div>

      {/* TABLE CONTAINER - Modern Card Style */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr.No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Slug & Link</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                    No products found. Click "Add Product" to start.
                  </td>
                </tr>
              ) : (
                products.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                      #{index + 1}
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
                        <span className="font-bold text-gray-900">{item.title}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-xs font-mono text-gray-500">{item.slug}</span>
                        {item.website_url ? (
                          <a
                            href={item.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
                          >
                            <ExternalLink size={14} />
                            Visit Site
                          </a>
                        ) : (
                          <span className="text-gray-300 text-sm italic">No link</span>
                        )}
                      </div>
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
                          onClick={() => setEditProduct(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit Product"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Product"
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
      {editProduct && (
        <EditProduct
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
      {deleteId && (
        <DeleteProduct id={deleteId} onClose={() => setDeleteId(null)} />
      )}
    </div>
  );
}