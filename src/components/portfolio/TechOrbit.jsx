import React from "react";
import { motion } from "framer-motion";

// SVG tech logos as inline components
const TechIcons = {
  React: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="3.5" fill="#61DAFB" />
      <ellipse cx="20" cy="20" rx="16" ry="6" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
      <ellipse cx="20" cy="20" rx="16" ry="6" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)" />
      <ellipse cx="20" cy="20" rx="16" ry="6" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)" />
    </svg>
  ),
  Node: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 4L34 12v16L20 36 6 28V12L20 4z" stroke="#68A063" strokeWidth="1.5" fill="none" />
      <text x="20" y="24" textAnchor="middle" fill="#68A063" fontSize="9" fontWeight="bold">JS</text>
    </svg>
  ),
  MongoDB: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 5 C20 5 27 14 27 22 C27 30 24 35 20 35 C16 35 13 30 13 22 C13 14 20 5 20 5Z" fill="#4DB33D" opacity="0.9" />
      <line x1="20" y1="28" x2="20" y2="36" stroke="#4DB33D" strokeWidth="2" />
    </svg>
  ),
  // Docker: ({ size = 40 }) => (
  //   <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
  //     <rect x="5" y="18" width="6" height="5" rx="1" stroke="#2496ED" strokeWidth="1.4" fill="none"/>
  //     <rect x="13" y="18" width="6" height="5" rx="1" stroke="#2496ED" strokeWidth="1.4" fill="none"/>
  //     <rect x="21" y="18" width="6" height="5" rx="1" stroke="#2496ED" strokeWidth="1.4" fill="none"/>
  //     <rect x="13" y="11" width="6" height="5" rx="1" stroke="#2496ED" strokeWidth="1.4" fill="none"/>
  //     <rect x="21" y="11" width="6" height="5" rx="1" stroke="#2496ED" strokeWidth="1.4" fill="none"/>
  //     <path d="M5 26 C10 30 30 30 36 26" stroke="#2496ED" strokeWidth="1.4" fill="none"/>
  //     <path d="M33 23 C35 22 37 20 35 18" stroke="#2496ED" strokeWidth="1.4" fill="none"/>
  //   </svg>
  // ),
  // TypeScript: ({ size = 40 }) => (
  //   <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
  //     <rect x="5" y="5" width="30" height="30" rx="4" fill="#3178C6" opacity="0.85"/>
  //     <text x="20" y="26" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">TS</text>
  //   </svg>
  // ),
  HTML: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6 L34 6 L30 32 L20 36 L10 32 Z" fill="#E34F26" />
      <path d="M12 12 L28 12 L26 24 L20 26 L14 24 Z" fill="#fff" opacity="0.92" />
      <path d="M12 18 L16 18 L15 22 L12 22 Z" fill="#fff" opacity="0.92" />
    </svg>
  ),
  CSS: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6 L34 6 L30 32 L20 36 L10 32 Z" fill="#1572B6" />
      <path d="M12 12 L28 12 L26 16 L14 16 Z" fill="#fff" opacity="0.9" />
      <path d="M12 18 L26 18 L25 22 L13 22 Z" fill="#fff" opacity="0.85" />
      <path d="M12 24 L24 24 L23 28 L13 28 Z" fill="#fff" opacity="0.8" />
    </svg>
  ),
  JavaScript: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="5" y="5" width="30" height="30" rx="4" fill="#F7DF1E" opacity="0.9" />
      <text x="20" y="26" textAnchor="middle" fill="#000" fontSize="13" fontWeight="bold">JS</text>
    </svg>
  ),
  Git: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="28" cy="12" r="4" stroke="#F05032" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="20" r="4" stroke="#F05032" strokeWidth="1.5" fill="none" />
      <circle cx="28" cy="28" r="4" stroke="#F05032" strokeWidth="1.5" fill="none" />
      <line x1="16" y1="20" x2="24" y2="14" stroke="#F05032" strokeWidth="1.5" />
      <line x1="16" y1="20" x2="24" y2="26" stroke="#F05032" strokeWidth="1.5" />
    </svg>
  ),
  Express: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <text x="20" y="17" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold" opacity="0.9">EXPRESS</text>
      <text x="20" y="28" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold" opacity="0.9">.JS</text>
    </svg>
  ),
  MySQL: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="12" rx="12" ry="5" stroke="#00758F" strokeWidth="1.5" fill="none" />
      <path d="M8 12 v8 c0 3 5.4 5 12 5s12-2 12-5v-8" stroke="#00758F" strokeWidth="1.5" fill="none" />
      <path d="M8 20 v8 c0 3 5.4 5 12 5s12-2 12-5v-8" stroke="#00758F" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  PostgreSQL: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="13" rx="11" ry="5" stroke="#336791" strokeWidth="1.5" fill="none" />
      <path d="M9 13 v9 c0 3 5 5 11 5s11-2 11-5v-9" stroke="#336791" strokeWidth="1.5" fill="none" />
      <path d="M27 17 c3-1 5 1 5 4 s-2 4-5 3" stroke="#336791" strokeWidth="1.5" fill="none" />
      <text x="20" y="32" textAnchor="middle" fill="#336791" fontSize="6" fontWeight="bold">PG</text>
    </svg>
  ),
};

