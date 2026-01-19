// "use client";

// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import { TrendingUp, Bookmark, MapPin } from "lucide-react";

// export default function DashboardPage() {
//   // Dynamic state (replace with API later)
//   const [stats, setStats] = useState({
//     weeklySales: 15000,
//     weeklyOrders: 456334,
//     visitorsOnline: 955741,
//   });

//   const [growth, setGrowth] = useState({
//     salesGrowth: 60,
//     ordersGrowth: -10,
//     visitorsGrowth: 5,
//   });

//   const [salesData, setSalesData] = useState([
//     { name: "Mon", CHN: 4000, USA: 2400, UK: 2400 },
//     { name: "Tue", CHN: 3000, USA: 1398, UK: 2210 },
//     { name: "Wed", CHN: 2000, USA: 9800, UK: 2290 },
//     { name: "Thu", CHN: 2780, USA: 3908, UK: 2000 },
//     { name: "Fri", CHN: 1890, USA: 4800, UK: 2181 },
//     { name: "Sat", CHN: 2390, USA: 3800, UK: 2500 },
//     { name: "Sun", CHN: 3490, USA: 4300, UK: 2100 },
//   ]);

//   const [trafficData, setTrafficData] = useState([
//     { name: "Search", value: 400 },
//     { name: "Social", value: 300 },
//     { name: "Direct", value: 300 },
//     { name: "Referral", value: 200 },
//   ]);

//   return (
//     <div className="p-6 bg-[#f7f6fb] min-h-screen rounded-md">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <span className="text-sm text-gray-500 flex items-center gap-1">
//           Overview <span className="text-purple-500 text-lg">ℹ️</span>
//         </span>
//       </div>


//       <button onClick={() => fetch("/api/auth/logout").then(() => router.push("/auth/login"))}>
//   Logout
// </button>



//       {/* Top statistic cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
//         {/* Weekly Sales */}
//         <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl p-6 relative overflow-hidden shadow-md">
//           <div className="absolute right-5 top-5 opacity-20 text-5xl">
//             <TrendingUp />
//           </div>
//           <h3 className="text-sm font-medium">Weekly Sales</h3>
//           <h2 className="text-3xl font-bold mt-2">
//             ${stats.weeklySales.toLocaleString()}
//           </h2>
//           <p className="text-sm mt-2 opacity-90">
//             Increased by {growth.salesGrowth}%
//           </p>
//         </div>

//         {/* Weekly Orders */}
//         <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl p-6 relative overflow-hidden shadow-md">
//           <div className="absolute right-5 top-5 opacity-20 text-5xl">
//             <Bookmark />
//           </div>
//           <h3 className="text-sm font-medium">Weekly Orders</h3>
//           <h2 className="text-3xl font-bold mt-2">
//             {stats.weeklyOrders.toLocaleString()}
//           </h2>
//           <p className="text-sm mt-2 opacity-90">
//             {growth.ordersGrowth > 0
//               ? `Increased by ${growth.ordersGrowth}%`
//               : `Decreased by ${Math.abs(growth.ordersGrowth)}%`}
//           </p>
//         </div>

//         {/* Visitors Online */}
//         <div className="bg-gradient-to-r from-teal-400 to-green-500 text-white rounded-xl p-6 relative overflow-hidden shadow-md">
//           <div className="absolute right-5 top-5 opacity-20 text-5xl">
//             <MapPin />
//           </div>
//           <h3 className="text-sm font-medium">Visitors Online</h3>
//           <h2 className="text-3xl font-bold mt-2">
//             {stats.visitorsOnline.toLocaleString()}
//           </h2>
//           <p className="text-sm mt-2 opacity-90">
//             Increased by {growth.visitorsGrowth}%
//           </p>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
//         {/* Bar Chart */}
//         <div className="bg-white rounded-xl p-6 shadow-md">
//           <h3 className="text-lg font-semibold mb-4 text-gray-800">
//             Visits And Sales Statistics
//           </h3>

//           <div className="h-72">
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
//                 <XAxis dataKey="name" stroke="#999" />
//                 <Tooltip />

//                 <Bar dataKey="CHN" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
//                 <Bar dataKey="USA" fill="#ec4899" radius={[8, 8, 0, 0]} />
//                 <Bar dataKey="UK" fill="#3b82f6" radius={[8, 8, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Pie Chart */}
//         <div className="bg-white rounded-xl p-6 shadow-md">
//           <h3 className="text-lg font-semibold mb-4 text-gray-800">Traffic Sources</h3>
          
//           <div className="h-72 flex items-center justify-center">
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={trafficData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   innerRadius={60}
//                   paddingAngle={3}
//                   dataKey="value"
//                   label={({ name, percent }) =>
//                     `${name} ${(percent * 100).toFixed(0)}%`
//                   }
//                 >
//                   <Cell fill="#8b5cf6" />
//                   <Cell fill="#ec4899" />
//                   <Cell fill="#3b82f6" />
//                   <Cell fill="#22c55e" />
//                 </Pie>

//                 <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "8px" }} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
