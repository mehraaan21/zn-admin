// // "use client";

// // import { useState } from "react";
// // import AddBlogModal from "./AddBlogModal";
// // import DeleteBlogModal from "./DeleteBlogModal";
// // import EditBlogModal from "./EditBlogModal";
// // import { useRouter } from "next/navigation";




// // export default function BlogsTable({ data }) {
// //   const [showAdd, setShowAdd] = useState(false);
// //   const [deleteId, setDeleteId] = useState(null);
// //   const [editBlog, setEditBlog] = useState(null);
// //   const router = useRouter();
  

// //   return (
// //     <>
// //       <div className="mb-4 flex justify-end">
// //           <button
// //         onClick={() => setOpen(true)}
// //         className="bg-blue-600 text-white px-4 py-2 rounded"
// //       >
// //         + Add Blog
// //       </button>

// //       </div>

// //       <div className="overflow-x-auto border rounded">
// //         <table className="min-w-full text-sm">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="border p-2">Image</th>
// //               <th className="border p-2">Title</th>
// //               <th className="border p-2">Slug</th>
// //               <th className="border p-2">SEO Title</th>
// //               <th className="border p-2">Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {data.length === 0 ? (
// //               <tr>
// //                 <td colSpan="5" className="p-4 text-center text-gray-500">
// //                   No blogs found
// //                 </td>
// //               </tr>
// //             ) : (
// //               data.map((blog) => (
// //                 <tr key={blog.id}>
// //                   <td className="border p-2">
// //                     <img
// //                       src={blog.image_url}
// //                       alt={blog.title}
// //                       className="w-20 h-14 object-cover rounded"
// //                     />
// //                   </td>

// //                   <td className="border p-2 font-medium">{blog.title}</td>
// //                   <td className="border p-2">{blog.slug}</td>
// //                   <td className="border p-2">{blog.seo_title}</td>

// //                   {/* <td className="border p-2">
// //                     <button
// //                       onClick={() => setDeleteId(blog.id)}
// //                       className="text-red-600 hover:underline"
// //                     >
// //                       Delete
// //                     </button>
// //                   </td> */}

// //                   <td className="border  p-2 ">
// //                     <div className="flex justify-center gap-3">


// //                     <button
// //                         onClick={() => setEditBlog(blog)}
// //                         className="text-blue-600 hover:underline"
// //                     >
// //                         Edit
// //                     </button>

// //                     <button
// //                         onClick={() => setDeleteId(blog.id)}
// //                         className="text-red-600 hover:underline"
// //                     >
// //                         Delete
// //                     </button>
// //                     </div>
// //                     </td>

// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {showAdd && <AddBlogModal onClose={() => setShowAdd(false)} />}
// //       {deleteId && (
// //         <DeleteBlogModal
// //           id={deleteId}
// //           onClose={() => setDeleteId(null)}
// //         />

// //         )}
// //               {editBlog && (
// //   <EditBlogModal
// //     blog={editBlog}
// //     onClose={() => setEditBlog(null)}
// //   />
// // )}

// //     </>
// //   );
// // }



// "use client";

// import { useState } from "react";
// import AddBlogModal from "./AddBlogModal";
// import DeleteBlogModal from "./DeleteBlogModal";
// import EditBlogModal from "./EditBlogModal";

// export default function BlogsTable({ data = [] }) {
//   const [showAdd, setShowAdd] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [editBlog, setEditBlog] = useState(null);

//   return (
//     <>
//       {/* ADD BUTTON */}
//       <div className="mb-4 flex justify-end">
//         <button
//           onClick={() => setShowAdd(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           + Add Blog
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto border rounded">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Image</th>
//               <th className="border p-2">Title</th>
//               <th className="border p-2">Slug</th>
//               <th className="border p-2">SEO Title</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="p-4 text-center text-gray-500">
//                   No blogs found
//                 </td>
//               </tr>
//             ) : (
//               data.map((blog) => (
//                 <tr key={blog.id}>
//                   <td className="border p-2">
//                     <img
//                       src={blog.image_url || "/placeholder.png"}
//                       alt={blog.title}
//                       className="w-20 h-14 object-cover rounded"
//                     />
//                   </td>

//                   <td className="border p-2 font-medium">
//                     {blog.title}
//                   </td>

//                   <td className="border p-2">{blog.slug}</td>

//                   <td className="border p-2">
//                     {blog.seo_title}
//                   </td>

//                   <td className="border p-2">
//                     <div className="flex justify-center gap-3">
//                       <button
//                         onClick={() => setEditBlog(blog)}
//                         className="text-blue-600 hover:underline"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => setDeleteId(blog.id)}
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
//       {showAdd && (
//         <AddBlogModal onClose={() => setShowAdd(false)} />
//       )}

//       {deleteId && (
//         <DeleteBlogModal
//           id={deleteId}
//           onClose={() => setDeleteId(null)}
//         />
//       )}

//       {editBlog && (
//         <EditBlogModal
//           blog={editBlog}
//           onClose={() => setEditBlog(null)}
//         />
//       )}
//     </>
//   );
// }

























"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Pencil, Trash2 } from "lucide-react";

import AddBlogModal from "./AddBlogModal";
import DeleteBlogModal from "./DeleteBlogModal";
import EditBlogModal from "./EditBlogModal";

export default function BlogsTable({ data = [] }) {
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editBlog, setEditBlog] = useState(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FileText className="text-blue-600" />
            Blogs
          </h1>
          <p className="text-gray-500 mt-1">
            Manage blog posts, SEO content, and visibility.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm"
        >
          + Add Blog
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Sr.No
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Slug
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  SEO Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  SEO Keyword
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  SEO Description
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    No blogs found. Click "Add Blog" to create one.
                  </td>
                </tr>
              ) : (
                data.map((blog, index) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-gray-400">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <div className="h-14 w-20 border rounded-md overflow-hidden shadow-sm">
                        <Image
                          src={blog.image_url || "/placeholder.png"}
                          alt={blog.title}
                          width={80}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 max-w-[220px] truncate">
                      {blog.title}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500 max-w-[220px] truncate">
                      {blog.slug}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500 max-w-[220px] truncate">
                      {blog.description}
                    </td>

                    

                    <td className="px-6 py-4 text-sm text-gray-500 max-w-[250px] truncate">
                      {blog.seo_title}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500 max-w-[220px] truncate">
                      {blog.seo_keywords}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500 max-w-[220px] truncate">
                      {blog.seo_description}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditBlog(blog)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit Image"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => setDeleteId(blog.id)}
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
      {showAdd && <AddBlogModal onClose={() => setShowAdd(false)} />}

      {deleteId && (
        <DeleteBlogModal
          id={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}

      {editBlog && (
        <EditBlogModal
          blog={editBlog}
          onClose={() => setEditBlog(null)}
        />
      )}
    </div>
  );
}
