import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  Sparkles,
  ArrowRight,
  Check,
  ChevronDown,
  Flame,
  BarChart3,
  Lock,
  Zap,
  ScanLine,
  TrendingUp,
} from "lucide-react";

/* ---------- Logo: geometric 4-point star + scanner focus corners ---------- */
function StarMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path
        d="M20 4 L23.2 16.8 L36 20 L23.2 23.2 L20 36 L16.8 23.2 L4 20 L16.8 16.8 Z"
        fill="url(#starGrad)"
      />
      <path d="M6 6 L6 12 M6 6 L12 6" stroke="#5EEAD4" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <path d="M34 6 L34 12 M34 6 L28 6" stroke="#5EEAD4" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <path d="M6 34 L6 28 M6 34 L12 34" stroke="#5EEAD4" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <path d="M34 34 L34 28 M34 34 L28 34" stroke="#5EEAD4" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <defs>
        <linearGradient id="starGrad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C5CFF" />
          <stop offset="55%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#5EEAD4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- Plate illustrations (original vector art, not stock photos) ---------- */
function PlateIllustration({ type = "chicken" }) {
  if (type === "toast") {
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="88" fill="#1c1730" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="#ffffff14" strokeWidth="2" />
        <rect x="42" y="70" width="116" height="60" rx="8" fill="#d9a860" />
        <rect x="42" y="70" width="116" height="14" rx="7" fill="#e8c48a" />
        <ellipse cx="75" cy="98" rx="20" ry="14" fill="#7a9b5e" />
        <ellipse cx="120" cy="102" rx="22" ry="15" fill="#88a86a" />
        <circle cx="70" cy="94" r="3" fill="#f4e7c1" />
        <circle cx="82" cy="102" r="3" fill="#f4e7c1" />
        <circle cx="118" cy="96" r="3" fill="#f4e7c1" />
        <circle cx="130" cy="106" r="3" fill="#f4e7c1" />
        <g opacity="0.8">
          <circle cx="60" cy="140" r="4" fill="#c0392b" />
          <circle cx="140" cy="138" r="4" fill="#c0392b" />
          <circle cx="100" cy="146" r="4" fill="#e67e22" />
        </g>
      </svg>
    );
  }
  if (type === "salad") {
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="88" fill="#161327" />
        <ellipse cx="100" cy="112" rx="70" ry="46" fill="#243018" />
        <ellipse cx="70" cy="95" rx="26" ry="16" fill="#4f7a3a" />
        <ellipse cx="115" cy="88" rx="24" ry="15" fill="#5c8a44" />
        <ellipse cx="130" cy="112" rx="20" ry="13" fill="#6a9950" />
        <ellipse cx="80" cy="120" rx="18" ry="12" fill="#3f6a2f" />
        <circle cx="95" cy="100" r="9" fill="#e8734a" />
        <circle cx="60" cy="118" r="7" fill="#e8734a" />
        <rect x="118" y="128" width="26" height="10" rx="5" fill="#f2c14e" transform="rotate(18 118 128)" />
        <circle cx="140" cy="90" r="6" fill="#f5f2e8" />
        <circle cx="148" cy="98" r="6" fill="#f5f2e8" />
      </svg>
    );
  }
  // chicken / rice / broccoli (default)
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <circle cx="100" cy="100" r="88" fill="#1a1424" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#ffffff14" strokeWidth="2" />
      <ellipse cx="75" cy="115" rx="34" ry="24" fill="#e9e2cf" />
      <ellipse cx="75" cy="108" rx="34" ry="22" fill="#f3eddf" />
      <g fill="#f4eedd">
        <circle cx="60" cy="102" r="3" /><circle cx="70" cy="98" r="3" /><circle cx="82" cy="100" r="3" />
        <circle cx="92" cy="106" r="3" /><circle cx="65" cy="112" r="3" /><circle cx="78" cy="116" r="3" />
      </g>
      <ellipse cx="128" cy="90" rx="26" ry="20" fill="#b5732a" />
      <ellipse cx="128" cy="86" rx="26" ry="18" fill="#c98a3e" />
      <path d="M112 82 q16 -14 32 0" stroke="#8a4e1c" strokeWidth="2" fill="none" opacity="0.5" />
      <g>
        <circle cx="140" cy="128" r="10" fill="#3f7a3a" />
        <circle cx="152" cy="120" r="9" fill="#4a8a44" />
        <circle cx="148" cy="138" r="9" fill="#3f7a3a" />
        <rect x="143" y="132" width="4" height="14" fill="#5c8a44" />
      </g>
    </svg>
  );
}

