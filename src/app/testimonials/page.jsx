

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import AddTestimonial from "./AddTestimonial";
import DeleteConfirm from "./DeleteConfirm";
import EditTestimonial from "./EditTestimonial";

export default async function TestimonialsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch testimonials");

  const response = await res.json();
  const testimonials = response?.data ?? [];
  console.log("TESTIMONIALS RESPONSE:", testimonials);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <AddTestimonial />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Client</th>
              <th className="border p-2">Quote</th>
              <th className="border p-2">Picture</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 ? (
              <tr><td colSpan="5" className="text-center p-4">No testimonials found</td></tr>
            ) : (
              testimonials.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">
                    <div className="font-bold">{item.client_name}</div>
                    <div className="text-xs text-gray-500">{item.company}</div>
                  </td>
                  <td className="border p-2 italic">{item.quote}</td>
                  
                  <td className="border p-2">
                    <Image
                      src={item.picture_url || "/placeholder.png"} // Added fallback
                      alt={item.client_name}
                      width={56}
                      height={56}
                      className="h-10 w-10 rounded-full mx-auto object-cover"
                    />
                  </td>
                  <td className="border p-2">
                    <div className="flex justify-center gap-3">
                      <EditTestimonial testimonial={item} />
                      <DeleteConfirm id={item.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}