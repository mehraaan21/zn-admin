
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";




// Post case-study testimonials
export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.accessToken) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }



    try {
       
        const formData = await req.formData();

            for (const [key, value] of formData.entries()) {
    console.log(" check here", key, value);
}

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/case-studies/testimonials`, {
            method: "POST",
            headers: {
              Accept: "application/json",
                Authorization: `Bearer ${session.user.accessToken}`,
            },
            body: formData,
        });

        // const data = await res.text();
         const data = await res.json();
        console.log("API Response:", data);
        

        if (!res.ok) {
            
        console.log("Post API Error:", data);
      return Response.json(data, { status: res.status });
    }

        return Response.json(data, { status: res.status });

    } catch (error) {
        console.error("Error in POST /api/case-studies / testimonials:", error);
        return Response.json(
            { message: error.message || "Server error" },
            { status: 500 }
        );
    }
}




// Delete case-study testimonials

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Await params in Next.js 15+
  const { id } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/case-studies/testimonials/${id}`,
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
      console.error("Delete API Error:", errorData);
      return Response.json(errorData, { status: res.status });
    }

    return Response.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
