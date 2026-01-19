


// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@/lib/auth";

// // export async function GET() {
// //   const session = await getServerSession(authOptions);

// //   if (!session?.user?.accessToken) {
// //     return Response.json({ message: "Unauthorized" }, { status: 401 });
// //   }

// //   const res = await fetch(
// //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials`,
// //     {
// //       headers: {
// //         Authorization: `Bearer ${session.user.accessToken}`,
// //       },
// //     }
// //   );

// //   const data = await res.json();
// //   return Response.json(data);
// // }


// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// /* =========================
//    GET → Fetch testimonials
//    ========================= */
// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials`,
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
//    POST → Add new testimonial
//    ========================= */
// export async function POST(req) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const body = await req.json();

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials`,
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
// //   console.log(" this is post data",data.name);
//   return Response.json(data, { status: res.status });
// }



import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidateTag } from "next/cache";

/* =========================
   GET → Fetch testimonials
   ========================= */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        cache: "no-store",
        next: { tags: ["testimonials"] },
      }
    );

    if (!res.ok) {
      return Response.json(
        { message: "Failed to fetch testimonials" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

/* =========================
   POST → Add new testimonial
   ========================= */
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body?.name || !body?.message) {
      return Response.json(
        { message: "Name and message are required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      return Response.json(
        { message: "Failed to create testimonial" },
        { status: res.status }
      );
    }

    const data = await res.json();

    revalidateTag("testimonials"); // 🔥 auto refresh server data

    return Response.json(data, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
