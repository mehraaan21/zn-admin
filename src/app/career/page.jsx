
// import { getOpenings } from "@/app/api/openings/route";

// export const dynamic = "force-dynamic";

// export default async function CareerPage() {
//   let openings = [];

//   try {
//     openings = await getOpenings();
//   } catch (error) {
//     return (
//       <div className="p-10 text-red-600">
//         <h2 className="text-xl font-semibold">Unable to load jobs</h2>
//         <p>Please try again later.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold mb-4">Current Openings</h1>

//       {openings.length === 0 && <p>No openings available</p>}

//       {openings.map((job) => (
//         <div key={job.id} className="border p-4 mb-3 rounded">
//           <h3 className="font-semibold">{job.title}</h3>
//           <p>{job.description}</p>
//           <p className="text-sm text-gray-500">
//             Openings: {job.opening}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }




// import { getServerSession } from "next-auth";
// // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { crudService } from "@/services/crudService";
// import CrudTable from "@/components/CrudTable";

// export default async function ContactPage() {
//   const session = await getServerSession(authOptions);
//   const token = session?.user?.accessToken;

//   if (!token) return null;

//   const data = await crudService.getAll("career", token);

//   async function deleteItem(id) {
//     "use server";
//     await crudService.remove("career", token, id);
//   }


//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Contact Data</h1>
//       <CrudTable data={data} onDelete={deleteItem} />
//     </div>
//   );
// }











// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export default async function CareerPage() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.accessToken) {
//     throw new Error("Unauthorized");
//   }

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/opening`,
//     {
//       headers: {
//         Authorization: `Bearer ${session.user.accessToken}`,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch opening api");
//   }

//   // const openings = await res.json();

//   const openings = await res.json();
// console.log("OPENINGS RESPONSE:", openings);


//   // return (
//   //   <div>
//   //     <h1>Job Openings</h1>
//   //     {openings.map((job) => (
//   //       <p key={job.id}>{job.title}</p>
//   //     ))}
//   //   </div>
//   // );
// }



import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import OpeningTable from "./OpeningTable";

export default async function CareerPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("Unauthorized");
  }

  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${NEXT_PUBLIC_API_URL}/opening`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch openings");
  }

  const response = await res.json();
  console.log(response.data[0]);


  //  const response = await res.json();
  // console.log(response.data[0].position);
  // return;

  // ✅ Normalize data
  const openings = Array.isArray(response)
    ? response
    : response.data || response.openings || [];

  // return (
  //   <div>
  //     <h1>Job Openings</h1>

  //     {openings.length === 0 && <p>No openings found</p>}

  //     {openings.map((job) => (
  //       <p key={job.id}>{job.title}</p>
  //     ))}
  //   </div>
  // );
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Openings</h1>

      <OpeningTable openings={openings} />
    </div>
  );
}
