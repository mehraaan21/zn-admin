import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CaseStudyResultsClient from "./CaseStudyResultsClient";

export default async function CaseStudyResultsPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const { id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}/results`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch case study results");
  }

  const response = await res.json();
  console.log("Results API RESPONSE:", response);

  // ✅ TAKE FIRST RESULT
  const result = response?.data?.[0] || null;
  console.log("RESULT OBJECT:", result);

  return (
    <CaseStudyResultsClient
      result={result}
      caseStudyId={id}
    />
  );
}
