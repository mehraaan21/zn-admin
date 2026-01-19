import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/* =========================
   PUT → Update testimonial
   ========================= */
export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials/${id}`,
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
}

/* =========================
   DELETE → Remove testimonial
   ========================= */
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    }
  );

  const data = await res.json();
  return Response.json(data, { status: res.status });
}
