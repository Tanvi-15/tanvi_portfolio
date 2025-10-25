import { Home, User, Briefcase, Code, Mail, ChevronLeft } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Home", icon: Home, href: "#home" },
  { title: "About Me", icon: User, href: "#about" },
  { title: "Career", icon: Briefcase, href: "#career" },
  { title: "Portfolio", icon: Code, href: "#portfolio" },
  { title: "Contact Me", icon: Mail, href: "#contact" },
];

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <div className="w-16 h-16">
              <img 
                src="/resources/TD.png" 
                alt="TD" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* <h2 className="text-sm font-semibold text-foreground">tanvi.dev</h2> */}
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-primary/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        
        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => scrollToSection(item.href)}
                    className="hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
      </SidebarContent>
    </Sidebar>
  );
}
