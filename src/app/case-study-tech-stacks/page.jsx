// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";

// export default async function CaseStudytechstacksPage({ params }) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     redirect("/log-in");
//   }

//   const { id } = params;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}/tech-stacks`,
    
//     {
//       headers: {
//         Authorization: `Bearer ${session.user.accessToken}`,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch case study tech stacks");
//   }

//   const response = await res.json();
//   console.log("Tech stacks API RESPONSE:", response);

//   // API returns SINGLE object
//   const result = response?.data.tech || null;
//   console.log("RESULT OBJECT:", result);
  

  

//   // return (
//   //   <CaseStudyResultsClient
//   //     result={result}
//   //     caseStudyId={id}
//   //   />
//   // );
// }


import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
// import CaseStudyTechStacksClient from "./CaseStudyTechStacksClient";

export default async function CaseStudytechstacksPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const { id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tech-stacks`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch case study");
  }

  const response = await res.json();
  console.log("TECH STACKS API RESPONSE:", response);

  // ✅ Correct extraction
  const techStacks = response?.data?.TechStacks || [];

  console.log("TECH STACKS:", techStacks);

  // return (
  //   <CaseStudyTechStacksClient
  //     techStacks={techStacks}
  //     caseStudyId={id}
  //   />
  // );
}
