import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";

type OutputLine = {
  text: string;
  type: "command" | "output" | "error" | "heading" | "tag";
};

const COMMANDS: Record<string, () => OutputLine[]> = {
  help: () => [
    { text: "Available commands:", type: "heading" },
    { text: "  whoami        — Who is Tanvi?", type: "output" },
    { text: "  experience    — Where I've worked", type: "output" },
    { text: "  skills        — My tech stack", type: "output" },
    { text: "  education     — Degrees & certifications", type: "output" },
    { text: "  projects      — Things I've built", type: "output" },
    { text: "  contact       — Get in touch", type: "output" },
    { text: "  clear         — Clear terminal", type: "output" },
    { text: "  help          — Show this menu", type: "output" },
  ],
  whoami: () => [
    { text: "┌─── TANVI DESHPANDE ───────────────────────────┐", type: "heading" },
    { text: "│  AI/ML Software Engineer · MSCS @ Northeastern", type: "output" },
    { text: "│", type: "output" },
    { text: "│  I believe GenAI without ML is just a chatbot —", type: "output" },
    { text: "│  real impact lives at that intersection.", type: "output" },
    { text: "│", type: "output" },
    { text: "│  I build agentic, RAG-based, and multimodal", type: "output" },
    { text: "│  systems with cross-functional teams, turning", type: "output" },
    { text: "│  complex AI into solutions researchers, faculty,", type: "output" },
    { text: "│  and clients actually use.", type: "output" },
    { text: "│", type: "output" },
    { text: "│  GenAI is a tool. ML is the foundation.", type: "heading" },
    { text: "│  I build on foundations.", type: "output" },
    { text: "│", type: "output" },
    { text: "│  📧 tanvideshpandedc@gmail.com", type: "output" },
    { text: "│  🔗 linkedin.com/in/tanvideshpande1505", type: "output" },
    { text: "│  💻 github.com/Tanvi-15", type: "output" },
    { text: "└───────────────────────────────────────────────┘", type: "heading" },
  ],
  experience: () => [
    { text: "═══ PROFESSIONAL EXPERIENCE ═══", type: "heading" },
    { text: "", type: "output" },
    { text: "▸ DMSB AI Strategic Hub (DASH) — Boston, MA", type: "heading" },
    { text: "  AI/ML Software Engineer · Jan 2025 – Present", type: "output" },
    { text: "  • Architected GenAI grading solution with LangGraph agents — 95% time saved", type: "output" },
    { text: "  • Engineered RAG pipeline (HuggingFace + Qdrant) over 30+ PDFs", type: "output" },
    { text: "  • Optimized GPU inference with vLLM on NVIDIA Blackwell — 5x throughput", type: "output" },
    { text: "  • Launched PresBot: AI Voice coach (F5-TTS, Whisper) for 80+ presentations", type: "output" },
    { text: "  • Deployed via Nginx + GitHub Actions CI/CD — 70% faster deployments", type: "output" },
    { text: "", type: "output" },
    { text: "▸ Capgemini — Mumbai, India", type: "heading" },
    { text: "  Data Analyst Intern · Jun 2023 – Jul 2024", type: "output" },
    { text: "  • Delivered GenAI PoC solutions for 5+ client stakeholders", type: "output" },
    { text: "  • Built AI Assistant for aircraft engineers — 25% faster troubleshooting", type: "output" },
    { text: "  • Used LangChain + Mistral-8x7B with RAG over 1TB+ technical data", type: "output" },
  ],
  skills: () => [
    { text: "═══ TECHNICAL SKILLS ═══", type: "heading" },
    { text: "", type: "output" },
    { text: "▸ Generative AI", type: "heading" },
    { text: "  Agentic AI · vLLM · MCP · LangChain · LangGraph · RAG · Ollama · HuggingFace · Prompt Engineering", type: "tag" },
    { text: "", type: "output" },
    { text: "▸ Machine Learning", type: "heading" },
    { text: "  NLP · TensorFlow · PyTorch · NLTK · Pandas · NumPy · Librosa · Streamlit · Computer Vision · scikit-learn", type: "tag" },
    { text: "", type: "output" },
    { text: "▸ LLMOps & Cloud", type: "heading" },
    { text: "  AWS · Lambda · EC2 · S3 · ECR · CloudWatch · SQS/SNS · Docker · CI/CD · Terraform · RabbitMQ", type: "tag" },
    { text: "", type: "output" },
    { text: "▸ Programming & Web", type: "heading" },
    { text: "  Python · JavaScript · TypeScript · React · Next.js · Express · Flask · FastAPI · Go · SQL", type: "tag" },
    { text: "", type: "output" },
    { text: "▸ Databases", type: "heading" },
    { text: "  FAISS · ChromaDB · MongoDB · PostgreSQL · MySQL · Redis", type: "tag" },
  ],
  education: () => [
    { text: "═══ EDUCATION ═══", type: "heading" },
    { text: "", type: "output" },
    { text: "▸ Northeastern University — Boston, MA", type: "heading" },
    { text: "  Master of Science, Computer Science (GPA: 3.6/4.0)", type: "output" },
    { text: "  Aug 2024 – Present", type: "output" },
    { text: "", type: "output" },
    { text: "▸ Somaiya Vidyavihar University — Mumbai, India", type: "heading" },
    { text: "  Bachelor of Engineering, Computer Engineering (GPA: 8.74/10)", type: "output" },
    { text: "  Aug 2020 – Jun 2024", type: "output" },
    { text: "", type: "output" },
    { text: "═══ CERTIFICATIONS ═══", type: "heading" },
    { text: "  • Deep Neural Networks with PyTorch", type: "output" },
    { text: "  • Foundations of Cybersecurity", type: "output" },
    { text: "  • Introduction to Quantum Information", type: "output" },
    { text: "  • UX Design: From Concept to Prototype", type: "output" },
    { text: "  • Exploratory Data Analysis for ML", type: "output" },
  ],
  projects: () => [
    { text: "═══ PROJECTS ═══", type: "heading" },
    { text: "", type: "output" },
    { text: "▸ AI Roommate Finder", type: "heading" },
    { text: "  FastAPI · WebSocket · MongoDB · Ollama · Streamlit", type: "tag" },
    { text: "  AI clones of users autonomously negotiate roommate compatibility", type: "output" },
    { text: "  via WebSocket with 4-phase conversation architecture,", type: "output" },
    { text: "  live streaming, and OAuth 2.0 + JWT authentication.", type: "output" },
    { text: "", type: "output" },
    { text: "▸ AI Virtual Garment Try-On System", type: "heading" },
    { text: "  PyTorch · Diffusers · U2NET · HuggingFace · Streamlit", type: "tag" },
    { text: "  End-to-end clothing analysis with U2NET segmentation and", type: "output" },
    { text: "  CatVTON-Flux diffusion models, optimized for Apple Silicon.", type: "output" },
    { text: "", type: "output" },
    { text: "▸ Flash Sale Order Processing System", type: "heading" },
    { text: "  Docker · SNS · SQS · Lambda · Go · Terraform", type: "tag" },
    { text: "  Event-driven backend in Golang for high-volume e-commerce", type: "output" },
    { text: "  using AWS SNS/SQS with serverless Lambda architecture.", type: "output" },
  ],
  contact: () => [
    { text: "═══ CONTACT ═══", type: "heading" },
    { text: "", type: "output" },
    { text: "  📧  tanvideshpandedc@gmail.com", type: "output" },
    { text: "  🔗  linkedin.com/in/tanvideshpande1505", type: "tag" },
    { text: "  💻  github.com/Tanvi-15", type: "tag" },
    { text: "", type: "output" },
    { text: "  Feel free to reach out — I'd love to connect!", type: "output" },
  ],
};

