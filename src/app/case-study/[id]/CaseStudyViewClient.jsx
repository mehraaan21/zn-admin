"use client";

import Overview from "./components/Overview";
import Challenges from "./components/Challenges";
import TechStacks from "./components/TechStacks";
import Images from "./components/Images";
import Results from "./components/Results";
import Testimonials from "./components/Testimonials";

export default function CaseStudyViewClient({ data }) {
  return (
    <div className="space-y-8">

      <Overview data={data} />

      <Challenges items={data.Challenges} />

      <TechStacks items={data.TechStacks} />

      <Images items={data.Images} />

      <Results data={data.Results} />

      <Testimonials data={data.Testimonials} />

    </div>
  );
}
