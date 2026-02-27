import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "2.5+", label: "Years Experience" },
  { value: "5+", label: "Projects Delivered" },
  { value: "30%", label: "Dev Time Reduced" },
  { value: "99.9%", label: "System Uptime" },
  { value: "15%", label: "Accuracy Boost" },
  { value: "1+", label: "Certifications" },
];

export default function StatsBar() {
  return (
    <section className="py-10 md:py-12 bg-[#010409]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}