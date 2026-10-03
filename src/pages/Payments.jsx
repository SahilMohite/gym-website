import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const paymentsRef = ref(
          db,
          `users/${currentUser.uid}/payments`
        );

        const snapshot = await get(paymentsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          const paymentList = Object.entries(data).map(
            ([id, payment]) => ({
              id,
              ...payment,
            })
          );

          setPayments(paymentList);
        } else {
          setPayments([]);
        }
      } catch (error) {
        console.error("Error loading payments:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading payments...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Payment History</h2>
          <p className="text-muted mb-0">
            View your gym membership payments
          </p>
        </div>

        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      {/* Payment Summary */}
      <div className="row g-4 mb-5">

        <div className="col-md-4">
          <div className="card dashboard-card p-4 h-100">
            <small className="text-muted">Total Payments</small>
            <h3 className="fw-bold mt-2">
              {payments.length}
            </h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card dashboard-card p-4 h-100">
            <small className="text-muted">Total Amount Paid</small>
            <h3 className="fw-bold mt-2">
              ₹
              {payments.reduce(
                (total, payment) =>
                  total + Number(payment.amount || 0),
                0
              )}
            </h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card dashboard-card p-4 h-100">
            <small className="text-muted">Latest Payment</small>
            <h3 className="fw-bold mt-2">
              {payments.length > 0
                ? `₹${payments[0].amount}`
                : "—"}
            </h3>
          </div>
        </div>

      </div>

      {/* Payment History */}
      <div className="card dashboard-card">

        <div className="card-body">
          <h4 className="fw-bold mb-4">
            Payment History
          </h4>

          {payments.length > 0 ? (
            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Transaction ID</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>

                      <td>{payment.date}</td>

                      <td className="fw-semibold">
                        {payment.plan}
                      </td>

                      <td>
                        ₹{payment.amount}
                      </td>

                      <td>
                        {payment.method}
                      </td>

                      <td>
                        <span className="badge bg-success">
                          {payment.status}
                        </span>
                      </td>

                      <td>
                        <small>
                          {payment.transactionId}
                        </small>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted mb-0">
                No payment records found.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}