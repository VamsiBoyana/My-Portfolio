import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown, Download, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

/* ── Canvas: stars + shooting stars ── */
function StarField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 250 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.005 + 0.001,
    }));

    const shooters = [];
    const spawnShooter = () => {
      shooters.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        len: Math.random() * 120 + 60,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4,
        alpha: 1,
        trail: [],
      });
    };
    const shootInterval = setInterval(spawnShooter, 3000);

    let id;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a += s.speed; if (s.a > 1 || s.a < 0) s.speed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a * 0.8})`;
        ctx.fill();
      });
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.015;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        grad.addColorStop(0, `rgba(200,170,255,${s.alpha})`);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (s.alpha <= 0) shooters.splice(i, 1);
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); clearInterval(shootInterval); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ── Typewriter ── */
// const WORDS = ["Full Stack Developer", "Backend Developer", "MERN Specialist", "Web3 Builder", "API Architect"];
const WORDS = [
  "Node.js Platform Architect",
  "Scalable API Systems Builder",
  "API Infrastructure Developer",
  "Web3 Platform Integration Specialist",
  "High-Performance Backend Specialist"
];
function Typewriter() {
  const [wIdx, setWIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wIdx];
    let timeout;
    if (!deleting && text.length < word.length) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 45);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setWIdx((wIdx + 1) % WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wIdx]);

  return (
    <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#c084fc 0%,#818cf8 50%,#38bdf8 100%)" }}>
      {text}<span className="animate-pulse">|</span>
    </span>
  );
}

/* ── Magnetic Social Button ── */
function MagneticBtn({ icon: Icon, label, href }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.4);
    y.set((e.clientY - cy) * 0.4);
  };

  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer" title={label}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.15 }}
      className="relative p-3.5 rounded-xl border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm text-slate-400 hover:text-white hover:border-purple-500/50 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/20 group-hover:to-indigo-500/20 transition-all duration-300" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-shimmer" />
      </div>
      <Icon className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
    </motion.a>
  );
}

export default function HeroSection({ id }) {
  return (
    <section id={id || "home"} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#010409] scroll-mt-14 py-20 sm:py-0">
      <StarField />

      {/* Ambient glows */}
      <motion.div className="absolute top-[15%] left-[25%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(88,28,135,0.5) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-[5%] right-[15%] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(79,70,229,0.35) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      <motion.div className="absolute top-[50%] right-[30%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 5 }} />

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-400/40 pointer-events-none"
          style={{ left: `${10 + (i * 7.5)}%`, top: `${20 + (i % 5) * 15}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }} />
      ))}

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-3 sm:mb-4 md:mb-6 backdrop-blur-sm text-xs sm:text-sm">
            <motion.span className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }} />
            <span className="text-purple-300 font-medium tracking-wide">Open to opportunities</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="text-base sm:text-lg md:text-xl text-slate-400 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hello, I'm
          </motion.p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 sm:mb-5 md:mb-6 leading-[1.1]">
            <motion.span className="text-white block"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}>
              Vamsi
            </motion.span>
            <motion.span
              className="block bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg,#c084fc 0%,#818cf8 50%,#38bdf8 100%)" }}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}>
              Boyana
            </motion.span>
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 md:mb-6 h-7 sm:h-8 md:h-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <Typewriter />
        </motion.div>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-[#8b949e] max-w-2xl mx-auto mb-3 sm:mb-4 md:mb-6 leading-relaxed px-2"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}>
          {/* Designing scalable Node.js backend systems with real-time APIs and secure Web3 integrations - built for performance and reliability. */}
          {/* I specialize in building scalable Node.js backend architectures, real-time API platforms, and secure Web3 integrations, delivering high performance, reliability, and maintainable system design. */}
          I focus on building scalable backend architectures and real-time API platforms using Node.js, emphasizing performance, reliability, and maintainable system design.        </motion.p>

        {/* Location */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-4 sm:mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
          <span className="text-xs sm:text-sm md:text-base text-slate-400">Hyderabad, Telangana</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}>
          <motion.a href="https://mail.google.com/mail/?view=cm&fs=1&to=vamsiboina1800@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-lg text-white text-xs sm:text-sm bg-gradient-to-r from-purple-500/80 to-indigo-500/80 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/15 transition-all duration-300">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4" /> Reach Out
          </motion.a>
          <motion.a href="tel:+919642980211"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-lg text-white text-xs sm:text-sm bg-gradient-to-r from-purple-500/80 to-indigo-500/80 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/15 transition-all duration-300">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4" /> Contact Me
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <p className="text-lg sm:text-xl text-slate-400">Social Links</p>
          <div className="flex items-center justify-center gap-5">
            {[
              { icon: Github, label: "GitHub", href: "https://github.com/VamsiBoyana" },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/vamsi-boyana-964550229/" },
              { icon: Mail, label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=vamsiboina1800@gmail.com" },
            ].map((s) => <MagneticBtn key={s.label} {...s} />)}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-50 pointer-events-none"
        animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <span className="text-[#484f58] text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-[#484f58]" />
      </motion.div>

      {/* Shimmer animation for social buttons */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}