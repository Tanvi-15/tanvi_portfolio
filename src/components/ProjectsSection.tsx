import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TiltCard from "./TiltCard";

const projects = [
  {
    title: "AI Roommate Finder",
    description:
      "AI clones of users autonomously negotiate roommate compatibility via WebSocket, featuring a 4-phase conversation architecture with live streaming and structured compatibility analysis.",
    tags: ["FastAPI", "WebSocket", "MongoDB", "Ollama", "Streamlit", "OAuth 2.0"],
    highlight: "Autonomous AI negotiation agents",
  },
  {
    title: "AI Virtual Garment Try-On",
    description:
      "End-to-end clothing analysis pipeline using U2NET for 4-class garment segmentation and CatVTON-Flux diffusion models, optimized for Apple Silicon (MPS) hardware acceleration.",
    tags: ["PyTorch", "Diffusers", "U2NET", "HuggingFace", "Streamlit"],
    highlight: "Diffusion-based virtual try-on",
  },
  {
    title: "Flash Sale Order Processing",
    description:
      "Event-driven backend in Golang for high-volume e-commerce using AWS SNS/SQS for async microservice communication. Serverless architecture with Lambda for automatic scaling.",
    tags: ["Docker", "SNS", "SQS", "Lambda", "Go", "Terraform"],
    highlight: "Serverless distributed systems",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{"// projects"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text inline-block">
            Things I've Built
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
              >
                <TiltCard className="glass-card rounded-lg p-6 h-full flex flex-col transition-all duration-500">
                  <div className="mb-3">
                    <span className="font-mono text-xs text-accent">▸ {project.highlight}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                  <p className="text-secondary-foreground text-sm leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="skill-tag text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
