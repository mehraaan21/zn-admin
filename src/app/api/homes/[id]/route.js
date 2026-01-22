import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const formData = await req.formData();

    const files = formData.getAll("images[]");
    console.log("Files to be sent to backend:", files.length);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/home/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: formData,
      }
    );

    const home = await res.json();
    return Response.json(home, { status: res.status });
  } catch (error) {
    return Response.json(
      { message: error.message || "Server Error" },
      { status: 500 }
    );
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
      `${process.env.NEXT_PUBLIC_API_URL}/home/${id}`,
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