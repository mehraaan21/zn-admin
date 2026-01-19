import Image from "next/image";

export default function TechStacks({ items }) {
  if (!items?.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">Tech Stacks</h2>
      <div className="flex flex-wrap gap-4">
        {items.map(t => (
          <div key={t.id} className="border p-3 text-center">
            <Image
              src={t.TechStack.image_url}
              alt={t.TechStack.Name}
              className="h-10 mx-auto"
            />
            <p className="mt-2">{t.TechStack.Name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
