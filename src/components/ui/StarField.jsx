import { useEffect, useRef } from "react";

export default function StarField() {
  const ref = useRef(null);
  
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    let stars = [];
    
    const resize = () => { 
      canvas.width = window.innerWidth; 
      canvas.height = window.innerHeight;
      // Regenerate stars on resize to fill new dimensions
      stars = Array.from({ length: 300 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random(),
        speed: Math.random() * 0.005 + 0.001,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const shooters = [];
    const spawnShooter = () => {
      shooters.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        len: Math.random() * 120 + 60,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4,
        alpha: 1,
        trail: [],
      });
    };
    const shootInterval = setInterval(spawnShooter, 3000);

    let id;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a += s.speed; if (s.a > 1 || s.a < 0) s.speed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a * 0.8})`;
        ctx.fill();
      });
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.015;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        grad.addColorStop(0, `rgba(200,170,255,${s.alpha})`);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (s.alpha <= 0) shooters.splice(i, 1);
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { 
      cancelAnimationFrame(id); 
      clearInterval(shootInterval); 
      window.removeEventListener("resize", resize); 
    };
  }, []);
  
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
