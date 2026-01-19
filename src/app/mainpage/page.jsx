

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/log-in");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-5 m-2 text-3xl">
      <h1>Dashboard</h1>
      <p>Welcome {session?.user?.email}</p>
      <h4> Please navigate throw navbar</h4>
    </div>
  );
}