// const techList = [
//   { Icon: TechIcons.React, label: "React", color: "#61DAFB", angle: 0 },
//   { Icon: TechIcons.JavaScript, label: "JS", color: "#F7DF1E", angle: 40 },
//   { Icon: TechIcons.HTML, label: "HTML", color: "#E34F26", angle: 80 },
//   { Icon: TechIcons.Node, label: "Node", color: "#68A063", angle: 120 },
//   { Icon: TechIcons.Express, label: "Express", color: "#ffffff", angle: 160 },
//   { Icon: TechIcons.MongoDB, label: "Mongo", color: "#4DB33D", angle: 200 },
//   { Icon: TechIcons.MySQL, label: "MySQL", color: "#00758F", angle: 240 },
//   { Icon: TechIcons.CSS, label: "CSS", color: "#1572B6", angle: 280 },
//   { Icon: TechIcons.Git, label: "Git", color: "#F05032", angle: 320 },
// ];

const techList = [
  // Frontend
  { Icon: TechIcons.HTML,       label: "HTML",    color: "#E34F26", angle: 0   },
  { Icon: TechIcons.CSS,        label: "CSS",     color: "#1572B6", angle: 36  },
  { Icon: TechIcons.JavaScript, label: "JS",      color: "#F7DF1E", angle: 72  },
  { Icon: TechIcons.React,      label: "React",   color: "#61DAFB", angle: 108 },
  // Backend
  { Icon: TechIcons.Node,       label: "Node",    color: "#68A063", angle: 144 },
  { Icon: TechIcons.Express,    label: "Express", color: "#ffffff", angle: 180 },
  // Database
  { Icon: TechIcons.MongoDB,    label: "Mongo",   color: "#4DB33D", angle: 216 },
  { Icon: TechIcons.PostgreSQL, label: "PgSQL",   color: "#336791", angle: 252 },
  { Icon: TechIcons.MySQL,      label: "MySQL",   color: "#00758F", angle: 288 },
  // Tools
  { Icon: TechIcons.Git,        label: "Git",     color: "#F05032", angle: 324 },
];

export default function TechOrbit() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const r         = isMobile ? 110 : 170;
  const orbitSize = isMobile ? 260  : 384;
  const iconSize  = isMobile ? 40   : 56;
  const iconInner = isMobile ? 22   : 32;
  const offset    = iconSize / 2;

  return (
    <div
      className="relative w-full flex justify-center items-center overflow-hidden select-none"
      style={{ minHeight: isMobile ? 320 : 520, padding: `${isMobile ? 24 : 48}px 0` }}
    >
      {/* Central glow */}
      <div className="absolute rounded-full pointer-events-none"
        style={{
          width: isMobile ? 160 : 280,
          height: isMobile ? 160 : 280,
          background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)"
        }} />

      {/* Center label */}
      <div className="absolute flex flex-col items-center z-10 pointer-events-none">
        <div
          className="font-bold bg-clip-text text-transparent"
          style={{
            fontSize: isMobile ? 24 : 36,
            backgroundImage: "linear-gradient(135deg,#c084fc,#818cf8,#38bdf8)"
          }}>
          &lt;/&gt;
        </div>
        <span className="text-[#484f58] mt-1" style={{ fontSize: isMobile ? 10 : 13 }}>Tech Stack</span>
      </div>

      {/* Rotating orbit */}
      <motion.div
        className="absolute"
        style={{ width: orbitSize, height: orbitSize }}
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {techList.map(({ Icon, label, color, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * r;
          const y = Math.sin(rad) * r;
          return (
            <motion.div
              key={label}
              className="absolute flex flex-col items-center cursor-pointer"
              style={{ left: `calc(50% + ${x}px - ${offset}px)`, top: `calc(50% + ${y}px - ${offset}px)`, width: iconSize }}
              animate={{ rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.4, filter: `drop-shadow(0 0 10px ${color})`, zIndex: 20 }}
            >
              <motion.div
                style={{
                  width: iconSize,
                  height: iconSize,
                  borderRadius: isMobile ? 10 : 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  background: `linear-gradient(145deg, ${color}25, ${color}0a)`,
                  border: `1px solid ${color}50`,
                  boxShadow: `0 4px 20px ${color}25, inset 0 1px 0 ${color}35`,
                  transform: "perspective(200px) rotateX(15deg)",
                }}
                whileHover={{
                  transform: "perspective(200px) rotateX(0deg) rotateY(15deg) scale(1.1)",
                  boxShadow: `0 8px 30px ${color}55`,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)" }} />
                <Icon size={iconInner} />
              </motion.div>
              <span
                className="font-semibold text-center leading-tight"
                style={{ color, fontSize: isMobile ? 8 : 10, marginTop: isMobile ? 3 : 5 }}>
                {label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}