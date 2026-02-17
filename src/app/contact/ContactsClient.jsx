"use client";

import { useState } from "react";
import {
  Trash2,
  Eye,
  Layout,
  Inbox,
  Search,
  Mail,
  Phone,
  UserCircle,
} from "lucide-react";
import ViewContact from "./ViewContact";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactsClient({ contacts = [] }) {
  const [viewItem, setViewItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
              <Layout className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Inbox
            </h1>
          </div>
          <p className="text-slate-500 font-medium">
            You have{" "}
            <span className="text-blue-600 font-bold">{contacts.length}</span>{" "}
            total messages.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:w-80 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search name or email..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* DATA VIEW */}
      <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse hidden md:table">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  S.No
                </th>
                <th className="px-8 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Sender
                </th>
                <th className="px-8 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Contact Info
                </th>
                <th className="px-8 py-5 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {filteredContacts.length === 0 ? (
                  <EmptyState />
                ) : (
                  filteredContacts.map((item, index) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={item.id}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-slate-400 font-medium">
                              {" "}
                              #{index + 1}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-11 w-11 rounded-full bg-linear-to-tr from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-base">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                            <Mail size={14} className="text-slate-300" />{" "}
                            {item.email}
                          </div>
                          {item.phone && (
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                              <Phone size={14} className="text-slate-300" />{" "}
                              {item.phone}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-8 py-6 text-center">
                        <button
                          onClick={() => setViewItem(item)}
                          className="p-2 hover:bg-green-50 text-green-600 rounded-full"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>

          {/* MOBILE CARD VIEW (Shows only on small screens) */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredContacts.map((item) => (
              <div key={item.id} className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <p className="font-bold text-slate-800">{item.name}</p>
                </div>
                <div className="text-sm text-slate-500 space-y-1 pl-14">
                  <p>{item.email}</p>
                  <p>{item.phone || "No phone"}</p>
                </div>
                <button
                  onClick={() => setViewItem(item)}
                  className="w-full py-3 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-100"
                >
                  View Message
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {viewItem && (
        <ViewContact data={viewItem} onClose={() => setViewItem(null)} />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <tr>
      <td colSpan="3" className="text-center py-24">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-6 bg-slate-50 rounded-full">
            <Inbox size={48} className="text-slate-200" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-800">Clean Inbox</p>
            <p className="text-sm text-slate-400">
              No contact messages were found matching your search.
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}
