import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Monitor, Radio, Trophy, Clock, Users, Cpu,
  ChevronRight, Gauge, Wind, Shield, Target
} from "lucide-react";

const simulatorFeatures = [
  { icon: Monitor, label: "Triple 4K Monitors", desc: "Ultra-wide curved display setup for maximum immersion" },
  { icon: Gauge, label: "Force Feedback Wheel", desc: "Professional-grade Fanatec steering with true road feel" },
  { icon: Cpu, label: "RTX 4090 Powered", desc: "Latest GPU tech for photorealistic graphics at 144Hz" },
  { icon: Shield, label: "Motion Platform", desc: "6-axis motion simulator replicating real G-forces" },
];

const fpvFeatures = [
  { icon: Radio, label: "FPV Goggles", desc: "DJI O3 digital FPV goggles with ultra-low latency" },
  { icon: Wind, label: "Custom RC Drones", desc: "5-inch freestyle and racing quads tuned for performance" },
  { icon: Target, label: "Pro-Designed Track", desc: "Gates, flags, and obstacles across 3 difficulty levels" },
  { icon: Users, label: "Multiplayer Races", desc: "Up to 8 pilots competing simultaneously on track" },
];

function FeatureCard({ icon: Icon, label, desc }: { icon: any; label: string; desc: string }) {
  return (
    <div className="flex gap-3 p-3 rounded-md border border-border/40 hover-elevate" data-testid={`feature-card-${label.toLowerCase().replace(/\s/g, "-")}`}>
      <div className="flex-shrink-0 w-9 h-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

export default function ExperiencesSection() {
  const [activeTab, setActiveTab] = useState<"sim" | "fpv">("sim");

  return (
    <section id="experiences" className="py-24 relative overflow-hidden" data-testid="section-experiences">
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 h-px neon-divider opacity-40" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <Badge variant="outline" className="border-primary/40 text-primary font-racing text-xs tracking-widest uppercase mb-4">
            Our Experiences
          </Badge>
          <h2 className="font-racing text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground mb-4">
            Choose Your <span className="text-primary">Arena</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Two heart-pounding experiences under one roof. Whether you're on four wheels or first-person airborne, MetaRacing has your thrill covered.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-card border border-border/50 rounded-md p-1 gap-1">
            <button
              onClick={() => setActiveTab("sim")}
              data-testid="tab-racing-sim"
              className={`px-5 py-2 rounded-sm text-sm font-racing uppercase tracking-widest transition-all duration-200 ${
                activeTab === "sim"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Racing Sim
            </button>
            <button
              onClick={() => setActiveTab("fpv")}
              data-testid="tab-fpv-arena"
              className={`px-5 py-2 rounded-sm text-sm font-racing uppercase tracking-widest transition-all duration-200 ${
                activeTab === "fpv"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              }`}
            >
              FPV Arena
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "sim" && (
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="relative rounded-lg overflow-hidden aspect-video glow-border-red">
                <img
                  src="/images/racing-sim.png"
                  alt="Racing Simulator setup"
                  className="w-full h-full object-cover"
                  data-testid="img-racing-sim"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-primary text-primary-foreground font-racing text-xs tracking-widest uppercase">
                    <Trophy className="w-3 h-3 mr-1.5" />
                    Pro Grade Equipment
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-racing text-3xl font-bold uppercase tracking-tight text-foreground mb-2">
                Racing <span className="text-primary">Simulator</span>
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Strap into our professional-grade racing simulators and feel every corner, kerb, and overtake. With full motion platforms and force-feedback wheels, it's as close to real motorsport as you can get.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {simulatorFeatures.map((f) => (
                  <FeatureCard key={f.label} {...f} />
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  Sessions from 30 min
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  Solo & group racing
                </div>
              </div>

              <Button className="mt-6" asChild data-testid="button-book-sim">
                <a href="#booking">
                  Book Simulator
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        )}

        {activeTab === "fpv" && (
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="relative rounded-lg overflow-hidden aspect-video glow-border-cyan">
                <img
                  src="/images/fpv-arena.png"
                  alt="FPV RC Arena"
                  className="w-full h-full object-cover"
                  data-testid="img-fpv-arena"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-accent text-accent-foreground font-racing text-xs tracking-widest uppercase">
                    <Radio className="w-3 h-3 mr-1.5" />
                    FPV Experience
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-racing text-3xl font-bold uppercase tracking-tight text-foreground mb-2">
                FPV <span className="text-accent">RC Arena</span>
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Pilot custom FPV racing drones through our purpose-built arena. See through your drone's eyes with ultra-low latency goggles as you navigate gates, arches, and obstacles at full throttle.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {fpvFeatures.map((f) => (
                  <FeatureCard key={f.label} {...f} />
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-accent" />
                  Sessions from 30 min
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-accent" />
                  Up to 8 pilots
                </div>
              </div>

              <Button
                className="mt-6 bg-accent text-accent-foreground"
                asChild
                data-testid="button-book-fpv"
              >
                <a href="#booking">
                  Book FPV Session
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* Bottom cards overview */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <Card
            className="border-primary/20 gradient-red-to-transparent cursor-pointer group hover-elevate"
            onClick={() => setActiveTab("sim")}
            data-testid="card-sim-overview"
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-racing text-lg font-bold uppercase text-foreground">Racing Simulator</div>
                <div className="text-sm text-muted-foreground">12 pro rigs · Triple 4K · Motion platform</div>
              </div>
              <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </CardContent>
          </Card>

          <Card
            className="border-accent/20 gradient-cyan-to-transparent cursor-pointer group hover-elevate"
            onClick={() => setActiveTab("fpv")}
            data-testid="card-fpv-overview"
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                <Radio className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <div className="font-racing text-lg font-bold uppercase text-foreground">FPV RC Arena</div>
                <div className="text-sm text-muted-foreground">8 pilots · Custom tracks · DJI goggles</div>
              </div>
              <ChevronRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
