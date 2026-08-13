import React, { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const STYLES = `
  /* KESHO — radar scan line */
  @keyframes kScan {
    0%   { top: -2px; opacity: 0; }
    6%   { opacity: 1; }
    94%  { opacity: 1; }
    100% { top: calc(100% + 2px); opacity: 0; }
  }

  /* AMUSE — slow diagonal gallery shimmer */
  @keyframes aShimmer {
    0%   { transform: translateX(-140%) skewX(-16deg); }
    100% { transform: translateX(340%) skewX(-16deg); }
  }

  /* SEEDS — slow image breathe */
  @keyframes sBreathe {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.026); }
  }

  /* HULK — irregular micro-tremor burst */
  @keyframes hShake {
    0%,  75%, 100% { transform: translate(0, 0) rotate(0deg); }
    76% { transform: translate(-2px,  1px) rotate(-0.35deg); }
    77% { transform: translate( 2px, -1px) rotate( 0.35deg); }
    78% { transform: translate(-2px,  2px) rotate(-0.25deg); }
    79% { transform: translate( 2px,  1px) rotate( 0.25deg); }
    80% { transform: translate(-1px, -2px) rotate(-0.15deg); }
    81% { transform: translate( 1px,  1px) rotate( 0.15deg); }
    82% { transform: translate( 0,    0  ) rotate( 0deg); }
  }

  /* STEM X — blueprint grid pulse */
  @keyframes gPulse {
    0%, 100% { opacity: 0.06; }
    50%       { opacity: 0.16; }
  }

  /* INLINE — annotation marks grow in sequence */
  @keyframes iHighA {
    0%, 8%,  38%, 100% { transform: scaleX(0); opacity: 0; }
    18%, 30%            { transform: scaleX(1); opacity: 1; }
  }
  @keyframes iHighB {
    0%, 30%, 62%, 100% { transform: scaleX(0); opacity: 0; }
    42%, 55%            { transform: scaleX(1); opacity: 1; }
  }
  @keyframes iHighC {
    0%, 58%, 90%, 100% { transform: scaleX(0); opacity: 0; }
    68%, 82%            { transform: scaleX(1); opacity: 1; }
  }

  .img-breathe { animation: sBreathe 4s ease-in-out infinite; }
  .card-shake  { animation: hShake  9s ease-in-out infinite; }
`;

const navLinks = ["Work", "Studio", "Services", "Journal", "Contact"];

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  link: string;
  bg: string;
  accent: string;
  image: string;
  imgPos: string;
  anim: "scan" | "shimmer" | "highlight" | "breathe" | "shake" | "grid";
}

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "KESHO",
    subtitle: "Prediction App",
    category: "Full Stack / Product Design",
    year: "2026",
    description:
      "A sealed foresight platform where users submit timestamped predictions for live sports, entertainment, and politics — locked at kickoff, revealed after.",
    tags: ["Sports Tech", "PWA", "AI"],
    link: "https://masachidc.com/works/kesho-app",
    bg: "#0F3FA8",
    accent: "#7DC4FF",
    image: "https://images.unsplash.com/photo-1679391029864-d46f366a456b?w=1400&q=85",
    imgPos: "center 35%",
    anim: "scan",
  },
  {
    id: "02",
    title: "AMUSE",
    subtitle: "Art Museum",
    category: "UI/UX Product Design",
    year: "2025",
    description:
      "A museum platform enabling Kenyans to discover exhibitions and book tickets seamlessly — with M-Pesa integration and an African-heritage visual identity.",
    tags: ["Mobile-First", "Cultural Tech", "Kenya"],
    link: "https://masachidc.com/works/amuse-art-museum",
    bg: "#B87318",
    accent: "#FFE09A",
    image: "https://images.unsplash.com/photo-1763909855036-46b3be5085b6?w=1400&q=85",
    imgPos: "center 20%",
    anim: "shimmer",
  },
  {
    id: "03",
    title: "INLINE",
    subtitle: "Chrome Extension",
    category: "UI/UX Design",
    year: "2026",
    description:
      "A browser extension that turns passive browsing into an interactive canvas — annotate, highlight, draw, and invoke AI on any webpage.",
    tags: ["Browser AI", "Productivity", "FIU Award"],
    link: "https://masachidc.com/works/inline-chrome-extension",
    bg: "#0B6B38",
    accent: "#A8F0C0",
    image: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?w=1400&q=85",
    imgPos: "center center",
    anim: "highlight",
  },
  {
    id: "04",
    title: "SEEDS",
    subtitle: "Brand Identity",
    category: "Brand Identity Design",
    year: "2025",
    description:
      "Extending FIU's brand system to give Project SEEDS its own distinct presence — contributing to a 100%+ increase in student enrollment.",
    tags: ["Logo Design", "Web Design", "FIU"],
    link: "https://masachidc.com/works/project-seeds-branding",
    bg: "#B89A00",
    accent: "#FFF5A0",
    image: "https://images.unsplash.com/photo-1763705857736-2b4f16a33758?w=1400&q=85",
    imgPos: "center center",
    anim: "breathe",
  },
  {
    id: "05",
    title: "HULK",
    subtitle: "Motion Design",
    category: "Motion Design",
    year: "2025",
    description:
      "An epic comics story produced with Masachi DC Studios — kinetic typography, particle physics, and After Effects mastery woven into a bold cinematic narrative.",
    tags: ["After Effects", "Kinetic Type", "Comics"],
    link: "https://masachidc.com/works/the-incredible-hulk",
    bg: "#C01030",
    accent: "#FFB0C0",
    image: "https://images.unsplash.com/photo-1768328591729-176a94d187ef?w=1400&q=85",
    imgPos: "center center",
    anim: "shake",
  },
  {
    id: "06",
    title: "STEM X",
    subtitle: "Architecture Camp",
    category: "Architecture & Curriculum",
    year: "2026",
    description:
      "A multi-year initiative bringing architecture and design to 500+ students across six African nations through hands-on SketchUp workshops.",
    tags: ["STEM Education", "Africa", "6 Countries"],
    link: "https://masachidc.com/works/stemxposure",
    bg: "#B84A10",
    accent: "#FFD090",
    image: "https://images.unsplash.com/photo-1624066969616-69b0b0301d4d?w=1400&q=85",
    imgPos: "center 45%",
    anim: "grid",
  },
];

