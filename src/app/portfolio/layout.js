import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/log-in");

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <Breadcrumb />
        {children}
      </main>
    </div>
  );
}


// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/lib/auth";

// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";
// import Breadcrumb from "@/components/Breadcrumb";

// export default async function DashboardLayout({ children }) {
//   const session = await getServerSession(authOptions);

//   if (!session) redirect("/log-in");

//   return (
//     <div className="flex h-screen overflow-hidden">
      
//       {/* ✅ Sidebar NEVER shrink */}
//       <div className="shrink-0">
//         <Sidebar />
//       </div>

//       {/* ✅ Right Side Layout */}
//       <div className="flex flex-col flex-1 min-h-0">
        
//         <Header />
//         <Breadcrumb />

//         {/* ✅ ONLY THIS AREA SCROLLS */}
//         <main className="flex-1 overflow-y-auto p-4">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }