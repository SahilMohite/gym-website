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
  const findNextClass = (classesData) => {
    const now = new Date();

    const upcomingClasses = Object.values(classesData || {}).filter(
      (classItem) => {
        if (!classItem.date || !classItem.time) {
          return false;
        }

        const classDateTime = new Date(
          `${classItem.date}T${classItem.time}`
        );

        return classDateTime > now;
      }
    );

    upcomingClasses.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);

      return dateA - dateB;
    });

    setNextClass(upcomingClasses[0] || null);
  };

  useEffect(() => {
    let unsubscribeAuth;
    let unsubscribeClasses;
    let timeInterval;

    unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      setUser(currentUser);

      try {
        // =========================
        // LOAD USER PROFILE
        // =========================

        const snapshot = await get(
          ref(db, `users/${currentUser.uid}`)
        );

        if (snapshot.exists()) {
          const profileData = snapshot.val();

          setProfile(profileData);

          // =========================
          // ATTENDANCE
          // =========================

          const attendance = profileData.attendance || {};

          const presentCount = Object.values(attendance).filter(
            (status) => status === "Present"
          ).length;

          setAttendanceCount(presentCount);

          // =========================
          // MEMBERSHIP
          // =========================

          const memberships = profileData.memberships || {};

          const activeMembership = Object.values(memberships).find(
            (membershipItem) =>
              membershipItem.status === "Active"
          );

          setMembership(activeMembership || null);

          // =========================
          // LATEST PAYMENT
          // =========================

          const payments = profileData.payments || {};

          const paymentList = Object.values(payments);

          if (paymentList.length > 0) {
            const sortedPayments = paymentList.sort(
              (a, b) =>
                new Date(b.date) - new Date(a.date)
            );

            setLatestPayment(sortedPayments[0]);
          } else {
            setLatestPayment(null);
          }
        }

        // =========================
        // REAL-TIME CLASSES
        // =========================

        const classesRef = ref(db, "classes");

        unsubscribeClasses = onValue(
          classesRef,
          (classesSnapshot) => {
            if (classesSnapshot.exists()) {
              const classesData = classesSnapshot.val();

              findNextClass(classesData);
            } else {
              setNextClass(null);
            }
          },
          (error) => {
            console.error(
              "Error loading classes:",
              error
            );

            setNextClass(null);
          }
        );

        // =========================
        // CHECK TIME EVERY MINUTE
        // =========================

        timeInterval = setInterval(() => {
          get(classesRef)
            .then((classesSnapshot) => {
              if (classesSnapshot.exists()) {
                findNextClass(classesSnapshot.val());
              } else {
                setNextClass(null);
              }
            })
            .catch((error) => {
              console.error(
                "Error checking class time:",
                error
              );
            });
        }, 60000);

      } catch (error) {
        console.error(
          "Error loading dashboard:",
          error
        );
      }

      setLoading(false);
    });

    // =========================
    // CLEANUP
    // =========================

    return () => {
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }

      if (unsubscribeClasses) {
        unsubscribeClasses();
      }

      if (timeInterval) {
        clearInterval(timeInterval);
      }
    };
  }, [navigate]);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading your dashboard...</h4>
      </div>
    );
  }

  // =========================
  // DASHBOARD
  // =========================

  return (
    <div className="container py-4 gym-dashboard">

      {/* TOP BAR */}

      <div className="d-flex justify-content-between align-items-center dashboard-header">

        <div>
          <h2 className="fw-bold mb-1 dashboard-title">
  Welcome, {profile?.name || "Member"} 👋
</h2>

<p className="text-muted mb-0 dashboard-subtitle">
  Here's your gym membership overview.
</p>
        </div>

        <button
          className="btn btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      {/* QUICK STATS */}

      <div className="row g-4 mb-4">

        {/* MEMBERSHIP */}

        <div className="col-md-6 col-lg-3">

          <div className="card dashboard-stat-card">

            <div className="card-body">

              <p className="dashboard-stat-label mb-2">
  Membership
</p>

<h4 className="dashboard-stat-value">
  {membership?.plan || "No Plan"}
</h4>

              <span
                className={`badge ${
                  membership?.status === "Active"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
              >
                {membership?.status || "Inactive"}
              </span>

            </div>

          </div>

        </div>


        {/* DUE DATE */}

        <div className="col-md-6 col-lg-3">

          <div className="card dashboard-stat-card">

            <div className="card-body">

              <p className="text-muted mb-2">
                Due Date
              </p>

              <h4 className="fw-bold">
                {membership?.dueDate || "--/--/----"}
              </h4>

              <small className="text-muted">
                Membership expiry
              </small>

            </div>

          </div>

        </div>


        {/* ATTENDANCE */}

        <div className="col-md-6 col-lg-3">

          <div className="card dashboard-stat-card">

            <div className="card-body">

              <p className="text-muted mb-2">
                Attendance
              </p>

              <h4 className="fw-bold">
                {attendanceCount}
              </h4>

              <small className="text-muted">
                Visits this month
              </small>

            </div>

          </div>

        </div>


        {/* NEXT CLASS */}

        <div className="col-md-6 col-lg-3">

          <div className="card dashboard-stat-card">

            <div className="card-body">

              <p className="text-muted mb-2">
                Next Class
              </p>

              <h4 className="fw-bold">
                {nextClass?.name || "--"}
              </h4>

              <small className="text-muted">

                {nextClass
                  ? `${nextClass.date} • ${nextClass.time}`
                  : "No upcoming class"}

              </small>

            </div>

          </div>

        </div>

      </div>


      {/* PORTAL MENU */}

        <h4 className="fw-bold mb-3">
          My Gym Portal
        </h4>


      <div className="row g-4">


        {/* PROFILE */}

        <div className="col-md-6 col-lg-3">

          <div
            className="card dashboard-action-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/profile")}
          >

            <div className="card-body text-center py-4">

             <div className="dashboard-action-icon">
  👤
</div>

<h5 className="fw-bold mt-3 dashboard-action-title">
  My Profile
</h5>

<p className="text-muted mb-0 dashboard-action-description">
  View and edit your details
</p>

            </div>

          </div>

        </div>


        {/* ATTENDANCE */}

        <div className="col-md-6 col-lg-3">

          <div
            className="card dashboard-action-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/attendance")}
          >

            <div className="card-body text-center py-4">

              <div className="dashboard-action-icon">
                📅
              </div>

              <h5 className="fw-bold mt-3 dashboard-action-title">
                Attendance
              </h5>

              <p className="text-muted mb-0 dashboard-action-description">
                Check your gym visits
              </p>

            </div>

          </div>

        </div>


        {/* MEMBERSHIP */}

        <div className="col-md-6 col-lg-3">

          <div
            className="card dashboard-action-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/membership")}
          >

            <div className="card-body text-center py-4">

              <div className="dashboard-action-icon">
                🏆
              </div>

              <h5 className="fw-bold mt-3 dashboard-action-title">
                Membership
              </h5>

              <p className="text-muted mb-0 dashboard-action-description">
                Membership History
              </p>

            </div>

          </div>

        </div>


        {/* PAYMENTS */}

        <div className="col-md-6 col-lg-3">

          <div
            className="card dashboard-action-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/payments")}
          >

            <div className="card-body text-center py-4">

              <div className="dashboard-action-icon">
                💳
              </div>

              <h5 className="fw-bold mt-3 dashboard-action-title">
                Payments
              </h5>

              <p className="text-muted mb-0 dashboard-action-description">
                Payment History
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* UPCOMING CLASSES */}

      <div className="card dashboard-classes-card mt-4">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <h4 className="fw-bold mb-1">
                Upcoming Classes
              </h4>

              <p className="text-muted mb-0">
                Check your upcoming gym sessions.
              </p>

            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/classes")}
            >
              View Classes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}