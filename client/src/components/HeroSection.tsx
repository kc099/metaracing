import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Flag, Zap } from "lucide-react";

function SpeedLines() {
  const lines = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((i) => (
        <div
          key={i}
          className="speed-line"
          style={{
            top: `${8 + i * 7.5}%`,
            animationDelay: `${i * 0.18}s`,
            animationDuration: `${1.6 + (i % 4) * 0.3}s`,
            width: `${30 + (i % 5) * 12}%`,
            opacity: 0.3 + (i % 3) * 0.15,
          }}
        />
      ))}
    </div>
  );
}

function CounterNumber({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 50;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center" data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}>
      <div className="font-racing text-3xl md:text-4xl font-bold text-primary glow-red">
        {count}{suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden" data-testid="section-hero">
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.png"
          alt="Racing background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        <div className="absolute inset-0 racing-grid opacity-20" />
      </div>

      {/* Speed lines overlay */}
      <SpeedLines />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-48 h-48 border-t-2 border-l-2 border-primary/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 border-b-2 border-r-2 border-accent/30 pointer-events-none" />

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-6">
            <Badge
              variant="outline"
              className="border-primary/50 text-primary font-racing tracking-widest uppercase text-xs px-3 py-1"
              data-testid="badge-tagline"
            >
              <Flag className="w-3 h-3 mr-1.5" />
              Next-Gen Gaming Zone
            </Badge>
          </div>

          <h1 className="font-racing text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none mb-4 uppercase tracking-tight">
            <span className="text-foreground glow-red block">Meta</span>
            <span className="text-primary glow-red block">Racing</span>
          </h1>

          <div className="max-w-xl mb-8">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Experience the ultimate thrill of{" "}
              <span className="text-primary font-semibold">professional racing simulators</span> and{" "}
              <span className="text-accent font-semibold">FPV drone racing</span> in one electrifying arena.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-16">
            <Button size="lg" asChild data-testid="button-hero-book">
              <a href="#booking">
                <Zap className="w-4 h-4 mr-2" />
                Book Your Session
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="button-hero-explore">
              <a href="#experiences">Explore Experiences</a>
            </Button>
          </div>

          {/* Stats row */}
          <div className="inline-flex flex-wrap gap-8 md:gap-12 bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg px-8 py-5">
            <CounterNumber end={12} label="Simulators" suffix="+" />
            <div className="w-px bg-border/50 self-stretch" />
            <CounterNumber end={500} label="Racers Weekly" suffix="+" />
            <div className="w-px bg-border/50 self-stretch hidden sm:block" />
            <CounterNumber end={8} label="FPV Tracks" />
            <div className="w-px bg-border/50 self-stretch hidden md:block" />
            <CounterNumber end={99} label="Win Rate" suffix="%" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a href="#experiences" data-testid="link-scroll-down" className="flex flex-col items-center gap-1 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
