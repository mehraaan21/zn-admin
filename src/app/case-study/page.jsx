import CaseStudyClient from "./CaseStudyClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CaseStudyPage({ searchParams }) {

  console.log("CaseStudyClient:", CaseStudyClient);

  
 
  const params = await searchParams;
  console.log(params)
  // const page = Number(params?.page ?? 1);

  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case-studies`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch case studies");
  }

  const result = await res.json();
  console.log("CASE STUDY PAGE API RESPONSE:", result);

  // return (
  //       <CaseStudyClient />
  // );
}
