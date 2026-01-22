"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`?${params.toString()}`); // URL update karega (e.g., ?page=2)
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8 pb-10">
      <button
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 text-sm border rounded disabled:opacity-50 hover:bg-gray-100 transition"
      >
        Previous
      </button>

      <span className="font-small">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className=" px-4 py-2 text-sm border rounded disabled:opacity-50 hover:bg-gray-100 transition"
      >
        Next
      </button>
    </div>
  );
}