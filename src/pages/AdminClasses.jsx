import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, onValue, push, remove, update } from "firebase/database";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminClasses() {
  const navigate = useNavigate();

  const [adminChecking, setAdminChecking] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  const [classes, setClasses] = useState({});
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [trainer, setTrainer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");

  const [editingId, setEditingId] = useState(null);

  // 🔐 CHECK ADMIN ACCESS
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (!currentUser) {
          navigate("/login");
          return;
        }

        try {
          const snapshot = await get(
            ref(db, `users/${currentUser.uid}`)
          );

          if (!snapshot.exists()) {
            setAccessDenied(true);

            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);

            return;
          }

          const userData = snapshot.val();

          if (userData.role !== "admin") {
            setAccessDenied(true);

            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);

            return;
          }

          setAdminChecking(false);
        } catch (error) {
          console.error("Error checking admin role:", error);

          setAccessDenied(true);

          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      }
    );

    return () => unsubscribe();
  }, [navigate]);

  // LOAD CLASSES ONLY AFTER ADMIN CHECK
  useEffect(() => {
    if (adminChecking || accessDenied) return;

    const classesRef = ref(db, "classes");

    const unsubscribe = onValue(
      classesRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setClasses(snapshot.val());
        } else {
          setClasses({});
        }

        setLoading(false);
      },
      (error) => {
        console.error("Error loading classes:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [adminChecking, accessDenied]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !trainer || !date || !time || !duration) {
      alert("Please fill in all fields.");
      return;
    }

    const classData = {
      name,
      trainer,
      date,
      time,
      duration
    };

    try {
      if (editingId) {
        await update(
          ref(db, `classes/${editingId}`),
          classData
        );

        alert("Class updated successfully.");
      } else {
        await push(
          ref(db, "classes"),
          classData
        );

        alert("Class added successfully.");
      }

      resetForm();
    } catch (error) {
      console.error("Error saving class:", error);
      alert("Failed to save class.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await remove(ref(db, `classes/${id}`));

      alert("Class deleted successfully.");
    } catch (error) {
      console.error("Error deleting class:", error);
      alert("Failed to delete class.");
    }
  };

  const handleEdit = (id) => {
    const selectedClass = classes[id];

    setEditingId(id);
    setName(selectedClass.name || "");
    setTrainer(selectedClass.trainer || "");
    setDate(selectedClass.date || "");
    setTime(selectedClass.time || "");
    setDuration(selectedClass.duration || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setTrainer("");
    setDate("");
    setTime("");
    setDuration("");
  };

  // 🔒 ACCESS DENIED SCREEN
  if (accessDenied) {
    return (
      <div className="container py-5">
        <div
          className="card shadow-sm border-0 mx-auto text-center"
          style={{ maxWidth: "500px" }}
        >
          <div className="card-body p-5">

            <div style={{ fontSize: "55px" }}>
              🔒
            </div>

            <h3 className="fw-bold mt-3">
              Access Denied
            </h3>

            <p className="text-muted mb-0">
              You don't have admin access to this page.
            </p>

            <p className="text-muted mt-2">
              Redirecting you to your dashboard...
            </p>

          </div>
        </div>
      </div>
    );
  }

  // CHECKING ADMIN
  if (adminChecking) {
    return (
      <div className="container py-5 text-center">
        <h4>Checking admin access...</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Manage Classes 🏋️
          </h2>

          <p className="text-muted mb-0">
            Add and manage gym classes.
          </p>
        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin")}
        >
          ← Admin Dashboard
        </button>

      </div>

      {/* ADD / EDIT CLASS */}
      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body p-4">

          <h4 className="fw-bold mb-4">
            {editingId
              ? "Edit Class"
              : "Add New Class"}
          </h4>

          <form onSubmit={handleSubmit}>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Class Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Zumba"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Trainer
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Neha"
                  value={trainer}
                  onChange={(e) =>
                    setTrainer(e.target.value)
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Time
                </label>

                <input
                  type="time"
                  className="form-control"
                  value={time}
                  onChange={(e) =>
                    setTime(e.target.value)
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Duration
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 60 min"
                  value={duration}
                  onChange={(e) =>
                    setDuration(e.target.value)
                  }
                  required
                />
              </div>

            </div>

            <div className="d-flex gap-2 mt-4">

              <button
                type="submit"
                className="btn btn-primary"
              >
                {editingId
                  ? "Update Class"
                  : "Add Class"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>
      </div>

      {/* CURRENT CLASSES */}
      <div className="card shadow-sm border-0">

        <div className="card-body p-4">

          <h4 className="fw-bold mb-4">
            Current Classes
          </h4>

          {loading ? (
            <p className="text-muted">
              Loading classes...
            </p>
          ) : Object.keys(classes).length === 0 ? (

            <div className="text-center py-4">
              <p className="text-muted mb-0">
                No classes available.
              </p>
            </div>

          ) : (

            <div className="row g-4">

              {Object.entries(classes).map(
                ([id, classItem]) => (

                  <div
                    className="col-md-6 col-lg-4"
                    key={id}
                  >

                    <div className="card border h-100">

                      <div className="card-body">

                        <h5 className="fw-bold">
                          {classItem.name}
                        </h5>

                        <p className="mb-2">
                          👤 Trainer: {classItem.trainer}
                        </p>

                        <p className="mb-2">
                          📅 Date: {classItem.date}
                        </p>

                        <p className="mb-2">
                          ⏰ Time: {classItem.time}
                        </p>

                        <p className="mb-3">
                          ⏱️ Duration: {classItem.duration}
                        </p>

                        <div className="d-flex gap-2">

                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              handleEdit(id)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleDelete(id)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}