/* ---------- Count-up on view ---------- */
function useCountUp(target, active, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function useInView(threshold = 0.35) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ---------- Reusable phone mockup with scan animation ---------- */
function ScanMockup({ compact = false }) {
  const [ref, inView] = useInView(0.4);
  const kcal = useCountUp(642, inView);
  const protein = useCountUp(32, inView);
  const carbs = useCountUp(58, inView);
  const fat = useCountUp(21, inView);

  return (
    <div
      ref={ref}
      className={`relative mx-auto ${compact ? "w-64" : "w-72 sm:w-80"} rounded-[2.2rem] p-2`}
      style={{
        background: "linear-gradient(160deg, rgba(124,92,255,0.35), rgba(94,234,212,0.15))",
        boxShadow: "0 30px 80px -20px rgba(124,92,255,0.45)",
      }}
    >
      <div
        className="rounded-[1.8rem] overflow-hidden border border-white/10"
        style={{ background: "#0B0B12" }}
      >
        {/* photo area */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 25%, #3a2b57 0%, #1a1024 45%, #0B0B12 100%)",
            }}
          />
          {/* illustrated plate */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <PlateIllustration type="chicken" />
          </div>
          {/* scanner line */}
          <div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, #5EEAD4, transparent)",
              boxShadow: "0 0 12px 2px rgba(94,234,212,0.7)",
              animation: inView ? "scanline 2.2s ease-in-out infinite" : "none",
              top: inView ? undefined : "50%",
            }}
          />
          {/* corner brackets */}
          {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map(
            (pos, i) => (
              <div key={i} className={`absolute ${pos} w-5 h-5`}>
                <div className="w-full h-full border-t-2 border-l-2 border-[#5EEAD4]/70 rounded-tl-sm" />
              </div>
            )
          )}
        </div>

        {/* result card */}
        <div className="p-4 space-y-3" style={{ background: "#0F0F17" }}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-white/40">
              Refeição detectada
            </span>
            <Sparkles size={14} className="text-[#5EEAD4]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white tabular-nums">{kcal}</span>
            <span className="text-sm text-white/50">kcal</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { label: "Proteína", v: protein, u: "g", c: "#7C5CFF" },
              { label: "Carboidr.", v: carbs, u: "g", c: "#A78BFA" },
              { label: "Gordura", v: fat, u: "g", c: "#5EEAD4" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl bg-white/5 px-2 py-2 text-center">
                <div className="text-sm font-semibold text-white tabular-nums">
                  {m.v}
                  <span className="text-[10px] text-white/40">{m.u}</span>
                </div>
                <div className="text-[10px] text-white/40 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-white/30 pt-1">
            Estimativa. Pode variar conforme porção e preparo.
          </p>
        </div>
      </div>
      <style>{`
        @keyframes scanline {
          0% { top: 6%; opacity: 0; }
          10% { opacity: 1; }
          50% { top: 92%; opacity: 1; }
          60% { opacity: 0; }
          100% { top: 6%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ---------- Section wrapper for scroll reveal ---------- */
function Reveal({ children, className = "" }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Auto-playing "video-style" AI analysis demo ---------- */
const DEMO_MEALS = [
  { type: "chicken", name: "Frango, arroz e brócolis", kcal: 642, protein: 32, carbs: 58, fat: 21,
    foods: ["Peito de frango grelhado", "Arroz branco", "Brócolis no vapor"] },
  { type: "toast", name: "Torrada com abacate", kcal: 380, protein: 11, carbs: 34, fat: 22,
    foods: ["Pão integral", "Abacate", "Tomate cereja"] },
  { type: "salad", name: "Salgada com salmão", kcal: 460, protein: 29, carbs: 18, fat: 27,
    foods: ["Salmão grelhado", "Mix de folhas", "Ovo cozido"] },
];

function AIAnalysisDemo() {
  const [ref, inView] = useInView(0.3);
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState("scanning"); // scanning -> revealed
  const [foodCount, setFoodCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setPhase("scanning");
    setFoodCount(0);
    const scanTimer = setTimeout(() => setPhase("revealed"), 1900);
    return () => clearTimeout(scanTimer);
  }, [active, inView]);

  useEffect(() => {
    if (phase !== "revealed") return;
    const meal = DEMO_MEALS[active];
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setFoodCount(i);
      if (i >= meal.foods.length) clearInterval(iv);
    }, 350);
    return () => clearInterval(iv);
  }, [phase, active]);

  useEffect(() => {
    if (!inView) return;
    const advance = setTimeout(() => {
      setActive((a) => (a + 1) % DEMO_MEALS.length);
    }, 4600);
    return () => clearTimeout(advance);
  }, [active, inView]);

  const meal = DEMO_MEALS[active];
  const kcal = useCountUp(meal.kcal, phase === "revealed", 700);
  const protein = useCountUp(meal.protein, phase === "revealed", 700);
  const carbs = useCountUp(meal.carbs, phase === "revealed", 700);
  const fat = useCountUp(meal.fat, phase === "revealed", 700);

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-10 items-center">
      <div className="order-2 md:order-1">
        <div
          className="relative w-full max-w-sm mx-auto md:mx-0 aspect-square rounded-3xl overflow-hidden border border-white/10"
          style={{ background: "radial-gradient(circle at 30% 20%, #241a38, #0B0B12 70%)" }}
        >
          <div className="absolute inset-0 p-10">
            <PlateIllustration type={meal.type} />
          </div>
          <div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent, #5EEAD4, transparent)",
              boxShadow: "0 0 14px 2px rgba(94,234,212,0.75)",
              animation: phase === "scanning" ? "scanline 1.9s ease-in-out" : "none",
              opacity: phase === "scanning" ? 1 : 0,
              top: phase === "scanning" ? undefined : "0%",
              transition: "opacity 0.3s ease",
            }}
          />
          {/* progress dots = "timeline" of the demo video */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {DEMO_MEALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === active ? "22px" : "8px",
                  background: i === active ? "#5EEAD4" : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Ver exemplo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="order-1 md:order-2">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Veja a IA em ação</h2>
        <p className="text-white/50 leading-relaxed mb-6 max-w-md">
          A cada foto, a STAR identifica os alimentos do prato e converte isso em
          números que fazem sentido — em segundos.
        </p>
        <div className="rounded-2xl border border-white/8 p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-white/70">{meal.name}</span>
            <Sparkles size={14} className="text-[#5EEAD4]" />
          </div>
          <div className="space-y-1.5 mb-4 min-h-[84px]">
            {meal.foods.map((f, i) => (
              <div
                key={f}
                className="flex items-center gap-2 text-sm text-white/60"
                style={{
                  opacity: i < foodCount ? 1 : 0,
                  transform: i < foodCount ? "translateX(0)" : "translateX(-6px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <Check size={13} className="text-[#5EEAD4]" /> {f}
              </div>
            ))}
          </div>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-2xl font-bold tabular-nums">{kcal}</span>
            <span className="text-sm text-white/50">kcal</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[["Proteína", protein], ["Carboidr.", carbs], ["Gordura", fat]].map(([l, v]) => (
              <div key={l} className="rounded-lg bg-white/5 px-2 py-1.5 text-center">
                <div className="text-sm font-semibold tabular-nums">{v}g</div>
                <div className="text-[10px] text-white/40">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- FAQ item ---------- */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left gap-4"
      >
        <span className="text-[15px] sm:text-base font-medium text-white/90">{q}</span>
        <ChevronDown
          size={18}
          className="shrink-0 text-white/40 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? "200px" : "0px",
          opacity: open ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.35s ease",
          overflow: "hidden",
        }}
      >
        <p className="text-sm text-white/50 pt-3 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function STARLandingPage() {
  const [billing, setBilling] = useState("monthly");

  const steps = [
    {
      n: "01",
      title: "Snap",
      desc: "Fotografe seu prato como ele está — sem preparar, sem balança.",
      icon: Camera,
    },
    {
      n: "02",
      title: "Analyze",
      desc: "A IA da STAR identifica cada alimento e estima a porção.",
      icon: ScanLine,
    },
    {
      n: "03",
      title: "Understand",
      desc: "Calorias, proteínas, carboidratos e gorduras, na hora.",
      icon: BarChart3,
    },
  ];

  const benefits = [
    { icon: Zap, title: "Sem pesar", desc: "Nada de balança de cozinha ou medidas exatas." },
    { icon: Sparkles, title: "Sem digitar", desc: "Nada de buscar alimento por alimento em listas." },
    { icon: TrendingUp, title: "Rápido", desc: "Da foto ao resultado em poucos segundos." },
    { icon: BarChart3, title: "Inteligente", desc: "Aprende seus padrões e refina as estimativas." },
    { icon: Flame, title: "Histórico completo", desc: "Veja sua evolução dia a dia, semana a semana." },
    { icon: Lock, title: "Seus dados, seu controle", desc: "Exporte ou apague tudo quando quiser." },
  ];

  return (
    <div
      className="min-h-screen text-white antialiased"
      style={{
        background: "#0B0B12",
        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
        ::selection { background: #7C5CFF; color: white; }
      `}</style>

      {/* ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(600px circle at 15% 0%, rgba(124,92,255,0.16), transparent 60%), radial-gradient(500px circle at 85% 20%, rgba(94,234,212,0.10), transparent 60%)",
        }}
      />

      {/* NAV */}
      <header className="relative z-10 sticky top-0 backdrop-blur-md" style={{ background: "rgba(11,11,18,0.7)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <StarMark size={26} />
            <span className="font-bold text-lg tracking-tight">STAR</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
            <a href="#precos" className="hover:text-white transition-colors">Preços</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <button
            className="text-sm font-semibold px-4 py-2 rounded-full transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg,#7C5CFF,#5EEAD4)", color: "#0B0B12" }}
          >
            Começar grátis
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 text-[#A78BFA] bg-white/5 mb-6">
            <Sparkles size={13} />
            Análise nutricional por IA
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Sua comida.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#7C5CFF,#A78BFA,#5EEAD4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Entendida.
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/55 max-w-md leading-relaxed">
            Tire uma foto do seu prato. A STAR identifica os alimentos e estima
            calorias e macros na hora — sem procurar, sem preencher formulários.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              className="group inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg,#7C5CFF,#5EEAD4)", color: "#0B0B12" }}
            >
              Começar grátis
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <span className="text-sm text-white/35">5 análises grátis por dia · sem cartão</span>
          </div>
        </div>
        <ScanMockup />
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">Não registre sua comida. Fotografe.</h2>
          <p className="text-white/45 text-center max-w-lg mx-auto mb-14">
            Três passos entre o seu prato e um número que faz sentido.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} className="">
              <div
                className="h-full rounded-2xl p-6 border border-white/8"
                style={{ background: "rgba(255,255,255,0.03)", transitionDelay: `${i * 90}ms` }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-extrabold" style={{ color: "#7C5CFF33" }}>{s.n}</span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#7C5CFF22,#5EEAD422)" }}
                  >
                    <s.icon size={18} className="text-[#5EEAD4]" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1.5">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AI ANALYSIS DEMO (video-style, autoplay) */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <AIAnalysisDemo />
        </Reveal>
      </section>

      {/* BENEFITS */}
      <section id="recursos" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-14">
            Feito para quem não quer perder tempo registrando
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <Reveal key={b.title}>
              <div
                className="h-full rounded-2xl p-5 border border-white/8 hover:border-white/15 transition-colors"
                style={{ background: "rgba(255,255,255,0.03)", transitionDelay: `${i * 60}ms` }}
              >
                <b.icon size={20} className="text-[#A78BFA] mb-4" />
                <h3 className="font-semibold mb-1">{b.title}</h3>
                <p className="text-sm text-white/45">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <Reveal className="order-2 md:order-1">
          <div
            className="rounded-2xl border border-white/8 p-6"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-white/40">Hoje</p>
                <p className="text-2xl font-bold">1.840 <span className="text-sm font-normal text-white/40">/ 2.200 kcal</span></p>
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center relative">
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="27" fill="none" stroke="#ffffff14" strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="27" fill="none" stroke="url(#ringGrad)" strokeWidth="6"
                    strokeDasharray={2 * Math.PI * 27}
                    strokeDashoffset={2 * Math.PI * 27 * (1 - 0.84)}
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                  />
                  <defs>
                    <linearGradient id="ringGrad" x1="0" y1="0" x2="64" y2="64">
                      <stop offset="0%" stopColor="#7C5CFF" />
                      <stop offset="100%" stopColor="#5EEAD4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[["Proteína","94g","#7C5CFF"],["Carboidr.","162g","#A78BFA"],["Gordura","58g","#5EEAD4"]].map(([l,v,c])=>(
                <div key={l} className="rounded-xl bg-white/5 p-3">
                  <div className="text-base font-bold">{v}</div>
                  <div className="text-[11px] text-white/40">{l}</div>
                  <div className="h-1 rounded-full mt-2" style={{ background: `${c}33` }}>
                    <div className="h-1 rounded-full" style={{ width: "70%", background: c }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[["Almoço","Frango grelhado, arroz, brócolis","612 kcal"],["Lanche","Iogurte com granola","240 kcal"]].map(([t,d,k])=>(
                <div key={t} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium">{t}</p>
                    <p className="text-xs text-white/40">{d}</p>
                  </div>
                  <span className="text-sm text-white/60 tabular-nums">{k}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal className="order-1 md:order-2">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Sua alimentação, num só painel</h2>
          <p className="text-white/50 leading-relaxed mb-6">
            Acompanhe calorias, macros e refeições do dia sem abrir uma planilha.
            A STAR organiza tudo automaticamente, refeição após refeição.
          </p>
          <ul className="space-y-3">
            {["Calorias e macros diários", "Histórico e evolução semanal", "Metas personalizadas"].map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm text-white/70">
                <Check size={16} className="text-[#5EEAD4]" /> {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* PRICING */}
      <section id="precos" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">Comece grátis. Evolua quando quiser.</h2>
          <p className="text-white/45 text-center mb-8">Sem contrato. Cancele quando quiser.</p>
        </Reveal>
        <Reveal className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-white/10 p-1 bg-white/5">
            {["monthly", "yearly"].map((k) => (
              <button
                key={k}
                onClick={() => setBilling(k)}
                className="text-sm px-4 py-1.5 rounded-full font-medium transition-colors"
                style={{
                  background: billing === k ? "linear-gradient(135deg,#7C5CFF,#5EEAD4)" : "transparent",
                  color: billing === k ? "#0B0B12" : "rgba(255,255,255,0.5)",
                }}
              >
                {k === "monthly" ? "Mensal" : "Anual · 2 meses grátis"}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Reveal>
            <div className="h-full rounded-2xl border border-white/8 p-7" style={{ background: "rgba(255,255,255,0.03)" }}>
              <h3 className="font-bold text-lg mb-1">Free</h3>
              <p className="text-sm text-white/40 mb-5">Para começar a entender seus hábitos</p>
              <p className="text-3xl font-extrabold mb-6">R$ 0</p>
              <ul className="space-y-2.5 text-sm text-white/60">
                {["5 análises por dia", "Calorias, proteínas, carboidratos e gorduras", "Histórico básico"].map((t) => (
                  <li key={t} className="flex gap-2"><Check size={15} className="text-white/30 shrink-0 mt-0.5" />{t}</li>
                ))}
              </ul>
              <button className="w-full mt-7 text-sm font-semibold py-3 rounded-full border border-white/15 hover:bg-white/5 transition-colors">
                Começar grátis
              </button>
            </div>
          </Reveal>
          <Reveal>
            <div
              className="h-full rounded-2xl p-7 relative overflow-hidden"
              style={{ background: "linear-gradient(160deg, rgba(124,92,255,0.16), rgba(94,234,212,0.06))", border: "1px solid #7C5CFF55" }}
            >
              <span className="absolute top-5 right-5 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "#5EEAD4", color: "#0B0B12" }}>
                POPULAR
              </span>
              <h3 className="font-bold text-lg mb-1">STAR Pro</h3>
              <p className="text-sm text-white/40 mb-5">Para quem quer controle total</p>
              <p className="text-3xl font-extrabold mb-6">
                {billing === "monthly" ? "R$ 19,90" : "R$ 149,90"}
                <span className="text-sm font-normal text-white/40">{billing === "monthly" ? "/mês" : "/ano"}</span>
              </p>
              <ul className="space-y-2.5 text-sm text-white/70">
                {["Análises ilimitadas", "Histórico completo e evolução semanal", "Metas personalizadas", "Insights e exportação de dados", "Recursos avançados de IA"].map((t) => (
                  <li key={t} className="flex gap-2"><Check size={15} className="text-[#5EEAD4] shrink-0 mt-0.5" />{t}</li>
                ))}
              </ul>
              <button
                className="w-full mt-7 text-sm font-semibold py-3 rounded-full transition-transform hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#7C5CFF,#5EEAD4)", color: "#0B0B12" }}
              >
                Assinar STAR Pro
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 max-w-2xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Perguntas frequentes</h2>
        </Reveal>
        <Reveal>
          <div>
            <FAQItem q="Quão precisa é a análise?" a="A STAR estima calorias e macros com base na foto e em porções médias. É uma estimativa útil para acompanhar tendências, não uma medição de laboratório." />
            <FAQItem q="Preciso pesar os alimentos?" a="Não. Essa é a ideia: você fotografa o prato como está e a IA cuida do resto." />
            <FAQItem q="A STAR substitui um nutricionista?" a="Não. A STAR ajuda você a entender o que come no dia a dia, mas não substitui orientação profissional individualizada." />
            <FAQItem q="Meus dados estão seguros?" a="Sim. Você pode exportar ou apagar seu histórico a qualquer momento, direto no app." />
            <FAQItem q="O plano gratuito é limitado?" a="O Free inclui 5 análises por dia, com calorias, macros e histórico básico — sem custo." />
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-24 text-center">
        <Reveal>
          <StarMark size={40} />
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-6 mb-4">
            Stop counting. <span style={{ color: "#5EEAD4" }}>Start snapping.</span>
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">Sua próxima refeição começa aqui.</p>
          <button
            className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg,#7C5CFF,#5EEAD4)", color: "#0B0B12" }}
          >
            Começar grátis <ArrowRight size={16} />
          </button>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <StarMark size={20} />
            <span className="font-bold text-sm">STAR</span>
          </div>
          <p className="text-xs text-white/30">© 2026 STAR. See it. Know it.</p>
        </div>
      </footer>
    </div>
  );
}
