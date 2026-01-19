"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, FolderOpen, ImageIcon, X } from "lucide-react";

const portfolioData = {
  "Web Development": [
    {
      id: 1,
      title: "E-Commerce Website",
      description: "A modern online shopping platform.",
      image: "https://via.placeholder.com/400",
    },
    {
      id: 2,
      title: "Corporate Website",
      description: "A clean responsive company website.",
      image: "https://via.placeholder.com/400",
    },
  ],

  "Mobile Apps": [
    {
      id: 3,
      title: "Fitness App",
      description: "Track workouts & exercises.",
      image: "https://via.placeholder.com/400",
    },
    {
      id: 4,
      title: "Food Delivery App",
      description: "Order food from restaurants easily.",
      image: "https://via.placeholder.com/400",
    },
  ],

  "Graphic Designing": [
    {
      id: 5,
      title: "Brand Logo",
      description: "Professional branding logo.",
      image: "https://via.placeholder.com/400",
    },
    {
      id: 6,
      title: "Business Card",
      description: "Premium business card design.",
      image: "https://via.placeholder.com/400",
    },
  ],
};

portfolioData["All"] = [
  ...portfolioData["Web Development"],
  ...portfolioData["Mobile Apps"],
  ...portfolioData["Graphic Designing"],
];

export default function PortfolioPage() {
  const categories = Object.keys(portfolioData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = portfolioData[selectedCategory];

  return (
    <div className="p-6">

      {/* Header + Dropdown */}
      <div className="flex flex-col md:flex-row justify-between mb-6 items-start md:items-center gap-3">
        <h2 className="text-3xl font-bold">{selectedCategory}</h2>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white shadow hover:bg-gray-100 transition"
          >
            <FolderOpen size={18} />
            {selectedCategory}
            <ChevronDown size={18} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl border rounded-lg z-20 animate-fadeIn">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition ${
                    cat === selectedCategory ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="border rounded-xl shadow hover:shadow-2xl cursor-pointer bg-white transition transform hover:-translate-y-1"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className="rounded-t-xl h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <ImageIcon size={18} className="text-gray-500" />
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 animate-fadeIn">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl relative">

            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            >
              <X size={18} />
            </button>

            <Image
              src={selectedProject.image}
              alt={selectedProject.title}
              width={600}
              height={400}
              className="rounded mb-4 h-60 w-full object-cover"
            />

            <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
            <p className="mt-2 text-gray-700">{selectedProject.description}</p>

            <button
              onClick={() => setSelectedProject(null)}
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              Explore More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
