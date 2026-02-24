import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

 try {
  // ✅ Remove the broken log, declare first then log
  const formData = await req.formData();
  console.log("formdata after", formData); // this one is fine

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/portfolios/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: formData,
      duplex: "half",
    }
  );

  const data = await res.json();
  console.log("api hit", data);

  return Response.json(data, { status: res.status });
} catch (error) {
  console.log("error:", error.message); // add this to see future errors clearly
  return Response.json(
    { message: error.message || "Server Error" },
    { status: 500 }
  );
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
      `${process.env.NEXT_PUBLIC_API_URL}/portfolios/${id}`,
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