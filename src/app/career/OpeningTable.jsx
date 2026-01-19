// "use client";

// export default function OpeningTable({ openings }) {
//   if (!openings || openings.length === 0) {
//     return <p className="text-gray-500">No openings found</p>;
//   }

//   return (
//     <div className="overflow-x-auto bg-white shadow rounded-lg">
//       <table className="min-w-full border border-gray-200">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 border">ID</th>
//             <th className="px-4 py-2 border">Title</th>
//             <th className="px-4 py-2 border">Position</th>
//             <th className="px-4 py-2 border">Openings</th>
//             <th className="px-4 py-2 border">Description</th>
//             <th className="px-4 py-2 border">Created At</th>
//           </tr>
//         </thead>

//         <tbody>
//           {openings.map((job) => (
//             <tr key={job.id} className="hover:bg-gray-50">
//               <td className="px-4 py-2 border text-center">{job.id}</td>
//               <td className="px-4 py-2 border">{job.title}</td>
//               <td className="px-4 py-2 border">{job.position}</td>
//               <td className="px-4 py-2 border text-center">{job.opening}</td>
//               <td className="px-4 py-2 border">{job.description}</td>
//               <td className="px-4 py-2 border text-sm text-gray-600">
//                 {job.created_at}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import OpeningForm from "./OpeningForm";
import DeleteConfirm from "./DeleteConfirm";

export default function OpeningTable({ openings }) {
  const [editJob, setEditJob] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  const reload = () => window.location.reload();

  return (
    <>
      <button
        className="mb-3 bg-green-600 text-white px-3 py-1"
        onClick={() => setAddOpen(true)}
      >
        + Add Job
      </button>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Position</th>
            <th>Openings</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {openings.map((job) => (
            <tr key={job.id} className="text-center border-t">
              <td>{job.id}</td>
              <td>{job.title}</td>
              <td>{job.position}</td>
              <td>{job.opening}</td>

              {/* STATUS BADGE */}
              <td>
                <span
                  className={`px-2 py-1 rounded text-white text-sm
                    ${job.status === "active" ? "bg-green-500" : "bg-gray-500"}
                  `}
                >
                  {job.status || "active"}
                </span>
              </td>

              <td className="space-x-2">
                <button onClick={() => setEditJob(job)}>Edit</button>
                <button onClick={() => setDeleteId(job.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {addOpen && (
        <OpeningForm onClose={() => setAddOpen(false)} onSuccess={reload} />
      )}

      {editJob && (
        <OpeningForm
          initialData={editJob}
          onClose={() => setEditJob(null)}
          onSuccess={reload}
        />
      )}

      {deleteId && (
        <DeleteConfirm
          id={deleteId}
          onClose={() => setDeleteId(null)}
          onSuccess={reload}
        />
      )}
    </>
  );
}
