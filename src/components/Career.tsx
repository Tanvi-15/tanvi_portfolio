import { GraduationCap, Briefcase } from "lucide-react";

const education = [
  {
    school: "Khoury College of Computer Sciences, Northeastern University",
    degree: "Master of Science in Computer Science",
    period: "2024 - 2026",
    gpa: "3.5/4.0",
    details: ["Specialized in Machine Learning", "Distributed systems"]
  },
  {
    school: "K. J. Somaiya College of Engineering, Somaiya Vidyavihar University",
    degree: "Bachelor of Engineering in Computer Science",
    period: "2020 - 2024",
    gpa: "8.78/10",
    details: ["Focus on AI and Data Science"]
  }
];

const experience = [
  {
    company: "DMSB AI Strategic Hub (DASH)",
    role: "Research Assistant Human AI Interaction Engineer",
    period: "Dec 2024 - Present",
    description: "Leading multi-agent systems and AI development",
    achievements: [
      "Led team of 4 researchers in architecting multi-agent systems with task delegation protocols, achieving 40% workflow efficiency improvement",
      "Engineered prompt optimization strategies and fine-tuned LLMs, achieving 35% enhancement in AI response accuracy",
      "Developed automated rubric creation and batch grading workflows using LangChain, processing 200+ submissions in under 30 minutes vs. 8+ hours manually",
      "Engineered a Flask based LlamaIndex RAG pipeline with HuggingFace embeddings and FAISS indexing",
      "Designed end-to-end speech feedback system integrating ASR (Whisper), Praat + Librosa prosody extraction, and local LLM feedback (Mistral-7B)"
    ]
  },
  {
    company: "Capgemini",
    role: "Data Analyst Intern",
    period: "Jan 2024 - Jun 2024",
    description: "Developing AI solutions and data analysis tools",
    achievements: [
      "Developed a Scheduler Analyzer for task queries using natural language, increasing scheduling efficiency by 10%",
      "Designed a Generative AI Assistant for aircraft engineers using RAG, reducing issue resolution time by 25%",
      "Built a real-time conversational deepfake bot, enhancing user engagement with synchronized video and audio",
      "Created an ML model using pix2pix GAN for masked criminal face detection, achieving 90% accuracy",
      "Enhanced manufacturing efficiency by 12% through real-time data analysis and ML optimization"
    ]
  },
  {
    company: "Capgemini",
    role: "Machine Learning Intern",
    period: "Jun 2023 - Aug 2023",
    description: "Focused on ML models and automation",
    achievements: [
      "Created an ML model using pix2pix GAN for masked criminal face detection, achieving 90% accuracy",
      "Enhanced manufacturing efficiency by 12% through real-time data analysis and ML optimization",
      "Automated PLC reprogramming with generative AI, reducing configuration downtime by 8 hours/week"
    ]
  },
  {
    company: "K.J.S.C.E",
    role: "Product Dev and Testing Intern",
    period: "Feb 2022 - Jul 2022",
    description: "Website development and testing",
    achievements: [
      "Improved website functionality and usability through rigorous testing and updates",
      "Developed a dynamic PHP-MySQL website, increasing user engagement by 30%"
    ]
  }
];

const Career = () => {
  return (
    <section id="career" className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Career Journey
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="space-y-16">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center text-foreground">
              <GraduationCap className="mr-3 h-6 w-6 text-primary" />
              Education
            </h3>
            
            <div className="space-y-8">
              {education.map((edu, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  
                  <div className="pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                      <h4 className="text-xl font-semibold text-foreground">{edu.school}</h4>
                      <span className="text-sm text-muted-foreground">{edu.period}</span>
                    </div>
                    <p className="text-primary mb-1">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground mb-3">GPA: {edu.gpa}</p>
                    <ul className="space-y-1">
                      {edu.details.map((detail, i) => (
                        <li key={i} className="text-sm text-foreground/80">• {detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center text-foreground">
              <Briefcase className="mr-3 h-6 w-6 text-primary" />
              Work Experience
            </h3>
            
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  
                  <div className="pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                      <h4 className="text-xl font-semibold text-foreground">{exp.company}</h4>
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                    <p className="text-primary mb-2">{exp.role}</p>
                    <p className="text-sm text-foreground/80 mb-3 italic">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-foreground/90 leading-relaxed">
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
