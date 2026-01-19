// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import CaseStudyTestimonialsClient from "./CaseStudyTestimonialsClient";

// export default async function CaseStudyTestimonialsPage({ params }) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     redirect("/log-in");
//   }

//   const { id } = params;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}/testimonials`,
//     {
//       headers: {
//         Authorization: `Bearer ${session.user.accessToken}`,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch case study testimonials");
//   }

//   const response = await res.json();

//   // ✅ SINGLE OBJECT
//   const testimonial = response?.data ?? null;

//   return (
//     <CaseStudyTestimonialsClient
//       testimonial={testimonial}
//       caseStudyId={id}
//     />
//   );
// }



import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CaseStudyTestimonialsClient from "./CaseStudyTestimonialsClient";

export default async function CaseStudyTestimonialsPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const { id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case-studies/1/testimonials`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  const response = await res.json();
  console

  /**
   * API returns SINGLE object
   * Convert to array for table consistency
   */
  const testimonials = response?.data ? [response.data] : [];

  return (
    <CaseStudyTestimonialsClient
      testimonials={testimonials}
      caseStudyId={id}
    />
  );
}
