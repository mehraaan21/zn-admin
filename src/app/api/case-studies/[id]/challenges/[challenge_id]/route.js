import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Edit ---> update case-study-challenges

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  const { challenge_id } = await params;

  if (!session?.user?.accessToken) return Response.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${challenge_id}`, {
      method: "PUT",
      headers: { 
        "Authorization": `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}


