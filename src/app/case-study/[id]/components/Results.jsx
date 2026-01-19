export default function Results({ data }) {
  if (!data) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">{data.Title}</h2>
      <ul className="list-disc ml-6">
        {data.bullet_points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </section>
  );
}
