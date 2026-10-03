import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Attendance() {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const attendanceRef = ref(
  db,
  `users/${currentUser.uid}/attendance`
);

        const snapshot = await get(attendanceRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          const attendanceList = Object.entries(data).map(
  ([id, status]) => ({
    id,
    status,
    date: "2026-10-01"
  })
);

setAttendance(attendanceList);
        } else {
          setAttendance([]);
        }
      } catch (error) {
        console.error("Error loading attendance:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading attendance...</h4>
      </div>
    );
  }

  const presentCount = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            📅 My Attendance
          </h2>

          <p className="text-muted mb-0">
            Track your gym visits and attendance history.
          </p>
        </div>

        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      {/* SUMMARY */}
      <div className="row g-4 mb-4">

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">
                Total Visits
              </p>

              <h2 className="fw-bold mb-0">
                {presentCount}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">
                Attendance Records
              </p>

              <h2 className="fw-bold mb-0">
                {attendance.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">
                Status
              </p>

              <h5 className="fw-bold mb-0 text-success">
                {presentCount > 0
                  ? "Active Member"
                  : "No Visits Yet"}
              </h5>
            </div>
          </div>
        </div>

      </div>

      {/* ATTENDANCE TABLE */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <h4 className="fw-bold mb-4">
            Attendance History
          </h4>

          {attendance.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: "50px" }}>
                📅
              </div>

              <h5 className="mt-3">
                No attendance records yet
              </h5>

              <p className="text-muted">
                Your gym visits will appear here.
              </p>
            </div>
          ) : (
            <div className="table-responsive">

              <table className="table align-middle">

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.map((item, index) => (
                    <tr key={index}>

                      <td>
                        {item.date}
                      </td>

                      <td>
                        {item.status === "Present" ? (
                          <span className="badge bg-success">
                            Present
                          </span>
                        ) : (
                          <span className="badge bg-secondary">
                            {item.status}
                          </span>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}