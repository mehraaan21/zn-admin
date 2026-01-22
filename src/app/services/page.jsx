import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ServicesClient from "./ServicesClient";
import ServiceModernView from "./ServicesClient";

export default async function OurServicesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/our-services`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch services");


  const response = await res.json();
  
  // Response check karein: { success: true, message: "...", data: { data: [], total: 6... } }
  const servicesData = response?.data || { data: [], total: 0 };


 return <ServicesClient services={servicesData} />;
}
