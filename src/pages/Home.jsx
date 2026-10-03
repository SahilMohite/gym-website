import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";

const features = [
  ["feature-1.jpg", "Work Your Butt Off"],
  ["feature-2.jpg", "Get In The Groove"],
  ["feature-3.jpg", "It's More Than A Game"],
  ["feature-4.jpg", "Get Fit Don't Quit"]
];

const courses = [
  ["icon-1.png", "Gym Fitness Class"],
  ["icon-2.png", "Power Lifting Class"],
  ["icon-3.png", "Body Building Class"]
];

export default function Home() {
  return (
    <>
      <div className="header-carousel overflow-hidden bg-dark">
        <div className="header-carousel-item">
          <img src="/template/img/header-1.jpg" className="img-fluid w-100" alt="Gym" />
          <div className="carousel-caption">
            <div className="container">
              <div className="row g-5">
                <div className="col-lg-7 animated fadeInLeft">
                  <h4 className="text-primary text-uppercase fw-bold">Welcome to our Fitness Center</h4>
                  <h1 className="display-1 text-white mb-4">The best gym center is now in your city</h1>
                  <p className="fs-4 mb-4">Train with expert coaches, structured programs and a community that keeps you moving.</p>
                  <div className="hero-actions">
                    <Link to="/courses" className="btn btn-primary py-3 px-5">Explore Courses</Link>
                    <Link to="/contact" className="btn btn-light py-3 px-5">Get Quote</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container-fluid about pt-5">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInLeft">
              <div className="about-img">
                <img src="/template/img/about-2.png" className="img-fluid w-100" alt="About fitness" />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight">
              <SectionTitle eyebrow="About Fitness Center" title="We are the best at fulfilling your potential and achieving your goals." text="Build strength, improve conditioning and create a sustainable training routine with our coaches." />
              <Link to="/about" className="btn btn-primary py-3 px-5">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid goal pt-5">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <SectionTitle eyebrow="Fitness Goal" title="Complete your possibilities, Achieve Your Fitness Goals." text="Choose a training style that fits your goal and let your progress be measurable." dark />
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="d-flex p-4">
                    <div className="bg-primary d-inline p-3 me-3" style={{width:80,height:80}}>
                      <img className="img-fluid" src="/template/img/icon-5.png" alt="" />
                    </div>
                    <div><h4 className="text-white">Free Fitness Training</h4><p className="text-white mb-0">Structured guidance for your first steps.</p></div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex p-4">
                    <div className="bg-primary d-inline p-3 me-3" style={{width:80,height:80}}>
                      <img className="img-fluid" src="/template/img/icon-6.png" alt="" />
                    </div>
                    <div><h4 className="text-white">Cardio and Strength</h4><p className="text-white mb-0">Programs built around performance.</p></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6"><img src="/template/img/fitness-goal-banner.png" className="img-fluid w-100" alt="Fitness goal" /></div>
          </div>
        </div>
      </section>

      <section className="container-fluid feature bg-light py-5">
        <div className="container py-5">
          <SectionTitle eyebrow="Why choose us?" title="Our Highlights Below" text="A modern gym experience focused on consistency, coaching and measurable progress." />
          <div className="row g-4">
            {features.map(([img,title]) => (
              <div className="col-md-6 col-lg-3" key={title}>
                <div className="feature-item h-100">
                  <div className="feature-img"><img src={`/template/img/${img}`} className="img-fluid w-100" alt="" /></div>
                  <div className="feature-content p-4">
                    <h4 className="mb-3">{title}</h4>
                    <p className="mb-4">Focused training sessions designed to keep your workouts productive.</p>
                    <Link to="/features" className="btn btn-primary py-2 px-4">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-fluid courses overflow-hidden py-5">
        <div className="container py-5">
          <SectionTitle eyebrow="Our Courses" title="Train for the body and performance you want." text="Browse classes and book a session from the member area." dark />
          <div className="row gy-4 gx-0 justify-content-center">
            {courses.map(([icon,title],i) => (
              <div className="col-md-6 col-lg-4" key={title}>
                <div className="courses-item h-100">
                  <div className="courses-item-inner p-4">
                    <div className="d-flex justify-content-between mb-4">
                      <div className="courses-icon-img p-3"><img className="img-fluid" src={`/template/img/${icon}`} alt="" /></div>
                      <div className="data-info">
                        <p className="mb-1 text-white">Saturday</p><p className="mb-0 text-white">06.00 - 07.00</p>
                      </div>
                    </div>
                    <h4 className="text-white mb-3">{title}</h4>
                    <p className="text-white mb-4">Expert-led sessions with scalable workouts for different experience levels.</p>
                    <Link to="/courses" className="btn btn-primary py-2 px-4">View Course</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-fluid blog py-5">
        <div className="container py-5">
          <SectionTitle eyebrow="Our Blogs" title="Check out our latest stories" text="Training ideas, recovery tips and practical fitness information." />
          <div className="row g-4">
            {[
              ["feature-4.jpg","Full Body Home Workout"],
              ["feature-3.jpg","31-Day Fitness Calendar"],
              ["feature-2.jpg","At Home Ab Workout"]
            ].map(([img,title]) => (
              <div className="col-md-6 col-lg-4" key={title}>
                <div className="blog-item h-100">
                  <div className="blog-img p-4 pb-0"><img className="img-fluid w-100" src={`/template/img/${img}`} alt="" /></div>
                  <div className="blog-content p-4">
                    <small><i className="fa fa-calendar text-primary me-2"></i>Fitness Team</small>
                    <h4 className="mt-3">{title}</h4>
                    <p>Simple, practical ideas to keep your training consistent.</p>
                    <Link to="/blog" className="btn btn-dark py-2 px-4">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-fluid team py-5">
        <div className="container py-5">
          <SectionTitle eyebrow="Our Trainer" title="Meet Our Amazing Team" text="Coaches who can help you train with better structure and technique." />
          <div className="row gy-5 gx-4">
            {["team-1.jpg","team-2.jpg","team-3.jpg","team-4.jpg"].map((img,i) => (
              <div className="col-md-6 col-lg-3" key={img}>
                <div className="team-item">
                  <div className="team-img"><img className="img-fluid w-100" src={`/template/img/${img}`} alt="Trainer" /></div>
                  <div className="team-content"><h4>Trainer {i+1}</h4><p className="mb-0">Fitness Coach</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-fluid testimonial bg-dark py-5">
        <div className="container py-5">
          <SectionTitle eyebrow="Testimonial" title="What Our Customers Are Saying" dark />
          <div className="row g-4">
            {["testimonial-1.jpg","testimonial-2.jpg","testimonial-3.jpg"].map((img,i) => (
              <div className="col-md-4" key={img}>
                <div className="testimonial-item p-4 h-100">
                  <img src={`/template/img/${img}`} className="img-fluid mb-4" alt="" />
                  <p className="text-white">“The training environment keeps me consistent and focused every week.”</p>
                  <h4 className="text-white">Client {i+1}</h4>
                  <div className="text-primary">★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
