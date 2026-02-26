import { motion, useScroll, useTransform } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const blurPx = useTransform(
    scrollY,
    [0, 400, 700],
    [0, 8, 24]
  );
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

  return (
    <section className="relative sticky top-0 h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />

      <motion.div
        className="relative z-20 section-container text-center w-full"
        style={{ filter }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-primary mb-4 tracking-widest"
        >
          {"// hello world"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="text-foreground">I'm </span>
          <span className="gradient-text">Tanvi Deshpande</span>
          <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite] origin-[70%_70%] ml-2">👋</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-mono text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto"
        >
          <span className="text-primary">const</span> role ={" "}
          <span className="text-accent">"AI/ML Engineer"</span>;
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-muted-foreground max-w-lg mx-auto mb-10 text-lg"
        >
          MSCS @ Northeastern · Building intelligent systems that go beyond GenAI hype
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center justify-center gap-4 max-w-md mx-auto"
        >
          <div className="flex items-center justify-center gap-6 w-full">
            <a
              href="#experience"
              className="flex-1 px-6 py-3 rounded-md border border-primary/30 text-primary font-mono text-sm font-semibold transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.2)] text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="flex-1 px-6 py-3 rounded-md border border-primary/30 text-primary font-mono text-sm font-semibold transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.2)] text-center"
            >
              Get In Touch
            </a>
          </div>
          <a
            href="/TanviSoftware2.pdf"
            download="Tanvi_Resume.pdf"
            className="w-full px-6 py-3 rounded-md bg-primary text-primary-foreground font-mono text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.4)] hover:scale-105 text-center"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
