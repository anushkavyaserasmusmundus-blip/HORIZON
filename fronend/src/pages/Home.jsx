import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import DashboardLayout from "../components/layout/DashboardLayout";
import Scribble from "../components/ui/Scribble.tsx";
import RocketScroll from "../components/home/RocketScroll.tsx";
import profilePic from "../assets/images/profilepic-home.jpg";

const headline = "Make progress visible.";
const headlinePrefix = "Make progress ";

function HomeHero() {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.4 });
  const [typedCharacters, setTypedCharacters] = useState(0);
  const underlineVisible = isInView && typedCharacters >= headline.length;

  useEffect(() => {
    if (!isInView || typedCharacters >= headline.length) return undefined;
    const timer = setTimeout(() => setTypedCharacters((current) => current + 1), 45);
    return () => clearTimeout(timer);
  }, [isInView, typedCharacters]);

  const typedPrefix = headline.slice(0, Math.min(typedCharacters, headlinePrefix.length));
  const typedSuffix = headline.slice(headlinePrefix.length, typedCharacters);

  return (
    <motion.section
      ref={heroRef}
      id="top"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="home-landing-width grid min-h-[22rem] grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] items-center gap-4 py-10 sm:min-h-[28rem] sm:gap-8 sm:py-14"
    >
      <div className="min-w-0 text-left">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#E07A5F] sm:text-xs sm:tracking-[0.2em]">YOUR PERSONAL LIFE OS</p>
        <h1 aria-label={headline} className="home-display relative mt-3 text-3xl font-bold leading-tight text-[#9E2B25] sm:text-5xl">
          <span aria-hidden="true">{typedPrefix}</span>
          {typedSuffix && typedCharacters < headline.length && <span aria-hidden="true">{typedSuffix}</span>}
          {underlineVisible && (
            <RoughNotationGroup show={underlineVisible}>
              <RoughNotation type="underline" color="#9E2B25" strokeWidth={2.5} animationDuration={1100} iterations={2} padding={6} multiline order={1}>
                visible.
              </RoughNotation>
            </RoughNotationGroup>
          )}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#6F5145] sm:text-base sm:leading-7">
          Horizon brings your plans, daily habits, and personal growth together in one clear view.
        </p>
        <a href="#about" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#9E2B25] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#81211D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E2B25]">
          Explore Horizon <ArrowDown size={16} />
        </a>
      </div>

      <div className="flex items-center justify-end">
        <div className="relative flex items-center justify-end">
          <motion.span aria-hidden="true" animate={{ rotate: [0, 16, 0], scale: [0.9, 1.12, 0.9] }} transition={{ duration: 3.8, ease: "easeInOut", repeat: Infinity }} className="absolute right-0 top-[12%] z-10 text-[#E07A5F]">
            <Sparkles size={20} />
          </motion.span>
          <motion.span aria-hidden="true" animate={{ rotate: [0, -14, 0], y: [0, -4, 0] }} transition={{ duration: 4.6, ease: "easeInOut", repeat: Infinity }} className="absolute bottom-[10%] left-0 z-10 text-[#E07A5F]">
            <Sparkles size={15} />
          </motion.span>
          <motion.img
            src={profilePic}
            alt="Anushka Vyas"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            className="aspect-square w-full max-w-[22rem] rounded-full object-cover object-center drop-shadow-[0_14px_18px_rgba(76,45,31,0.14)]"
          />
        </div>
      </div>
    </motion.section>
  );
}

function AboutSection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="border-y border-[#E9DCCB] bg-[#FBF0E1]/70"
    >
      <div className="home-landing-width grid gap-8 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:py-24">
        <div className="relative self-center">
          <Sparkles className="absolute -left-2 -top-7 h-6 w-6 -rotate-12 text-[#E07A5F]" aria-hidden="true" />
          <svg className="home-doodle-arrow absolute -right-3 top-1 hidden h-12 w-20 text-[#E07A5F] md:block" viewBox="0 0 80 48" fill="none" aria-hidden="true">
            <path d="M3 40C26 7 47 8 67 19M67 19L55 9M67 19L55 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
          </svg>
          <h2 className="home-display relative max-w-xl text-3xl font-bold leading-tight text-[#9E2B25] sm:text-4xl">
            <Scribble type="underline" color="#E07A5F" multiline>
              Hi, I'm Anushka — slightly creative, almost noob. ♡
            </Scribble>
          </h2>
          <Sparkles className="absolute -bottom-7 right-8 h-5 w-5 rotate-12 text-[#E07A5F]" aria-hidden="true" />
        </div>

        <div className="space-y-4 text-sm leading-7 text-[#604B40] sm:text-base sm:leading-8">
          <p>I'm Anushka Vyas, a software developer with over 2 years of experience.</p>
          <p>
            I'm almost a noob, slightly creative, and I always want to <Scribble type="highlight" color="#FFDAB9" iterations={1} padding={2}>find purpose in my work</Scribble>. Through my journey of development, I realized we don't have a single platform where we can showcase all our contributions, heatmaps, problem-solving streaks, and growth in one place.
          </p>
          <p className="font-semibold text-[#9E2B25]">So I started building Horizon.</p>
        </div>
      </div>
    </motion.section>
  );
}

function StorySection() {
  return (
    <motion.section
      id="story"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="home-landing-width grid gap-8 py-16 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-14 md:py-24"
    >
      <RocketScroll />

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E07A5F]">A developer story, in one place</p>
        <h2 className="home-display mt-3 text-3xl font-bold leading-tight text-[#9E2B25] sm:text-4xl">The story of how Horizon rose 🚀</h2>
        <div className="mt-5 space-y-4 text-sm leading-7 text-[#604B40] sm:text-base sm:leading-8">
          <p>Horizon brings your contributions together so you can share your growth with recruiters, managers, and potential employers.</p>
          <p>Connect your LeetCode, GitHub, and Codeforces accounts in one place, then share your dashboard and developer journey with a single link.</p>
          <p className="font-semibold text-[#9E2B25]">
            No more sending 5 different profiles.<br />
            <Scribble type="circle" color="#E07A5F" iterations={1} padding={2} multiline={false} className="home-story-circle">One Horizon. Your entire dev story.</Scribble>
          </p>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/profile" className="rounded-full bg-[#9E2B25] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#81211D]">Connect GitHub</Link>
          <Link to="/profile" className="rounded-full border border-[#9E2B25]/30 bg-white/60 px-4 py-2.5 text-sm font-semibold text-[#9E2B25] transition hover:bg-white">Connect LeetCode</Link>
          <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold text-[#9E2B25] transition hover:text-[#E07A5F]">See Live Demo <ArrowRight size={15} /></Link>
        </div>
      </div>
    </motion.section>
  );
}

function HomeFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="border-t border-[#E9DCCB] bg-[#FBF0E1]/70 px-5 py-10 text-center sm:py-14"
    >
      <p className="home-display text-xl font-bold text-[#9E2B25] sm:text-2xl">
        Your code. Your journey. One Horizon. — <Link to="/dashboard" className="underline decoration-[#E07A5F] decoration-2 underline-offset-4">Start building your Horizon today.</Link>
      </p>
    </motion.footer>
  );
}

export default function Home() {
  return (
    <DashboardLayout
      showSidebar
      showTaskWidget={false}
      showFooter={false}
      naturalScroll
      contentClassName="home-landing-scroll"
    >
      <main className="home-paper min-h-full text-[#604B40]">
        <HomeHero />
        <AboutSection />
        <StorySection />
        <HomeFooter />
      </main>
    </DashboardLayout>
  );
}