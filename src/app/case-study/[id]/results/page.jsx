import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ResultsTable from "./ResultsTable"; // ⭐ client component

export default async function ResultsPage({ params }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

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
    throw new Error("Failed to fetch results");
  }

  const jsonData = await res.json();
  console.log("RESULTS API RESPONSE:", jsonData);

  return (
    <ResultsTable
      data={jsonData.data}
      caseStudyId={id}
      token={session.user.accessToken}
    />
  );
}