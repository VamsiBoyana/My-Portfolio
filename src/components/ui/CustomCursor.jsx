import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, .cursor-hover';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 800, damping: 40 });
  const dotY = useSpring(y, { stiffness: 800, damping: 40 });
  const ringX = useSpring(x, { stiffness: 200, damping: 25 });
  const ringY = useSpring(y, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    setEnabled(media.matches);
    const onChange = (e) => setEnabled(e.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e) => {
      if (e.target instanceof Element && e.target.closest(HOVER_SELECTOR)) setHovering(true);
    };
    const onOut = (e) => {
      if (e.target instanceof Element && e.target.closest(HOVER_SELECTOR)) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 10 : 7,
          height: hovering ? 10 : 7,
          background: hovering ? "#c084fc" : "#ffffff",
          transition: "width 0.2s, height 0.2s, background 0.2s",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 46 : 30,
          height: hovering ? 46 : 30,
          borderColor: hovering ? "rgba(192,132,252,0.6)" : "rgba(192,132,252,0.35)",
          background: hovering ? "rgba(192,132,252,0.08)" : "transparent",
          transition: "width 0.25s, height 0.25s, border-color 0.25s, background 0.25s",
        }}
      />
    </>
  );
}
