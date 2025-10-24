import { Card } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "AI Project Name",
    description: "Built a generative AI application using LLMs. Implemented RAG for context-aware responses.",
    tags: ["Python", "LangChain", "OpenAI", "FastAPI"],
    links: {
      github: "#",
      demo: "#"
    }
  },
  {
    title: "ML Pipeline",
    description: "Created an end-to-end ML pipeline for model training and deployment with automated monitoring.",
    tags: ["PyTorch", "Docker", "AWS", "MLOps"],
    links: {
      github: "#"
    }
  },
  {
    title: "Computer Vision App",
    description: "Developed an image classification system using deep learning with real-time inference.",
    tags: ["TensorFlow", "Python", "React", "REST API"],
    links: {
      github: "#",
      demo: "#"
    }
  }
];

const Projects = () => {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-foreground">
          Projects
        </h2>
        
        <div className="grid gap-6">
          {projects.map((project, idx) => (
            <Card 
              key={idx}
              className="p-6 bg-card border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
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
              
              <p className="text-foreground/90 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 text-xs bg-secondary border border-border rounded text-foreground/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
