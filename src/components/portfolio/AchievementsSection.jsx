import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import StarField from "@/components/ui/StarField";

const certifications = [
  {
    title: "MongoDB Node.js Developer Path",
    issuer: "MongoDB - SmartBridge",
    date: "June 2025",
    link: "https://learn.mongodb.com/c/qc2AI7JDRNW_q_fDDee84w",
    description: "Completed comprehensive training in MongoDB and Node.js development",
    color: "#f97316",
    glow: "rgba(249,115,22,0.2)",
  },
];

export default function AchievementsSection({ id }) {
  return (
    <section id={id || "achievements"} className="pt-8 pb-16 md:pt-12 md:pb-20 bg-[#010409] relative overflow-hidden scroll-mt-14">
      <StarField />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block"
            initial={{ letterSpacing: "0.5em" }}
            whileInView={{ letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Recognition
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Achievements & Certifications
          </h2>
        </motion.div>

        <div className="grid gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ boxShadow: `0 0 60px ${cert.glow}` }}
              className="relative rounded-2xl border border-[#21262d] bg-[#161b22] p-6 pl-8 transition-all duration-500 group overflow-hidden"
            >
              {/* Animated border gradient on hover */}
              <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${cert.glow} 0%, transparent 50%)` }} />

              {/* Top shimmer sweep */}
              <motion.div
                className="absolute top-0 left-[-100%] w-full h-0.5 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
                animate={{ left: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />

              {/* Glowing left bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: `linear-gradient(to bottom, ${cert.color}, transparent)` }} />

              <div className="relative z-10">
                <div className="p-3 rounded-xl w-fit mb-4" style={{ background: `${cert.color}1a` }}>
                  <Award className="w-5 h-5" style={{ color: cert.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                <p className="text-[#8b949e] text-sm mb-3">{cert.issuer}</p>
                <p className="text-[#c9d1d9] text-sm mb-3">{cert.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#8b949e] text-xs">{cert.date}</span>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-80"
                      style={{ color: cert.color }}
                    >
                      View Certificate
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
