// "use client";

// import { useState } from "react";
// import EditCaseStudyTestimonial from "./EditCaseStudyTestimonial";
// import DeleteCaseStudyTestimonial from "./DeleteCaseStudyTestimonial";

// export default function CaseStudyTestimonialsClient({
//   testimonial,
//   caseStudyId,
// }) {
//   const [editItem, setEditItem] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   return (
//     <>
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Case Study Testimonial</h1>
//       </div>

//       {!testimonial ? (
//         <p className="text-gray-500">No testimonial found</p>
//       ) : (
//         <div className="border rounded p-4 space-y-4">
//           <p className="whitespace-pre-line text-gray-700">
//             {testimonial.feedback}
//           </p>

//           <div className="flex gap-4">
//             <button
//               onClick={() => setEditItem(testimonial)}
//               className="text-blue-600 hover:underline"
//             >
//               Edit
//             </button>

//             <button
//               onClick={() => setDeleteId(testimonial.id)}
//               className="text-red-600 hover:underline"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       )}

//       {/* MODALS */}
//       {editItem && (
//         <EditCaseStudyTestimonial
//           item={editItem}
//           onClose={() => setEditItem(null)}
//         />
//       )}

//       {deleteId && (
//         <DeleteCaseStudyTestimonial
//           id={deleteId}
//           onClose={() => setDeleteId(null)}
//         />
//       )}
//     </>
//   );
// }


"use client";

import { useState } from "react";
import EditCaseStudyTestimonial from "./EditCaseStudyTestimonial";
import DeleteCaseStudyTestimonial from "./DeleteCaseStudyTestimonial";

export default function CaseStudyTestimonialsClient({
  testimonials = [],
  caseStudyId,
}) {
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Case Study Testimonials</h1>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 w-1/12">ID</th>
              <th className="border p-2 w-3/4">Feedback</th>
              <th className="border p-2 w-1/6 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {testimonials.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="p-4 text-center text-gray-500"
                >
                  No testimonial found
                </td>
              </tr>
            ) : (
              testimonials.map((item, index) => (
                <tr key={item.id} className="align-top">
                  <td className="border p-2 text-center">
                    {index + 1}
                  </td>

                  <td className="border p-3 whitespace-pre-line">
                    {item.feedback}
                  </td>

                  <td className="border p-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setEditItem(item)}
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
      {editItem && (
        <EditCaseStudyTestimonial
          item={editItem}
          onClose={() => setEditItem(null)}
        />
      )}

      {deleteId && (
        <DeleteCaseStudyTestimonial
          id={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
