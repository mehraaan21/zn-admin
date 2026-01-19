
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.accessToken) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Since we are sending FormData from the frontend, 
        // we capture it as formData here.
        const formData = await req.formData();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/our-services`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
                // IMPORTANT: Do not set Content-Type header here manually.
                // Fetch will set multipart/form-data with the correct boundary automatically.
            },
            body: formData,
        });

        const data = await res.json();
        return Response.json(data, { status: res.status });
    } catch (error) {
        return Response.json(
            { message: error.message || "Server error" },
            { status: 500 }
        );
    }
}