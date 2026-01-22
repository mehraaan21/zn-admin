

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import OpeningTable from "./OpeningTable";

export default async function CareerPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("Unauthorized");
  }

  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${NEXT_PUBLIC_API_URL}/opening`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch openings");
  }

  const response = await res.json();
  console.log(response.data[0]);


  //  const response = await res.json();
  // console.log(response.data[0].position);
  // return;

  // ✅ Normalize data
  const openings = Array.isArray(response)
    ? response
    : response.data || response.openings || [];

  // return (
  //   <div>
  //     <h1>Job Openings</h1>

  //     {openings.length === 0 && <p>No openings found</p>}

  //     {openings.map((job) => (
  //       <p key={job.id}>{job.title}</p>
  //     ))}
  //   </div>
  // );
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Openings</h1>

      <OpeningTable openings={openings} />
    </div>
  );
}
