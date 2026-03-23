import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, ExternalLink, Github } from "lucide-react";
import TiltCard from "./TiltCard";

/** Optional `githubUrl`, `liveUrl`, `blogUrl` (e.g. ACP write-up). `liveUrlLabel` defaults to "Live site" — use "Slides" for decks. */
type ProjectLinks = {
  githubUrl?: string;
  liveUrl?: string;
  liveUrlLabel?: string;
  blogUrl?: string;
};

type ProjectItem = ProjectLinks & {
  title: string;
  highlight: string;
  description: string;
  tags: string[];
  /** Teal / ember accents match the featured pair; default matches the rest of the site. */
  variant?: "default" | "teal" | "ember";
};

const highlightClass: Record<NonNullable<ProjectItem["variant"]>, string> = {
  default: "text-accent",
  teal: "text-cyan-400",
  ember: "text-orange-400",
};

const tagClass: Record<NonNullable<ProjectItem["variant"]>, string> = {
  default: "skill-tag text-xs",
  teal: "rounded-md px-2 py-0.5 text-xs border border-cyan-500/35 text-cyan-200/90 bg-cyan-950/20",
  ember: "rounded-md px-2 py-0.5 text-xs border border-amber-400/40 text-amber-200/90 bg-amber-950/20",
};

const topBarClass: Record<NonNullable<ProjectItem["variant"]>, string> = {
  default: "",
  teal: "h-1 rounded-t-[inherit] bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-500",
  ember: "h-1 rounded-t-[inherit] bg-gradient-to-r from-red-500 via-orange-400 to-amber-300",
};

function ProjectLinksRow({ githubUrl, liveUrl, liveUrlLabel, blogUrl }: ProjectLinks) {
  const hasGithub = Boolean(githubUrl?.trim());
  const hasLive = Boolean(liveUrl?.trim());
  const hasBlog = Boolean(blogUrl?.trim());
  if (!hasGithub && !hasLive && !hasBlog) return null;

  const liveLabel = liveUrlLabel?.trim() || "Live site";

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border/60">
      {hasGithub && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-primary/25 bg-primary/5 px-2.5 py-1.5 font-mono text-xs text-primary transition-colors hover:border-primary/50 hover:bg-primary/10"
        >
          <Github className="h-3.5 w-3.5" aria-hidden />
          GitHub
        </a>
      )}
      {hasLive && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-secondary-foreground/20 bg-muted/30 px-2.5 py-1.5 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          {liveLabel}
        </a>
      )}
      {hasBlog && (
        <a
          href={blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-secondary-foreground/20 bg-muted/30 px-2.5 py-1.5 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          Blog
        </a>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  staggerIndex,
  inView,
}: {
  project: ProjectItem;
  staggerIndex: number;
  inView: boolean;
}) {
  const variant = project.variant ?? "default";
  const showTopBar = variant === "teal" || variant === "ember";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: staggerIndex * 0.08 }}
    >
      <TiltCard className="glass-card rounded-lg overflow-hidden h-full flex flex-col transition-all duration-500">
        {showTopBar && <div className={topBarClass[variant]} aria-hidden />}
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-3">
            <span className={`font-mono text-xs ${highlightClass[variant]}`}>
              ▸ {project.highlight}
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
          <p className="text-secondary-foreground text-sm leading-relaxed mb-5 flex-1">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className={tagClass[variant]}>
                {tag}
              </span>
            ))}
          </div>
          <ProjectLinksRow
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
            liveUrlLabel={project.liveUrlLabel}
            blogUrl={project.blogUrl}
          />
        </div>
      </TiltCard>
    </motion.div>
  );
}

