import React, { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  swayAngle: number;
  swaySpeed: number;
  swayRadius: number;
  alpha: number;
  isCrystal: boolean;
}

interface GoldenMote {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  rotation: number;
  vRot: number;
}

export const AmbientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparklesRef = useRef<Sparkle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Magical Christmas Snowflakes
    const snowCount = Math.min(65, Math.floor((width * height) / 18000));
    const snowflakes: Snowflake[] = [];

    for (let i = 0; i < snowCount; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1.2,
        speedY: Math.random() * 0.75 + 0.35,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.008,
        swayRadius: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.65 + 0.25,
        isCrystal: Math.random() > 0.78
      });
    }

    // 2. Warm Golden Hearth & Holiday Fairy Dust
    const moteCount = Math.min(30, Math.floor((width * height) / 35000));
    const goldenMotes: GoldenMote[] = [];
    const warmColors = ['#ffd700', '#ffe082', '#ffcc80', '#fff8e1', '#e0f2fe'];

    for (let i = 0; i < moteCount; i++) {
      goldenMotes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.4 + 1.0,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.35 - 0.1,
        alpha: Math.random() * 0.5 + 0.1,
        maxAlpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color: warmColors[Math.floor(Math.random() * warmColors.length)]
      });
    }

    // Spawn festive sparkles on pointer down
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      const festiveColors = ['#ffd700', '#ff4d6d', '#52b788', '#ffffff', '#ffb703', '#e0f2fe'];
      for (let i = 0; i < 16; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.8 + 1.4;
        sparklesRef.current.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: Math.random() * 3.6 + 1.6,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.016,
          color: festiveColors[Math.floor(Math.random() * festiveColors.length)],
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.22
        });
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    // Helper: draw 6-point snowflake crystal
    const drawCrystal = (cx: number, cy: number, r: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#ffffff';

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-r, 0);
        ctx.lineTo(r, 0);
        ctx.stroke();

        // Little branch tips
        ctx.beginPath();
        ctx.moveTo(r * 0.6, -r * 0.35);
        ctx.lineTo(r * 0.6, r * 0.35);
        ctx.stroke();

        ctx.rotate(Math.PI / 3);
      }
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // A. Render Gentle Falling Snowflakes
      for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i];
        flake.swayAngle += flake.swaySpeed;
        flake.x += Math.sin(flake.swayAngle) * flake.swayRadius;
        flake.y += flake.speedY;

        if (flake.y > height + 15) {
          flake.y = -15;
          flake.x = Math.random() * width;
        }
        if (flake.x < -15) flake.x = width + 15;
        if (flake.x > width + 15) flake.x = -15;

        if (flake.isCrystal && flake.radius > 2.2) {
          drawCrystal(flake.x, flake.y, flake.radius * 2.2, flake.alpha * 0.7);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = flake.alpha;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
          ctx.fill();
          ctx.restore();
        }
      }

      // B. Render Warm Golden Floating Fairy Motes
      for (let i = 0; i < goldenMotes.length; i++) {
        const m = goldenMotes[i];
        m.x += m.speedX;
        m.y += m.speedY;
        m.alpha += m.pulseSpeed;

        if (m.alpha > m.maxAlpha || m.alpha < 0.05) {
          m.pulseSpeed = -m.pulseSpeed;
        }

        if (m.y < -15) {
          m.y = height + 15;
          m.x = Math.random() * width;
        }
        if (m.x < -15) m.x = width + 15;
        if (m.x > width + 15) m.x = -15;

        ctx.save();
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = m.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, m.alpha));
        ctx.shadowBlur = 10;
        ctx.shadowColor = m.color;
        ctx.fill();
        ctx.restore();
      }

      // C. Render Interactive Holiday Sparkles
      const sparkles = sparklesRef.current;
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.07; // gentle gravity
        s.vx *= 0.98;
        s.alpha -= s.decay;
        s.rotation += s.vRot;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;

        // Draw 4-point star sparkle
        ctx.beginPath();
        for (let j = 0; j < 4; j++) {
          ctx.lineTo(Math.cos((j * Math.PI) / 2) * s.size * 2, Math.sin((j * Math.PI) / 2) * s.size * 2);
          ctx.lineTo(Math.cos((j * Math.PI) / 2 + Math.PI / 4) * (s.size * 0.4), Math.sin((j * Math.PI) / 2 + Math.PI / 4) * (s.size * 0.4));
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ambient-canvas"
      aria-hidden="true"
    />
  );
};
