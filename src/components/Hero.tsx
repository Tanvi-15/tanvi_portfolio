import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const Hero = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <section id="home" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[300px,1fr] gap-8 items-center">
          <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center border border-primary/20 overflow-hidden">
            <img 
              src="/resources/Tanvi_photo.jpeg" 
              alt="Tanvi Deshpande" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          
          <div>
            <p className="text-lg text-muted-foreground mb-2 font-light">
              Hi, I am
            </p>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-2 text-foreground">
              <span className="text-primary">Tanvi D.</span>
            </h1>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-2 text-foreground">
              Software Engineer
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              ML/AI Engineer building intelligent systems
            </p>
            
            <p className="text-foreground/90 mb-6 leading-relaxed max-w-2xl">
              Hello 👋, I'm Tanvi, a dedicated Software Engineer specializing in Machine Learning, AI and Generative AI.
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle>Tanvi Deshpande - Resume</DialogTitle>
                </DialogHeader>
                
                <div className="flex flex-col gap-4">
                  {/* PDF Viewer */}
                  <iframe 
                    src="/resources/Tanvi_software.pdf" 
                    className="w-full h-[70vh] border rounded"
                    title="Resume PDF"
                  />
                  
                  {/* Download Button */}
                  <Button 
                    onClick={() => window.open('/resources/Tanvi_software.pdf', '_blank')}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
