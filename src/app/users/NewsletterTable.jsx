"use client";

import { Mail, Hash } from "lucide-react";

export default function NewsletterTable({ data = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider w-20">
                <div className="flex items-center gap-2">
                  <Hash size={14} /> S.No
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Mail size={14} /> Email Address
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                Subscribed Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center text-slate-400 italic">
                  No subscribers found.
                </td>
              </tr>
            ) : (
              data.map((subscriber, index) => (
                <tr key={subscriber.id || index} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-400">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Mail size={14} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                        {subscriber.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {subscriber.createdAt ? new Date(subscriber.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}