import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    
    // FormData ko directly backend bhejne ke liye hume req.blob() 
    // ya request ka body stream use karna pad sakta hai agar backend parse nahi kar pa raha.
    const formData = await req.formData();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/imagegallery/${id}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${session.user.accessToken}`,
          // CONTENT-TYPE KO BILKUL TOUCH NA KAREIN
        },
        body: formData, // Next.js automatically boundary set kar dega
      }
    );

    // Agar backend JSON nahi bhej raha to res.json() fail ho jayega
    const data = await res.json();
    console.log(data);
    
    return Response.json(data, { status: res.status });

  } catch (error) {
    console.error("Route Error:", error);
    return Response.json({ 
      message: "Server Error", 
      details: error.message 
    }, { status: 500 });
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