


import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Add ---> Post case study challenges

export async function POST(req, { params }) {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.accessToken) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = params; // caseStudyId from URL
        const formData = await req.formData();

        // Forward request to your external backend
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
                // Multipart boundary automatic set ho jati hai browser/next se
            },
            body: formData,
        });

        // Parse response data safely
        const data = await res.json();

        if (!res.ok) {
            console.error("External API Error:", data);
            return Response.json(data, { status: res.status });
        }

        return Response.json(data, { status: 200 });

    } catch (error) {
        console.error("Error in POST /api/case-studies/challenges:", error);
        return Response.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}



// Delete case-study challenges

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Await params in Next.js 15+
  const { id } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    console.log("Response from API:", res);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Delete API Error:", errorData);
      return Response.json(errorData, { status: res.status });
    }

    return Response.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
