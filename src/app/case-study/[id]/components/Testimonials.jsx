export default function Testimonials({ data }) {
  if (!data) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">Testimonial</h2>
      <p className="italic">“{data.feedback}”</p>
    </section>
  );
}
