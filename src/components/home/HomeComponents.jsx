
import { Link } from "react-router-dom";

export function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M4.75 12h14.5m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}) {
  return (
    <div className="mb-12 max-w-2xl reveal">
      <p
        className={`mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] ${
          light ? "text-orange-400" : "text-orange-600"
        }`}
      >
        <span className="h-px w-8 bg-current" />
        {eyebrow}
      </p>

      <h2
        className={`text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-stone-950"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-xl text-base leading-7 ${
            light ? "text-stone-400" : "text-stone-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function SectionLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-3 text-sm font-extrabold uppercase tracking-wider transition hover:text-orange-600"
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}
