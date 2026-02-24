


import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req, { params }) {
    // 1. Ensure params are awaited (required in newer Next.js versions)
    const { id } = await params; 

    const session = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}/tech-stacks`,
            {
                method: "POST",
                headers: {
                    // ⭐ IMPORTANT: REMOVE 'Content-Type' if you had it.
                    // Keep ONLY Authorization. fetch will handle the boundary.
                    Authorization: `Bearer ${session.user.accessToken}`,
                },
                body: formData,
            }
        );

        // Attempt to parse response safely
        const data = await res.json().catch(() => ({ message: "Invalid JSON response from API" }));

        if (!res.ok) {
            console.error("Post API Error Detail:", data);
            return Response.json(data, { status: res.status });
        }

        return Response.json(data, { status: res.status });

    } catch (error) {
        console.error("POST TECH STACK ERROR:", error);
        return Response.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export const config = {
  api: {
    bodyParser: false, // Disables standard body parser for custom handling
  },
};

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";



// export async function POST(req, { params }) {

//     const { id } = await params; // ⭐⭐⭐ THIS WAS MISSING

//     const session = await getServerSession(authOptions);

//     if (!session?.user?.accessToken) {
//         return Response.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     try {

//         const formData = await req.formData();

//         const res = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}/tech-stacks`,
//             {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${session.user.accessToken}`,
//                 },
//                 body: formData,
//             }
//         );

//         const data = await res.json();

//         if (!res.ok) {
//             console.log("Post API Error:", data);
//             return Response.json(data, { status: res.status });
//         }

//         return Response.json(data, { status: res.status });

//     } catch (error) {

//         console.error("POST TECH STACK ERROR:", error);

//         return Response.json(
//             { message: error.message || "Server error" },
//             { status: 500 }
//         );
//     }
// }


// // Post case-study Tech-stacks
// export async function POST(req) {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.accessToken) {
//         return Response.json({ message: "Unauthorized" }, { status: 401 });
//     }



//     try {
       
//         const formData = await req.formData();


//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}/tech-stacks`, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${session.user.accessToken}`,
//             },
//             body: formData,
//         });

//         // const data = await res.text();
//          const data = await res.json();
//         console.log("API Response:", data);
        

//         if (!res.ok) {
            
//         console.log("Post API Error:", data);
//       return Response.json(data, { status: res.status });
//     }

//         return Response.json(data, { status: res.status });

//     } catch (error) {
//         console.error("Error in POST /api/case-studies / testimonials:", error);
//         return Response.json(
//             { message: error.message || "Server error" },
//             { status: 500 }
//         );
//     }
// }




// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export async function POST(req) {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.accessToken) {
//         return Response.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     try {
       
//         const formData = await req.formData();

//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/case-studies`, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${session.user.accessToken}`,
//             },
//             body: formData,
//         });

//         const data = await res.json();
//         console.log("API Response:", data);
        

//         if (!res.ok) {
//       return Response.json(data, { status: res.status });
//     }

//         return Response.json(data, { status: res.status });

//     } catch (error) {
//         console.error("Error in POST /api/case-studies:", error);
//         return Response.json(
//             { message: error.message || "Server error" },
//             { status: 500 }
//         );
//     }
// }





// Delete case-study tech-stacks

// export async function DELETE(req, { params }) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     return Response.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   // Await params in Next.js 15+
//   const { id } = await params;

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/case-studies/tech-stacks/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${session.user.accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Response from API:", res);

//     if (!res.ok) {
//       const errorData = await res.json();
//       console.error("Delete API Error:", errorData);
//       return Response.json(errorData, { status: res.status });
//     }

//     return Response.json({ message: "Deleted successfully" }, { status: 200 });
//   } catch (error) {
//     return Response.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }
