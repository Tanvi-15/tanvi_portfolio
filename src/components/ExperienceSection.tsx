import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TiltCard from "./TiltCard";

const experiences = [
  {
    company: "DMSB AI Strategic Hub (DASH)",
    role: "AI/ML Software Engineer",
    period: "Dec 2024 — Present",
    location: "Boston, MA",
    logo: "/DASHLogoBloo.png",
    highlights: [
      "Built full-stack AI grading platform reducing faculty grading time by 90%",
      "Engineered RAG pipeline with FAISS + HuggingFace embeddings, 90% accuracy on 30+ PDFs",
      "Architected multimodal speech AI serving 80+ presentations with real-time feedback",
      "Optimized GPU inference — 5x throughput on NVIDIA Blackwell",
      "Deployed production infrastructure handling 200+ concurrent users with 99% uptime",
    ],
    tags: ["LangGraph", "LlamaIndex", "Docker", "RabbitMQ", "Next.js", "Flask"],
  },
  {
    company: "Capgemini",
    role: "Data Analyst Intern",
    period: "Jan 2024 — Jul 2024",
    location: "Mumbai, India",
    logo: "/CAPG.png",
    highlights: [
      "Developed GenAI Scheduler Analyzer and Optimizer for resource management",
      "Built multi-agent AI Assistant for aircraft engineers",
      "Created pix2pix GAN model for criminal face detection",
      "Designed real-time conversational deepfake bot",
    ],
    tags: ["Python", "GANs", "Multi-Agent", "Jira AI"],
  },
  {
    company: "Capgemini",
    role: "Machine Learning Intern",
    period: "Jun 2023 — Aug 2023",
    location: "Mumbai, India",
    logo: "/CAPG.png",
    highlights: [
      "Applied real-time data analysis and ML to optimize manufacturing productivity",
      "Leveraged PLCs and generative AI for reprogramming tasks",
    ],
    tags: ["Python", "CTGans", "Pandas", "Gretel.ai"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{"// experience"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text inline-block">
            Where I've Worked
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />

            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative pl-8 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-8 top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(180_100%_50%/0.5)] -translate-x-1/2" />

                  <TiltCard className="glass-card rounded-lg p-6 transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden bg-zinc-800 flex items-center justify-center">
                          <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                          <p className="text-primary font-mono text-sm">{exp.role}</p>
                        </div>
                      </div>
                      <div className="text-muted-foreground font-mono text-xs mt-1 md:mt-0">
                        <p>{exp.period}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="text-secondary-foreground text-sm flex items-start gap-2">
                          <span className="text-primary mt-1 shrink-0">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="skill-tag text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
