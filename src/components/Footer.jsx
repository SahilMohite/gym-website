import { useState } from "react";
import { saveContactMessage } from "../services/gymService";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await saveContactMessage({ name: "Newsletter Subscriber", email, message: "Newsletter subscription" });
      setMessage("Subscribed successfully.");
      setEmail("");
    } catch {
      setMessage("Connect Firebase first to enable subscriptions.");
    }
  };

  return (
    <>
      <div className="container-fluid footer py-5">
        <div className="container py-5">
          <div className="row g-5 mb-5 align-items-center">
            <div className="col-lg-7">
              <form onSubmit={subscribe} className="position-relative d-flex" style={{transform:"skew(18deg)"}}>
                <input value={email} onChange={(e)=>setEmail(e.target.value)}
                  className="form-control border-0 w-100 py-3 pe-5"
                  placeholder="Email address to Subscribe" type="email" required />
                <button className="btn-primary py-2 px-4 ms-3" type="submit"><span>Subscribe</span></button>
              </form>
              {message && <small className="text-white d-block mt-2">{message}</small>}
            </div>
            <div className="col-lg-5">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-end">
                {["facebook-f","twitter","instagram","linkedin-in"].map(icon => (
                  <a key={icon} className="btn btn-primary btn-md-square me-3" href="#">
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-md-6 col-lg-3">
              <div className="footer-item">
                <h4 className="text-white mb-4"><i className="fas fa-hand-rock text-primary me-2"></i>Fitness</h4>
                <p className="mb-0">Train smarter, build strength and stay consistent with your fitness journey.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-item">
                <h4 className="text-white mb-4">Quick Links</h4>
                <a href="/">Home</a><a href="/about">About us</a><a href="/courses">Our Courses</a>
                <a href="/features">Our Features</a><a href="/blog">Our Blog</a><a href="/contact">Contact</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-item">
                <h4 className="text-white mb-4">Contact Info</h4>
                <p><i className="fas fa-map-marker-alt text-primary me-2"></i>Pune, Maharashtra</p>
                <p><i className="fas fa-envelope text-primary me-2"></i>info@example.com</p>
                <p><i className="fa fa-phone-alt text-primary me-2"></i>+91 98765 43210</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-item">
                <h4 className="text-white mb-4">Recent Work</h4>
                <div className="row g-2">
                  {["work-9.jpg","work-10.jpg","work-11.jpg","work-12.jpg","work-1.jpg","work-2.jpg","work-3.jpg","work-4.jpg"].map(img =>
                    <div className="col-3" key={img}><img className="img-fluid" src={`/template/img/${img}`} alt="" /></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid copyright py-4">
        <div className="container text-center"><span>Fitness Gym • React + Firebase</span></div>
      </div>
    </>
  );
}
