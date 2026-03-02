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
type LogoInfo =
  | { slug: string; color: string }
  | { imageUrl: string };

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
  "AWS": {
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  "Lambda": {
    imageUrl: "https://en.wikipedia.org/wiki/Special:FilePath/Amazon_Lambda_architecture_logo.svg",
  },
  "EC2": {
    imageUrl: "data:image/png;base64,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",
  },
  "S3": {
    imageUrl: "https://miro.medium.com/max/640/1*B9CIOrxdROHvtdmouQA1_A.png",
  },
  // "ECR": {
  //   imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  // },
  "CloudWatch": {
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  // "SQS SNS": {
  //   imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  // },
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
  "Redis": {
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  },
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
      // "Lambda",
      // "EC2",
      // "S3",
      // "ECR",
      // "CloudWatch",
      // "SQS SNS",
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
    ? "imageUrl" in logoInfo
      ? logoInfo.imageUrl
      : `https://cdn.simpleicons.org/${logoInfo.slug}/${logoInfo.color}`
    : null;
  const [imgError, setImgError] = useState(false);
  const showLogo = logoSrc && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-secondary/80 border border-border text-foreground font-medium text-sm hover:border-primary/40 hover:bg-secondary hover:shadow-[var(--glow-primary)] transition-all duration-300"
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
