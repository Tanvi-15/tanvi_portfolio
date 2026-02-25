import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref}>
      <div className="section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{"// contact"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text inline-block">
            Let's Connect
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg">
            Open to opportunities in ML engineering, AI research, and full-stack development.
          </p>

          <div className="flex items-center justify-center gap-6 flex-wrap">
            <a
              href="mailto:tanvideshpandedc@gmail.com"
              className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-mono text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.4)] hover:scale-105"
            >
              tanvideshpandedc@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/tanvideshpande1505"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-md border border-primary/30 text-primary font-mono text-sm font-semibold transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.2)]"
            >
              LinkedIn ↗
            </a>
          </div>
        </motion.div>

        <div className="mt-20 pt-8 border-t border-border">
          <p className="font-mono text-muted-foreground text-xs">
            {"// "} Built with React + TypeScript {"// "} 
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
