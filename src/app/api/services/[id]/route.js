// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export async function PUT(req, { params }) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }
//   // Await params in Next.js 15+
//   const { id } =  params;
//   try {
//     const formData = await req.formData();

//    const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/our-services/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           // Pass the Bearer token for backend authentication
//           Authorization: `Bearer ${session.user.accessToken}`,
//           // Note: DO NOT set 'Content-Type' manually. 
//           // The browser/server will automatically set it with the boundary string.
//         },
//         body: formData, 
//       }
//     );

//     const data = await res.json();
//     console.log("Response Data:", data);
//     return Response.json(data, { status: res.status });
//   } catch (error) {
//     return Response.json(
//       { message: error.message || "Server Error" },
//       { status: 500 }
//     );
//   }
// }









import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params; // Ensure you await params in Next.js 15
  
  try {
    const formData = await req.formData();

    // We forward the request as POST to the backend. 
    // The backend will see the '_method' => 'PUT' inside the formData and handle it correctly.
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/our-services/${id}`,
      {
        method: "PUT", // Use POST to ensure multipart/form-data is parsed correctly
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          // No Content-Type header here
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
      `${process.env.NEXT_PUBLIC_API_URL}/our-services/${id}`,
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