
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
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        const user = userCredential.user;

        // Fetch the user's profile
        const userSnapshot = await get(
          ref(db, `users/${user.uid}`)
        );

        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();

          if (userData.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        } else {
          // Allow login even if an older account has no profile
          navigate("/dashboard");
        }
      } else {
        // REGISTER
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        const user = userCredential.user;

        // Create the profile using individual field writes.
        // These paths match the field-level rules in your database.
        await Promise.all([
          set(
            ref(db, `users/${user.uid}/name`),
            name.trim()
          ),
          set(
            ref(db, `users/${user.uid}/email`),
            user.email || email.trim()
          ),
          set(
            ref(db, `users/${user.uid}/phone`),
            ""
          ),
          set(
            ref(db, `users/${user.uid}/dateOfBirth`),
            ""
          ),
          set(
            ref(db, `users/${user.uid}/profileImage`),
            ""
          ),
        ]);

        // Do not let the client assign its own role.
        // New accounts default to customer in the app.
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Authentication error:", err);

      const messages = {
        "auth/email-already-in-use":
          "An account with this email already exists. Try logging in.",
        "auth/invalid-email":
          "Please enter a valid email address.",
        "auth/invalid-credential":
          "Invalid email or password. Please try again.",
        "auth/user-not-found":
          "No account found with this email.",
        "auth/wrong-password":
          "Incorrect password. Please try again.",
        "auth/weak-password":
          "Your password must be at least 6 characters long.",
        "auth/too-many-requests":
          "Too many attempts. Please try again later.",
        "PERMISSION_DENIED":
          "Firebase blocked the profile update. Check your Realtime Database rules.",
      };

      setError(
        messages[err.code] ||
          (err.message?.includes("PERMISSION_DENIED")
            ? "Firebase blocked the profile update. Check your Realtime Database rules."
            : err.message?.replace(/^Firebase:\s*/i, "") ||
              "Something went wrong. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-stone-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              Your Fitness Journey
            </p>

            <h2 className="text-3xl font-extrabold text-stone-900">
              {isLogin ? "Member Login" : "Create Account"}
            </h2>

            <p className="mt-2 text-sm text-stone-500">
              {isLogin
                ? "Welcome back! Sign in to access your dashboard."
                : "Create your account to get started."}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                minLength={6}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={
                  isLogin ? "current-password" : "new-password"
                }
                required
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-600 px-5 py-3.5 font-bold text-white shadow-sm transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Login"
                  : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-stone-500">
            Your account information is managed securely through Firebase.
          </p>
        </div>
      </div>
    </section>
  );
}
