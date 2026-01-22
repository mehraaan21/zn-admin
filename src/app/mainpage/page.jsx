

// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function DashboardPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/log-in");
//     }
//   }, [status, router]);

//   if (status === "loading") return <p>Loading...</p>;

//   return (
//     <div className="p-5 m-2 text-3xl">
//       <h1>Dashboard</h1>
//       <p>Welcome {session?.user?.email}</p>
//       <h4> Please navigate throw navbar</h4>
//     </div>
//   );
// }


"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, User, ArrowRight, Activity, Settings, BarChart3 } from "lucide-react"; // Icons for modern look

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/log-in");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = [
    { title: "Total Activities", value: "24", icon: <Activity size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "System Status", value: "Optimal", icon: <Settings size={20} />, color: "text-green-600", bg: "bg-green-50" },
    { title: "Reports", value: "View All", icon: <BarChart3 size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* WELCOME HEADER SECTION */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
            <LayoutDashboard size={32} />
            Welcome Back!
          </h1>
          <p className="mt-2 text-blue-100 flex items-center gap-2 text-lg">
            <User size={18} />
            Logged in as: <span className="font-bold underline">{session?.user?.email}</span>
          </p>
          <div className="mt-6 flex items-center gap-2 bg-white/10 w-fit px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20">
            <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
            System Online & Active
          </div>
        </div>
        {/* Decorative Background Pattern */}
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <LayoutDashboard size={200} />
        </div>
      </div>

      {/* QUICK STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="mt-4">
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* NAVIGATION HINT */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="bg-blue-600 p-2 rounded-full text-white hidden md:block">
            <ArrowRight size={20} />
          </div>
          <div>
            <h4 className="text-blue-900 font-bold">Ready to manage your content?</h4>
            <p className="text-blue-700 text-sm">Please use the sidebar or navbar to navigate through Career, Portfolios, and other sections.</p>
          </div>
        </div>
        <button 
          onClick={() => router.push('/home')} 
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-blue-600 hover:text-white transition-all active:scale-95 border border-blue-200"
        >
          Go to Home Sidebar
        </button>
      </div>

    </div>
  );
}