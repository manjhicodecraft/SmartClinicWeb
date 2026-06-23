import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Plus, Sun, Moon, Phone } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "glass border-border/40 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5 stroke-[3]" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight">EliteCare</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {["Home", "About", "Services", "Doctors", "Testimonials"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <Button 
            className="hidden sm:flex rounded-full gap-2 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:animate-none"
            variant="destructive"
            onClick={() => window.location.href = "tel:+919999999999"}
          >
            <Phone className="w-4 h-4" />
            <span className="font-semibold">Emergency</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
