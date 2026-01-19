"use client";

import { useState } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import Image from "next/image";

export default function OurProductsClient({ products }) {
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Our Products</h1>
        <AddProduct />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Images</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Slug</th>
              <th className="border p-2">Website</th>
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">{item.id}</td>
<td className="border p-2 text-center">
  <Image
    src={item.image_url || "/placeholder.png"}
    alt={item.title}
    width={56}
    height={56}
    className="h-14 w-14 rounded mx-auto object-cover"
  />
</td>



                  <td className="border p-2 font-semibold">{item.title}</td>
                  <td className="border p-2 text-sm text-gray-600">
  {item.slug}
</td>

<td className="border p-2 text-center">
  {item.website_url ? (
    <a
      href={item.website_url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
    >
      Visit
    </a>
  ) : (
    <span className="text-gray-400">N/A</span>
  )}
</td>

                  <td className="border p-2 text-sm">{item.description}</td>

                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditProduct(item)}
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
      {editProduct && (
        <EditProduct
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
      {deleteId && (
        <DeleteProduct id={deleteId} onClose={() => setDeleteId(null)} />
      )}
    </div>
  );
}
