export default function Challenges({ items }) {
  if (!items?.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">Challenges</h2>
      {items.map(item => (
        <div key={item.id} className="border p-4 mb-3">
          <p><b>Challenge:</b> {item.challenge}</p>
          <p className="mt-2"><b>Solution:</b> {item.solution}</p>
        </div>
      ))}
    </section>
  );
}
