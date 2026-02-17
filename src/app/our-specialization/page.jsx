import SpecializationTable from "./SpecializationTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AddSpecialization from "./AddSpecialization";

export default async function OurSpecializationPage() {
  const session = await getServerSession(authOptions);

  // 🔒 Protect page
  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ourspecialization`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.error("API STATUS:", res.status);
    throw new Error("Failed to fetch specializations");
  }

  const result = await res.json();

  // API shape: { data: [...], success, message }
  const specializations = Array.isArray(result.data) ? result.data : [];

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Our Specializations</h1>
        <AddSpecialization />
      </div>

      <SpecializationTable data={specializations} />
    </div>
  );
}
