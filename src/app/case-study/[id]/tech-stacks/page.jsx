// import Image from "next/image";
// import { Cpu } from "lucide-react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";

// export default async function TechStacksPage({ params }) {
//   const { id } = await params;

//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     redirect("/log-in");
//   }

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/case-study/${id}/tech-stacks`,
//     {
//       headers: {
//         Authorization: `Bearer ${session.user.accessToken}`,
//       },
//       cache: "no-store",
//     }
//   );

//   const jsonData = await res.json();
//   const data = jsonData?.data;

//   console.log("TECH STACKS API RESPONSE:", data);

//   if (!res.ok) {
//     throw new Error("Failed to fetch tech stacks");
//   }


 
  
//   return (
//     <div className="max-w-6xl mx-auto py-12 px-6">

//       {/* PAGE TITLE */}
//       <h1 className="text-3xl font-bold mb-10 flex items-center gap-3">
//         <Cpu className="text-indigo-600" />
//         Tech Stacks
//       </h1>

//       {data?.length === 0 && (
//         <p className="text-gray-500">No tech stacks found.</p>
//       )}

//       {/* GRID */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {data?.map((item) => {
//           const tech = item.TechStack;

//           return (
//             <div
//               key={item.id}
//               className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition flex flex-col items-center text-center"
//             >
              
//               {/* IMAGE */}
//               {tech?.image_url && (
//                 <div className="relative w-20 h-20 mb-4">
//                   <Image
//                     src={tech.image_url}
//                     alt={tech.Name}
//                     fill
//                     className="object-contain"
//                   />
//                 </div>
//               )}

//               {/* NAME */}
//               <h2 className="font-semibold text-lg">
//                 {tech?.Name}
//               </h2>

//               {/* CATEGORY (optional) */}
//               {tech?.Category && (
//                 <span className="mt-2 text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
//                   {tech.Category}
//                 </span>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TechStackTable from "./TechStackTable";

export default async function TechStacksPage({ params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) redirect("/log-in");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case-study/${id}/tech-stacks`,
    {
      headers: { Authorization: `Bearer ${session.user.accessToken}` },
      cache: "no-store",
    }
  );

  const jsonData = await res.json();
  const data = jsonData?.data || [];

  return <TechStackTable data={data} caseStudyId={id} />;
}