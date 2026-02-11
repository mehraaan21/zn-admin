import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


/* =========================
   PUT → Edit case-study         working well
   ========================= */

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  // Await params in Next.js 15+
  const { id } = await params;
  try {
    const formData = await req.formData();

   const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}`,
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

    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (error) {
    return Response.json(
      { message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}






/* =========================
   DELETE → Remove case-study
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
      `${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response from API:", res);

    if (!res.ok) {
      const errorData = await res.json();
      return Response.json(errorData, { status: res.status });
    }

    return Response.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}



