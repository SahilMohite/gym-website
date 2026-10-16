import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get, onValue } from "firebase/database";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [membership, setMembership] = useState(null);
  const [latestPayment, setLatestPayment] = useState(null);
  const [nextClass, setNextClass] = useState(null);

  // Find the next upcoming class
  const findNextClass = (data) => {
    const now = new Date();

    const upcoming = Object.values(data || {})
      .filter((item) => {
        if (!item.date || !item.time) return false;
        const date = new Date(`${item.date}T${item.time}`);
        return !Number.isNaN(date.getTime()) && date > now;
      })
      .sort(
        (a, b) =>
          new Date(`${a.date}T${a.time}`) -
          new Date(`${b.date}T${b.time}`)
      );

    setNextClass(upcoming[0] || null);
  };

  useEffect(() => {
    let unsubscribeClasses;
    let timeInterval;
    let isMounted = true;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        navigate("/login");
        return;
      }

      setUser(currentUser);

      try {
        const snapshot = await get(ref(db, `users/${currentUser.uid}`));
        if (!isMounted) return;

        if (snapshot.exists()) {
          const data = snapshot.val();
          setProfile(data);

          setAttendanceCount(
            Object.values(data.attendance || {}).filter(
              (status) => status === "Present"
            ).length
          );

          setMembership(
            Object.values(data.memberships || {}).find(
              (item) => item.status === "Active"
            ) || null
          );

          const payments = Object.values(data.payments || {}).sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setLatestPayment(payments[0] || null);
        } else {
          setProfile(null);
          setAttendanceCount(0);
          setMembership(null);
          setLatestPayment(null);
        }

        const classesRef = ref(db, "classes");

        unsubscribeClasses = onValue(
          classesRef,
          (snap) => {
            if (isMounted) findNextClass(snap.exists() ? snap.val() : {});
          },
          (error) => {
            console.error("Error loading classes:", error);
            if (isMounted) setNextClass(null);
          }
        );

        timeInterval = setInterval(async () => {
          try {
            const snap = await get(classesRef);
            if (isMounted) findNextClass(snap.exists() ? snap.val() : {});
          } catch (error) {
            console.error("Error checking class time:", error);
          }
        }, 60000);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribeAuth();
      unsubscribeClasses?.();
      clearInterval(timeInterval);
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const portalItems = [
    { icon: "👤", title: "My Profile", description: "View and edit your details", path: "/profile" },
    { icon: "📅", title: "Attendance", description: "Check your gym visits", path: "/attendance" },
    { icon: "🏆", title: "Membership", description: "Membership History", path: "/membership" },
    { icon: "💳", title: "Payments", description: "Payment History", path: "/payments" },
  ];

  const stats = [
    {
      label: "Membership",
      value: membership?.plan || "No Plan",
      extra: membership?.status || "Inactive",
      active: membership?.status === "Active",
    },
    {
      label: "Due Date",
      value: membership?.dueDate || "--/--/----",
      extra: "Membership expiry",
    },
    {
      label: "Attendance",
      value: attendanceCount,
      extra: "Visits this month",
    },
    {
      label: "Next Class",
      value: nextClass?.name || "--",
      extra: nextClass ? `${nextClass.date} • ${nextClass.time}` : "No upcoming class",
    },
  ];

  if (loading) {
    return (
      <div className="container py-5 text-center dashboard-loading">
        <div className="dashboard-loading-spinner" aria-hidden="true" />
        <h4 className="mt-3">Loading your dashboard...</h4>
        <p className="text-muted mb-0">
          Getting your fitness information ready.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-4 gym-dashboard">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center dashboard-header dashboard-entrance">
        <div>
          <h2 className="fw-bold mb-1 dashboard-title">
            Welcome, {profile?.name || "Member"} 👋
          </h2>
          <p className="text-muted mb-0 dashboard-subtitle">
            Here's your gym membership overview.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-danger dashboard-animated-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Quick Stats */}
      <div className="row g-4 mb-4 dashboard-stats">
        {stats.map((item, index) => (
          <div
            key={item.label}
            className="col-md-6 col-lg-3 dashboard-entrance"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="card dashboard-stat-card dashboard-card-hover h-100">
              <div className="card-body">
                <p className="text-muted mb-2 dashboard-stat-label">
                  {item.label}
                </p>
                <h4 className="fw-bold dashboard-stat-value">{item.value}</h4>

                {item.label === "Membership" ? (
                  <span
                    className={`badge ${
                      item.active ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {item.extra}
                  </span>
                ) : (
                  <small className="text-muted">{item.extra}</small>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Portal Menu */}
      <h4
        className="fw-bold mb-3 dashboard-entrance"
        style={{ animationDelay: "450ms" }}
      >
        My Gym Portal
      </h4>

      <div className="row g-4 dashboard-portal">
        {portalItems.map((item, index) => (
          <div
            key={item.path}
            className="col-md-6 col-lg-3 dashboard-entrance"
            style={{ animationDelay: `${(index + 5) * 100}ms` }}
          >
            <div
              className="card dashboard-action-card dashboard-card-hover h-100"
              role="link"
              tabIndex={0}
              onClick={() => navigate(item.path)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate(item.path);
                }
              }}
            >
              <div className="card-body text-center py-4">
                <div className="dashboard-action-icon">{item.icon}</div>
                <h5 className="fw-bold mt-3 dashboard-action-title">
                  {item.title}
                </h5>
                <p className="text-muted mb-0 dashboard-action-description">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Classes */}
      <div
        className="card dashboard-classes-card dashboard-card-hover mt-4 dashboard-entrance"
        style={{ animationDelay: "900ms" }}
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center dashboard-classes-content">
            <div>
              <h4 className="fw-bold mb-1">Upcoming Classes</h4>
              <p className="text-muted mb-0">
                Check your upcoming gym sessions.
              </p>
            </div>


<button
  type="button"
  onClick={() => navigate("/classes")}
  className="inline-flex shrink-0 items-center justify-center rounded-lg border-0 bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-orange-600 hover:shadow-lg active:scale-95"
>
  View Classes
</button>


          </div>
        </div>
      </div>
    </div>
  );
}