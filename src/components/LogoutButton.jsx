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
      className="w-full px-4 py-2 cursor-pointer hover:rounded-b-md flex items-center hover:text-bold gap-3 hover:text-red-400 text-red-600 hover:bg-gray-900"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
}
