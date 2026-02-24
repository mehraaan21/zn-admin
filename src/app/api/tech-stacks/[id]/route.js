import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// export const runtime = "nodejs";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

      const formData = await req.formData();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tech-stacks/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        // 🔥 VERY IMPORTANT
        // "Content-Type": req.headers.get("content-type"),
      },
      // 🔥 RAW STREAM FORWARD
      body: formData,
      duplex: "half",
    }
  );

  const data = await res.json();
  console.log("api hit", data);
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

  // Await params in Next.js 15+
  const { id } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tech-stacks/${id}`,
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