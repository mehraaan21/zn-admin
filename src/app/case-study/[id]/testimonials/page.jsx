// import Image from "next/image";
// import { MessageCircle } from "lucide-react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";


// export default async function Testimonial({ params }) {
//   const { id } = await params;

//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     redirect("/log-in");
//   }

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/case-studies/testimonials/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${session.user.accessToken}`,
//       },
//       cache: "no-store",
//     }
//   );

//   const jsonData = await res.json();
//   const data = jsonData?.data;

//   console.log("TESTIMONIALS API RESPONSE:", data);

//   if (!res.ok) {
//     throw new Error("Failed to fetch testimonials");
//   }

//   return (
//     <div className="max-w-5xl mx-auto py-12 px-6">
      
//       {/* PAGE TITLE */}
//       <h1 className="text-3xl font-bold mb-10 flex items-center gap-3">
//         <MessageCircle className="text-purple-600" />
//         Client Testimonials
//       </h1>

//       {!data && (
//         <p className="text-gray-500">No testimonials found.</p>
//       )}

//       <div className="space-y-8">
//         {/* If API returns single object */}
//         {data && !Array.isArray(data) && (
//           <TestimonialCard testimonial={data.Testimonials} />
//         )}

//         {/* If API returns array */}
//         {Array.isArray(data) &&
//           data.map((item) => (
//             <TestimonialCard
//               key={item.id}
//               testimonial={item.Testimonials || item}
//             />
//           ))}
//       </div>
//     </div>
//   );
// }

// /* ✅ Separate Clean Component */
// function TestimonialCard({ testimonial }) {
//   if (!testimonial) return null;

//   const hasImage =
//     testimonial.image_url &&
//     testimonial.image_url !==
//       "https://stage.znsoftech.com/api/v1/storage/";

//   return (
//     <div className="bg-white border shadow-sm rounded-3xl p-8 hover:shadow-lg transition">
      
//       <div className="flex items-start gap-5">
        
//         {/* IMAGE */}
//         {hasImage ? (
//           <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
//             <Image
//               src={testimonial.image_url}
//               alt="client"
//               fill
//               className="object-cover"
//             />
//           </div>
//         ) : (
//           <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-2xl">
//             💬
//           </div>
//         )}

//         {/* FEEDBACK */}
//         <div>
//           <p className="text-gray-700 leading-relaxed text-lg">
//             {testimonial.feedback}
//           </p>

//           <p className="text-sm text-gray-400 mt-3">
//             {new Date(testimonial.created_at).toLocaleDateString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TestimonialTable from "./TestimonialTable";

export default async function TestimonialPage({ params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case-studies/testimonials/${id}`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  const jsonData = await res.json();
  // Ensure we always pass an array to the client component
  const rawData = jsonData?.data;
  const testimonials = Array.isArray(rawData) 
    ? rawData 
    : rawData?.Testimonials 
      ? [rawData] 
      : [];

  if (!res.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  return (
    <TestimonialTable 
      data={testimonials} 
      caseStudyId={id} 
    />
  );
}