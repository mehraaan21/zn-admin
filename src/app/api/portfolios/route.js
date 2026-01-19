// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export const runtime = "nodejs";


// export async function POST(req) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     // IMPORTANT: FormData (image upload)
//     const formData = await req.formData();

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/portfolios`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${session.user.accessToken}`,
//           // ❌ DO NOT set Content-Type manually
//         },
//         body: formData,
//       }
//     );

//     const data = await res.json();
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

export const runtime = "nodejs";

export async function POST(req) {
  try {
    console.log("➡️ API HIT");

    const session = await getServerSession(authOptions);
    console.log("➡️ SESSION:", session?.user?.accessToken ? "OK" : "NO TOKEN");

    if (!session?.user?.accessToken) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("➡️ BEFORE formData()");
    const formData = await req.formData(); // ❗ crashing line usually
    console.log("➡️ AFTER formData()");

    console.log(
      "➡️ IMAGE:",
      formData.get("image")?.name,
      formData.get("image")?.size
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/portfolios`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: formData,
      }
    );

    const data = await res.json();
    console.log("➡️ BACKEND RESPONSE:", data);

    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error("❌ API CRASH:", error);
    return Response.json(
      { message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
