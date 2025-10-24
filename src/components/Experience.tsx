const experiences = [
  {
    title: "Software Engineer",
    company: "Company Name",
    period: "2022 - Present",
    description: [
      "Built and deployed ML models for production applications",
      "Developed generative AI features using LLMs",
      "Optimized model inference pipelines for scalability"
    ]
  },
  {
    title: "ML Engineer",
    company: "Previous Company",
    period: "2020 - 2022",
    description: [
      "Developed computer vision models for image classification",
      "Built data pipelines for model training",
      "Worked on NLP projects for text analysis"
    ]
  }
];

const Experience = () => {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-foreground">
          Experience
        </h2>
        
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                <span className="text-sm text-muted-foreground">{exp.period}</span>
              </div>
              <p className="text-primary mb-3">{exp.company}</p>
              <ul className="space-y-2 text-foreground/90">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-sm leading-relaxed">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
