import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-12 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Get in Touch
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-foreground/90 mb-8 leading-relaxed">
              I'm always interested in hearing about new opportunities, collaborations, or just connecting 
              with fellow engineers. Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-foreground/80">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:tanvideshpandedc@gmail.com" className="hover:text-primary transition-colors">
                  tanvideshpandedc@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-3 text-foreground/80">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Boston, MA</span>
              </div>
              
              <div className="flex items-center gap-3 text-foreground/80">
                <Github className="h-5 w-5 text-primary" />
                {/* <a href="https://github.com/Tanvi-15" className="hover:text-primary transition-colors"> */}
                <a href="https://github.com/Tanvi-15" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  github.com/Tanvi-15
                </a>
              </div>
              
              <div className="flex items-center gap-3 text-foreground/80">
                <Linkedin className="h-5 w-5 text-primary" />
                <a href="https://www.linkedin.com/in/tanvi-deshpande-9046b620a/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  linkedin.com/in/tanvi-deshpande-9046b620a/
                </a>
              </div>
            </div>
            
            {/* <div className="mt-8">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </div> */}
          </div>
          
          {/* <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-foreground">Quick Message</h3>
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <textarea 
                  rows={4}
                  placeholder="Your Message" 
                  className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Send Message
              </Button>
            </form>
          </div> */}
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Tanvi Deshpande. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
