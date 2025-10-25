import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Hero from "@/components/Hero";
import Career from "@/components/Career";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const DesktopSidebarTrigger = () => {
  const { state } = useSidebar();
  
  // Only show when sidebar is collapsed
  if (state !== "collapsed") return null;
  
  return (
    <div className="hidden lg:block fixed top-4 left-4 z-50">
      <SidebarTrigger className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border hover:bg-primary/10 hover:text-primary transition-colors shadow-lg" />
    </div>
  );
};

const Index = () => {
  const scrollProgress = useScrollProgress();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <div className="relative z-30 bg-background">
          <AppSidebar />
        </div>
        
        <main className="flex-1 overflow-y-auto relative z-10">
          <ParticlesBackground opacity={0.2} />
          
          <div className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="flex items-center p-4">
              <SidebarTrigger />
              <span className="ml-4 font-semibold">yourname.dev</span>
            </div>
          </div>
          
          <DesktopSidebarTrigger />
          
          <Hero />
          <Career />
          <Portfolio />
          <Contact />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
