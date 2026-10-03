import CustomerProfile from "./pages/CustomerProfile";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import InfoPage from "./pages/InfoPage";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Membership from "./pages/Membership";
import Payments from "./pages/Payments";
import Classes from "./pages/Classes";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminClasses from "./pages/AdminClasses";

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route
  path="/admin-login"
  element={<AdminLogin />}
/>

<Route
  path="/admin"
  element={<AdminDashboard />}
/>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<InfoPage type="about" />} />
          <Route path="/features" element={<InfoPage type="features" />} />
          <Route path="/blog" element={<InfoPage type="blog" />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/trainers" element={<InfoPage type="features" />} />
          <Route
  path="/admin/classes"
  element={<AdminClasses />}
/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/register" element={<Auth mode="register" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/classes" element={<Classes />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
