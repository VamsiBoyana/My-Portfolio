import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

// Subtle mouse-driven 3D tilt for card hover, capped at `max` degrees.
// Skips on coarse-pointer (touch) devices since it relies on continuous mousemove.
export default function useTilt({ max = 6 } = {}) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 300, damping: 30 });

  const onMouseMove = (e) => {
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}
