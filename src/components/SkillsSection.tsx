import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skillCategories = [
  {
    name: "AI / ML",
    icon: "🧠",
    skills: ["PyTorch", "TensorFlow", "LangChain", "LlamaIndex", "FAISS", "HuggingFace", "OpenAI", "CNN", "GANs", "RAG Pipelines"],
  },
  {
    name: "LLMs",
    icon: "🤖",
    skills: ["GPT-4o", "GPT-4 Vision", "Mistral 7B", "Llama 2", "Flan-T5-XXL", "Whisper ASR", "F5-TTS"],
  },
  {
    name: "Backend",
    icon: "⚡",
    skills: ["Node.js", "Flask", "Docker", "RabbitMQ", "Redis", "MongoDB", "PostgreSQL", "WebSocket", "AWS", "Nginx"],
  },
  {
    name: "Frontend",
    icon: "🎨",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "DevOps",
    icon: "🔧",
    skills: ["Docker", "GitHub Actions", "CI/CD", "PM2", "Self-hosted Runners"],
  },
  {
    name: "Data",
    icon: "📊",
    skills: ["Pandas", "NumPy", "Matplotlib", "Exploratory Data Analysis", "OpenSMILE"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{"// skills"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text inline-block">
            Tech Stack
          </h2>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(i)}
                className={`px-4 py-2 rounded-md font-mono text-sm transition-all duration-300 ${
                  activeCategory === i
                    ? "bg-primary/15 text-primary border border-primary/40 shadow-[0_0_12px_hsl(180_100%_50%/0.15)]"
                    : "bg-secondary text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {skillCategories[activeCategory].skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="skill-tag"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
