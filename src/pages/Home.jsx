
import { Link } from "react-router-dom";

const features = [
  {
    image: "feature-1.jpg",
    number: "01",
    title: "Train With Purpose",
    description:
      "Every session has a purpose. Build better habits and make every rep count.",
    tag: "DISCIPLINE",
  },
  {
    image: "feature-2.jpg",
    number: "02",
    title: "Find Your Rhythm",
    description:
      "Discover a routine that fits your lifestyle and keeps you coming back.",
    tag: "CONSISTENCY",
  },
  {
    image: "feature-3.jpg",
    number: "03",
    title: "Go Beyond Limits",
    description:
      "Challenge your comfort zone and discover what you are truly capable of.",
    tag: "PERFORMANCE",
  },
  {
    image: "feature-4.jpg",
    number: "04",
    title: "Become Stronger",
    description:
      "Focus on progress, trust the process, and build strength that lasts.",
    tag: "PROGRESS",
  },
];

const courses = [
  {
    image: "icon-1.png",
    title: "Gym Fitness",
    category: "ALL LEVELS",
    description:
      "Build a strong foundation with balanced workouts for your entire body.",
    time: "Flexible sessions",
    number: "01",
  },
  {
    image: "icon-2.png",
    title: "Power Lifting",
    category: "STRENGTH",
    description:
      "Develop raw strength through structured lifting and progressive overload.",
    time: "Strength focused",
    number: "02",
  },
  {
    image: "icon-3.png",
    title: "Body Building",
    category: "HYPERTROPHY",
    description:
      "Train with intention to build muscle, improve form, and shape your physique.",
    time: "Muscle focused",
    number: "03",
  },
];

const trainers = [
  { image: "team-1.jpg", name: "Strength Coach", specialty: "Strength & Conditioning" },
  { image: "team-2.jpg", name: "Fitness Coach", specialty: "General Fitness" },
  { image: "team-3.jpg", name: "Performance Coach", specialty: "Athletic Performance" },
  { image: "team-4.jpg", name: "Training Coach", specialty: "Muscle Development" },
];

