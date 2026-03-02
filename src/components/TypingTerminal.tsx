import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const lines = [
  { prefix: "tanvi@dev:~$", text: "cat skills.json", delay: 80 },
  { prefix: "", text: '{ "ml": ["PyTorch", "TensorFlow", "GANs", "RAG"],' , delay: 40 },
  { prefix: "", text: '  "llms": ["GPT-4o", "Mistral", "Llama 2"],' , delay: 40 },
  { prefix: "", text: '  "backend": ["Node.js", "Flask", "Docker"],' , delay: 40 },
  { prefix: "", text: '  "philosophy": "ML > GenAI hype" }', delay: 40 },
  { prefix: "tanvi@dev:~$", text: "echo $STATUS", delay: 80 },
  { prefix: "", text: "🚀 Open to opportunities in ML & AI Engineering", delay: 50 },
  { prefix: "tanvi@dev:~$", text: "", delay: 0 },
];

const TypingTerminal = () => {
  const [displayedLines, setDisplayedLines] = useState<{ prefix: string; text: string }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const typeNextChar = useCallback(() => {
    if (currentLine >= lines.length) {
      setIsTyping(false);
      return;
    }

    const line = lines[currentLine];

    if (currentChar === 0) {
      setDisplayedLines((prev) => [...prev, { prefix: line.prefix, text: "" }]);
    }

    if (currentChar < line.text.length) {
      setDisplayedLines((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          prefix: line.prefix,
          text: line.text.slice(0, currentChar + 1),
        };
        return updated;
      });
      setCurrentChar((c) => c + 1);
    } else {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }
  }, [currentLine, currentChar]);

  useEffect(() => {
    if (!isTyping) return;
    const line = lines[currentLine];
    if (!line) return;
    const delay = currentChar === 0 && line.prefix ? 500 : line.delay;
    const timer = setTimeout(typeNextChar, delay);
    return () => clearTimeout(timer);
  }, [typeNextChar, isTyping, currentLine, currentChar]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-lg overflow-hidden max-w-2xl mx-auto"
    >
      {/* Terminal header */}
      <div className="terminal-header">
        <div className="w-3 h-3 rounded-full bg-destructive/70" />
        <div className="w-3 h-3 rounded-full bg-[hsl(45_100%_50%)] opacity-70" />
        <div className="w-3 h-3 rounded-full bg-[hsl(120_60%_50%)] opacity-70" />
        <span className="ml-3 font-mono text-xs text-muted-foreground terminal-header-text">tanvi@portfolio — zsh</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[220px]">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex gap-2">
            {line.prefix && (
              <span className="text-primary shrink-0">{line.prefix}</span>
            )}
            <span className={line.prefix ? "text-foreground" : "text-secondary-foreground"}>
              {line.text}
            </span>
            {i === displayedLines.length - 1 && isTyping && (
              <span className="terminal-cursor" />
            )}
          </div>
        ))}
        {!isTyping && (
          <div className="flex gap-2">
            <span className="text-primary">tanvi@dev:~$</span>
            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TypingTerminal;
