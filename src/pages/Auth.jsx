import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Auth({ mode = "login" }) {
  const isLogin = mode === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        const user = userCredential.user;

        // Check user's profile in Realtime Database
        const userSnapshot = await get(
          ref(db, `users/${user.uid}`)
        );

        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();

          // ADMIN
          if (userData.role === "admin") {
            navigate("/admin");
          } 
          // CUSTOMER
          else {
            navigate("/dashboard");
          }
        } else {
          // If no profile exists, treat as customer
          navigate("/dashboard");
        }

      } else {
        // CREATE FIREBASE AUTHENTICATION ACCOUNT
        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        const user = userCredential.user;

        // CREATE CUSTOMER PROFILE
        await set(
          ref(db, `users/${user.uid}`),
          {
            name: name,
            email: user.email,
            phone: "",
            dateOfBirth: "",
            profileImage: "",
            createdAt: new Date().toISOString(),
          }
        );

        // NEW USERS ARE CUSTOMERS
        navigate("/dashboard");
      }

    } catch (err) {
      console.error(err);

      setError(
        err.message
          .replace("Firebase: ", "")
          .replace(/\(auth\/.*?\)\.?/, "")
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container">

      <div className="auth-card">

        <div className="card p-4 shadow-sm">

          <h2 className="mb-4">
            {isLogin
              ? "Member Login"
              : "Create Account"}
          </h2>

          <form onSubmit={submit}>

            {!isLogin && (
              <input
                className="form-control mb-3 py-3"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            )}

            <input
              className="form-control mb-3 py-3"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              className="form-control mb-3 py-3"
              type="password"
              minLength="6"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <button
              className="btn btn-primary w-100 py-3"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Register"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

