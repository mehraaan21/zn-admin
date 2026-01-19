
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";



// PUT -> Update existing job
export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.accessToken)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { id } = params; // ❌ remove await
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/our-services/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch {
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}





// Delete the Data

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Await params in Next.js 15+
  const { id } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ourservices/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return Response.json(errorData, { status: res.status });
    }

    return Response.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}