"use client";

import useSWR from "swr";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  MessageSquare,
  Loader2,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Fetcher function to handle Authorization
const fetcher = async ([url, token]) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch messages");
  const response = await res.json();
  return response?.data?.data || [];
};

export default function MessageDropdown({
  showMessages,
  setShowMessages,
  setShowNotifications,
}) {
  const { data: session } = useSession();

  // Only fetch if session exists
  const {
    data: contacts,
    error,
    isLoading,
  } = useSWR(
    session?.user?.accessToken
      ? [
          `${process.env.NEXT_PUBLIC_API_URL}/contacts`,
          session.user.accessToken,
        ]
      : null,
    fetcher,
    { refreshInterval: 30000 }, // Auto-refresh every 30 seconds
  );

  const recentContacts = contacts?.slice(0, 5) || [];

  return (
    <div className="relative">
      <button
        onClick={() => {
          setShowMessages((p) => !p);
          setShowNotifications(false);
        }}
        className="p-2 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 transition relative"
      >
        <MessageSquare size={18} className="text-gray-700" />
        {/* Notification Dot */}
       {contacts?.length > 0 && (
    <span className="absolute -top-1 -right-1 flex h-5 min-w-20px items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
      {contacts.length > 0 ? "1+" : contacts.length}
    </span>
  )}
      </button>

      <AnimatePresence>
        {showMessages && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 mt-2 w-100 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 py-3 border-b bg-gray-50/50 flex justify-between items-center">
              <span className="font-bold text-gray-800 text-md">
                Recent Messages
              </span>
            </div>

            {/* Content Area */}
            <div className="max-h-80 cursor-pointer  overflow-y-auto">
              {isLoading ? (
                <div className="flex flex-col items-center py-10 gap-2">
                  <Loader2 className="animate-spin text-blue-500" size={20} />
                  <p className="text-md text-gray-400">Loading messages...</p>
                </div>
              ) : error ? (
                <div className="px-4 py-6 text-center text-md text-red-500">
                  Failed to load messages.
                </div>
              ) : recentContacts.length > 0 ? (
                recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="px-4 py-3 border-b border-gray-50 hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {contact.name}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          {contact.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-slate-400">
                        {/* Date Section */}
                        <div className="flex items-center gap-1 text-[11px] font-medium">
                          <Calendar size={12} className="shrink-0" />
                          <span>
                            {new Date().toLocaleDateString([], {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                            <span>
                            {new Date().toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-10 text-center">
                  <p className="text-md text-gray-400">Your inbox is empty</p>
                </div>
              )}
            </div>

            {/* Footer View All Button */}
            <Link
              href="/contact" // Path to your individual contact us page
              onClick={() => setShowMessages(false)}
              className="group block w-full py-3 text-center text-md font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all items-center justify-center gap-2 border-t"
            >
              See All Messages
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
