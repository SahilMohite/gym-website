export default function SectionTitle({ eyebrow, title, text="", dark=false }) {
  return (
    <div className="text-center mx-auto pb-5 section-title wow fadeInUp" style={{maxWidth:"800px"}}>
      <h4 className="text-primary">{eyebrow}</h4>
      <h1 className={`display-4 mb-4 ${dark ? "text-white" : ""}`}>{title}</h1>
      {text && <p className={`mb-0 ${dark ? "text-white" : ""}`}>{text}</p>}
    </div>
  );
}
