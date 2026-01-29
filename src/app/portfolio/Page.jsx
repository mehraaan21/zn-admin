import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import PortfolioClient from "./PortfolioClient";

export default async function PortfolioPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/portfolios`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch portfolios");
  }

  const response = await res.json();

  const portfolios = Array.isArray(response?.data)
    ? response.data
    : [];

    console.log("Fetched portfolios:", portfolios.data);

  return <PortfolioClient portfolios={portfolios} />;
}
