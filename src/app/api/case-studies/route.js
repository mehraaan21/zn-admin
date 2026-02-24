
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



import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.accessToken) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Parse the incoming form data from the client
        const formData = await req.formData();

        // Check if files exist to avoid empty body issues
        const banner = formData.get("banner");
        if (!banner) {
             return Response.json({ message: "Banner image is required" }, { status: 400 });
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/case-studies`, {
            method: "POST",
            headers: {
                // IMPORTANT: Do NOT add 'Content-Type': 'multipart/form-data'
                // fetch will auto-generate it with the correct boundary
                Authorization: `Bearer ${session.user.accessToken}`,
            },
            body: formData, // Pass the formData object directly
        });

        const data = await res.json();

        if (!res.ok) {
            // Return the specific error from your backend instead of a generic 500
            return Response.json(data, { status: res.status });
        }

        return Response.json(data, { status: 201 });

    } catch (error) {
        console.error("Error in POST /api/case-studies:", error);
        return Response.json(
            { message: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }

    
}

// Add this to your api/case-studies/route.js if images are large
export const config = {
  api: {
    bodyParser: false, // Disables the default parser to allow FormData
  },
};