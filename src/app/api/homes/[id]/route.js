
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";



// // PUT -> Update existing job
// export async function PUT(req, { params }) {
//   console.log("🔵 PUT /api/home/[id] HIT");

//   // 1️⃣ Session check
//   const session = await getServerSession(authOptions);
//   console.log("🟡 Session:", session);

//   if (!session?.user?.accessToken) {
//     console.error("🔴 Unauthorized access");
//     return Response.json(
//       { message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   try {
//     // 2️⃣ Params
//     const { id } = await params;
//     console.log("🟢 Params ID:", id);

//     // 3️⃣ Request body
//     const body = await req.json();
//     console.log("🟢 Request Body:", body);

//     // 4️⃣ External API call
//     console.log("🟠 Calling API:", `${process.env.NEXT_PUBLIC_API_URL}/home/${id}`);

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/home/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session.user.accessToken}`,
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     console.log("🟠 External API Status:", res.status);

//     // 5️⃣ API response
//     const data = await res.json();
//     console.log("🟢 External API Response:", data);

//     // 6️⃣ Final response to frontend
//     return Response.json(data, { status: res.status });

//   } catch (error) {
//     console.error("❌ PUT API ERROR:", error);

//     return Response.json(
//       { message: "Server Error", error: error.message },
//       { status: 500 }
//     );
//   }
// }




import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// PUT -> Update existing home entry
export async function PUT(req, { params }) {
  console.log("🔵 PUT /api/home/[id] HIT");

  // 1️⃣ Session check
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    console.error("🔴 Unauthorized access");
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // 2️⃣ Params (Await for Next.js 15 compatibility)
    const { id } = await params;
    console.log("🟢 Params ID:", id);

    // 3️⃣ Capture the incoming data
    // If your frontend sends FormData (for images/files), use req.formData()
    // If your frontend sends pure JSON, keep req.json()
    // Based on your working example, we will use formData:
    const formData = await req.formData();
    console.log("🟢 FormData captured");

    // 4️⃣ External API call
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/home/${id}`;
    console.log("🟠 Calling API:", apiUrl);

    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        // Pass the Bearer token for backend authentication
        Authorization: `Bearer ${session.user.accessToken}`,
        // IMPORTANT: Do NOT set 'Content-Type' when sending FormData.
        // The fetch API will automatically set it with the correct boundary.
      },
      body: formData, 
    });

    console.log("🟠 External API Status:", res.status);

    // 5️⃣ API response
    const data = await res.json();
    
    // 6️⃣ Final response to frontend
    return Response.json(data, { status: res.status });

  } catch (error) {
    console.error("❌ PUT API ERROR:", error);
    return Response.json(
      { message: "Server Error", error: error.message },
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