import { useState } from "react";
import { Link } from "react-router-dom";
import { saveContactMessage } from "../services/gymService";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await saveContactMessage({
        name: "Newsletter Subscriber",
        email,
        message: "Newsletter subscription",
      });

      setMessage("Subscribed successfully.");
      setEmail("");
    } catch {
      setMessage("Unable to subscribe. Please try again.");
    }
  };

  const socialLinks = [
    { name: "facebook-f", url: "#" },
    { name: "twitter", url: "#" },
    { name: "instagram", url: "#" },
    { name: "linkedin-in", url: "#" },
  ];

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Our Courses", to: "/courses" },
    { label: "Our Features", to: "/features" },
    { label: "Our Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ];

  const recentWork = [
    "work-9.jpg",
    "work-10.jpg",
    "work-11.jpg",
    "work-12.jpg",
    "work-1.jpg",
    "work-2.jpg",
    "work-3.jpg",
    "work-4.jpg",
  ];

  return (
    <footer className="bg-[#171918] text-[#B7BBB4]">
      {/* Newsletter and social links */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                Stay Connected
              </p>

              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Join Our Fitness Community
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#B7BBB4]">
                Get fitness updates, training tips, and the latest gym news.
              </p>

              <form
                onSubmit={subscribe}
                className="mt-5 flex max-w-xl flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  required
                  className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />

                <button
                  type="submit"
                  className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-orange-600"
                >
                  Subscribe
                </button>
              </form>

              {message && (
                <p
                  role="status"
                  className="mt-3 text-sm text-orange-400"
                >
                  {message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start lg:items-end">
              <p className="mb-4 text-sm font-medium text-white">
                Follow our journey
              </p>

              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    aria-label={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    <i className={`fab fa-${social.name}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer content */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-xl text-white">
                <i className="fas fa-dumbbell" />
              </span>

              <span className="text-2xl font-extrabold tracking-wide text-white">
                FITNESS<span className="text-orange-500">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7">
              Train smarter, build strength, and stay consistent with your
              fitness journey. Your goals deserve your best effort.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-6 text-lg font-bold text-white">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="group flex items-center gap-2 text-sm transition hover:text-orange-500"
                >
                  <span className="text-orange-500 transition group-hover:translate-x-1">
                    →
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact information */}
          <div>
            <h4 className="mb-6 text-lg font-bold text-white">
              Contact Info
            </h4>

            <div className="flex flex-col gap-5 text-sm">
              <div className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-1 text-orange-500" />
                <span>Pune, Maharashtra</span>
              </div>

              <div className="flex items-start gap-3">
                <i className="fas fa-envelope mt-1 text-orange-500" />
                <a
                  href="mailto:info@example.com"
                  className="transition hover:text-orange-500"
                >
                  info@example.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <i className="fas fa-phone-alt mt-1 text-orange-500" />
                <a
                  href="tel:+919876543210"
                  className="transition hover:text-orange-500"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          {/* Recent work */}
          <div>
            <h4 className="mb-6 text-lg font-bold text-white">
              Recent Work
            </h4>

            <div className="grid grid-cols-4 gap-2">
              {recentWork.map((img) => (
                <div
                  key={img}
                  className="group aspect-square overflow-hidden rounded-lg border border-white/10"
                >
                  <img
                    src={`/template/img/${img}`}
                    alt="Fitness gallery"
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110 group-hover:opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-sm sm:flex-row sm:text-left lg:px-8">
          <p>
            © {new Date().getFullYear()}{" "}
            <Link to="/" className="font-semibold text-orange-500 hover:text-orange-400">
              Fitness Gym
            </Link>
            . All rights reserved.
          </p>

          <p className="text-[#858A83]">
            Built for strength. Designed for progress.
          </p>
        </div>
      </div>
    </footer>
  );
}
