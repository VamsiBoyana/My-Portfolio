import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Shield, RefreshCw, Bot, Lock, Code, ExternalLink, ChevronRight } from "lucide-react";

// Richer project shape: title, description, tech[], tag, uptime, link or github/liveUrl, highlights[].
const projects = [
  {
    title: "Web3 Automated Trading Bot",
    description: "Backend-driven automated trading system that monitors real-time crypto prices and executes token swaps on Raydium DEX pools. Built for high uptime during volatile markets with a swap queue, retry logic, and exponential backoff.",
    tech: ["Node.js", "MongoDB", "Solana Web3.js", "Raydium SDK", "JWT", "REST API"],
    color: "#c084fc",
    glow: "rgba(192,132,252,0.2)",
    tag: "Web3 / DeFi",
    uptime: "99.9%",
    link: "https://github.com/yourusername/repo-name",
    highlights: [
      { icon: Layers, label: "Architecture", text: "Backend-driven automated trading system monitoring real-time crypto prices for token swaps on Raydium DEX pools." },
      { icon: RefreshCw, label: "Concurrency", text: "Swap queue with retry logic and exponential backoff — ensuring 99.9% uptime during high-volatility market swings." },
      { icon: Shield, label: "Security", text: "Secure wallet management, JWT authentication with role-based access control for admin/sub-admin permissions." },
      { icon: Code, label: "Data pipeline", text: "MongoDB for trade history and config; scheduled jobs for price feeds and health checks." },
    ],
  },
  {
    title: "Full-Stack App with Telegram Bot",
    description: "Full-stack application with a Telegram bot for real-time user notifications and automated interactions. Includes RESTful APIs for authentication, environment-based config, and a simple admin dashboard for managing users and bot settings.",
    tech: ["Node.js", "Express.js", "MongoDB", "Telegram API", "JWT", "REST"],
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.2)",
    tag: "Full Stack",
    uptime: "Real-time",
    link: "https://github.com/yourusername/another-repo",
    highlights: [
      { icon: Bot, label: "Integration", text: "Telegram bot for real-time user notifications, commands, and automated replies with webhook handling." },
      { icon: Lock, label: "Security", text: "RESTful APIs for secure authentication (Login/Signup), JWT tokens, and managed environment variables for deployment." },
      { icon: Layers, label: "Backend", text: "Express server with MongoDB models for users and audit logs; role-based access for admin actions." },
    ],
  },
  {
    title: "Portfolio & Project Showcase",
    description: "Single-page portfolio with dark theme, smooth scroll sections, and reusable UI components. Built to showcase projects, skills, experience, and contact info with a responsive layout and light animations.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    color: "#22c55e",
    glow: "rgba(34,197,94,0.2)",
    tag: "Frontend",
    uptime: "Live",
    link: "https://github.com/yourusername/portfolio",
    highlights: [
      { icon: Code, label: "Stack", text: "React + Vite for fast builds; Tailwind for styling; Framer Motion for section and card animations." },
      { icon: Layers, label: "Sections", text: "Hero, skills, experience, projects with expandable details, education, and contact with clear CTAs." },
      { icon: Shield, label: "Maintainability", text: "Structured components and a single projects array so adding or editing projects is straightforward." },
    ],
  },
];

export default function ProjectsSection({ id }) {
  const [active, setActive] = useState(null);

  return (
    <section id={id || "projects"} className="pt-8 pb-6 md:pt-2 md:pb-8 bg-[#010409] relative overflow-hidden scroll-mt-14">
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(88,28,135,0.1) 0%, transparent 60%)" }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 7, repeat: Infinity }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <motion.span
            className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block"
            initial={{ letterSpacing: "0.5em" }}
            whileInView={{ letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}>
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Key Projects</h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              onClick={() => setActive(active === i ? null : i)}
              className="group relative rounded-2xl border border-[#21262d] bg-[#161b22] overflow-hidden cursor-pointer transition-all duration-500"
              whileHover={{ boxShadow: `0 0 60px ${project.glow}` }}>

              {/* Animated border gradient on hover */}
              <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${project.glow} 0%, transparent 50%)` }} />

              {/* Top shimmer sweep */}
              <motion.div
                className="absolute top-0 left-[-100%] w-full h-0.5 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                animate={{ left: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />

              <div className="p-6 md:p-8 relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full border"
                        style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}10` }}>
                        {project.tag}
                      </span>
                      <span className="text-xs text-[#8b949e] border border-[#21262d] px-2.5 py-1 rounded-full">
                        ⚡ {project.uptime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    {(project.description || project.subtitle) && (
                      <p className="text-[#8b949e] text-sm mt-2 leading-relaxed max-w-2xl">
                        {project.description || project.subtitle}
                      </p>
                    )}
                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2.5 py-1 rounded-md border border-[#21262d] bg-[#0d1117] text-[#c9d1d9]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg border border-[#21262d] bg-[#0d1117] hover:border-[#30363d] transition-colors"
                        style={{ color: project.color }}
                        title="View project"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    <motion.div
                    animate={{ rotate: active === i ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-2 rounded-lg border border-[#21262d] bg-[#0d1117] shrink-0 ml-4"
                    style={{ color: active === i ? project.color : "#8b949e" }}>
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>

                {/* Expandable highlights */}
                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden">
                      <p className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider mt-6 pt-6 border-t border-[#21262d]">
                        Key details · {project.highlights.length} points
                      </p>
                      <div className="mt-4 grid gap-4">
                        {project.highlights.map((h, hi) => {
                          const HIcon = h.icon;
                          return (
                            <motion.div key={h.label}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: hi * 0.1 }}
                              className="flex gap-4 p-4 rounded-xl bg-[#0d1117] border border-[#21262d]">
                              <div className="p-2 rounded-lg shrink-0 h-fit"
                                style={{ background: `${project.color}15` }}>
                                <HIcon className="w-4 h-4" style={{ color: project.color }} />
                              </div>
                              <div>
                                <span className="text-white font-semibold text-sm">{h.label}</span>
                                <p className="text-[#8b949e] text-sm mt-0.5 leading-relaxed">{h.text}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}