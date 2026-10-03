import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { subscribeToCourses, createBooking } from "../services/gymService";
import { Link } from "react-router-dom";

const fallback = [
  {id:"gym", name:"Gym Fitness Class", trainer:"Paul Flavius", day:"Saturday", time:"06.00 - 07.00", icon:"icon-1.png"},
  {id:"power", name:"Power Lifting Class", trainer:"Paul Flavius", day:"Saturday", time:"07.00 - 08.00", icon:"icon-2.png"},
  {id:"body", name:"Body Building Class", trainer:"Fitness Coach", day:"Sunday", time:"08.00 - 09.00", icon:"icon-3.png"}
];

export default function Courses() {
  const { user } = useAuth();
  const [courses,setCourses] = useState(fallback);
  const [message,setMessage] = useState("");

  useEffect(() => subscribeToCourses((items) => items.length && setCourses(items)), []);

  const book = async (course) => {
    if (!user) return setMessage("Please login/register before booking a class.");
    try {
      await createBooking({uid:user.uid, courseId:course.id, courseName:course.name, memberName:user.email});
      setMessage(`Booking request created for ${course.name}.`);
    } catch {
      setMessage("Firebase is not configured yet. Add your .env values first.");
    }
  };

  return (
    <section className="container-fluid courses overflow-hidden py-5">
      <div className="container py-5">
        <div className="text-center mx-auto pb-5" style={{maxWidth:800}}>
          <h4 className="text-primary">Our Courses</h4>
          <h1 className="display-4 text-white">Choose your training session</h1>
          <p className="text-white">Live course data can be managed from Firebase.</p>
          {message && <p className="text-white"><span className="live-dot"></span>{message}</p>}
        </div>
        <div className="row g-4">
          {courses.map(course => (
            <div className="col-md-6 col-lg-4" key={course.id}>
              <div className="courses-item h-100">
                <div className="courses-item-inner p-4">
                  <img className="mb-3" style={{width:70}} src={`/template/img/${course.icon || "icon-1.png"}`} alt="" />
                  <h3 className="text-white">{course.name}</h3>
                  <p className="text-white mb-1">Trainer: {course.trainer || "Fitness Coach"}</p>
                  <p className="text-white">Time: {course.day || "Saturday"} • {course.time || "06.00 - 07.00"}</p>
                  <button onClick={()=>book(course)} className="btn btn-primary py-2 px-4">Book Class</button>
                  {!user && <Link to="/login" className="btn btn-light py-2 px-4 ms-2">Login</Link>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
