

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import Image from "next/image";
// import AddTestimonial from "./AddTestimonial";
// import DeleteConfirm from "./DeleteConfirm";
// import EditTestimonial from "./EditTestimonial";
// import { truncateDescription } from "@/lib/wordcut";
// import StatusBadge from "@/components/StatusToggle";

// export default async function TestimonialsPage() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     redirect("/log-in");
//   }

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
//     headers: {
//       Authorization: `Bearer ${session.user.accessToken}`,
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) throw new Error("Failed to fetch testimonials");

//   const response = await res.json();
//   const testimonials = response?.data ?? [];
//   console.log("TESTIMONIALS RESPONSE:", testimonials);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Testimonials</h1>
//         <AddTestimonial />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Client</th>
//               <th className="border p-2">Quote</th>
//               <th className="border p-2">Picture</th>
//                <th className="border p-2">status</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {testimonials.length === 0 ? (
//               <tr><td colSpan="5" className="text-center p-4">No testimonials found</td></tr>
//             ) : (
//               testimonials.map((item) => (
//                 <tr key={item.id} className="text-center">
//                   <td className="border p-2">{item.id}</td>
//                   <td className="border p-2">
//                     <div className="font-bold">{item.client_name}</div>
//                     <div className="text-xs text-gray-500">{item.company}</div>
//                   </td>




                 


//                    <td className="border p-3 text-sm text-left max-w-[300px]">
//                       <div className="line-clamp-2 text-gray-500" title={item.quote.replace(/<[^>]*>/g, "")}>
//                         {truncateDescription(item.quote, 50)}
//                       </div>
//                     </td>
                  
//                   <td className="border p-2">
//                     <Image
//                       src={item.picture_url || "/placeholder.png"} // Added fallback
//                       alt={item.client_name}
//                       width={56}
//                       height={56}
//                       className="h-10 w-10 rounded-full mx-auto object-cover"
//                     />
//                   </td>

//                   {/* REUSABLE STATUS BADGE */}
//                                         <td className="border p-3">
//                                           <StatusBadge status={item.status} />
//                                         </td>

//                   <td className="border p-2">
//                     <div className="flex justify-center gap-3">
//                       <EditTestimonial testimonial={item} />
//                       <DeleteConfirm id={item.id} />
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { MessageSquare } from "lucide-react"; // Header icon

import AddTestimonial from "./AddTestimonial";
import DeleteConfirm from "./DeleteConfirm";
import EditTestimonial from "./EditTestimonial";
import { truncateDescription } from "@/lib/wordcut";
import StatusBadge from "@/components/StatusToggle";

export default async function TestimonialsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch testimonials");

  const response = await res.json();
  const testimonials = response?.data ?? [];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER SECTION - Consistent with other dashboard pages */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <MessageSquare className="text-blue-600" />
            Testimonials
          </h1>
          <p className="text-gray-500 mt-1">Manage client feedback and success stories.</p>
        </div>
        <AddTestimonial />
      </div>

      {/* TABLE CONTAINER - Modern Card Style */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr.No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Quote</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Picture</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                    No testimonials found. Click "Add Testimonial" to start.
                  </td>
                </tr>
              ) : (
                testimonials.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-base">{item.client_name}</span>
                        <span className="text-xs text-gray-500 italic">{item.company}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div 
                        className="text-sm text-gray-500 line-clamp-2 max-w-[300px]" 
                        title={item.quote?.replace(/<[^>]*>/g, "")}
                      >
                        {truncateDescription(item.quote, 50)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="h-12 w-12 mx-auto border-2 border-gray-50 rounded-full overflow-hidden shadow-sm">
                        <Image
                          src={item.picture_url || "/placeholder.png"}
                          alt={item.client_name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <EditTestimonial testimonial={item} />
                        <DeleteConfirm id={item.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}