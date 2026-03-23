import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TiltCard from "./TiltCard";
import InteractiveTerminal from "./InteractiveTerminal";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{"// about me"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 gradient-text inline-block">
            Philosophy & Vision
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,38%)_1fr] gap-6 mb-12 items-stretch w-full">
            <div className="relative h-[320px] md:h-full min-h-[280px] rounded-lg overflow-hidden border border-border/50 bg-card">
              <img
                src="/Tanvi.jpeg"
                alt="Tanvi Deshpande"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col justify-stretch">
              <TiltCard className="glass-card rounded-lg p-8 transition-all duration-500 flex-1 flex flex-col min-h-0">
                <h3 className="font-mono text-primary text-lg mb-4 glow-text">
                  {">"} Hi, I&apos;m Tanvi Deshpande.
                </h3>
                
                <p className="text-secondary-foreground leading-relaxed mb-4">
                  Currently an MSCS student (graduating May 2026) and AI Software Engineer at DASH - the DMSB AI Strategic Hub at Northeastern University.
                </p>
                <p className="text-secondary-foreground leading-relaxed mb-4">
                  I&apos;m an AI/ML Engineer shipping production agentic systems. I've built multi-agent grading and real-time voice coaching platforms from prototype to deployment serving 1,000+ students at Northeastern. 
                </p>
                <p className="text-secondary-foreground leading-relaxed mb-4">
                  Deep experience in LangGraph, RAG pipelines, and speech ML, with full-stack ownership across Python/TypeScript backends, RabbitMQ, Redis, WebSocket streaming, and Docker.
                </p>
                
                <div className="mt-2 pt-5 border-t border-border/60">
                  <div className="flex items-start gap-3">
                    
                    <p className="text-secondary-foreground/80 text-sm md:text-[0.95rem] leading-relaxed">
                      <span className="text-foreground font-semibold">🔭 Fun fact:</span> I love astronomy
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-foreground/80 text-sm md:text-[0.95rem] leading-relaxed">I've contributed to near-Earth object observations through NASA's Pan-STARRS program, designed and simulated a rocket that hit an apogee of 17,500m. One day I'd love to work on making astronomical knowledge more accessible to everyone.</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>

          <InteractiveTerminal />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
