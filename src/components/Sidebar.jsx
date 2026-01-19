// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   LayoutDashboard,
//   Info,
//   Briefcase,
//   Image,
//   ShoppingBag,
//   Users,
//   Mail,
//   MessageCircle,
//   ChevronDown,
//   ChevronUp,
//   Menu,
//   X,
//   Import,
// } from "lucide-react";
// import Link from "next/link";
// import { Router } from "next/router";


// export default function Sidebar() {
//   const [openMenus, setOpenMenus] = useState({});
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const router = useRouter(); // <= Next.js router

//   const toggleMenu = (menu) => {
//     setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
//   };

//   const menuItems = [
//     { icon: <LayoutDashboard size={18} />, label: "Home" },
//     { icon: <Info size={18} />, label: "About" },
//     { icon: <Briefcase size={18} />, label: "Our Services" },
//     { icon: <Image size={18} />, label: "Portfolio" },
//     { icon: <ShoppingBag size={18} />, label: "Product" },
//     { icon: <Users size={18} />, label: "Career" },
//     { icon: <Mail size={18} />, label: "Contact" },
//     { icon: <Mail size={18} />, label: "Case Study" },
//     { icon: <Mail size={18} />, label: "Tech Stacks" },
//     { icon: <Mail size={18} />, label: "Our Specialization" },
//     { icon: <Mail size={18} />, label: "Users" },
//     { icon: <Mail size={18} />, label: "Blogs" },
//     { icon: <Mail size={18} />, label: "Image gallery" },
//   ];

//   const subMenus = {
//     Home: [{ label: "Home", path: "/home" }],
//     About: [{ label: "Testimonial Manage", path: "/testimonials" }],
//     Services: [{ label: "Services Manage", path: "/services" }],
//     Portfolio: [{ label: "Projects Manage", path: "/portfolio" }],
//     Product: [{ label: "Product List", path: "/product" }],
//     Career: [{ label: "Job List", path: "/career" }],
//     Contact: [{ label: "Contact Us", path: "/contact" }],
//      Case-study: [{ label: " case-study", path: "/case-study" }],
//       Tech Stacks: [{ label: " Tech-Stacks", path: "/Tech-Stacks" }],
//       Our-Specialization: [{ label: " Our-Specialization", path: "/Our-Specialization" }],
//         Users: [{ label: " Users", path: "/Users" }],
//          Image gallery: [{ label: " Image gallery", path: "/Image gallery" }],
//           Blogs: [{ label: " bolgs", path: "/blogs" }],
//   };

//   return (
//     <>
//       {/* Mobile Top Bar */}
//       <div className="md:hidden flex items-start justify-between bg-white dark:bg-gray-900 p-4 border-b">
//         <button onClick={() => setSidebarOpen(true)}>
//           <Menu size={26} className="text-gray-800 dark:text-white" />
//         </button>
//       </div>

//       {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static top-0 left-0 h-screen sm:w-auto md:w-54 lg:w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 z-40 p-4 transform transition-transform duration-300
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//       >
//         <div className="flex justify-end mb-4 md:hidden">
//           <button onClick={() => setSidebarOpen(false)}>
//             <X size={24} className="text-gray-800 dark:text-white" />
//           </button>
//         </div>

//         <div className="flex justify-center items-center gap-0 mb-8 pt-4">
//           <div className="w-8 h-8 bg-blue-600 rounded-s-md flex items-center justify-center text-white font-bold">
//             <span className="text-sm">Zn</span>
//           </div>
//           <div className="w-16 h-8 bg-red-600 rounded-e-md flex items-center justify-center text-white font-bold">
//             <span>Admin</span>
//           </div>
//         </div>

//         <div className="text-xs text-center text-gray-500 uppercase mb-3 tracking-wide">
//           Menu
//         </div>

//         <nav className="flex-1 space-y-1">
//           {menuItems.map((item, index) => (
//             <div key={index}>
//               <button
//                 onClick={() => toggleMenu(item.label)}
//                 className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-all duration-200"
//               >
//                 <div className="flex items-center gap-3">
//                   {item.icon}
//                   <span>{item.label}</span>
//                 </div>

