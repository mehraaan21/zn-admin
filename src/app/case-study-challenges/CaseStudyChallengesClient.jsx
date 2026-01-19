"use client";

import { useState } from "react";
import AddCaseStudyChallenge from "./AddCaseStudyChallenge";
import EditCaseStudyChallenge from "./EditCaseStudyChallenge";
import DeleteCaseStudyChallenge from "./DeleteCaseStudyChallenge";

export default function CaseStudyChallengesClient({
  challenges = [],
  caseStudyId,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Case Study Challenges</h1>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Challenge
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
                <th className="border p-2 text-left w-1/12">Id</th>
              <th className="border p-2 text-left w-1/3">Challenge</th>
              <th className="border p-2 text-left w-1/3">Solution</th>
              <th className="border p-2 text-center w-1/6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {challenges.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="p-4 text-center text-gray-500"
                >
                  No challenges found
                </td>
              </tr>
            ) : (
              challenges.map((item, index) => (
                <tr key={item.id} className="align-top">

                    <td className="border p-2">{index + 1}</td>
                  {/* CHALLENGE */}
                  <td className="border p-3 whitespace-pre-line">
                    {item.challenge}
                  </td>

                  {/* SOLUTION */}
                  <td className="border p-3 whitespace-pre-line">
                    {item.solution}
                  </td>

                  {/* ACTIONS */}
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
      {showAdd && (
        <AddCaseStudyChallenge
          caseStudyId={caseStudyId}
          onClose={() => setShowAdd(false)}
        />
      )}

      {editItem && (
        <EditCaseStudyChallenge
          item={editItem}
          onClose={() => setEditItem(null)}
        />
      )}

      {deleteId && (
        <DeleteCaseStudyChallenge
          id={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </>
  );
}
