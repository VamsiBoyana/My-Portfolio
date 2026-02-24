import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, ArrowUpRight, FileDown } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "vamsiboina1800@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=vamsiboina1800@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9581024460",
    href: "tel:+919581024460",
  },
  {
    icon: FileDown,
    label: "Resume",
    value: "Download PDF",
    href: "/Resume%20(1).pdf",
    download: "Vamsi_Boyana_Resume.pdf",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/vamsi-boyana-964550229/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "GitHub Profile",
    href: "https://github.com/VamsiBoyana",
  },
];

export default function ContactSection({ id }) {
  return (
    <section id={id || "contact"} className="pt-4 pb-16 md:pt-12 md:pb-20 bg-[#0d1117] relative scroll-mt-14">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/10 to-transparent" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
         <motion.span
  className="text-purple-400 text-sm font-semibold uppercase mb-3 block"
  initial={{ letterSpacing: "0.5em" }}
  whileInView={{ letterSpacing: "0.3em" }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Connect
</motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Let's Work Together
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.download ? undefined : "_blank"}
                rel="noopener noreferrer"
                download={link.download || undefined}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-[#30363d] bg-[#161b22] hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{link.label}</p>
                  <p className="text-white text-sm font-medium truncate">{link.value}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#484f58] group-hover:text-purple-400 transition-colors shrink-0" />
              </a>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 pt-8 border-t border-slate-800/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Vamsi Boyana. Built with passion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}