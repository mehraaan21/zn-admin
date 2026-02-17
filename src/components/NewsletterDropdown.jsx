"use client";

import useSWR from "swr";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Mail, Loader2, Calendar, Clock, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fetcher = async ([url, token]) => {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch subscribers");
  const response = await res.json();
  return response?.data || []; // Adjusting based on your newsletter API shape
};

export default function NewsletterDropdown({
  showNewsletter,
  setShowNewsletter,
  setShowMessages,
  setShowNotifications,
}) {
  const { data: session } = useSession();

  const { data: subscribers, isLoading, error } = useSWR(
    session?.user?.accessToken
      ? [`${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribers`, session.user.accessToken]
      : null,
    fetcher,
    { refreshInterval: 40000 } // Refresh every 40 seconds
  );

  const recentSubscribers = subscribers?.slice(0, 5) || [];

  return (
    <div className="relative">
      <button
        onClick={() => {
          setShowNewsletter((p) => !p);
          setShowMessages(false);
          setShowNotifications(false);
        }}
        className="p-2 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 transition relative"
      >
        <UserPlus size={18} className="text-gray-700" />
        {subscribers?.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-20px items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
            {subscribers.length > 9 ? "1+" : subscribers.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-3 border-b bg-gray-50/50 flex justify-between items-center">
              <span className="font-bold text-gray-800 text-">New Subscribers</span>
            </div>

            {/* Content Area */}
            <div className="max-h-100 overflow-y-auto cursor-default">
              {isLoading ? (
                <div className="flex flex-col items-center py-10 gap-2">
                  <Loader2 className="animate-spin text-blue-500" size={20} />
                  <p className="text-md text-gray-400">Checking for updates...</p>
                </div>
              ) : error ? (
                <div className="px-4 py-6 text-center text-md text-red-500">
                  Error loading subscribers.
                </div>
              ) : recentSubscribers.length > 0 ? (
                recentSubscribers.map((sub, i) => (
                  <div key={i} className="px-4 py-3 border-b cursor-pointer border-gray-50 hover:bg-slate-100 transition-colors">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                          <Mail size={12} />
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {sub.email}
                        </p>
                      </div>
                      
                      {/* Date & Time Footer */}
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 pl-8">
                        <div className="flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(sub.createdAt || Date.now()).toLocaleDateString([], { day: '2-digit', month: 'short' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-10 text-center text-gray-400 text-md">
                  No subscribers yet.
                </div>
              )}
            </div>

            {/* Footer Link */}
            <Link
              href="/users" // Path to the Newsletter Table page you created
              onClick={() => setShowNewsletter(false)}
              className="group block w-full py-3 text-center text-md font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all border-t"
            >
              View All Subscribers
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}