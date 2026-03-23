import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import TiltCard from "./TiltCard";

const experiences: {
  company: string;
  role: string;
  period: string;
  location: string;
  logo: string;
  highlights: (string | ReactNode)[];
  tags: string[];
}[] = [
  {
    company: "DMSB AI Strategic Hub (DASH)",
    role: "AI/ML Software Engineer",
    period: "Dec 2024 — Present",
    location: "Boston, MA",
    logo: "/DASHLogoBloo.png",
    highlights: [
      "Led team of 4 engineers to deliver EssayBot, a multi-agent grading platform using LangGraph for parallel rubric evaluation.",
      "Engineered dual RAG pipelines (LlamaIndex + Qdrant) indexing 30+ course documents per assignment.",
      "Scaled to 1,000+ users with multi-layer security — prompt injection detection, Unicode attack filtering, and output validation.",
      "Designed async grading backend (Node.js/TypeScript + Python/Flask) for concurrent full-class processing.",
      "Orchestrated RabbitMQ task queues with dead-letter handling and retry logic, Redis caching for progress state, and WebSocket streaming for real-time instructor dashboards.",
      "Deployed across UAT and production via Docker + PM2.",
      "Built PresBot, a real-time voice AI coach serving 1000+ students across the university.",
      "Designed full speech pipeline Whisper ASR, prosody analysis (Praat, Librosa, OpenSMILE), LLM feedback, and F5-TTS voice synthesis.",
      <>
        Achieved <strong className="text-foreground font-semibold">5x inference</strong> throughput by
        migrating from Ollama to vLLM on self-hosted NVIDIA Blackwell GPUs.
      </>,
    ],
    tags: [
      "LangGraph",
      "LlamaIndex",
      "Qdrant",
      "RabbitMQ",
      "Redis",
      "vLLM",
      "Whisper",
      "Docker",
    ],
  },
  {
    company: "Capgemini",
    role: "AI Software Engineer",
    period: "Jun 2023 — Jul 2024",
    location: "Mumbai, India",
    logo: "/CAPG.png",
    highlights: [
      "Engineered on-prem Generative AI assistant for aircraft maintenance engineers using LangChain. Built RAG system indexing thousands of technical documents, reducing issue resolution time by 25%.",
      "Trained pix2pix GAN for masked face reconstruction (90% accuracy on internal benchmark).",
      "Built real-time conversational deepfake bot with synchronized video and audio as client-facing GenAI demo.",
    ],
    tags: ["LangChain", "RAG", "pix2pix", "Python", "Generative AI"],
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
                          <span className="min-w-0">{h}</span>
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
