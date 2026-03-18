import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, Code2, Briefcase, FolderGit2, GraduationCap, Award, Mail, Download } from "lucide-react";

const sections = [
  { id: "home", label: "About", icon: Home },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SectionNav({ onMenuToggle }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      const scrollPosition = window.scrollY + 150; // Offset for better detection
      
      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          const sectionBottom = sectionTop + sectionHeight;
          
          // Check if scroll position is within this section
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute("id") || "home";
          }
        }
      });
      
      // Special handling for the last section (contact)
      const lastSection = Array.from(sections).pop();
      if (lastSection instanceof HTMLElement) {
        const lastSectionTop = lastSection.offsetTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // If we're near the bottom of the page, activate the last section
        if (window.scrollY + windowHeight >= documentHeight - 100 || 
            window.scrollY >= lastSectionTop - 200) {
          current = lastSection.getAttribute("id") || current;
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Notify parent component about menu state
    if (onMenuToggle) {
      onMenuToggle(open);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open, onMenuToggle]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-800/80 bg-[#0B1120]/98 backdrop-blur-xl shadow-lg shadow-black/20"
            : "border-b border-transparent bg-[#0B1120]/80 backdrop-blur-md"
        }`}
      >
        <div className="w-full px-5 sm:px-6">
          <div className="relative flex items-center justify-between h-14 px-0">
            {/* Logo/Name - LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient hover:from-purple-300 hover:via-pink-300 hover:to-purple-300 transition-all duration-300">
                Vamsi B
              </span>
            </motion.div>

            {/* Desktop: horizontal links - CENTER (only on extra large screens) */}
            <div className="hidden xl:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {sections.map((s, idx) => {
                const Icon = s.icon;
                const isActive = activeSection === s.id;
                return (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(s.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white bg-purple-600 hover:bg-purple-500"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{s.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Resume Button - RIGHT (only on extra large screens) */}
            <motion.a
              href="/Resume%20(1).pdf"
              download="Vamsi_Boyana_Resume.pdf"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden xl:flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              <span>Get My Resume</span>
            </motion.a>

            {/* Mobile/Tablet: menu toggle */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(!open);
              }}
              className="xl:hidden p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors touch-manipulation"
              aria-label="Toggle menu"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <motion.div
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <motion.div
          initial={false}
          animate={{ height: open ? "calc(100vh - 3.5rem)" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`xl:hidden overflow-hidden fixed inset-x-0 top-14 bottom-0 border-t border-slate-800/50 bg-[#0B1120] backdrop-blur-xl ${!open ? 'pointer-events-none' : ''}`}
        >
          <div className="flex flex-col justify-between h-full px-5 py-3">
            <div className="flex flex-col gap-1">
              {sections.map((s, idx) => {
                const Icon = s.icon;
                const isActive = activeSection === s.id;
                return (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: open ? 0.05 * idx : 0 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpen(false);
                      setTimeout(() => {
                        scrollToSection(s.id);
                      }, 300);
                    }}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-purple-400" : ""}`} />
                    <span>{s.label}</span>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pb-2">
              <motion.a
                href="/Resume%20(1).pdf"
                download="Vamsi_Boyana_Resume.pdf"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: open ? 0.05 * sections.length : 0 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Resume</span>
              </motion.a>
              
              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=vamsiboina1800@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: open ? 0.05 * (sections.length + 1) : 0 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Get in Touch</span>
              </motion.a>
              
              <motion.a
                href="tel:+919581024460"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: open ? 0.05 * (sections.length + 2) : 0 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Me</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Add gradient animation keyframes */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}
