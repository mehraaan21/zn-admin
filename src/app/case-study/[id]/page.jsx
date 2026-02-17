

import Image from "next/image";
import { Briefcase, Rocket } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ViewCaseStudy({ params }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    }
  );

  if (!res.ok)
     {
    throw new Error("Failed to fetch case study");
  }

  const jsonData = await res.json();
  const data = jsonData.data;
  console.log("CASE STUDY PAGE API RESPONSE:", data);
  

  return (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen">

  {/* HERO */}
  <section className="relative w-full h-[480px] flex items-end">
    
    {data?.banner_url && (
      <Image
        src={data.banner_url}
        alt={data.title}
        fill
        priority
        className="object-cover"
      />
    )}

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

    <div className="relative max-w-7xl mx-auto px-6 pb-14 text-white w-full">
      
      <span className="bg-purple-600/90 px-4 py-1 rounded-full text-xs tracking-widest uppercase">
        Case Study 
        
      </span>

      <h1 className="mt-4 text-4xl md:text-5xl font-extrabold max-w-3xl leading-tight">
        {data.title}
      </h1>

      <p className="mt-3 text-gray-200 text-lg">
        {data.client_name} • {data.position}
      </p>

    </div>
  </section>

  {/* MAIN GRID */}
  <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-16">

    {/* LEFT CONTENT */}
    <div className="lg:col-span-2 space-y-14">

      {/* DESCRIPTION */}
      <section>
        <h2 className="text-3xl font-bold mb-6">
          🚀 Project Overview
        </h2>

        <p className="text-gray-600 leading-relaxed text-lg">
          {data.description}
        </p>
      </section>


      {/* GALLERY */}
      {data.Images?.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">
            Project Gallery
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {data.Images.map((img) => (
              <div
                key={img.id}
                className="group relative h-72 rounded-3xl overflow-hidden shadow-md"
              >
                <Image
                  src={img.image_url}
                  alt="project"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>


    {/* RIGHT SIDEBAR */}
    <aside className="space-y-6">

      {/* Sticky Card */}
      <div className="sticky top-24 bg-white p-8 rounded-3xl shadow-xl border space-y-6">

        <h3 className="text-xl font-bold border-b pb-4">
          Project Info
        </h3>

        <Info label="Services" value={data.services} />
        <Info label="Team Size" value={data.team_size} />
        <Info label="Duration" value={data.duration} />

      </div>
    </aside>
  </div>
</div>
  );
}

/* Small reusable server component */
function Info({ label, value }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value || "N/A"}</p>
    </div>
  );
}