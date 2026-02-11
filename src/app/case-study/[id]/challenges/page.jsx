
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChallengesTable from "./ChallengesTable";

export default async function ChallengesPage({ params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}/challenges`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  const jsonData = await res.json();
  const challenges = jsonData?.data || [];

  return (
    <ChallengesTable 
      data={challenges} 
      caseStudyId={id} 
    />
  );
}