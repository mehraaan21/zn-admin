"use client";

import { useState } from "react";
import AddCaseStudyResult from "./AddCaseStudyResult";
import EditCaseStudyResult from "./EditCaseStudyResult";
import DeleteCaseStudyResults from "./DeleteCaseStudyResults";
import Image from "next/image";


export default function CaseStudyResultsClient({
  result,
  caseStudyId,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Case Study Results</h1>

        {!result && (
          <button
            onClick={() => setShowAdd(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Results
          </button>
        )}
      </div>

      {!result ? (
        <p className="text-gray-500">No results added yet</p>
      ) : (
        <div className="border rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            {result.Title}
          </h2>

          {/* IMAGE */}
          {result.image_url && (
            <Image
              src={result.image_url}
              alt="Result"
              className="w-64 rounded border"
            />
          )}

          {/* BULLET POINTS */}
          <ul className="list-disc pl-6 space-y-2">
            {result.bullet_points?.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setEditOpen(true)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>

            <button
              onClick={() => setDeleteOpen(true)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* MODALS */}
      {showAdd && (
        <AddCaseStudyResult
          caseStudyId={caseStudyId}
          onClose={() => setShowAdd(false)}
        />
      )}

      {editOpen && (
        <EditCaseStudyResult
          result={result}
          onClose={() => setEditOpen(false)}
        />
      )}

      {deleteOpen && (
        <DeleteCaseStudyResults
          id={result.id}
          onClose={() => setDeleteOpen(false)}
        />
      )}
    </>
  );
}
