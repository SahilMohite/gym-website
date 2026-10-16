
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/courses", "Courses"],
  ["/blog", "Blogs"],
  ["/contact", "Contact"],
];

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    let active = true;

    const checkUserRole = async () => {
      if (!user) {
        setRole(null);
        return;
      }

      try {
        const snapshot = await get(ref(db, `users/${user.uid}`));

        if (!active) return;

        setRole(
          snapshot.exists()
            ? snapshot.val().role || "customer"
            : "customer"
        );
      } catch (error) {
        console.error("Error checking user role:", error);

        if (active) setRole("customer");
      }
    };

    checkUserRole();

    return () => {
      active = false;
    };
  }, [user]);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const memberAreaLink = !user
    ? "/login"
    : role === "admin"
      ? "/admin"
      : "/dashboard";

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    `relative block px-3 py-3 text-sm font-semibold transition-colors duration-200
    ${
      isActive
        ? "text-orange-400"
        : "text-white/75 hover:text-white"
    }
    after:absolute after:bottom-1 after:left-3 after:h-0.5
    after:bg-orange-400 after:transition-all after:duration-300
    ${
      isActive
        ? "after:w-[calc(100%-24px)]"
        : "after:w-0 hover:after:w-[calc(100%-24px)]"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
      isActive
        ? "bg-orange-500/15 text-orange-400"
        : "text-white/85 hover:bg-white/5 hover:text-orange-400"
    }`;

  return (
    <header
      className={`${
        isHome
          ? "absolute left-0 top-0 bg-transparent"
          : "relative bg-[#111315]/95 shadow-lg backdrop-blur-xl"
      } z-50 w-full text-white transition-colors duration-300`}
    >
      {/* Top information strip */}
      <div className="hidden border-b border-white/10 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
          <div className="flex items-center gap-6 text-xs tracking-wide text-white/60">
            <a
              href="mailto:info@example.com"
              className="transition-colors hover:text-orange-400"
            >
              <span className="mr-2 text-orange-400">✉</span>
              gravityfitness@gmail.com
            </a>

            <span>
              <span className="mr-2 text-orange-400">◷</span>
              MON – SAT · 5:00 AM – 11:00 PM
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs font-medium">
            <NavLink
              to={memberAreaLink}
              className="text-white/60 transition-colors hover:text-orange-400"
            >
              {user ? "My Dashboard" : "Member Login"}
            </NavLink>

            <span className="h-3 w-px bg-white/20" />

            
<NavLink
  to="/admin-login"
  className="text-white/70 transition-colors duration-300 hover:text-orange-500"
>
  Admin
</NavLink>

{!user && (
  <NavLink
    to="/register"
    className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-5 py-2 font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
  >
    Join Now <span>↗</span>
  </NavLink>
)}

      
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex min-h-[82px] items-center justify-between gap-4 sm:min-h-[90px]">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-xl font-black text-white shadow-lg shadow-orange-500/20 transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
              F
            </span>

            <span className="flex flex-col">
              <span className="text-xl font-black uppercase leading-tight tracking-[0.12em] text-white sm:text-2xl">
                Fitness
              </span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.28em] text-orange-400">
                Train. Transform. Thrive.
              </span>
            </span>
          </NavLink>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={navLinkClass}
              >
                {label}
              </NavLink>
            ))}

            <NavLink to="/features" className={navLinkClass}>
              Features
            </NavLink>

            <NavLink to="/trainers" className={navLinkClass}>
              Our Team
            </NavLink>

            <NavLink to={memberAreaLink} className={navLinkClass}>
              {user ? "Dashboard" : "Member Area"}
            </NavLink>
          </div>

          {/* Desktop CTA */}
          <NavLink
            to="/contact"
            className="hidden shrink-0 items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-orange-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-400 lg:inline-flex"
          >
            Get Started
            <span aria-hidden="true">↗</span>
          </NavLink>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-black/20 text-2xl text-white transition-colors hover:border-orange-400/50 hover:bg-orange-500/10 hover:text-orange-400 lg:hidden"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </nav>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="absolute left-0 right-0 top-full border-t border-white/10 bg-[#111315]/98 px-4 pb-5 pt-4 shadow-2xl backdrop-blur-xl lg:hidden sm:px-6">
            <div className="mx-auto max-w-7xl space-y-1">
              {links.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  {label}
                </NavLink>
              ))}

              <NavLink
                to="/features"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                Features
              </NavLink>

              <NavLink
                to="/trainers"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                Our Team
              </NavLink>

              <NavLink
                to={memberAreaLink}
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {user ? "My Dashboard" : "Member Area"}
              </NavLink>

              <NavLink
                to="/admin-login"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                Admin Login
              </NavLink>

              {!user && (
                <>
                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className={mobileLinkClass}
                  >
                    Member Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={closeMenu}
                    className={mobileLinkClass}
                  >
                    Register
                  </NavLink>
                </>
              )}

              <NavLink
                to="/contact"
                onClick={closeMenu}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-black transition-colors hover:bg-orange-400"
              >
                Get Started <span aria-hidden="true">↗</span>
              </NavLink>

              <div className="mt-5 border-t border-white/10 pt-4 text-center text-xs text-white/50">
                <a
                  href="mailto:info@example.com"
                  className="transition-colors hover:text-orange-400"
                >
                  info@example.com
                </a>
                <p className="mt-2">MON – SAT · 8:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
  