import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "ML/AI",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face", "LangChain", "OpenAI API"]
  },
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL"]
  },
  {
    title: "Backend & APIs",
    skills: ["FastAPI", "Node.js", "REST", "GraphQL", "PostgreSQL", "Redis"]
  },
  {
    title: "DevOps & Cloud",
    skills: ["Docker", "AWS", "Git", "CI/CD", "Linux"]
  }
];

const Skills = () => {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-foreground">
          Skills
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill}
                    variant="secondary"
                    className="bg-secondary hover:bg-primary/10 border border-border transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
