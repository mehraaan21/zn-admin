

// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { LayoutDashboard, User } from "lucide-react"; // Icons for modern look

// export default function DashboardPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/log-in");
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }



//   return (
//     <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
//       {/* WELCOME HEADER SECTION */}
//       <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
//         <div className="relative z-10">
//           <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
//             <LayoutDashboard size={32} />
//             Welcome Admin User Activities
//           </h1>
//           <p className="mt-2 text-blue-100 flex items-center gap-2 text-lg">
//             <User size={18} />
//             Logged in as: <span className="font-bold underline">{session?.user?.email}</span>
//           </p>
//           <div className="mt-6 flex items-center gap-2 bg-white/10 w-fit px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20">
//             <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
//             System Online & Active
//           </div>
//         </div>
//         {/* Decorative Background Pattern */}
//         <div className="absolute top-0 right-0 p-4 opacity-10">
//           <LayoutDashboard size={200} />
//         </div>
//       </div>

//     </div>
//   );
// }

import NewsletterTable from "./NewsletterTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Mail } from "lucide-react";

export default async function NewsletterPage() {
  const session = await getServerSession(authOptions);

  // 🔒 Protect page
  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribers`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("API STATUS:", res.status);
    throw new Error("Failed to fetch newsletter subscribers");
  }

  const result = await res.json();

  // Extracting data based on your standard API shape
  const subscribers = Array.isArray(result.data) ? result.data : [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mail className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-slate-800">Newsletter Subscribers</h1>
          </div>
          <p className="text-slate-500 text-sm">
            Total active subscribers: <span className="font-bold text-blue-600">{subscribers.length}</span>
          </p>
        </div>
      </div>

      {/* TABLE SECTION */}
      <NewsletterTable data={subscribers} />
    </div>
  );
}