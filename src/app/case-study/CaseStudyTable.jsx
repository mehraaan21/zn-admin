"use client";

import Link from "next/link";

export default function CaseStudyTable({ data, meta }) {
  const totalPages = Math.ceil(meta.total / meta.limit);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Case Studies</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Client</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.client_name}</td>
              <td className="border p-2">
                <Link
                  href={`/case-study/${item.id}`}
                  className="text-blue-600 underline"
                >
                  view
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`?page=${i + 1}`}
            className={`px-3 py-1 border ${
              meta.page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
