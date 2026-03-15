import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experiences", href: "#experiences" },
  { label: "Pricing", href: "#pricing" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Contact", href: "#booking" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["home", "experiences", "pricing", "leaderboard", "booking"];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 flex-shrink-0" data-testid="link-logo">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-primary rounded-sm rotate-45 animate-pulse-glow" />
              <Zap className="relative z-10 w-8 h-8 text-primary-foreground p-1" />
            </div>
            <span className="font-racing text-xl font-bold tracking-widest uppercase glow-red text-foreground">
              Meta<span className="text-primary">Racing</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 flex-wrap">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                className={`px-4 py-2 text-sm font-medium tracking-wider uppercase transition-colors rounded-md relative group ${
                  activeSection === link.href.replace("#", "")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-300 ${
                    activeSection === link.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Button size="sm" asChild data-testid="button-book-now">
              <a href="#booking">Book Now</a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border/50" data-testid="mobile-menu">
          <div className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                className="px-4 py-3 text-sm font-medium tracking-wider uppercase text-muted-foreground border border-border/40 rounded-md"
              >
                {link.label}
              </a>
            ))}
            <Button className="mt-2 w-full" asChild data-testid="button-mobile-book">
              <a href="#booking">Book Now</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
