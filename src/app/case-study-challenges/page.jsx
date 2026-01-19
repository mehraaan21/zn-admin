import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CaseStudyChallengesClient from "./CaseStudyChallengesClient";

export default async function CaseStudyChallengesPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  // ✅ FIX HERE
  const { id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case-studies/4/challenges`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("API FAILED:", res.status);
    throw new Error("Failed to fetch case study challenges");
  }

  const response = await res.json();
  console.log("CHALLENGES API RESPONSE:", response);

  const challenges = Array.isArray(response?.data)
  ? response.data
  : [];
  console.log("CHALLENGES ARRAY:", challenges);

  return (
    <CaseStudyChallengesClient
      challenges={challenges}
      caseStudyId={id}
    />
  );
}
