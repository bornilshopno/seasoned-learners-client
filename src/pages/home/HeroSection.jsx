
import { useState, useEffect } from "react";
import { Link } from "react-router";




// ── FLOATING SYMBOLS DATA ──────────────────────────────────────────────────
// Each object defines one floating math/science symbol and all its properties.
// Static constant (not Math.random) for consistent layout every render.
//

// size     — font size in pixels
// delay    — seconds to wait before animation starts (staggers the symbols)
// duration — seconds for one full upward drift cycle
// depth    — mouse parallax strength: higher = moves MORE with mouse = feels closer

const FLOATING_SYMBOLS = [
  // ── LEFT SIDE ────────────────────────────────────────────────────────────
  { id: 1,  symbol: "E=mc²",    left: "4%",  top: "25%", size: 13, delay: 0,    duration: 18, depth: 30 },
  { id: 2,  symbol: "∫",        left: "12%", top: "65%", size: 26, delay: 3,    duration: 14, depth: 50 },
  { id: 3,  symbol: "∑",        left: "22%", top: "35%", size: 22, delay: 7,    duration: 16, depth: 40 },
  { id: 4,  symbol: "√x",       left: "8%",  top: "80%", size: 16, delay: 1.5,  duration: 20, depth: 25 },
  { id: 5,  symbol: "x²+y²=z²", left: "18%", top: "10%", size: 11, delay: 5,    duration: 22, depth: 20 },
  // ── CENTER-LEFT (avoids center where main content lives) ─────────────────
  { id: 6,  symbol: "π",        left: "32%", top: "75%", size: 24, delay: 9,    duration: 15, depth: 60 },
  { id: 7,  symbol: "Δ",        left: "38%", top: "20%", size: 28, delay: 2,    duration: 13, depth: 45 },
  { id: 8,  symbol: "∞",        left: "28%", top: "90%", size: 20, delay: 11,   duration: 17, depth: 35 },
  // ── CENTER-RIGHT ──────────────────────────────────────────────────────────
  { id: 9,  symbol: "λ",        left: "62%", top: "30%", size: 20, delay: 4,    duration: 16, depth: 40 },
  { id: 10, symbol: "H₂O",      left: "65%", top: "70%", size: 14, delay: 6,    duration: 19, depth: 30 },
  { id: 11, symbol: "⚛",        left: "68%", top: "85%", size: 24, delay: 13,   duration: 18, depth: 55 },
  { id: 12, symbol: "∂f/∂x",    left: "72%", top: "15%", size: 12, delay: 3.5,  duration: 21, depth: 20 },
  // ── RIGHT SIDE ────────────────────────────────────────────────────────────
  { id: 13, symbol: "CO₂",      left: "80%", top: "55%", size: 13, delay: 8,    duration: 17, depth: 35 },
  { id: 14, symbol: "Ψ",        left: "88%", top: "25%", size: 20, delay: 2.5,  duration: 15, depth: 50 },
  { id: 15, symbol: "⊕",        left: "76%", top: "80%", size: 22, delay: 10,   duration: 16, depth: 45 },
  { id: 16, symbol: "∇",        left: "92%", top: "60%", size: 24, delay: 5.5,  duration: 14, depth: 55 },
  { id: 17, symbol: "Fe₂O₃",    left: "85%", top: "10%", size: 11, delay: 7.5,  duration: 20, depth: 25 },
  { id: 18, symbol: "α+β",      left: "94%", top: "40%", size: 13, delay: 4.5,  duration: 18, depth: 40 },
];