const WELCOME_LINES: OutputLine[] = [
  { text: "╔══════════════════════════════════════════════════════╗", type: "heading" },
  { text: "║  Welcome to Tanvi's Terminal Portfolio  v2.0         ║", type: "heading" },
  { text: "║  Type 'help' to see available commands               ║", type: "heading" },
  { text: "╚══════════════════════════════════════════════════════╝", type: "heading" },
  { text: "", type: "output" },
];

const InteractiveTerminal = () => {
  const [history, setHistory] = useState<OutputLine[]>([...WELCOME_LINES]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const commandLine: OutputLine = { text: `tanvi@dev:~$ ${cmd}`, type: "command" };

    if (trimmed === "clear") {
      setHistory([...WELCOME_LINES]);
      return;
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      setHistory((prev) => [...prev, commandLine, ...handler()]);
    } else if (trimmed === "") {
      setHistory((prev) => [...prev, commandLine]);
    } else {
      setHistory((prev) => [
        ...prev,
        commandLine,
        { text: `zsh: command not found: ${trimmed}. Type 'help' for available commands.`, type: "error" },
      ]);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setCommandHistory((prev) => [input, ...prev]);
      setHistoryIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0]);
    }
  };

  const getLineColor = (type: OutputLine["type"]) => {
    switch (type) {
      case "command": return "text-primary";
      case "heading": return "text-primary";
      case "error": return "text-destructive";
      case "tag": return "text-accent";
      default: return "text-secondary-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-lg overflow-hidden w-full"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/50 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-destructive/70" />
        <div className="w-3 h-3 rounded-full bg-[hsl(45_100%_50%)] opacity-70" />
        <div className="w-3 h-3 rounded-full bg-[hsl(120_60%_50%)] opacity-70" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">tanvi@portfolio — zsh — interactive</span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="p-5 font-mono text-sm leading-relaxed min-h-[320px] max-h-[500px] overflow-y-auto cursor-text"
      >
        {history.map((line, i) => (
          <div key={i} className={`${getLineColor(line.type)} whitespace-pre-wrap`}>
            {line.text}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-primary shrink-0">tanvi@dev:~$</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="w-full bg-transparent outline-none text-foreground font-mono text-sm caret-primary"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
