

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.accessToken) {
//       return Response.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const formData = await req.formData();
//     console.log("form data", formData);

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/our-services`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${session.user.accessToken}`,
//           // ❗ DO NOT SET Content-Type for FormData
//         },
//         body: formData,
//       }
//     );

//     // 🔥 SAFEST WAY — read text first
//     const text = await res.text();

//     let data;

//     try {
//       data = JSON.parse(text);
//     } catch {
//       console.error("🚨 Backend returned NON JSON:");
//       console.error(text); // <-- YOU WILL SEE REAL ERROR HERE

//       return Response.json(
//         {
//           message:
//             "Backend crashed or returned HTML. Check terminal.",
//         },
//         { status: 500 }
//       );
//     }

//     return Response.json(data, { status: res.status });

//   } catch (error) {
//     console.error("❌ API CRASH:", error);

//     return Response.json(
//       { message: error.message || "Server Error" },
//       { status: 500 }
//     );
//   }
// }



import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    // 🔥 LOG ALL INCOMING FORM DATA PROPERLY
    console.log("========= INCOMING FORM DATA =========");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.log("======================================");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/our-services`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          Accept: "application/json",
        },
        body: formData,
        duplex: "half", // ✅ REQUIRED in Next App Router
      }
    );

    console.log("Backend Status:", res.status);
    console.log(
      "Backend Content-Type:",
      res.headers.get("content-type")
    );

    // 🔥 ALWAYS READ RAW TEXT FIRST
    const rawText = await res.text();

    console.log("========= BACKEND RAW RESPONSE =========");
    console.log(rawText);
    console.log("=========================================");

    let data;

    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      console.error("❌ Backend did NOT return JSON");
      return Response.json(
        {
          message: "Backend returned HTML or crashed.",
          raw: rawText.substring(0, 500),
        },
        { status: 500 }
      );
    }

    return Response.json(data, { status: res.status });

  } catch (error) {
    console.error("❌ API ROUTE CRASH:", error);
    return Response.json(
      { message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}