

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import AddTestimonial from "./AddTestimonial";
import DeleteConfirm from "./DeleteConfirm";
import EditTestimonial from "./EditTestimonial";


export default async function testimonials() {
  const session = await getServerSession(authOptions);

 if (!session?.user?.accessToken) {
  redirect("/log-in");
}


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/testimonials`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  const response = await res.json();

  // ✅ Correct data extraction
  const testimonials = response?.data ?? [];

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
              <th className="border p-2">Client Name</th>
              <th className="border p-2">Designation</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Quote</th>
              <th className="border p-2">Picture</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Actions</th>

            </tr>
          </thead>

          <tbody>
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No testimonials found
                </td>
              </tr>
            ) : (
              testimonials.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.client_name}</td>
                  <td className="border p-2">{item.designation}</td>
                  <td className="border p-2">{item.company}</td>
                  <td className="border p-2">{item.quote}</td>
                  <td className="border p-2">
                  <image
                    src={item.picture_url}
                    alt={item.client_name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded object-cover"
                  />                  
                  </td>
                  <td className="border p-2">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>

                  <td className="border p-2">
                    <div className="flex gap-3">
                      <EditTestimonial
                        testimonial={item}
                      />

                      <DeleteConfirm
                        id={item.id}
                      />
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
