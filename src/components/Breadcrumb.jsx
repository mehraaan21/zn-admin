"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();

  // Example path: /dashboard/users/edit → ["dashboard", "users", "edit"]
  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm font-medium p-4 ">
      <ol className="flex items-center text-gray-600">
        {/* Home */}
        <li>
          <Link href="/mainpage" className="hover:text-blue-600">
            Dashboard
          </Link>
        </li>

        {parts.map((part, index) => {
          const path = "/" + parts.slice(0, index + 1).join("/");
          const isLast = index === parts.length - 1;

          return (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2" />

              {!isLast ? (
                <Link href={path} className="hover:text-blue-600 capitalize">
                  {part}
                </Link>
              ) : (
                <span className="text-gray-900 font-semibold capitalize">
                  {part}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
