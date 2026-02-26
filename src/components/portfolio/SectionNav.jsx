import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, Code2, Briefcase, FolderGit2, GraduationCap, Award, Mail } from "lucide-react";

const sections = [
  { id: "home", label: "Home", icon: Home },
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

export default function SectionNav() {
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

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-800/80 bg-[#0d1117]/98 backdrop-blur-xl shadow-lg shadow-black/20"
            : "border-b border-transparent bg-[#0d1117]/80 backdrop-blur-md"
        }`}
      >
        <div className="w-full max-w-full mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Name with gradient - LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group cursor-pointer flex-shrink-0 mr-auto"
              onClick={() => scrollToSection("home")}
            >
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Vamsi B
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
            </motion.div>

            {/* Desktop: horizontal links - RIGHT */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {sections.map((s, idx) => {
                const Icon = s.icon;
                const isActive = activeSection === s.id;
                return (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    onClick={() => scrollToSection(s.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                      isActive
                        ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? "text-purple-400" : "group-hover:scale-110"}`} />
                    <span>{s.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile: menu toggle */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setOpen(!open)}
              className="md:hidden p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
              aria-label="Toggle menu"
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
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`md:hidden overflow-hidden border-t border-slate-800/50 bg-[#0d1117]/98 backdrop-blur-xl ${!open ? 'pointer-events-none' : ''}`}
        >
          <div className="px-4 py-4 flex flex-col gap-2">
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
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
