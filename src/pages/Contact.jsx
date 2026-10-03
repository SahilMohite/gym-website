import { useState } from "react";
import { saveContactMessage } from "../services/gymService";

export default function Contact() {
  const [form,setForm] = useState({name:"",email:"",phone:"",message:""});
  const [status,setStatus] = useState("");
  const change = e => setForm({...form,[e.target.name]:e.target.value});

  const submit = async e => {
    e.preventDefault();
    try {
      await saveContactMessage(form);
      setStatus("Thanks! Your enquiry has been saved.");
      setForm({name:"",email:"",phone:"",message:""});
    } catch {
      setStatus("Firebase is not configured yet. Add your Firebase settings in .env.");
    }
  };

  return (
    <section className="container py-5">
      <div className="py-5">
        <div className="text-center mb-5">
          <h4 className="text-primary">Contact Us</h4>
          <h1 className="display-4">Start your fitness journey</h1>
        </div>
        <div className="row g-5">
          <div className="col-lg-5"><img src="/template/img/contact-banner.png" className="img-fluid w-100" alt="" /></div>
          <div className="col-lg-7">
            <form onSubmit={submit} className="row g-3">
              <div className="col-md-6"><input name="name" value={form.name} onChange={change} className="form-control py-3" placeholder="Name" required /></div>
              <div className="col-md-6"><input name="email" type="email" value={form.email} onChange={change} className="form-control py-3" placeholder="Email" required /></div>
              <div className="col-12"><input name="phone" value={form.phone} onChange={change} className="form-control py-3" placeholder="Phone" /></div>
              <div className="col-12"><textarea name="message" value={form.message} onChange={change} className="form-control" rows="6" placeholder="Message" required></textarea></div>
              <div className="col-12"><button className="btn btn-primary py-3 px-5">Send Message</button></div>
              {status && <div className="col-12"><div className="alert alert-info">{status}</div></div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
