

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    // ✅ Rebuild FormData fresh — Next.js FormData doesn't forward cleanly to external APIs
    const newFormData = new FormData();

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // ✅ Re-attach file as Blob with correct type
        const arrayBuffer = await value.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: value.type });
        newFormData.append(key, blob, value.name);
        console.log(`[FILE] ${key}: ${value.name} (${value.size} bytes, ${value.type})`);
      } else {
        newFormData.append(key, value);
        console.log(`[FIELD] ${key}: "${value}"`);
      }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
         "Accept": "application/json"
        // ✅ Do NOT set Content-Type — let fetch set multipart boundary automatically
      },
      body: newFormData,
    });

    console.log("External API status:", res.status);

    // ✅ Handle non-JSON responses safely
    const contentType = res.headers.get("content-type") || "";
    console.log(res.headers);
    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.error("Non-JSON response from API:", text);
      return Response.json(
        { message: `API Error ${res.status}: Server returned non-JSON response` },
        { status: res.status }
      );
    }

    console.log("API Response:", JSON.stringify(data));

    return Response.json(data, { status: res.status });

  } catch (error) {
    console.error("Route error:", error.message);
    return Response.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}