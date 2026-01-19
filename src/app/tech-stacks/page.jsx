import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TechStacksClient from "./TechStacksClient";

export default async function TechStacksPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

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
    throw new Error("Failed to fetch tech stacks");
  }

  const response = await res.json();

  // ✅ GUARANTEE ARRAY
  const techStacks = Array.isArray(response)
    ? response
    : response?.data ?? [];

  return <TechStacksClient techStacks={techStacks} />;
}
