
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import GalleryClient from "./GalleryClient";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/imagegallery`,
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
  const gallery = Array.isArray(response)
    ? response
    : response?.data ?? [];
    console.log("Image Gallery data:", gallery);

   return <GalleryClient gallery={gallery} />;
}
