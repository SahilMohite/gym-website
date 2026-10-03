import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Classes() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const classesRef = ref(db, "classes");
        const snapshot = await get(classesRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          const classList = Object.entries(data).map(
            ([id, classData]) => ({
              id,
              ...classData,
            })
          );

          setClasses(classList);
        } else {
          setClasses([]);
        }
      } catch (error) {
        console.error("Error loading classes:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading classes...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Upcoming Classes</h2>
          <p className="text-muted mb-0">
            Join your upcoming Zumba and Cycling sessions
          </p>
        </div>

        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      {/* Classes */}
      <div className="row g-4">

        {classes.length > 0 ? (
          classes.map((gymClass) => (
            <div className="col-md-6" key={gymClass.id}>

              <div className="card dashboard-card h-100 p-4">

                <div className="d-flex justify-content-between align-items-start">

                  <div>
                    <span className="badge bg-primary mb-2">
                      {gymClass.name}
                    </span>

                    <h4 className="fw-bold">
                      {gymClass.name} Class
                    </h4>
                  </div>

                  <div style={{ fontSize: "35px" }}>
                    {gymClass.name === "Zumba"
                      ? "🕺"
                      : "🚴"}
                  </div>

                </div>

                <hr />

                <p className="mb-2">
                  <strong>Trainer:</strong>{" "}
                  {gymClass.trainer}
                </p>

                <p className="mb-2">
                  <strong>Date:</strong>{" "}
                  {gymClass.date}
                </p>

                <p className="mb-2">
                  <strong>Time:</strong>{" "}
                  {gymClass.time}
                </p>

                <p className="mb-0">
                  <strong>Duration:</strong>{" "}
                  {gymClass.duration}
                </p>

              </div>

            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">
              No upcoming classes available.
            </div>
          </div>
        )}

      </div>

    </div>
  );
}