const blogs = [
  {
    image: "feature-4.jpg",
    category: "TRAINING",
    title: "Build a routine you can actually stick to",
  },
  {
    image: "feature-3.jpg",
    category: "MINDSET",
    title: "Progress is built on the days you show up",
  },
  {
    image: "feature-2.jpg",
    category: "FITNESS",
    title: "The fundamentals of getting stronger",
  },
];

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="mb-12 max-w-2xl reveal">
      <p
        className={`mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] ${
          light ? "text-orange-400" : "text-orange-600"
        }`}
      >
        <span className="h-px w-8 bg-current" />
        {eyebrow}
      </p>

      <h2
        className={`text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-stone-950"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-xl text-base leading-7 ${
            light ? "text-stone-400" : "text-stone-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M4.75 12h14.5m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-stone-950">
      {/* HERO */}
      <section className="relative isolate flex min-h-[650px] items-center overflow-hidden bg-[#111110] sm:min-h-[720px] lg:min-h-[790px]">
        <img
          src="/template/img/header-1.jpg"
          alt="Training inside the fitness center"
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

        <div className="absolute right-[-100px] top-1/4 -z-10 h-80 w-80 rounded-full bg-orange-500/15 blur-[120px]" />

        <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <div className="hero-enter mb-7 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-orange-500" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400 sm:text-sm">
                More than a gym
              </span>
            </div>

            <h1 className="hero-enter hero-delay-1 max-w-4xl text-5xl font-black uppercase leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[92px]">
              Build strength.
              <br />
              <span className="text-orange-500">Become</span> unstoppable.
            </h1>

            <p className="hero-enter hero-delay-2 mt-7 max-w-xl text-base leading-7 text-stone-300 sm:text-lg sm:leading-8">
              Stronger bodies. Sharper minds. Better habits. Your next chapter
              starts with the decision to show up.
            </p>

            <div className="hero-enter hero-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/courses"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-md bg-orange-500 px-7 py-4 text-sm font-extrabold uppercase tracking-wider text-black transition duration-300 hover:-translate-y-1 hover:bg-orange-400"
              >
                Explore classes
                <ArrowIcon />
              </Link>

              <Link
                to="/about"
                className="inline-flex min-h-14 items-center justify-center rounded-md border border-white/30 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition duration-300 hover:border-white hover:bg-white/10"
              >
                Discover our story
              </Link>
            </div>

            <div className="hero-enter hero-delay-3 mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/20 pt-6 sm:gap-x-12">
              <div>
                <p className="text-2xl font-black text-white sm:text-3xl">
                  01<span className="text-orange-500">.</span>
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-400">
                  Show up
                </p>
              </div>
              <div>
                <p className="text-2xl font-black text-white sm:text-3xl">
                  02<span className="text-orange-500">.</span>
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-400">
                  Put in work
                </p>
              </div>
              <div>
                <p className="text-2xl font-black text-white sm:text-3xl">
                  03<span className="text-orange-500">.</span>
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-400">
                  See progress
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-10 right-8 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 lg:flex">
          <span className="h-10 w-px bg-orange-500" />
          Built through discipline
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="bg-orange-500">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:px-8 md:grid-cols-3 md:gap-8 lg:px-12">
          {[
            ["01 / TRAIN", "Move with intention"],
            ["02 / GROW", "Get stronger every week"],
            ["03 / REPEAT", "Make progress a habit"],
          ].map(([number, text]) => (
            <div key={number} className="flex items-center gap-4">
              <span className="text-xs font-black tracking-widest text-black/60">
                {number}
              </span>
              <span className="text-sm font-extrabold uppercase tracking-wide text-black sm:text-base">
                {text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative py-20 sm:py-28 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div className="reveal relative mx-auto w-full max-w-xl">
            <div className="absolute -left-4 -top-4 h-32 w-32 border-l-2 border-t-2 border-orange-500 sm:-left-6 sm:-top-6" />

            <div className="relative overflow-hidden rounded-sm bg-stone-100">
              <img
                src="/template/img/about-2.png"
                alt="Strength and fitness training"
                loading="lazy"
                className="w-full object-cover transition duration-700 hover:scale-[1.03]"
              />
            </div>

            <div className="absolute -bottom-5 right-3 max-w-[220px] bg-stone-950 p-5 text-white shadow-xl sm:-right-5 sm:p-7">
              <p className="text-3xl font-black text-orange-500">YOUR</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em]">
                Journey. Your pace.
              </p>
            </div>
          </div>

          <div className="reveal">
            <SectionHeading
              eyebrow="A better kind of fitness"
              title="Built for the person you're becoming."
              description="Fitness is not about changing overnight. It is about becoming a little stronger, more confident, and more consistent every single day."
            />

            <div className="space-y-5">
              {[
                {
                  title: "Training with purpose",
                  text: "Create a routine around your goals, experience, and lifestyle.",
                },
                {
                  title: "Progress over perfection",
                  text: "Focus on better habits and sustainable improvements.",
                },
                {
                  title: "A community that moves you",
                  text: "Make fitness part of your life, not just another task.",
                },
              ].map((item, index) => (
                <div key={item.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-black text-orange-700">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-stone-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-stone-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-extrabold uppercase tracking-wider text-stone-950"
            >
              More about us
              <span className="text-orange-600">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[#f6f5f2] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="The difference"
              title="Make every rep count."
              description="Good training is more than lifting weights. It's the mindset, routine, and effort you bring every time."
            />

            <Link
              to="/features"
              className="group mb-12 inline-flex shrink-0 items-center gap-3 text-sm font-extrabold uppercase tracking-wider"
            >
              Explore benefits
              <span className="text-orange-600">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="reveal group overflow-hidden rounded-sm border border-stone-200/80 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 overflow-hidden bg-stone-200">
                  <img
                    src={`/template/img/${feature.image}`}
                    alt={feature.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 text-xs font-black tracking-widest text-white">
                    {feature.number}
                  </span>
                  <span className="absolute bottom-5 left-5 text-[10px] font-extrabold tracking-[0.22em] text-orange-300">
                    {feature.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {feature.description}
                  </p>
                  <Link
                    to="/features"
                    aria-label={`Learn more about ${feature.title}`}
                    className="group/link mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-orange-700"
                  >
                    Learn more
                    <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FITNESS GOALS */}
      <section className="relative overflow-hidden bg-[#151514] py-20 text-white sm:py-28">
        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div className="reveal">
            <SectionHeading
              eyebrow="Your next level"
              title="Different goals. One commitment."
              description="Whether you're just starting out or ready to push your limits, build your routine around what matters to you."
              light
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["01", "Build strength", "Get stronger with consistent training."],
                ["02", "Build muscle", "Train with focus and progressive overload."],
                ["03", "Improve fitness", "Develop stamina and everyday energy."],
                ["04", "Build discipline", "Create habits that last beyond the gym."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-sm border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-orange-500/70 hover:bg-white/[0.07]"
                >
                  <span className="text-xs font-black tracking-widest text-orange-400">
                    {number}
                  </span>
                  <h3 className="mt-3 font-extrabold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/courses"
              className="group mt-8 inline-flex items-center gap-3 rounded-md bg-orange-500 px-6 py-4 text-sm font-extrabold uppercase tracking-wider text-black transition hover:bg-orange-400"
            >
              Find your training
              <ArrowIcon />
            </Link>
          </div>

          <div className="reveal relative">
            <img
              src="/template/img/fitness-goal-banner.png"
              alt="Fitness goals and strength training"
              loading="lazy"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 border-l-2 border-orange-500 bg-black/60 p-5 backdrop-blur-sm sm:bottom-8 sm:left-8 sm:right-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                Remember this
              </p>
              <p className="mt-2 text-2xl font-black sm:text-3xl">
                Consistency changes everything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Find your training"
              title="Choose your kind of strong."
              description="Explore training options and find the right place to begin your next chapter."
            />

            <Link
              to="/courses"
              className="group mb-12 inline-flex shrink-0 items-center gap-3 text-sm font-extrabold uppercase tracking-wider"
            >
              All classes
              <span className="text-orange-600">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {courses.map((course, index) => (
              <article
                key={course.title}
                className="reveal group relative overflow-hidden rounded-sm bg-[#171716] p-7 text-white transition duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-9"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-orange-500/10 blur-3xl transition group-hover:bg-orange-500/20" />

                <div className="relative flex items-start justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-orange-500 p-3">
                    <img
                      src={`/template/img/${course.image}`}
                      alt=""
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <span className="text-4xl font-black text-white/10">
                    {course.number}
                  </span>
                </div>

                <p className="relative mt-8 text-[10px] font-extrabold tracking-[0.25em] text-orange-400">
                  {course.category}
                </p>

                <h3 className="relative mt-3 text-2xl font-black">
                  {course.title}
                </h3>

                <p className="relative mt-4 min-h-[72px] text-sm leading-7 text-stone-400">
                  {course.description}
                </p>

                <div className="relative mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                    {course.time}
                  </p>

                  <Link
                    to="/courses"
                    className="group/link mt-6 inline-flex items-center gap-3 text-sm font-extrabold uppercase tracking-wider text-white transition hover:text-orange-400"
                  >
                    Explore class
                    <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MOTIVATIONAL BANNER */}
      <section className="relative isolate overflow-hidden bg-stone-900 py-24 sm:py-32">
        <img
          src="/template/img/header-1.jpg"
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-black/75" />

        <div className="reveal mx-auto max-w-5xl px-5 text-center sm:px-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-orange-400">
            No shortcuts. Just work.
          </p>

          <h2 className="mt-6 text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
            Your only competition
            <span className="mt-2 block text-orange-500">
              is who you were yesterday.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-stone-300">
            You don't need to have everything figured out. Take the first step,
            stay consistent, and let your progress speak.
          </p>

          <Link
            to="/contact"
            className="group mt-9 inline-flex items-center justify-center gap-3 rounded-md bg-orange-500 px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-black transition hover:-translate-y-1 hover:bg-orange-400"
          >
            Start your journey
            <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="bg-[#f6f5f2] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="The people behind the progress"
            title="Meet your training team."
            description="Great training starts with good guidance. Get to know the team behind your fitness journey."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trainers.map((trainer, index) => (
              <article
                key={trainer.image}
                className="reveal group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden bg-stone-200">
                  <img
                    src={`/template/img/${trainer.image}`}
                    alt={trainer.name}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-4 left-5 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                    COACH 0{index + 1}
                  </span>
                </div>

                <div className="border-b border-stone-300 py-5">
                  <h3 className="text-lg font-black">{trainer.name}</h3>
                  <p className="mt-1 text-sm text-stone-600">
                    {trainer.specialty}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="The fitness journal"
              title="A little knowledge goes a long way."
              description="Explore ideas that can help you train smarter, stay motivated, and build better habits."
            />

            <Link
              to="/blog"
              className="group mb-12 inline-flex shrink-0 items-center gap-3 text-sm font-extrabold uppercase tracking-wider"
            >
              Visit the blog
              <span className="text-orange-600">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {blogs.map((blog, index) => (
              <article
                key={blog.title}
                className="reveal group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to="/blog" className="block overflow-hidden bg-stone-100">
                  <img
                    src={`/template/img/${blog.image}`}
                    alt={blog.title}
                    loading="lazy"
                    className="aspect-[5/3] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </Link>

                <div className="pt-5">
                  <p className="text-[10px] font-extrabold tracking-[0.25em] text-orange-700">
                    {blog.category}
                  </p>
                  <h3 className="mt-3 text-xl font-black leading-snug transition group-hover:text-orange-700">
                    <Link to="/blog">{blog.title}</Link>
                  </h3>
                  <Link
                    to="/blog"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold"
                  >
                    Read article
                    <span className="text-orange-600">
                      <ArrowIcon />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-sm bg-orange-500 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[40px] border-black/5" />
          <div className="absolute -bottom-32 right-1/4 h-64 w-64 rounded-full border-[40px] border-black/5" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-black/60">
                The next move is yours
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
                Stop waiting. Start becoming.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-black/75 sm:text-base">
                Take the first step towards a stronger, healthier, more
                confident version of yourself.
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-md bg-stone-950 px-7 py-4 text-sm font-extrabold uppercase tracking-wider text-white transition duration-300 hover:-translate-y-1 hover:bg-stone-800"
            >
              Get started
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
