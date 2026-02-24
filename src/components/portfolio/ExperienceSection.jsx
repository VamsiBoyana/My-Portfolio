import React from "react";
import { motion } from "framer-motion";
import { Briefcase, TrendingUp, BarChart3, Brain, Zap, Monitor, Target, Activity } from "lucide-react";

const experiences = [
  {
    company: "String Metaverse Limited",
    role: "Software Developer",
    period: "January 2025 — Present",
    color: "#c084fc",
    glow: "rgba(192,132,252,0.15)",
    highlights: [
      { icon: TrendingUp, title: "Financial Ops", metric: "15%↑", desc: "Accuracy improvement in partner payout processing via deep data analysis." },
      { icon: BarChart3, title: "Dashboard Dev", metric: "Funnel", desc: "Engineered lead-to-disbursement funnel dashboard driving key decisions." },
      { icon: Brain, title: "Predictive Models", metric: "ML", desc: "Built credit risk & forecasting models from large-scale multi-team datasets." },
    ],
  },
  {
    company: "Global Logic Technologies",
    role: "Analyst",
    period: "September 2023 — January 2025",
    color: "#818cf8",
    glow: "rgba(129,140,248,0.15)",
    highlights: [
      { icon: Zap, title: "Automation", metric: "30%↓", desc: "Manual task reduction via automated workflows enabling real-time KPI updates." },
      { icon: Monitor, title: "Frontend Eng.", metric: "React", desc: "Built responsive UIs with React.js & Bootstrap across all devices." },
      { icon: Target, title: "Reporting Accuracy", metric: "20%↑", desc: "Enhanced risk and partner payment tracking features." },
      { icon: Activity, title: "Dashboards", metric: "Live", desc: "Dynamic business health monitors with complex integrated metrics." },
    ],
  },
];

export default function ExperienceSection({ id }) {
  return (
    <section id={id || "experience"} className="pt-8 pb-16 md:pt-20 md:pb-20 bg-[#010409] relative overflow-hidden scroll-mt-14">
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(88,28,135,0.1) 0%, transparent 60%)" }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-10"
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
            Career
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Professional Experience</h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, expIdx) => (
            <motion.div key={exp.company}
              initial={{ opacity: 0, x: expIdx % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ boxShadow: `0 0 40px ${exp.glow}` }}
              className="relative rounded-2xl border border-[#21262d] bg-[#0d1117] overflow-hidden group transition-all duration-500">
              {/* Glowing left bar */}
              <motion.div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: `linear-gradient(to bottom, ${exp.color}, transparent)` }}
                initial={{ scaleY: 0, originY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }} />

              {/* Card shine */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 50%, ${exp.glow} 0%, transparent 50%)` }} />

              <div className="p-6 md:p-8 pl-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <motion.div className="p-3 rounded-xl shrink-0"
                      style={{ background: `${exp.color}20` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}>
                      <Briefcase className="w-5 h-5" style={{ color: exp.color }} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="font-semibold text-sm" style={{ color: exp.color }}>{exp.company}</p>
                    </div>
                  </div>
                  <span className="text-[#484f58] text-sm border border-[#21262d] rounded-full px-4 py-1 self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>

                {/* Highlights grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {exp.highlights.map((h, hi) => {
                    const HIcon = h.icon;
                    return (
                      <motion.div key={h.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: hi * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex gap-3 p-4 rounded-xl bg-[#161b22] border border-[#21262d] hover:border-purple-500/20 transition-all duration-300">
                        <div className="p-2 rounded-lg shrink-0 h-fit" style={{ background: `${exp.color}15` }}>
                          <HIcon className="w-4 h-4" style={{ color: exp.color }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-semibold text-sm">{h.title}</span>
                            <span className="text-xs font-bold px-1.5 py-0.5 rounded-md" style={{ color: exp.color, background: `${exp.color}15` }}>
                              {h.metric}
                            </span>
                          </div>
                          <p className="text-[#8b949e] text-xs leading-relaxed">{h.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}