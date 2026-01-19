

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


import AddHome from "./AddHome";
import EditHome from "./EditHome";
import DeleteHome from "./DeleteHome";
import Image from "next/image";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch home data");

  const response = await res.json();
  const homes = response?.data ?? [];
  console.log("HOMES RESPONSE:", homes);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Home</h1>
        <AddHome />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Images</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {homes.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No home data found
                </td>
              </tr>
            ) : (
              homes.map((item) => {

                return (
                  <tr key={item.id} className="text-center align-top">
                    <td className="border p-2">{item.id}</td>

                    <td className="border p-2 font-semibold">
                      {item.title}
                    </td>

                    <td className="border p-2 text-sm">
                      {item.description}
                    </td>

                    {/* IMAGES */}
                   <td className="border p-2">
                                     <Image
                                       src={item.image_url || "/placeholder.png"}
                                       alt="Gallery Image"
                                       width={56}
                                       height={56}
                                       className="h-14 w-14 mx-auto rounded object-cover"
                                     />
            </td>

                    {/* STATUS */}
                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          item.status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="border p-2">
                      <div className="flex justify-center gap-3">
                        <EditHome home={item} />
                        <DeleteHome id={item.id} />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