/** Date order (newest first); dates not shown in the UI. */
const projects: ProjectItem[] = [
  {
    title: "AI Roommate Finder",
    highlight: "Autonomous AI negotiation agents",
    description:
      "AI clones of users autonomously negotiate roommate compatibility via WebSocket, featuring a 4-phase conversation architecture with live streaming and structured compatibility analysis.",
    tags: ["FastAPI", "WebSocket", "MongoDB", "Groq API", "React", "OAuth 2.0"],
    variant: "teal",
    liveUrl: "https://ai-roommate-finder.vercel.app/",
  },
  {
    title: "Agent Compatibility Protocol",
    highlight: "Custom inter-agent protocol",
    description:
      "ACP — a custom LLM communication protocol using lazy module injection and compressed message formats, achieving ~85% token reduction and dramatically increasing free-tier session capacity.",
    tags: ["Token compression", "Lazy injection", "Multi-agent", "FastAPI", "Groq API"],
    variant: "teal",
  },
  {
    title: "Outfit Assistant",
    highlight: "AI Virtual Garment Try-On",
    description:
      "End-to-end clothing analysis pipeline using U2NET for 4-class garment segmentation and CatVTON-Flux diffusion models, optimized for Apple Silicon (MPS) hardware acceleration.",
    tags: ["PyTorch", "Diffusers", "U2NET", "HuggingFace", "Streamlit"],
    variant: "teal",
  },
  {
    title: "Flash Sale Order Processing",
    highlight: "Serverless distributed systems",
    description:
      "Event-driven backend in Golang for high-volume e-commerce using AWS SNS/SQS for async microservice communication. Serverless architecture with Lambda for automatic scaling.",
    tags: ["Docker", "SNS", "SQS", "Lambda", "Go", "Terraform"],
    variant: "teal",
  },
  {
    title: "Defence Against AutoDAN-Turbo",
    highlight: "LLM security & certified robustness",
    description:
      "Non-invasive prompt interception system defending LLMs against AutoDAN-Turbo jailbreak attacks. Trained a CROWN-verified neural classifier on real jailbreak attack logs targeting hacking/cybersecurity queries, reducing successful jailbreaks on Mistral 7B from 10 to 5 out of 129 attempts.",
    tags: ["PyTorch", "CROWN", "MiniLM", "Ollama", "Mistral 7B", "NN Verification"],
    variant: "teal",
    liveUrl:
      "https://docs.google.com/presentation/d/1qXleDpYoIXy8thReP1aNQBr_dZ44fh3N2cQWnPnGTj0/edit?usp=sharing",
    liveUrlLabel: "Slides",
  },
  {
    title: "Voice Coach",
    highlight: "AI-powered speech coaching",
    description:
      "End-to-end speech feedback system using Whisper ASR, Praat & Librosa prosody extraction, and Mistral-7B for coaching. Scores Clarity, Confidence, Tone, Pacing, Engagement, Cadence & Flow with research-backed thresholds and detailed JSON reports.",
    tags: ["Whisper", "Praat", "Librosa", "Mistral-7B", "Ollama", "Streamlit"],
    variant: "teal",
    githubUrl: "https://github.com/Tanvi-15/VoiceCoach",
  },
  {
    title: "Wildfire Detection & Severity",
    highlight: "Satellite image classification",
    description:
      "Fine-tuned EfficientNet-B3 on 10K satellite images for 4-class fire severity classification at 89% accuracy. Automated labeling pipeline improved label accuracy from 70% to 95%. Inference-ready with under 50ms prediction latency per image.",
    tags: ["PyTorch", "EfficientNet-B3", "HuggingFace", "OpenCV", "scikit-learn"],
    variant: "teal",
    githubUrl: "https://github.com/Tanvi-15/CNN_Classifier_ML",
  },
  {
    title: "Code Comment Generator",
    highlight: "Sequence-to-sequence NLP",
    description:
      "Decoder-only transformer built from scratch in PyTorch to auto-generate comments and summaries for Python code. Tokenized with NLTK, trained on a custom dataset to identify code structures and produce concise, accurate documentation.",
    tags: ["Python", "PyTorch", "NLTK"],
    variant: "teal",
    githubUrl: "https://github.com/Tanvi-15/Code_summarizer",
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
              <ProjectCard
                key={project.title}
                project={project}
                staggerIndex={i}
                inView={inView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
