// export default function CaseStudyLayout({ children }) {
//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="mb-6 border-b pb-4">
//         <h1 className="text-2xl font-bold">Case Study Details</h1>
//       </div>
//       {children}
//     </div>
//   );
// }



import Link from "next/link";
import { Eye } from "lucide-react";

export default async function CaseStudyLayout({ children, params }) {
  const { id } = await params;

  
  const links = [
    { name: "Results", href: `/case-study/${id}/results` },
    { name: "Testimonials", href: `/case-study/${id}/testimonials` },
    { name: "Challenges", href: `/case-study/${id}/challenges` },
    { name: "Tech Stacks", href: `/case-study/${id}/tech-stacks` },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* HEADER */}
      <div className="mb-8 border-b pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        <h1 className="text-3xl font-bold">
          Case Study Details
        </h1>

        {/* Eye Buttons */}
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-xl hover:bg-blue-600 transition"
            >
              <Eye size={16}
              className="text-white" />
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
}