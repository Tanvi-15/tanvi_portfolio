import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Users } from "lucide-react";

const stats = [
  {
    icon: Code,
    value: "3+",
    label: "Years of Experience"
  },
  {
    icon: Users,
    label: "Open Source",
    value: "Active"
  }
];

const About = () => {
  return (
    <section id="about" className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center border border-primary/20">
              <div className="text-8xl">👨‍💻</div>
            </div>
          </div>
          
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, idx) => (
                <Card key={idx} className="p-4 bg-card border-border text-center">
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
            
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Hello 👋, I'm <span className="font-semibold text-primary">Sarah</span>, a dedicated{" "}
                <span className="font-semibold">Software Engineer</span> specializing in{" "}
                <span className="font-semibold">Machine Learning and AI</span>.
              </p>
              
              <ul className="space-y-3 list-none">
                <li className="flex items-start">
                  <span className="text-primary mr-2">1.</span>
                  <span>Throughout my career, I've demonstrated a strong commitment to innovation and problem-solving in the AI/ML space.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">2.</span>
                  <span>My analytical approach helps me quickly solve complex challenges, from model architecture to production deployment.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">3.</span>
                  <span>When I'm not coding, I enjoy reading research papers, contributing to open source, and experimenting with new frameworks.</span>
                </li>
              </ul>
              
              <div className="pt-6 flex gap-4">
                <Button 
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Contact Me
                </Button>
                <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
