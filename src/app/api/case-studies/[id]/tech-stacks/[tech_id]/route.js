
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// UPDATE TECH STACK
export async function PUT(req, { params }) {

  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  // ✅ CORRECT PARAM EXTRACTION
  const { id, tech_id } = params;

  // 🔥 Add guard (VERY important)
  if (!id || !tech_id) {
    return Response.json(
      { message: "Missing caseStudyId or tech_id" },
      { status: 400 }
    );
  }

  try {

    const formData = await req.formData();

    // ✅ Correct external API
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}/tech-stacks/${tech_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    return Response.json(data, { status: res.status });

  } catch (error) {

    console.error("UPDATE TECH ERROR:", error);

    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}




// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";


// // Edit --> Update case study Tech-stacks 

// export async function PUT(req, { params }) {
//   const session = await getServerSession(authOptions);
//   const { tech_id } = await params;

//   if (!session?.user?.accessToken) return Response.json({ message: "Unauthorized" }, { status: 401 });

//   try {
//     const formData = await req.formData();
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/case-studies/${tech_id}/tech-stacks`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${session.user.accessToken}` },
//       body: formData,
//     });
//     const data = await res.json();
//     return Response.json(data, { status: res.status });
//   } catch (error) {
//     return Response.json({ message: error.message }, { status: 500 });
//   }
// }

// export async function DELETE(req, { params }) {
//   const session = await getServerSession(authOptions);
//   const { tech_id } = await params;

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/case-study/tech-stacks/${tech_id}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${session.user.accessToken}` },
//   });
//   return Response.json({ success: res.ok }, { status: res.status });
// }