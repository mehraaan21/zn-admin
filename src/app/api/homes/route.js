import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Parse the incoming request as FormData
    const formData = await req.formData();

    // 2. Debugging: Match the logic in your PUT route to verify files are present
    const files = formData.getAll("images[]");
    console.log("POST: Files to be sent to backend:", files.length);

    // 3. Forward to the external API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        // IMPORTANT: Never set Content-Type for FormData; 
        // fetch auto-sets it with the necessary boundary.
      },
      body: formData, 
    });

    const data = await res.json();

    if (!res.ok) {
      // Log the exact validation error from the backend (e.g., Laravel/Node error)
      console.log("POST API Error Details:", data);
      return Response.json(data, { status: res.status });
    }

    return Response.json(data, { status: 201 });
  } catch (error) {
    console.error("POST Route Handler Error:", error);
    return Response.json(
      { message: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}











// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export async function POST(req) {
//   // 1. YOU MUST DEFINE SESSION AT THE TOP
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const formData = await req.formData();
//     console.log(formData);

//     // The error happened here because 'session' was either 
//     // defined inside the try or not defined at all.
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${session.user.accessToken}`, 
//         "Accept": "application/json",
//       },
//       body: formData,
//     });
   

//     // Handle HTML vs JSON response to avoid the "Unexpected token <" error
//     const contentType = res.headers.get("content-type");
//     if (contentType && contentType.includes("application/json")) {
//       const data = await res.json();
//       return Response.json(data, { status: res.status });
//     } else {
//       const errorText = await res.text();
//       console.error("Backend Error :", errorText);
//       return Response.json({ message: "Backend Error" }, { status: res.status });
//     }

//   } catch (error) {
//     console.error("POST Route Handler Error:", error);
//     return Response.json({ message: error.message }, { status: 500 });
//   }
// }