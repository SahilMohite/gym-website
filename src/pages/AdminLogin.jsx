import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/admin");
    } catch (error) {
      console.error(error);

      setError("Invalid admin email or password.");
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm border-0 mx-auto"
        style={{ maxWidth: "450px" }}
      >
        <div className="card-body p-4 p-md-5">

          <div className="text-center mb-4">
            <div style={{ fontSize: "45px" }}>
              🛡️
            </div>

            <h2 className="fw-bold mt-2">
              Admin Login
            </h2>

            <p className="text-muted">
              Gym Management Portal
            </p>
          </div>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Admin Email
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login as Admin"}
            </button>

          </form>

          <div className="text-center mt-4">
            <button
              className="btn btn-link text-muted"
              onClick={() => navigate("/")}
            >
              ← Back to Website
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}