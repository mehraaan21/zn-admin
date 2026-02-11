import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Layout } from "lucide-react"; // Header icon

import AddHome from "./AddHome";
import EditHome from "./EditHome";
import DeleteHome from "./DeleteHome";
import StatusBadge from "@/components/StatusToggle";
import { truncateDescription } from "@/lib/wordcut";
import Pagination from "@/components/Pagination";
import ViewHome from "./ViewHome";

export default async function HomePage({ searchParams }) {
  // Next.js 15+ Compatibility: Await searchParams if necessary
  const sParams = await searchParams;
  const currentPage = Number(sParams?.page) || 1;
  const limit = 10;

  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home?page=${currentPage}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${session.user.accessToken}` },
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch home data");

  const response = await res.json();
  const homes = response?.data ?? [];
  const totalPages = response?.last_page || 1;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER SECTION - Modern and Consistent */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <Layout className="text-blue-600" />
            Home Banner
          </h1>
          <p className="text-gray-500 mt-1">
            Manage home banner sliders and main website content.
          </p>
        </div>
        <AddHome />
      </div>

      {/* TABLE CONTAINER - Modern Card Style */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Sr.No
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                {/* <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th> */}
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {homes.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    No home data found. Click Add Home to get started.
                  </td>
                </tr>
              ) : (
                homes.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                      {item.title}
                    </td>

                    <td className="px-6 py-4">
                      <div
                        className="text-sm text-gray-500 line-clamp-2 max-w-[300px]"
                        title={item.description?.replace(/<[^>]*>/g, "")}
                      >
                        {truncateDescription(item.description, 50)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="h-12 w-12 mx-auto border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                        {/* <Image
                          src={
                            Array.isArray(item.image_url) &&
                            item.image_url.length > 0
                              ? item.image_url[0]
                              : "/placeholder.png"
                          }
                          alt={item.title || "Banner"}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        /> */}
                        {Array.isArray(item.image_url) &&
                        item.image_url.length > 0 ? (
                          <Image
                            src={item.image_url[0]}
                            alt={item.title || "Banner"}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full text-gray-500 text-sm">
                            No Image Found
                          </div>
                        )}
                      </div>
                    </td>

                    {/* <td className="px-6 py-4 text-center">
                      <StatusBadge status={item.status} />
                    </td> */}

                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <ViewHome home={item} />
                        <EditHome home={item} />
                        <DeleteHome id={item.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER SECTION - Pagination */}
      <div className="mt-6">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
