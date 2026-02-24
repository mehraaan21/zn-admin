import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("➡️ SPECIALIZATION API HIT");
    console.log("➡️ SESSION TOKEN:", session?.user?.accessToken ? "OK" : "NO TOKEN");

    console.log("➡️ BEFORE formData()");
    const formData = await req.formData();
    console.log("➡️ AFTER formData()", {
      hasImage: !!formData.get("image"),
    });

    // Development-only: allow expired certificates when calling external API
    if (process.env.NODE_ENV === "development") {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ourspecialization`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        // ❌ DO NOT set Content-Type for FormData
      },
      body: formData,
    });

    // Reset TLS behavior after the request in development
    if (process.env.NODE_ENV === "development") {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
    }

    const data = await res.json();
    console.log("➡️ BACKEND RESPONSE:", data);

    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error("❌ SPECIALIZATION API ERROR:", error);
    if (error.cause) console.error("❌ CAUSE:", error.cause);
    return Response.json({ message: error.message || "Server error" }, { status: 500 });
  }
}
