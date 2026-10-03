import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { auth, db } from "../firebase/firebase";

export default function CustomerProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        const userRef = ref(db, `users/${currentUser.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setProfile(snapshot.val());
        } else {
          setProfile({
            name: "",
            email: currentUser.email || "",
            phone: "",
            dateOfBirth: "",
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user) return;

    setSaving(true);
    setMessage("");

    try {
      await update(ref(db, `users/${user.uid}`), {
        name: profile.name,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth,
      });

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="container py-5">
        <p>Loading profile...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="container py-5">
        <h3>Please login to view your profile.</h3>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4">My Profile</h2>

            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={profile.name || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={profile.email || user.email || ""}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={profile.phone || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  value={profile.dateOfBirth || ""}
                  onChange={handleChange}
                />
              </div>

              {message && (
                <div className="alert alert-info">
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

