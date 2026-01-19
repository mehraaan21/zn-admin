"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/log-in", // redirect after logout
        })
      }
      className="w-full px-4 py-2 flex items-center gap-3 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
}
