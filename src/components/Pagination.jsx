

"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      
      {/* Previous */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;

        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 rounded-lg border transition
              ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}