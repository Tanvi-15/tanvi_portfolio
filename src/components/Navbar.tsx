import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16 flex items-center justify-between">
        <a href="#" className="font-mono text-lg font-bold text-primary glow-text">
          {"<TD />"}
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border font-mono text-xs font-semibold transition-all duration-300 hover:scale-105"
            style={{
              borderColor: "hsl(var(--primary) / 0.3)",
              color: "hsl(var(--primary))",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(var(--primary) / 0.7)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--glow-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(var(--primary) / 0.3)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            {theme === "dark" ? (
              <>
                <Sun size={14} />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon size={14} />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
