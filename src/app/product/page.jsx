import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import OurProductsClient from "./OurProductsClient";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`, 
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const response = await res.json();

console.log("RAW RESPONSE:", response);

const products = Array.isArray(response)
  ? response
  : Array.isArray(response.data)
  ? response.data
  : [];
  return <OurProductsClient products={products} />;
}


