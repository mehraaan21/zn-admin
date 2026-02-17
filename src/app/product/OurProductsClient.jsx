

"use client";

import { useState } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import Image from "next/image";
import { Pencil, Trash2, ShoppingBag, ExternalLink, Eye } from "lucide-react"; // Icons for modern look
import { truncateDescription } from "@/lib/wordcut";
import ViewProduct from "./ViewProduct";

export default function OurProductsClient({ products }) {
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER SECTION - Consistent with Career/Tech pages */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="text-blue-600" />
            Our Products
          </h1>
          <p className="text-gray-500 mt-1">Manage your product catalog and website links.</p>
        </div>
        <AddProduct />
      </div>

      {/* TABLE CONTAINER - Modern Card Style */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr.No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Slug & Link</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                    No products found. Click "Add Product" to start.
                  </td>
                </tr>
              ) : (
                products.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 shrink-0 border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                          <Image
                            src={item.image_url || "/placeholder.png"}
                            alt={item.title}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-gray-900">{item.title}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-xs font-mono text-gray-500">{item.slug}</span>
                        {item.website_url ? (
                          <a
                            href={item.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
                          >
                            <ExternalLink size={14} />
                            Visit Site
                          </a>
                        ) : (
                          <span className="text-gray-300 text-sm italic">No link</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div 
                        className="text-sm text-gray-500 line-clamp-2 max-w-[250px]" 
                        title={item.description?.replace(/<[^>]*>/g, "")}
                      >
                        {truncateDescription(item.description, 40)}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                       
                       <button
                          onClick={() => setViewProduct(item)}
                          className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => setEditProduct(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit Product"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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

      {viewProduct && (
  <ViewProduct
    data={viewProduct}
    onClose={() => setViewProduct(null)}
  />
)}
    </div>
  );
}