function ease(hovered: boolean, step: number): React.CSSProperties {
  const d = 55 + step * 60;
  return {
    opacity: hovered ? 1 : 0,
    transform: hovered ? "translateY(0px)" : "translateY(10px)",
    transition: `opacity 480ms cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 480ms cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  };
}

function Card({ p, style, className = "" }: { p: Project; style?: React.CSSProperties; className?: string }) {
  const [on, setOn] = useState(false);

  return (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block overflow-hidden cursor-pointer ${p.anim === "shake" && !on ? "card-shake" : ""} ${className}`}
      style={style}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      {/* Image */}
      <img
        src={p.image}
        alt={p.title}
        className={`absolute inset-0 w-full h-full object-cover ${p.anim === "breathe" && !on ? "img-breathe" : ""}`}
        style={{
          objectPosition: p.imgPos,
          filter: `brightness(${on ? 0.12 : 0.82}) saturate(${on ? 0.2 : 1.05})`,
          transform: on ? "scale(1.04)" : "scale(1)",
          transition: "filter 520ms ease, transform 700ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* SCAN — KESHO */}
      {p.anim === "scan" && !on && (
        <div
          className="absolute left-0 right-0 pointer-events-none z-10"
          style={{
            height: "1.5px",
            background: `linear-gradient(90deg, transparent, ${p.accent}bb 25%, ${p.accent} 50%, ${p.accent}bb 75%, transparent)`,
            boxShadow: `0 0 12px 3px ${p.accent}44`,
            animation: "kScan 3.2s linear infinite",
          }}
        />
      )}

      {/* SHIMMER — AMUSE */}
      {p.anim === "shimmer" && !on && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "120px",
              background: "linear-gradient(90deg, transparent, rgba(210,170,90,0.18), rgba(255,220,140,0.10), transparent)",
              animation: "aShimmer 5.5s ease-in-out infinite",
              animationDelay: "1.2s",
            }}
          />
        </div>
      )}

      {/* HIGHLIGHT — INLINE */}
      {p.anim === "highlight" && !on && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[
            { top: "62%", left: "8%",  w: "36%", color: "#A8F0C0", anim: "iHighA 6s ease-in-out infinite" },
            { top: "70%", left: "12%", w: "24%", color: "#FFE09A", anim: "iHighB 6s ease-in-out infinite" },
            { top: "78%", left: "8%",  w: "30%", color: "#FFB0C0", anim: "iHighC 6s ease-in-out infinite" },
          ].map((h, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: h.top,
                left: h.left,
                width: h.w,
                height: "2.5px",
                background: h.color,
                borderRadius: "2px",
                transformOrigin: "left center",
                transform: "scaleX(0)",
                opacity: 0,
                animation: h.anim,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* GRID — STEM X */}
      {p.anim === "grid" && !on && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: `linear-gradient(${p.accent}30 1px, transparent 1px), linear-gradient(90deg, ${p.accent}30 1px, transparent 1px)`,
            backgroundSize: "42px 42px",
            animation: "gPulse 3.6s ease-in-out infinite",
          }}
        />
      )}

      {/* Idle bottom label */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 px-6 py-5"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
          opacity: on ? 0 : 1,
          transition: "opacity 300ms ease",
          pointerEvents: "none",
        }}
      >
        <p style={{ fontSize: "9px", color: p.accent + "cc", letterSpacing: "0.22em" }} className="font-bold uppercase mb-1">
          {p.id} — {p.year}
        </p>
        <h3 className="text-white font-black leading-none tracking-tight text-2xl">{p.title}</h3>
        <p className="text-white/40 text-[10px] font-medium uppercase tracking-widest mt-0.5">{p.subtitle}</p>
      </div>

      {/* Hover luxury panel */}
      <div
        className="absolute inset-0 z-30 flex flex-col justify-between p-6"
        style={{
          background: p.bg,
          opacity: on ? 1 : 0,
          transition: "opacity 400ms ease",
          pointerEvents: on ? "auto" : "none",
        }}
      >
        {/* Top */}
        <div className="flex items-start justify-between" style={ease(on, 0)}>
          <span
            className="font-black leading-none select-none"
            style={{ fontSize: "52px", color: p.accent, opacity: 0.18 }}
          >
            {p.id}
          </span>
          <span
            className="text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1.5"
            style={{ border: `1px solid ${p.accent}35`, color: p.accent, letterSpacing: "0.2em" }}
          >
            {p.year}
          </span>
        </div>

        {/* Bottom content */}
        <div>
          <div style={ease(on, 1)}>
            <p className="text-white/30 font-semibold uppercase mb-2" style={{ fontSize: "9px", letterSpacing: "0.22em" }}>
              {p.category}
            </p>
            <h3 className="text-white font-black leading-none tracking-tight mb-0.5" style={{ fontSize: "clamp(22px, 2.6vw, 36px)" }}>
              {p.title}
            </h3>
            <p className="text-white/30 font-medium uppercase tracking-widest mb-4" style={{ fontSize: "10px" }}>
              {p.subtitle}
            </p>
          </div>

          <p className="text-white/50 text-sm leading-relaxed mb-4" style={ease(on, 2)}>
            {p.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5" style={ease(on, 3)}>
            {p.tags.map((t) => (
              <span
                key={t}
                className="font-semibold uppercase"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.16em",
                  padding: "4px 10px",
                  background: `${p.accent}14`,
                  color: p.accent,
                  border: `1px solid ${p.accent}22`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div
            className="inline-flex items-center gap-1.5 font-bold uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.18em", color: p.accent, ...ease(on, 4) }}
          >
            View Project <ArrowUpRight size={12} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Accent rule — draws in on hover */}
      <div
        className="absolute bottom-0 left-0 z-40"
        style={{
          height: "2px",
          background: p.accent,
          width: on ? "100%" : "0%",
          transition: "width 600ms cubic-bezier(0.16,1,0.3,1) 120ms",
        }}
      />
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{STYLES}</style>

      <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#cae4d2] h-[100px] flex items-center shrink-0">
          <div className="w-full max-w-[1440px] mx-auto px-[70px] flex items-center justify-between">
            <a href="#" className="flex items-baseline gap-2">
              <span className="font-black text-[17px] tracking-tight text-black">MASACHI</span>
              <span className="font-medium text-[11px] text-black/40 tracking-[0.28em] uppercase">DC</span>
            </a>

            <nav className="hidden md:flex items-center gap-9">
              {navLinks.map((l) => (
                <a key={l} href="#" className="text-[11px] font-semibold text-black/55 hover:text-black tracking-[0.18em] uppercase transition-colors duration-200">
                  {l}
                </a>
              ))}
            </nav>

            <a
              href="https://masachidc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-bold px-5 py-2.5 tracking-[0.16em] uppercase hover:bg-black/75 transition-colors duration-200"
            >
              Portfolio <ArrowUpRight size={11} />
            </a>

            <button className="md:hidden w-10 h-10 flex items-center justify-center" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {menuOpen && (
            <div className="absolute top-full inset-x-0 bg-[#cae4d2] border-t border-black/10 py-6 px-[70px] flex flex-col gap-5 z-50">
              {navLinks.map((l) => (
                <a key={l} href="#" className="text-sm font-semibold text-black/70 uppercase tracking-widest">{l}</a>
              ))}
            </div>
          )}
        </header>

        <main className="flex-1">
          {/* Hero */}
          <section className="bg-[#eaeaea]">
            <div className="max-w-[1440px] mx-auto px-[70px] h-[421px] flex flex-col justify-center">
              <p className="text-[9px] font-bold tracking-[0.30em] uppercase text-black/35 mb-5">
                UI / UX — Selected Works — 2025–2026
              </p>
              <h1 className="font-black text-black leading-none tracking-tight" style={{ fontSize: "clamp(52px, 7vw, 100px)" }}>
                Hero text
              </h1>
              <p className="mt-5 text-sm text-black/40 max-w-sm leading-relaxed font-medium">
                Six projects. Research, culture, craft. Hover to explore.
              </p>
            </div>
          </section>

          {/* Mosaic */}
          <div className="max-w-[1440px] mx-auto px-[70px]">

            {/* Row 1 */}
            <div style={{ display: "flex", gap: "25px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                <Card p={PROJECTS[0]} style={{ width: "775px", height: "375px" }} />
                <Card p={PROJECTS[1]} style={{ width: "775px", height: "375px" }} />
              </div>
              <Card p={PROJECTS[2]} style={{ width: "500px", height: "775px" }} />
            </div>

            <div style={{ height: "25px" }} />

            {/* Row 2 */}
            <div style={{ display: "flex", gap: "25px" }}>
              <Card p={PROJECTS[3]} style={{ width: "500px", height: "775px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                <Card p={PROJECTS[4]} style={{ width: "775px", height: "375px" }} />
                <Card p={PROJECTS[5]} style={{ width: "775px", height: "375px" }} />
              </div>
            </div>
          </div>

          {/* Closing */}
          <section className="bg-[#eaeaea]">
            <div className="max-w-[1440px] mx-auto px-[70px] h-[421px] flex flex-col justify-center gap-5">
              <h2 className="font-black text-black leading-none tracking-tight" style={{ fontSize: "clamp(52px, 7vw, 100px)" }}>
                Closing
              </h2>
              <p className="text-sm text-black/40 max-w-xs leading-relaxed font-medium">
                {"Let's"} build something that matters.
              </p>
              <a
                href="https://masachidc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-bold px-6 py-3 tracking-[0.18em] uppercase hover:bg-black/75 transition-colors duration-200"
              >
                View Full Portfolio <ArrowUpRight size={11} />
              </a>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#cae4d2] h-[100px] flex items-center shrink-0">
          <div className="w-full max-w-[1440px] mx-auto px-[70px] flex items-center justify-between">
            <span className="text-[9px] font-semibold text-black/40 tracking-[0.24em] uppercase">
              © 2026 Masachi DC — All rights reserved
            </span>
            <div className="flex items-center gap-7">
              {["Instagram", "LinkedIn", "Behance"].map((s) => (
                <a
                  key={s}
                  href="https://masachidc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-bold text-black/45 hover:text-black tracking-[0.22em] uppercase transition-colors duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
