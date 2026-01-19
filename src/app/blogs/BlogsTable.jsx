// "use client";

// import { useState } from "react";
// import AddBlogModal from "./AddBlogModal";
// import DeleteBlogModal from "./DeleteBlogModal";
// import EditBlogModal from "./EditBlogModal";
// import { useRouter } from "next/navigation";




// export default function BlogsTable({ data }) {
//   const [showAdd, setShowAdd] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [editBlog, setEditBlog] = useState(null);
//   const router = useRouter();
  

//   return (
//     <>
//       <div className="mb-4 flex justify-end">
//           <button
//         onClick={() => setOpen(true)}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         + Add Blog
//       </button>

//       </div>

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
//                       src={blog.image_url}
//                       alt={blog.title}
//                       className="w-20 h-14 object-cover rounded"
//                     />
//                   </td>

//                   <td className="border p-2 font-medium">{blog.title}</td>
//                   <td className="border p-2">{blog.slug}</td>
//                   <td className="border p-2">{blog.seo_title}</td>

//                   {/* <td className="border p-2">
//                     <button
//                       onClick={() => setDeleteId(blog.id)}
//                       className="text-red-600 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </td> */}

//                   <td className="border  p-2 ">
//                     <div className="flex justify-center gap-3">


//                     <button
//                         onClick={() => setEditBlog(blog)}
//                         className="text-blue-600 hover:underline"
//                     >
//                         Edit
//                     </button>

//                     <button
//                         onClick={() => setDeleteId(blog.id)}
//                         className="text-red-600 hover:underline"
//                     >
//                         Delete
//                     </button>
//                     </div>
//                     </td>

//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {showAdd && <AddBlogModal onClose={() => setShowAdd(false)} />}
//       {deleteId && (
//         <DeleteBlogModal
//           id={deleteId}
//           onClose={() => setDeleteId(null)}
//         />

//         )}
//               {editBlog && (
//   <EditBlogModal
//     blog={editBlog}
//     onClose={() => setEditBlog(null)}
//   />
// )}

//     </>
//   );
// }



"use client";

import { useState } from "react";
import AddBlogModal from "./AddBlogModal";
import DeleteBlogModal from "./DeleteBlogModal";
import EditBlogModal from "./EditBlogModal";

export default function BlogsTable({ data = [] }) {
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editBlog, setEditBlog] = useState(null);

  return (
    <>
      {/* ADD BUTTON */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Blog
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Slug</th>
              <th className="border p-2">SEO Title</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No blogs found
                </td>
              </tr>
            ) : (
              data.map((blog) => (
                <tr key={blog.id}>
                  <td className="border p-2">
                    <img
                      src={blog.image_url || "/placeholder.png"}
                      alt={blog.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>

                  <td className="border p-2 font-medium">
                    {blog.title}
                  </td>

                  <td className="border p-2">{blog.slug}</td>

                  <td className="border p-2">
                    {blog.seo_title}
                  </td>

                  <td className="border p-2">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setEditBlog(blog)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteId(blog.id)}
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
      {showAdd && (
        <AddBlogModal onClose={() => setShowAdd(false)} />
      )}

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
    </>
  );
}
