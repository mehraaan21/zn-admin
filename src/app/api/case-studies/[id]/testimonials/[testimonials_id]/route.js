
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


/* =========================
   PUT → Edit case-study-rsesults
   ========================= */


export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  // Await params in Next.js 15+
  const { testimonials_id } = await params;
  try {
    const formData = await req.formData();

   const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case-studies/testimonials/${testimonials_id}`,
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
    console.log("API Response:", data);
    return Response.json(data, { status: res.status });
  } catch (error) {
    return Response.json(
      { message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}





// export async function PUT(req, { params }) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   // Ensure this name matches your folder name: [testimonial_id]
//   const { testimonial_id } = await params; 

//   try {
//     const formData = await req.formData();

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/case-studies/testimonials/${testimonial_id}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${session.user.accessToken}`,
//         },
//         body: formData, 
//       }
//     );

//     const data = await res.json();
//     return Response.json(data, { status: res.status });
//   } catch (error) {
//     return Response.json({ message: error.message }, { status: 500 });
//   }
// }



// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";


// /* =========================
//    PUT → Edit case-study-rsesults
//    ========================= */

// export async function PUT(req, { params }) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }
//   // Await params in Next.js 15+
//    const { testimonial_id } = await params; 
//   try {
//     const formData = await req.formData();

//    const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/case-studies/testimonials/${testimonial_id}`,
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
//     console.log("API Response:", data);
//     return Response.json(data, { status: res.status });
//   } catch (error) {
//     return Response.json(
//       { message: error.message || "Server Error" },
//       { status: 500 }
//     );
//   }
// }

