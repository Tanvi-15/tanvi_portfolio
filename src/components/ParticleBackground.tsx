import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(() => ({
    fullScreen: false as const,
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" as const },
        onClick: { enable: true, mode: "push" as const },
      },
      modes: {
        grab: { distance: 150, links: { opacity: 0.5, color: "#00ffff" } },
        push: { quantity: 4 },
      },
    },
    particles: {
      color: { value: ["#00ffff", "#a855f7"] },
      links: {
        color: "#00ffff",
        distance: 130,
        enable: true,
        opacity: 0.12,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none" as const,
        random: true,
        straight: false,
        outModes: { default: "bounce" as const },
      },
      number: {
        density: { enable: true },
        value: 80,
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
      },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticleBackground;
