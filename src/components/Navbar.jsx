import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/courses", "Courses"],
  ["/blog", "Blogs"],
  ["/contact", "Contact"]
];

export default function Navbar() {
  const { user } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setRole(null);
        return;
      }

      try {
        const snapshot = await get(ref(db, `users/${user.uid}`));

        if (snapshot.exists()) {
          const userData = snapshot.val();
          setRole(userData.role || "customer");
        } else {
          setRole("customer");
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        setRole("customer");
      }
    };

    checkUserRole();
  }, [user]);

  const memberAreaLink = !user
    ? "/login"
    : role === "admin"
    ? "/admin"
    : "/dashboard";

  return (
    <div className="container-fluid header-top">
      <div className="nav-shaps-2"></div>

      <div className="container d-flex align-items-center">

        {/* LOGO */}
        <div className="d-flex align-items-center h-100">
          <NavLink
            to="/"
            className="navbar-brand"
            style={{ height: "125px" }}
          >
            <h1 className="text-primary mb-0">
              <i className="fas fa-hand-rock me-2"></i>
              Fitness
            </h1>
          </NavLink>
        </div>

        <div className="w-100 h-100">

          {/* TOP BAR */}
          <div
            className="topbar px-0 py-2 d-none d-lg-block"
            style={{ height: "45px" }}
          >
            <div className="row gx-0 align-items-center">

              <div className="col-lg-8">
                <div className="d-flex flex-wrap">

                  <div className="pe-4">
                    <a
                      href="mailto:info@example.com"
                      className="text-muted small"
                    >
                      <i className="fas fa-envelope text-primary me-2"></i>
                      info@example.com
                    </a>
                  </div>

                  <div>
                    <span className="text-muted small">
                      <i className="fa fa-clock text-primary me-2"></i>
                      Mon - Sat: 8.00 am-7.00 pm
                    </span>
                  </div>

                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-lg-4 text-lg-end">
                <div className="d-flex justify-content-end">

                  <div className="d-flex align-items-center small">

                    {/* MEMBER LOGIN / DASHBOARD */}
                    <NavLink
                      to={memberAreaLink}
                      className="text-body me-3"
                    >
                      {user ? "Dashboard" : "Member Login"}
                    </NavLink>

                    {/* ADMIN LOGIN */}
                    <NavLink
                      to="/admin-login"
                      className="text-body me-3"
                    >
                      Admin Login
                    </NavLink>

                    {/* REGISTER ONLY WHEN LOGGED OUT */}
                    {!user && (
                      <NavLink
                        to="/register"
                        className="text-body me-3"
                      >
                        Register
                      </NavLink>
                    )}

                  </div>

                  {/* SOCIAL ICONS */}
                  <div className="d-flex pe-3">

                    <a
                      className="btn p-0 text-primary me-3"
                      href="#"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>

                    <a
                      className="btn p-0 text-primary me-3"
                      href="#"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>

                    <a
                      className="btn p-0 text-primary me-0"
                      href="#"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>

                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* MAIN NAVBAR */}
          <div
            className="nav-bar px-0 py-lg-0"
            style={{ height: "80px" }}
          >
            <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-lg-end">

              {/* MOBILE LOGO */}
              <NavLink
                to="/"
                className="navbar-brand-2 d-lg-none"
              >
                <h1 className="text-primary mb-0">
                  <i className="fas fa-hand-rock me-2"></i>
                  Fitness
                </h1>
              </NavLink>

              {/* MOBILE MENU BUTTON */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse justify-content-lg-end"
                id="mainNav"
              >
                <div className="navbar-nav">

                  {/* NORMAL LINKS */}
                  {links.map(([to, label]) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={to === "/"}
                      className="nav-item nav-link"
                    >
                      {label}
                    </NavLink>
                  ))}

                  <NavLink
                    to="/features"
                    className="nav-item nav-link"
                  >
                    Features
                  </NavLink>

                  <NavLink
                    to="/trainers"
                    className="nav-item nav-link"
                  >
                    Our Team
                  </NavLink>

                  {/* MEMBER AREA */}
                  <NavLink
                    to={memberAreaLink}
                    className="nav-item nav-link"
                  >
                    {user ? "Dashboard" : "Member Area"}
                  </NavLink>

                  <NavLink
                    to="/contact"
                    className="nav-item nav-link"
                  >
                    Get Quote
                  </NavLink>

                </div>
              </div>

            </nav>
          </div>

        </div>
      </div>
    </div>
  );
}

