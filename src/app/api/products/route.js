// app/api/service/route.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const token = session?.user?.accessToken;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const res = await fetch(`${process.env.API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return Response.json(data, { status: res.status });
}
