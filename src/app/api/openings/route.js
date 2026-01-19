


// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/opening`,
//     {
//       headers: {
//         Authorization: `Bearer ${session.user.accessToken}`,
//       },
//     }
//   );

//   const data = await res.json();
//   return Response.json(data);
// }






// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// /* =========================
//    GET → Fetch all openings
//    ========================= */
// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/opening`,
//     {
//       headers: {
//         Authorization: `Bearer ${session.user.accessToken}`,
//       },
//       cache: "no-store",
//     }
//   );

//   const data = await res.json();
//   return Response.json(data, { status: res.status });
// }

// /* =========================
//    POST → Add new job
//    ========================= */
// export async function POST(req) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const body = await req.json();

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/opening`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${session.user.accessToken}`,
//       },
//       body: JSON.stringify(body),
//     }
//   );

//   const data = await res.json();
//   return Response.json(data, { status: res.status });
// }



import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/opening`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return Response.json(data, { status: res.status });
}







export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/opening`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  return Response.json(data, { status: res.status });
}
