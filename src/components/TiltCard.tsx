import { useRef, useState, type ReactNode, type MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
    boxShadow: "",
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      boxShadow: `
        ${(rotateY * 2)}px ${(-rotateX * 2)}px 30px hsl(180 100% 50% / 0.08),
        inset 0 0 60px hsl(180 100% 50% / 0.03)
      `,
    });

    ref.current.style.setProperty("--glow-x", `${glowX}%`);
    ref.current.style.setProperty("--glow-y", `${glowY}%`);
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
      boxShadow: "",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Glow spot following cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--glow-x, 50%) var(--glow-y, 50%), hsl(180 100% 50% / 0.07), transparent 60%)`,
          opacity: style.transform.includes("scale(1.02)") ? 1 : 0,
        }}
      />
      {children}
    </div>
  );
};

export default TiltCard;
