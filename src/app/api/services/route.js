

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    console.log("form data", formData);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/our-services`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          // ❗ DO NOT SET Content-Type for FormData
        },
        body: formData,
      }
    );

    // 🔥 SAFEST WAY — read text first
    const text = await res.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("🚨 Backend returned NON JSON:");
      console.error(text); // <-- YOU WILL SEE REAL ERROR HERE

      return Response.json(
        {
          message:
            "Backend crashed or returned HTML. Check terminal.",
        },
        { status: 500 }
      );
    }

    return Response.json(data, { status: res.status });

  } catch (error) {
    console.error("❌ API CRASH:", error);

    return Response.json(
      { message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

