export default function CaseStudyLayout({ children }) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">Case Study Details</h1>
      </div>
      {children}
    </div>
  );
}
