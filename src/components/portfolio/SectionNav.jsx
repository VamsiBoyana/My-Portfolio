import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, Code2, Briefcase, FolderGit2, GraduationCap, Mail } from "lucide-react";

const sections = [
  { id: "home", label: "Home", icon: Home },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SectionNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#21262d] bg-[#0d1117]/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <span className="text-white font-semibold text-sm tracking-wide">Vamsi B.</span>
            {/* Desktop: horizontal links */}
            <div className="hidden md:flex items-center gap-1">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-colors text-sm font-medium"
                  >
                    <Icon className="w-4 h-4" />
                    {s.label}
                  </button>
                );
              })}
            </div>
            {/* Mobile: menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#21262d]"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile dropdown */}
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden border-t border-[#21262d] bg-[#161b22]"
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    scrollToSection(s.id);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#c9d1d9] hover:text-white hover:bg-[#21262d] text-sm font-medium"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {s.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      </nav>
    </>
  );
}
