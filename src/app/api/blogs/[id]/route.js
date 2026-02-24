

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Await params (Critical for Next.js 15+)
    const { id } = await params;

    // 2. Capture the incoming FormData
    const formData = await req.formData();
    console.log(formData);
    

    // 3. Forward to Backend
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`,
      {
        method: "PUT",
        headers: {
          // Pass the Bearer token for backend authentication
          Authorization: `Bearer ${session.user.accessToken}`,
          // Note: DO NOT set 'Content-Type' manually. 
          // The browser/server will automatically set it with the boundary string.
        },
        body: formData, 
      }
    );
    

    const blog = await res.json();
    console.log(blog, "api hit")
    return Response.json(blog, { status: res.status });

  } catch (error) {
    console.error("Route Error:", error);
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
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
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`,
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