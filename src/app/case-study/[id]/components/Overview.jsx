export default function Overview({ data }) {
  return (
    <section>
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="text-gray-600">{data.client_name} · {data.position}</p>
      <p className="mt-4">{data.description}</p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <p><b>Services:</b> {data.services}</p>
        <p><b>Duration:</b> {data.duration}</p>
        <p><b>Team:</b> {data.team_size}</p>
      </div>
    </section>
  );
}
