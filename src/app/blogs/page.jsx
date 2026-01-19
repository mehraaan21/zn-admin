import BlogsTable from "./BlogsTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function BlogsPage() {
  const session = await getServerSession(authOptions);

  // 🔒 Protect page
    if (!session?.user?.accessToken) {
      redirect("/log-in");
    }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const result = await res.json();
  const blogs = Array.isArray(result.data) ? result.data : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <BlogsTable data={blogs} />
    </div>
  );
}
