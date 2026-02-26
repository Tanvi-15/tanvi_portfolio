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
            <div className="flex flex-col gap-6 justify-stretch">
              <TiltCard className="glass-card rounded-lg p-8 transition-all duration-500 flex-1 flex flex-col min-h-0">
                <h3 className="font-mono text-primary text-lg mb-4 glow-text">
                  {">"} ML {">"} GenAI
                </h3>
                <p className="text-secondary-foreground leading-relaxed mb-4">
                  I believe that <span className="text-primary font-semibold">Generative AI alone cannot change anything</span>. 
                  The real power lies in Machine Learning - understanding data, building models that learn, 
                  and creating systems that truly reason.
                </p>
                <p className="text-secondary-foreground leading-relaxed mt-auto">
                  GenAI is a tool. ML is the foundation. I build on foundations.
                </p>
              </TiltCard>

              <TiltCard className="glass-card rounded-lg p-8 transition-all duration-500 flex-1 flex flex-col min-h-0">
                <h3 className="font-mono text-primary text-lg mb-4 glow-text">
                  {">"} What I Do
                </h3>
                <p className="text-secondary-foreground leading-relaxed mb-4">
                  Currently a MSCS student (Batch 2026) and AI Software Engineer at DASH (DMSB AI Strategic Hub) at Northeastern University, building full-stack AI platforms 
                  that reduce faculty grading time by 95%.
                </p>
                <p className="text-secondary-foreground leading-relaxed mt-auto">
                  From RAG pipelines to multimodal speech AI, I architect systems where AI meets production.
                </p>
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
