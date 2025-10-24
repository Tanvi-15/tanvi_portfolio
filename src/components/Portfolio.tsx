import { Card } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Generative AI Application",
    description: "Built an intelligent chatbot using LLMs with RAG for context-aware responses. Implemented custom embeddings and vector search for improved accuracy.",
    tags: ["Python", "LangChain", "OpenAI", "FastAPI", "PostgreSQL"],
    // image: "🤖",
    links: { github: "#", demo: "#" }
  },
  {
    title: "ML Pipeline Platform",
    description: "Developed end-to-end ML pipeline for model training, evaluation, and deployment with automated monitoring and retraining capabilities.",
    tags: ["PyTorch", "Docker", "Kubernetes", "MLflow", "AWS"],
    // image: "⚙️",
    links: { github: "#" }
  },
  {
    title: "Computer Vision System",
    description: "Real-time object detection and classification system processing video feeds with 95% accuracy at 30 FPS.",
    tags: ["TensorFlow", "OpenCV", "Python", "React", "WebSocket"],
    // image: "👁️",
    links: { github: "#", demo: "#" }
  },
  {
    title: "NLP Text Analysis Tool",
    description: "Sentiment analysis and entity recognition tool for processing customer feedback at scale.",
    tags: ["Transformers", "spaCy", "FastAPI", "Redis", "Docker"],
    // image: "📝",
    links: { github: "#" }
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Portfolio
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
          <p className="text-muted-foreground mt-4">
            Some of my recent work in ML/AI and software engineering
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <Card 
              key={idx}
              className="p-6 bg-card border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                {/* <div className="text-5xl">{project.image}</div> */}
                <div className="flex gap-2">
                  {project.links.github && (
                    <a 
                      href={project.links.github}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.links.demo && (
                    <a 
                      href={project.links.demo}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-foreground/80 mb-4 leading-relaxed text-sm">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant="secondary"
                    className="bg-secondary border border-border text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