// ── GLOWING ORBS DATA ─────────────────────────────────────────────────────
// Three large blurred circles that pulse slowly behind the content.
// Different sizes, positions, colors, and animation speeds for organic feel.
// radial-gradient = color at center → transparent at edge = glowing blob effect.
const ORBS = [
  {
    id: 1,
    // Large purple orb — top-left corner
    style: {
      width: "550px",  height: "550px",
      top: "-120px",   left: "-120px",
      background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
      animationDuration: "7s",  // one pulse cycle every 7 seconds
      animationDelay: "0s",
    },
  },
  {
    id: 2,
    // Medium blue orb — bottom-right corner
    style: {
      width: "420px",  height: "420px",
      bottom: "-80px", right: "-80px",
      background: "radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)",
      animationDuration: "9s",  // slightly slower — desynchronised from purple
      animationDelay: "2s",     // starts 2s after the purple orb
    },
  },
  {
    id: 3,
    // Small pink orb — right side, middle height
    style: {
      width: "280px",  height: "280px",
      top: "30%",      right: "8%",
      background: "radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)",
      animationDuration: "11s", // slowest — most subtle
      animationDelay: "4s",
    },
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function HeroSection() {

  // mousePos: cursor position as a fraction of window dimensions.
  //   x: 0.0 = left edge, 0.5 = center, 1.0 = right edge
  //   y: 0.0 = top edge,  0.5 = center, 1.0 = bottom edge
  // Initial value {x:0.5, y:0.5} = centered, so elements start at rest.
  // VBA analogy: like a module-level variable that stores the cursor's X/Y position.
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

 
  useEffect(() => {

    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,   // pixels from left ÷ total width = 0–1
        y: e.clientY / window.innerHeight,  // pixels from top  ÷ total height = 0–1
      });
    };

    // Register on the entire window (not just this component's DOM element).
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup: remove listener when component unmounts (prevents memory leak).
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // ── SECTION CONTAINER ──────────────────────────────────────────────────
    // <section> = semantic HTML5 element for a self-contained page section.
    // min-h-screen   = at least 100vh tall (fills the viewport)
    // relative       = positioning context for absolute children (orbs, symbols, arrow)
    // overflow-hidden = clips symbols that drift above the section's top edge
    // flex items-center justify-center = centers the main content block
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">

      {/* ── GLOWING ORBS ─────────────────────────────────────────────────────
          Large blurred circles behind all other content (no z-index = default z-0).
          absolute     = positioned relative to the <section> container.
          rounded-full = makes a div circular (border-radius: 50%).
          blur-3xl     = extreme CSS blur — turns the circle into a glowing blob.
          pointer-events-none = mouse clicks pass through; they are purely decorative. */}
      {ORBS.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-3xl animate-pulse-glow pointer-events-none"
          style={orb.style}
        />
      ))}

      {/* ── FLOATING SYMBOLS ─────────────────────────────────────────────────
          Each symbol uses TWO nested divs — WHY?

          We need two simultaneous transforms on each symbol:
            1. Mouse parallax (JS-driven): translates with cursor movement
            2. Float upward   (CSS-driven): translateY upward in a loop

          A single element can only have ONE `transform` property —
          the second would overwrite the first.

          Solution: OUTER div handles JS parallax, INNER div handles CSS animation.
          They are independent elements with separate transform properties.

          VBA analogy: like grouping two shapes — move the GROUP for parallax,
          animate the INNER shape separately for the floating effect.

          pointer-events-none = clicks pass through (decorative only)
          select-none         = text cannot be highlighted accidentally */}
      {FLOATING_SYMBOLS.map((sym) => (

        // OUTER DIV — mouse parallax position
        <div
          key={sym.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: sym.left,
            top:  sym.top,
            // Parallax calculation:
            // (mousePos.x - 0.5) gives a range of -0.5 (left) to +0.5 (right)
            // × sym.depth = max pixel shift in either direction
            // When mouse is at center (0.5), result is 0 — element doesn't move.
            // Higher depth = more movement = feels physically closer to viewer.
            transform: `translate(
              ${(mousePos.x - 0.5) * sym.depth}px,
              ${(mousePos.y - 0.5) * sym.depth}px
            )`,
            // Smooth transition: element lags slightly behind the mouse (more natural).
            // 0.6s ease-out = quick start, slow finish.
            transition: "transform 0.6s ease-out",
          }}
        >
          {/* INNER DIV — upward float CSS animation */}
          {/* animate-float-up = custom class defined in globals.css (floatUp keyframe) */}
          {/* font-mono = monospace font, like a calculator or scientific display */}
          {/* text-indigo-800 dark:text-purple-200 = dark in light mode, pale purple in dark */}
          <div
            className="animate-float-up font-mono font-bold text-indigo-800 dark:text-purple-200"
            style={{
              fontSize:          `${sym.size}px`,      // different sizes for visual variety
              animationDelay:    `${sym.delay}s`,      // staggered starts = not all in sync
              animationDuration: `${sym.duration}s`,   // different speeds = organic feel
            }}
          >
            {sym.symbol}
          </div>
        </div>
      ))}

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────
          relative z-10 = renders ABOVE orbs and symbols (which are z-0)
          text-center    = all text centered horizontally
          px-6           = 24px side padding (prevents text touching edges on mobile)
          max-w-4xl mx-auto = max 896px wide, centered (prevents stretching on large screens)
          py-20          = 80px vertical padding (breathing room top and bottom) */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">

        {/* ── BADGE ──────────────────────────────────────────────────────────
            Small pill label announcing who we are.
            inline-flex    = shrinks to fit its content width (not full-width)
            backdrop-blur-sm = frosted glass effect behind the badge
            border         = subtle outline makes it look like a real chip/badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
          bg-white/15 dark:bg-white/10
          border border-indigo-200/50 dark:border-white/20
          backdrop-blur-sm
          text-sm font-medium text-indigo-700 dark:text-purple-200">
          {/* Star icon */}
          <span>⭐</span>
          {/* &apos; = escaped apostrophe (required in JSX to avoid linter warnings) */}
          <span>Slots for Offline Sessions Available</span>
        </div>

        {/* ── HEADLINE ───────────────────────────────────────────────────────*/}
        <h1 className="font-extrabold leading-tight mb-6">
          {/* Line 1: theme-aware plain color */}
          <span className="block text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white">
            Unlock Your 
          </span>
          {/* Line 2: always-colorful gradient text */}
          <span className="block text-5xl md:text-6xl lg:text-7xl
            bg-linear-to-r from-violet-500 via-pink-500 to-indigo-500
            bg-clip-text text-transparent">
            Full Academic Potential
          </span>
        </h1>

        {/* ── SUBHEADLINE ────────────────────────────────────────────────────*/}
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed
          text-slate-600 dark:text-white/70">
          Expert Math &amp; Science tuition both Physical sessions and Online.
          Proven results, passionate teachers, personalised learning.
        </p>

        {/* ── CTA BUTTONS ───────────────────────────────────────────────────*/}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">

          <Link
            href="/#enrol"
            className="px-8 py-4 rounded-full font-bold text-lg text-white
              bg-linear-to-r from-violet-600 to-indigo-600
              hover:shadow-xl hover:shadow-violet-500/30
              hover:scale-105 transition-all duration-300"
          >
            Enrol Now →
          </Link>

          {/* SECONDARY BUTTON — View Outlets */}
            <Link
            href="/#outlets"
            className="px-8 py-4 rounded-full font-bold text-lg
              border-2 border-slate-300 dark:border-white/30
              text-slate-800 dark:text-white
              hover:bg-black/5 dark:hover:bg-white/10
              hover:scale-105 transition-all duration-300"
          >
            View Resources
          </Link>

        </div>

        {/* ── STATS ROW ──────────────────────────────────────────────────────*/}
        {/* <div className="flex items-center justify-center gap-6 md:gap-12">


          <div className="text-center">
   
            <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              2,000+
            </div>

            <div className="text-sm mt-1 text-slate-500 dark:text-white/50">
              Students
            </div>
          </div>


          <div className="w-px h-12 bg-slate-200 dark:bg-white/20" />


          <div className="text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              8
            </div>
            <div className="text-sm mt-1 text-slate-500 dark:text-white/50">
              Outlets
            </div>
          </div>

  
          <div className="w-px h-12 bg-slate-200 dark:bg-white/20" />

   
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              15+
            </div>
            <div className="text-sm mt-1 text-slate-500 dark:text-white/50">
              Years
            </div>
          </div>

        </div> */}
      </div>

      {/* ── SCROLL INDICATOR ─────────────────────────────────────────────────
          Positioned at bottom-center of the hero section.
          absolute bottom-8          = 32px from the section's bottom edge
          left-1/2 -translate-x-1/2 = perfectly centered horizontally
          animate-bounce-arrow       = custom CSS animation (globals.css)
          pointer-events-none        = doesn't interfere with scrolling or clicking */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2
        flex flex-col items-center gap-1
        text-slate-400 dark:text-white/35
        animate-bounce-arrow pointer-events-none">

        {/* Small "SCROLL" label above the arrow */}
        <span className="text-xs tracking-widest uppercase">Scroll</span>

        {/* Down-arrow SVG icon — a vertical line with a V-shaped arrowhead pointing down */}
        {/* NOTE: JSX comments are NOT allowed inside SVG opening tag attributes.       */}
        {/* All comments about this SVG go here between tags, not on the attribute lines. */}
        {/* stroke="currentColor" means: use the parent's text color (slate-400 / white/35) */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Vertical line — the arrow shaft */}
          <line x1="12" y1="5" x2="12" y2="19" />
          {/* V-shape pointing downward — the arrowhead */}
          <polyline points="19 12 12 19 5 12" />
        </svg>

      </div>

    </section>
  );
}
