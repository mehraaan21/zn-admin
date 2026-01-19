"use client";

import { useState } from "react";
import Image from "next/image";
import AddGallery from "./AddGallery";
import EditGallery from "./EditGallery";
import DeleteGallery from "./DeleteGallery";

export default function GalleryClient({ gallery = [] }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <>
      {/* HEADER */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gallery</h1>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Image
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-center">ID</th>
              <th className="border p-2 text-center">Sequence</th>
              <th className="border p-2 text-center">Image</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {gallery.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No images found
                </td>
              </tr>
            ) : (
              gallery.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border p-2">{item.id}</td>

                  <td className="border p-2 font-medium">
                    {item.sequence ?? "-"}
                  </td>

                  <td className="border p-2">
                    <Image
                      src={item.image_url || "/placeholder.png"}
                      alt="Gallery Image"
                      width={56}
                      height={56}
                      className="h-14 w-14 mx-auto rounded object-cover"
                    />
                  </td>

                  <td className="border p-2">
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
      {showAdd && <AddGallery onClose={() => setShowAdd(false)} />}

      {editItem && (
        <EditGallery
          item={editItem}
          onClose={() => setEditItem(null)}
        />
      )}

      {deleteId && (
        <DeleteGallery
          id={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </>
  );
}
