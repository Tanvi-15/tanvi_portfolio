import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Logos are loaded from Simple Icons CDN: https://cdn.simpleicons.org/
 * It’s an open-source set of brand/product icons. URL format:
 *   https://cdn.simpleicons.org/{slug}/{hexColor}
 * Slug = icon name (e.g. "python", "react"). Only add entries here for
 * skills that have a real product/tech logo; skills without an entry
 * are shown as text-only (no icon, no placeholder).
 */
type LogoInfo = { slug: string; color: string };

const skillLogoMap: Record<string, LogoInfo> = {
  "LangChain": { slug: "langchain", color: "1C7C7C" },
  "LangGraph": { slug: "langchain", color: "1C7C7C" },
  "Ollama": { slug: "ollama", color: "FFFFFF" },
  "Hugging Face": { slug: "huggingface", color: "FFD21E" },
  "TensorFlow": { slug: "tensorflow", color: "FF6F00" },
  "PyTorch": { slug: "pytorch", color: "EE4C2C" },
  "NLTK": { slug: "python", color: "3776AB" },
  "Pandas": { slug: "pandas", color: "E70488" },
  "NumPy": { slug: "numpy", color: "4DABCF" },
  "Librosa": { slug: "python", color: "3776AB" },
  "Streamlit": { slug: "streamlit", color: "FF4B4B" },
  "scikit-learn": { slug: "scikitlearn", color: "F7931E" },
  "AWS": { slug: "amazonaws", color: "FF9900" },
  "Lambda": { slug: "awslambda", color: "FF9900" },
  "EC2": { slug: "amazonaws", color: "FF9900" },
  "S3": { slug: "amazonaws", color: "FF9900" },
  "ECR": { slug: "amazonaws", color: "FF9900" },
  "CloudWatch": { slug: "amazonaws", color: "FF9900" },
  "SQS SNS": { slug: "amazonaws", color: "FF9900" },
  "CI/CD": { slug: "githubactions", color: "2088FF" },
  "Docker": { slug: "docker", color: "2496ED" },
  "Terraform": { slug: "terraform", color: "7B42BC" },
  "Git": { slug: "git", color: "F05032" },
  "Github": { slug: "github", color: "E8E8E8" },
  "RabbitMQ": { slug: "rabbitmq", color: "FF6600" },
  "Python": { slug: "python", color: "3776AB" },
  "JavaScript": { slug: "javascript", color: "F7DF1E" },
  "TypeScript": { slug: "typescript", color: "3178C6" },
  "React": { slug: "react", color: "61DAFB" },
  "Next.js": { slug: "nextdotjs", color: "FFFFFF" },
  "Express": { slug: "express", color: "E0E0E0" },
  "Flask": { slug: "flask", color: "FFFFFF" },
  "FastAPI": { slug: "fastapi", color: "009688" },
  "Go": { slug: "go", color: "00ADD8" },
  "SQL": { slug: "mysql", color: "4479A1" },
  "MongoDB": { slug: "mongodb", color: "47A248" },
  "PostgreSQL": { slug: "postgresql", color: "4169E1" },
  "MySQL": { slug: "mysql", color: "4479A1" },
  "Redis": { slug: "redis", color: "DC382D" },
};

const techStackCategories = [
  {
    title: "GENERATIVE AI",
    skills: [
      "Agentic AI",
      "vLLM",
      "MCP",
      "LangChain",
      "LangGraph",
      "RAG",
      "Ollama",
      "Hugging Face",
      "Prompt Engineering",
    ],
  },
  {
    title: "MACHINE LEARNING",
    skills: [
      "NLP",
      "TensorFlow",
      "PyTorch",
      "NLTK",
      "Pandas",
      "NumPy",
      "Librosa",
      "Streamlit",
      "Computer Vision",
      "scikit-learn",
    ],
  },
  {
    title: "LLMOPS & CLOUD",
    skills: [
      "AWS",
      "Lambda",
      "EC2",
      "S3",
      "ECR",
      "CloudWatch",
      "SQS SNS",
      "Docker",
      "CI/CD",
      "Terraform",
      "Git",
      "Github",
      "RabbitMQ",
    ],
  },
  {
    title: "PROGRAMMING & WEB",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Express",
      "Flask",
      "FastAPI",
      "Shell Scripting",
      "Go",
      "SQL",
    ],
  },
  {
    title: "DATABASES",
    skills: [
      "Vector DB (FAISS, ChromaDB)",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
    ],
  },
];

function SkillBadge({ name, index }: { name: string; index: number }) {
  const logoInfo = skillLogoMap[name];
  const logoSrc = logoInfo
    ? `https://cdn.simpleicons.org/${logoInfo.slug}/${logoInfo.color}`
    : null;
  const [imgError, setImgError] = useState(false);
  const showLogo = logoSrc && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-secondary/80 border border-border text-foreground font-medium text-sm hover:border-primary/30 hover:shadow-[0_0_12px_hsl(180_100%_50%/0.08)] transition-all duration-300"
    >
      {showLogo ? (
        <img
          src={logoSrc}
          alt=""
          className="w-5 h-5 shrink-0 object-contain"
          onError={() => setImgError(true)}
        />
      ) : null}
      <span>{name}</span>
    </motion.div>
  );
}

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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

          <div className="space-y-10">
            {techStackCategories.map((category, catIndex) => (
              <div key={category.title}>
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: catIndex * 0.08 }}
                  className="text-xs font-semibold uppercase tracking-widest text-primary/90 mb-4"
                >
                  {category.title}
                </motion.h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <SkillBadge key={skill} name={skill} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
