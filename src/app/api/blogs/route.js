import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          // ❌ DO NOT set Content-Type for FormData
        },
        body: formData,
      }
    );

    const data = await res.json();
    console.log("API Response:", data);

    if (!res.ok) {
      return Response.json(data, { status: res.status });
    }

    
    return Response.json(data, { status: res.status });
  } catch (error) {
    return Response.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
