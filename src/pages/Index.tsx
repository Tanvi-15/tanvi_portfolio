import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Hero from "@/components/Hero";
import Career from "@/components/Career";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="flex items-center p-4">
              <SidebarTrigger />
              <span className="ml-4 font-semibold">yourname.dev</span>
            </div>
          </div>
          
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
