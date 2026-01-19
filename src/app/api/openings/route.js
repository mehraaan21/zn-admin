
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// POST -> Create new job
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.accessToken) return Response.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opening`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (error) {
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}
