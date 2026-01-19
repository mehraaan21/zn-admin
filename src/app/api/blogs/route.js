// /src/app/api/blogs/route.js

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/blogs`;

    const token = process.env.ADMIN_API_TOKEN;
    if (!token) {
      return Response.json(
        { error: "Missing ADMIN_API_TOKEN in environment" },
        { status: 500 }
      );
    }

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      cache: "no-store"
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Backend API Error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      { error: "Proxy Server Error", details: error.message },
      { status: 500 }
    );
  }
}
