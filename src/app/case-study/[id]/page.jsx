// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@/lib/auth";
// // import { redirect } from "next/navigation";
// // import CaseStudyChallengesClient from "./CaseStudyChallengesClient";

// // export default async function CaseStudyChallengesPage({ params }) {
// //   const session = await getServerSession(authOptions);

// //   if (!session?.user?.accessToken) {
// //     redirect("/log-in");
// //   }

// //   // ✅ FIX HERE
// //   const { id } = params;

// //   const res = await fetch(
// //     `${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}/challenges`,
// //     {
// //       headers: {
// //         Authorization: `Bearer ${session.user.accessToken}`,
// //       },
// //       cache: "no-store",
// //     }
// //   );

// //   if (!res.ok) {
// //     console.error("API FAILED:", res.status);
// //     throw new Error("Failed to fetch case study challenges");
// //   }

// //   const response = await res.json();
// //   console.log("CHALLENGES API RESPONSE:", response);

// //   const challenges = Array.isArray(response?.data)
// //   ? response.data
// //   : [];
// //   console.log("CHALLENGES ARRAY:", challenges);

// //   return (
// //     <CaseStudyChallengesClient
// //       challenges={challenges}
// //       caseStudyId={id}
// //     />
// //   );
// // }



// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import TestimonialClient from "./TestimonialClient";

// export default async function ViewTestimonialPage({ params }) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.accessToken) redirect("/log-in");

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/testimonials/${params.id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${session.user.accessToken}`,
//       },
//       cache: "no-store",
//     }
//   );

//   const testimonial = await res.json();

//   return <TestimonialClient testimonial={testimonial} />;
// }


import Overview from "./components/Overview";
import Challenges from "./components/Challenges";
import TechStacks from "./components/TechStacks";
import Images from "./components/Images";
import Results from "./components/Results";
import Testimonials from "./components/Testimonials";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CaseStudyViewPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }
  
  

    const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case-studies/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  const response = await res.json();
  const data = response.data;
  console.log("CASE STUDY DATA:", data);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <Overview data={data} />
      <Challenges items={data.Challenges} />
      <TechStacks items={data.TechStacks} />
      <Images items={data.Images} />
      <Results data={data.Results} />
      <Testimonials data={data.Testimonials} />
    </div>
  );
}
