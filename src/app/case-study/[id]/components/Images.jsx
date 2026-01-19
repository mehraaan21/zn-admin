import Image from "next/image";

export default function Images({ items }) {
  if (!items?.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="grid grid-cols-3 gap-4">
        {items.map(img => (
          <Image
            key={img.id}
            src={img.image_url}
            alt="Case study"
            className="rounded border"
          />
        ))}
      </div>
    </section>
  );
}