//                 {subMenus[item.label] &&
//                   (openMenus[item.label] ? (
//                     <ChevronUp size={16} />
//                   ) : (
//                     <ChevronDown size={16} />
//                   ))}
//               </button>

//               {openMenus[item.label] && subMenus[item.label] && (
//                 <div className="pl-10 pr-3 py-2 text-sm text-gray-600 dark:text-gray-300 space-y-2">
//                   {subMenus[item.label].map((sub, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                         router.push(sub.path); // 👈 Navigation for Next.js
//                         setSidebarOpen(false);
//                       }}
//                       className="block w-full text-left hover:text-blue-500 transition"
//                     >
//                       {sub.label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>

//         <div className="mt-6 text-center text-gray-500 uppercase mb-2 tracking-wide">
//           Support
//         </div>

//         <button className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-all duration-200">
//           <MessageCircle size={18} /> Chat
//         </button>
//       </aside>
//     </>
//   );
// }


"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Info,
  Briefcase,
  Image as ImageIcon,
  ShoppingBag,
  Users,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  BookOpen,
  Layers,
  Star,
  FileText,
} from "lucide-react";

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Home" },
    { icon: <Info size={18} />, label: "About" },
    { icon: <Briefcase size={18} />, label: "Our Services" },
    { icon: <ImageIcon size={18} />, label: "Portfolio" },
    { icon: <ShoppingBag size={18} />, label: "Product" },
    { icon: <Users size={18} />, label: "Career" },
    { icon: <Mail size={18} />, label: "Contact" },
    { icon: <BookOpen size={18} />, label: "Case Study" },
    { icon: <Layers size={18} />, label: "Tech Stacks" },
    { icon: <Star size={18} />, label: "Our Specialization" },
    { icon: <Users size={18} />, label: "Users" },
    { icon: <FileText size={18} />, label: "Blogs" },
    { icon: <ImageIcon size={18} />, label: "Image Gallery" },
  ];

  const subMenus = {
    Home: [{ label: "Home", path: "/home" }],
    About: [{ label: "Testimonial Manage", path: "/testimonials" }],
    "Our Services": [{ label: "Services Manage", path: "/services" }],
    Portfolio: [{ label: "Projects Manage", path: "/portfolio" }],
    Product: [{ label: "Product List", path: "/product" }],
    Career: [{ label: "Job List", path: "/career" }],
    Contact: [{ label: "Contact Us", path: "/contact" }],
    "Case Study": [{ label: "Case Study", path: "/case-study" }],
    "Tech Stacks": [{ label: "Tech Stacks", path: "/tech-stacks" }],
    "Our Specialization": [
      { label: "Our Specialization", path: "/our-specialization" },
    ],
    Users: [{ label: "Users", path: "/users" }],
    Blogs: [{ label: "Blogs", path: "/blogs" }],
    "Image Gallery": [{ label: "Image Gallery", path: "/image-gallery" }],
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-start justify-between bg-white dark:bg-gray-900 p-4 border-b">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={26} className="text-gray-800 dark:text-white" />
        </button>
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 sm:w-auto md:w-54 lg:w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 z-40 p-4 transform transition-transform  duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-end mb-4 md:hidden">
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} className="text-gray-800 dark:text-white" />
          </button>
        </div>

        <div className="flex justify-center items-center gap-0 mb-8 pt-4">
          <div className="w-8 h-8 bg-blue-600 rounded-s-md flex items-center justify-center text-white font-bold">
            <span className="text-sm">Zn</span>
          </div>
          <div className="w-16 h-8 bg-red-600 rounded-e-md flex items-center justify-center text-white font-bold">
            <span>Admin</span>
          </div>
        </div>

        <div className="text-xs text-center text-gray-500 uppercase mb-3 tracking-wide">
          Menu
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggleMenu(item.label)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>

                {subMenus[item.label] &&
                  (openMenus[item.label] ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </button>

              {openMenus[item.label] && subMenus[item.label] && (
                <div className="pl-10 pr-3 py-2 text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  {subMenus[item.label].map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        router.push(sub.path);
                        setSidebarOpen(false);
                      }}
                      className="block w-full text-left hover:text-blue-500 transition"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
