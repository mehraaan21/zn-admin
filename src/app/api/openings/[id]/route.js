// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// /* =========================
//    PUT → Update job
//    ========================= */
// export async function PUT(req, { params }) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const body = await req.json();
//   const { id } = params;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/opening/${id}`,
//     {
//       method: "PUT",
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

// /* =========================
//    DELETE → Remove job
//    ========================= */
// export async function DELETE(req, { params }) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const { id } = params;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/opening/${id}`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${session.user.accessToken}`,
//       },
//     }
//   );

//   const data = await res.json();
//   return Response.json(data, { status: res.status });
// }



import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/opening/${id}`,
    {
      method: "PUT",
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



// delete 

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/opening/${params.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      
    }
    
  );

  

  const data = await res.json();
  return Response.json(data, { status: res.status });
}
