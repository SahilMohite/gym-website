
import { Link } from "react-router-dom";
import {
  features,
  courses,
  trainers,
  blogs,
  benefits,
  goals,
  introSteps,
} from "./HomeData";
import {
  ArrowIcon,
  SectionHeading,
  SectionLink,
} from "./HomeComponents";

const image = (name) => `/template/img/${name}`;

function Hero() {
  return (
    <section className="relative isolate flex min-h-[650px] items-center overflow-hidden bg-[#111110] sm:min-h-[720px] lg:min-h-[790px]">
      <img
        src={image("header-1.jpg")}
        alt="Training inside the fitness center"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-17 pt-32 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <p className="hero-enter mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-400 sm:text-sm">
            <span className="h-0.5 w-10 bg-orange-500" />
            More than a gym
          </p>

          <h1 className="hero-enter hero-delay-1 text-5xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[92px]">
            Build strength.
            <br />
            <span className="text-orange-500">Become</span> unstoppable.
          </h1>

          <p className="hero-enter hero-delay-2 mt-7 max-w-xl text-base leading-7 text-stone-300 sm:text-lg">
            Stronger bodies. Sharper minds. Better habits. Your next chapter
            starts with the decision to show up.
          </p>

          <div className="hero-enter hero-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/courses"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-md bg-orange-500 px-7 py-4 text-sm font-extrabold uppercase text-black transition hover:-translate-y-1 hover:bg-orange-400"
            >
              Explore classes <ArrowIcon />
            </Link>
            <Link
              to="/about"
              className="inline-flex min-h-14 items-center justify-center rounded-md border border-white/30 px-7 py-4 text-sm font-bold uppercase text-white transition hover:bg-white/10"
            >
              Discover our story
            </Link>
          </div>

          <div className="hero-enter hero-delay-3 mt-14 flex flex-wrap gap-8 border-t border-white/20 pt-6 sm:gap-12">
            {["Show up", "Put in work", "See progress"].map((text, i) => (
              <div key={text}>
                <p className="text-3xl font-black text-white">
                  0{i + 1}<span className="text-orange-500">.</span>
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-stone-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
<div className="pointer-events-none absolute bottom-20 right-8 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 lg:flex">
  <span className="h-10 w-px bg-orange-500" />
  Built through discipline
</div>

    </section>
  );
}

function IntroStrip() {
  return (
    <section className="bg-orange-500">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:px-8 md:grid-cols-3 lg:px-12">
        {introSteps.map(([number, text]) => (
          <div key={number} className="flex items-center gap-4">
            <span className="text-xs font-black text-black/60">{number}</span>
            <span className="text-sm font-extrabold uppercase text-black">
              {text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="reveal relative mx-auto w-full max-w-xl">
          <div className="absolute -left-4 -top-4 h-32 w-32 border-l-2 border-t-2 border-orange-500" />
          <img
            src={image("about-2.png")}
            alt="Strength and fitness training"
            loading="lazy"
            className="relative w-full object-cover"
          />
          <div className="absolute -bottom-5 right-3 bg-stone-950 p-5 text-white sm:-right-5 sm:p-7">
            <p className="text-3xl font-black text-orange-500">YOUR</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest">
              Journey. Your pace.
            </p>
          </div>
        </div>

        <div className="reveal">
          <SectionHeading
            eyebrow="A better kind of fitness"
            title="Built for the person you're becoming."
            description="Fitness is not about changing overnight. It is about becoming stronger, more confident, and more consistent every day."
          />

          <div className="space-y-5">
            {benefits.map((item, i) => (
              <div key={item.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-black text-orange-700">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-extrabold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <SectionLink to="/about">More about us</SectionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-[#f6f5f2] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="The difference"
            title="Make every rep count."
            description="Great training is built on mindset, routine, and effort."
          />
          <div className="mb-12">
            <SectionLink to="/features">Explore benefits</SectionLink>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((item, i) => (
            <article
              key={item.title}
              className="reveal group overflow-hidden border border-stone-200 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-xl"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={image(item.image)}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <span className="absolute left-5 top-5 text-xs font-black text-white">
                  {item.number}
                </span>
                <span className="absolute bottom-5 left-5 text-[10px] font-extrabold tracking-widest text-orange-300">
                  {item.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {item.description}
                </p>
                <Link
                  to="/features"
                  className="group/link mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-orange-700"
                >
                  Learn more <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoalsSection() {
  return (
    <section className="relative overflow-hidden bg-[#151514] py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="reveal">
          <SectionHeading
            eyebrow="Your next level"
            title="Different goals. One commitment."
            description="Build your routine around what matters to you, whether you're starting out or pushing your limits."
            light
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {goals.map(([number, title, description]) => (
              <div
                key={number}
                className="border border-white/10 bg-white/[0.04] p-5 transition hover:border-orange-500/70"
              >
                <span className="text-xs font-black text-orange-400">{number}</span>
                <h3 className="mt-3 font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/courses"
              className="group inline-flex items-center gap-3 rounded-md bg-orange-500 px-6 py-4 text-sm font-extrabold uppercase text-black hover:bg-orange-400"
            >
              Find your training <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="reveal relative">
          <img
            src={image("fitness-goal-banner.png")}
            alt="Fitness goals and strength training"
            loading="lazy"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 border-l-2 border-orange-500 bg-black/60 p-5 sm:bottom-8 sm:left-8 sm:right-8">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Remember this
            </p>
            <p className="mt-2 text-2xl font-black sm:text-3xl">
              Consistency changes everything.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClassesSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Find your training"
            title="Choose your kind of strong."
            description="Explore training options and find the right place to begin."
          />
          <div className="mb-12">
            <SectionLink to="/courses">All classes</SectionLink>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {courses.map((item, i) => (
            <article
              key={item.title}
              className="reveal group relative overflow-hidden bg-[#171716] p-7 text-white transition duration-500 hover:-translate-y-2 sm:p-9"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center bg-orange-500 p-3">
                  <img src={image(item.image)} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <span className="text-4xl font-black text-white/10">{item.number}</span>
              </div>
              <p className="mt-8 text-[10px] font-extrabold tracking-widest text-orange-400">
                {item.category}
              </p>
              <h3 className="mt-3 text-2xl font-black">{item.title}</h3>
              <p className="mt-4 min-h-[72px] text-sm leading-7 text-stone-400">
                {item.description}
              </p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs font-semibold uppercase text-stone-300">{item.time}</p>
                <div className="mt-6">
                  <SectionLink to="/courses">Explore class</SectionLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MotivationSection() {
  return (
    <section className="relative isolate overflow-hidden bg-stone-900 py-24 sm:py-32">
      <img
        src={image("header-1.jpg")}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/75" />
      <div className="reveal mx-auto max-w-5xl px-5 text-center sm:px-8">
        <p className="text-xs font-extrabold uppercase tracking-widest text-orange-400">
          No shortcuts. Just work.
        </p>
        <h2 className="mt-6 text-4xl font-black uppercase text-white sm:text-5xl lg:text-7xl">
          Your only competition
          <span className="mt-2 block text-orange-500">is who you were yesterday.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl leading-7 text-stone-300">
          Take the first step, stay consistent, and let your progress speak.
        </p>
        <Link
          to="/contact"
          className="group mt-9 inline-flex items-center gap-3 bg-orange-500 px-8 py-4 text-sm font-extrabold uppercase text-black hover:bg-orange-400"
        >
          Start your journey <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

function TrainersSection() {
  return (
    <section className="bg-[#f6f5f2] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="The people behind the progress"
          title="Meet your training team."
          description="Get to know the team behind your fitness journey."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((item, i) => (
            <article key={item.image} className="reveal group" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="relative overflow-hidden bg-stone-200">
                <img
                  src={image(item.image)}
                  alt={item.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <span className="absolute bottom-4 left-5 text-xs font-bold tracking-widest text-orange-300">
                  COACH 0{i + 1}
                </span>
              </div>
              <div className="border-b border-stone-300 py-5">
                <h3 className="text-lg font-black">{item.name}</h3>
                <p className="mt-1 text-sm text-stone-600">{item.specialty}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="The fitness journal"
            title="A little knowledge goes a long way."
            description="Ideas to help you train smarter and build better habits."
          />
          <div className="mb-12">
            <SectionLink to="/blog">Visit the blog</SectionLink>
          </div>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {blogs.map((item, i) => (
            <article key={item.title} className="reveal group" style={{ animationDelay: `${i * 100}ms` }}>
              <Link to="/blog" className="block overflow-hidden bg-stone-100">
                <img
                  src={image(item.image)}
                  alt={item.title}
                  loading="lazy"
                  className="aspect-[5/3] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="pt-5">
                <p className="text-[10px] font-extrabold tracking-widest text-orange-700">{item.category}</p>
                <h3 className="mt-3 text-xl font-black leading-snug group-hover:text-orange-700">
                  <Link to="/blog">{item.title}</Link>
                </h3>
                <div className="mt-5">
                  <SectionLink to="/blog">Read article</SectionLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden bg-orange-500 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-black/60">
              The next move is yours
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase text-black sm:text-4xl lg:text-5xl">
              Stop waiting. Start becoming.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-black/75 sm:text-base">
              Take the first step towards a stronger, healthier, more confident you.
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 bg-stone-950 px-7 py-4 text-sm font-extrabold uppercase text-white transition hover:-translate-y-1 hover:bg-stone-800"
          >
            Get started <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomeSections() {
  return (
    <main className="overflow-hidden bg-white text-stone-950">
      <Hero />
      <IntroStrip />
      <AboutSection />
      <FeaturesSection />
      <GoalsSection />
      <ClassesSection />
      <MotivationSection />
      <TrainersSection />
      <BlogSection />
      <FinalCTA />
    </main>
  );
}
