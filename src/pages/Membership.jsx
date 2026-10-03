import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Membership() {
  const navigate = useNavigate();

  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const membershipRef = ref(
          db,
          `users/${currentUser.uid}/memberships`
        );

        const snapshot = await get(membershipRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          const membershipList = Object.entries(data).map(
            ([id, membership]) => ({
              id,
              ...membership,
            })
          );

          setMemberships(membershipList);
        } else {
          setMemberships([]);
        }
      } catch (error) {
        console.error("Error loading memberships:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const currentMembership = memberships.find(
    (membership) => membership.status === "Active"
  );

  const pastMemberships = memberships.filter(
    (membership) => membership.status !== "Active"
  );

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading membership...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">My Membership</h2>
          <p className="text-muted mb-0">
            View your current and previous memberships
          </p>
        </div>

        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      {/* Current Membership */}
      <div className="mb-5">
        <h4 className="fw-bold mb-3">Current Membership</h4>

        {currentMembership ? (
          <div className="card dashboard-card p-4">
            <div className="row align-items-center">

              <div className="col-md-3 mb-3 mb-md-0">
                <small className="text-muted">Plan</small>
                <h3 className="fw-bold mb-0">
                  {currentMembership.plan}
                </h3>
              </div>

              <div className="col-md-3 mb-3 mb-md-0">
                <small className="text-muted">Status</small>
                <div>
                  <span className="badge bg-success mt-1">
                    {currentMembership.status}
                  </span>
                </div>
              </div>

              <div className="col-md-3 mb-3 mb-md-0">
                <small className="text-muted">Start Date</small>
                <h6 className="fw-bold mt-1">
                  {currentMembership.startDate}
                </h6>
              </div>

              <div className="col-md-3">
                <small className="text-muted">Due Date</small>
                <h6 className="fw-bold mt-1">
                  {currentMembership.dueDate}
                </h6>
              </div>

            </div>
          </div>
        ) : (
          <div className="alert alert-info">
            You currently don't have an active membership.
          </div>
        )}
      </div>

      {/* Membership History */}
      <div>
        <h4 className="fw-bold mb-3">Membership History</h4>

        {pastMemberships.length > 0 ? (
          <div className="card dashboard-card">
            <div className="table-responsive">
              <table className="table table-hover mb-0">

                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>Due Date</th>
                  </tr>
                </thead>

                <tbody>
                  {pastMemberships.map((membership) => (
                    <tr key={membership.id}>
                      <td className="fw-semibold">
                        {membership.plan}
                      </td>

                      <td>
                        <span className="badge bg-secondary">
                          {membership.status}
                        </span>
                      </td>

                      <td>{membership.startDate}</td>

                      <td>{membership.dueDate}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        ) : (
          <div className="alert alert-light border">
            No previous memberships found.
          </div>
        )}
      </div>

    </div>
  );
}