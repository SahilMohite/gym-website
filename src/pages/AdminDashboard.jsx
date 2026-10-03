import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (!currentUser) {
          navigate("/login");
          return;
        }

        try {
          const snapshot = await get(
            ref(db, `users/${currentUser.uid}`)
          );

          if (!snapshot.exists()) {
            setAccessDenied(true);

            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);

            return;
          }

          const userData = snapshot.val();

          if (userData.role !== "admin") {
            setAccessDenied(true);

            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);

            return;
          }

          setAdmin(currentUser);
          setLoading(false);
        } catch (error) {
          console.error("Error checking admin role:", error);

          setAccessDenied(true);

          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      }
    );

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (accessDenied) {
    return (
      <div className="container py-5">
        <div
          className="card shadow-sm border-0 mx-auto text-center"
          style={{ maxWidth: "500px" }}
        >
          <div className="card-body p-5">
            <div style={{ fontSize: "55px" }}>🔒</div>

            <h3 className="fw-bold mt-3">
              Access Denied
            </h3>

            <p className="text-muted mb-0">
              You don't have admin access to this page.
            </p>

            <p className="text-muted mt-2">
              Redirecting you to your dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Checking admin access...</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Admin Dashboard 🛡️
          </h2>

          <p className="text-muted mb-0">
            Manage your gym from one place.
          </p>
        </div>

        <button
          className="btn btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h5 className="fw-bold">
            Welcome, Admin
          </h5>

          <p className="text-muted mb-0">
            {admin?.email}
          </p>
        </div>
      </div>

      <h4 className="fw-bold mb-3">
        Gym Management
      </h4>

      <div className="row g-4">

        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center py-4">
              <div style={{ fontSize: "40px" }}>👥</div>

              <h5 className="fw-bold mt-3">
                Members
              </h5>

              <p className="text-muted mb-3">
                Manage gym members
              </p>

              <button
                className="btn btn-primary"
                disabled
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center py-4">
              <div style={{ fontSize: "40px" }}>🏋️</div>

              <h5 className="fw-bold mt-3">
                Classes
              </h5>

              <p className="text-muted mb-3">
                Add and manage classes
              </p>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/admin/classes")}
              >
                Manage Classes
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center py-4">
              <div style={{ fontSize: "40px" }}>💳</div>

              <h5 className="fw-bold mt-3">
                Payments
              </h5>

              <p className="text-muted mb-3">
                Manage payments
              </p>

              <button
                className="btn btn-primary"
                disabled
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center py-4">
              <div style={{ fontSize: "40px" }}>📅</div>

              <h5 className="fw-bold mt-3">
                Attendance
              </h5>

              <p className="text-muted mb-3">
                Manage attendance
              </p>

              <button
                className="btn btn-primary"
                disabled
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}