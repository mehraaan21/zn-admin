"use client";

import { useState } from "react";
import { Trash2, Eye, Layout } from "lucide-react";
import ViewContact from "./ViewContact";


export default function ContactsClient({ contacts = [] }) {
  const [viewItem, setViewItem] = useState(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-2">
            <Layout className="text-blue-600"/>
            Contact Messages
          </h1>
          <p className="text-gray-500">
            Messages submitted from your website contact form.
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">#</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    No contact messages found.
                  </td>
                </tr>
              ) : (
                contacts.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-gray-400">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4 font-bold">
                      {item.name}
                    </td>

                    <td className="px-6 py-4">
                      {item.email}
                    </td>

                    <td className="px-6 py-4">
                      {item.phone || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => setViewItem(item)}
                          className="p-2 hover:bg-green-50 text-green-600 rounded-full"
                        >
                          <Eye size={18}/>
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

      {viewItem && (
        <ViewContact
          data={viewItem}
          onClose={() => setViewItem(null)}
        />
      )}

    </div>
  );
}