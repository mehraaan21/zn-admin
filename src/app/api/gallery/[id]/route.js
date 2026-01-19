import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req, { params }) {
  console.log(">>> [API] Received PUT request");

  const session = await getServerSession(authOptions);

  // Check if session exists and has the token
  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Await params (Required for Next.js 15)
    const { id } = await params;
    console.log(">>> [API] Updating ID:", id);

    // 2. Get the FormData from the frontend request
    const formData = await req.formData();

    // 3. Forward the exact FormData to your external Backend
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/imagegallery/${id}`;
    
    const res = await fetch(backendUrl, {
      method: "POST", // 👈 NOTE: Many backends (like Laravel) require POST + _method=PUT for files
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        // DO NOT set 'Content-Type' manually
      },
      body: formData, 
    });

    const data = await res.json();
    console.log(">>> [API] Backend response:", data);

    return Response.json(data, { status: res.status });

  } catch (error) {
    console.error(">>> [API] Error:", error);
    return Response.json({ message: "Server Error", error: error.message }, { status: 500 });
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
      `${process.env.NEXT_PUBLIC_API_URL}/imagegallery/${id}`,
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