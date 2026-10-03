import SectionTitle from "../components/SectionTitle";

export default function InfoPage({ type }) {
  const content = {
    about: ["About Fitness Center", "A modern place to train, recover and improve.", "We combine coaching, strength training, cardio and a supportive community."],
    features: ["Why choose us?", "Everything you need to keep progressing.", "Structured classes, experienced trainers, flexible sessions and a member dashboard."],
    blog: ["Our Blogs", "Fitness ideas for everyday progress.", "This React version is ready for real-time posts once the Firebase content collections are populated."]
  }[type];

  return (
    <section className="container py-5">
      <div className="py-5">
        <SectionTitle eyebrow={content[0]} title={content[1]} text={content[2]} />
        <div className="row g-5 align-items-center">
          <div className="col-lg-6"><img src="/template/img/services-img.jpg" className="img-fluid w-100" alt="" /></div>
          <div className="col-lg-6">
            <h3>Built for a real gym</h3>
            <p>Members can register, browse classes, submit enquiries and track bookings. Staff can later manage the same information from an admin dashboard.</p>
            <ul>
              <li>Real-time Firebase database</li>
              <li>React routing and reusable components</li>
              <li>Responsive Bootstrap-based design</li>
              <li>Ready for admin/member roles</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
