import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const education = [
  {
    school: "Northeastern University",
    degree: "Master of Science, Computer Science",
    period: "Aug 2024 — May 2026",
    location: "Boston, MA",
    detail: "Khoury College of Computer Science",
  },
  {
    school: "KJ Somaiya College of Engineering",
    degree: "Bachelor of Engineering, Computer Engineering",
    period: "2020 — 2024",
    location: "Mumbai, India",
  },
];

const certifications = [
  "Deep Neural Networks with PyTorch",
  "Foundations of Cybersecurity",
  "Introduction to Quantum Information",
  "UX Design: From Concept to Prototype",
  "Exploratory Data Analysis for ML",
];

const EducationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{"// education"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text inline-block">
            Education & Certs
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2 }}
                className="glass-card rounded-lg p-6 transition-all duration-500"
              >
                <h3 className="text-xl font-bold text-foreground mb-1">{edu.school}</h3>
                <p className="text-primary font-mono text-sm mb-2">{edu.degree}</p>
                {edu.detail && <p className="text-secondary-foreground text-sm mb-2">{edu.detail}</p>}
                <p className="text-muted-foreground font-mono text-xs">
                  {edu.period} · {edu.location}
                </p>
              </motion.div>
            ))}
          </div>

          <h3 className="font-mono text-primary text-sm mb-4">{"// certifications"}</h3>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <span key={cert} className="skill-tag">
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
