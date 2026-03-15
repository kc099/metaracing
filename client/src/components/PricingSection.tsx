import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Zap, Crown, Users, Star } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    category: "Both",
    price: { sim: 15, fpv: 12 },
    duration: "30 min",
    color: "border-border/50",
    accentColor: "text-muted-foreground",
    badgeColor: "bg-secondary text-secondary-foreground",
    features: [
      "30-minute session",
      "Equipment training included",
      "1 experience (Sim or FPV)",
      "Digital lap time record",
      "Locker access",
    ],
    popular: false,
  },
  {
    id: "racer",
    name: "Racer",
    icon: Star,
    category: "Both",
    price: { sim: 25, fpv: 22 },
    duration: "1 hour",
    color: "border-primary/50 glow-border-red",
    accentColor: "text-primary",
    badgeColor: "bg-primary text-primary-foreground",
    features: [
      "60-minute session",
      "Both Sim & FPV access",
      "Priority lane booking",
      "Leaderboard tracking",
      "Pit crew coaching (15 min)",
      "Free refreshments",
    ],
    popular: true,
  },
  {
    id: "champion",
    name: "Champion",
    icon: Crown,
    category: "VIP",
    price: { sim: 45, fpv: 45 },
    duration: "2 hours",
    color: "border-accent/50 glow-border-cyan",
    accentColor: "text-accent",
    badgeColor: "bg-accent text-accent-foreground",
    features: [
      "2-hour VIP session",
      "Full venue access",
      "Private coaching session",
      "Custom lap data analysis",
      "Group up to 4 people",
      "Premium lounge access",
      "Branded race report",
    ],
    popular: false,
  },
  {
    id: "group",
    name: "Squad",
    icon: Users,
    category: "Group",
    price: { sim: 18, fpv: 16 },
    duration: "Per person",
    color: "border-border/50",
    accentColor: "text-muted-foreground",
    badgeColor: "bg-secondary text-secondary-foreground",
    features: [
      "Min 5 people",
      "1.5-hour group session",
      "Team championship format",
      "Group leaderboard",
      "Team photo & video",
      "Discounted food & drinks",
    ],
    popular: false,
  },
];

export default function PricingSection() {
  const [mode, setMode] = useState<"sim" | "fpv">("sim");

  return (
    <section id="pricing" className="py-24 relative overflow-hidden" data-testid="section-pricing">
      <div className="absolute top-0 left-0 right-0 h-px neon-divider opacity-40" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none checkered-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <Badge variant="outline" className="border-primary/40 text-primary font-racing text-xs tracking-widest uppercase mb-4">
            Pricing
          </Badge>
          <h2 className="font-racing text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground mb-4">
            Race Your <span className="text-primary">Way</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed mb-8">
            Flexible packages for every type of racer — from casual speed seekers to championship contenders.
          </p>

          {/* Mode toggle */}
          <div className="inline-flex bg-card border border-border/50 rounded-md p-1 gap-1">
            <button
              onClick={() => setMode("sim")}
              data-testid="pricing-toggle-sim"
              className={`px-5 py-2 rounded-sm text-sm font-racing uppercase tracking-widest transition-all duration-200 ${
                mode === "sim" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Sim Racing
            </button>
            <button
              onClick={() => setMode("fpv")}
              data-testid="pricing-toggle-fpv"
              className={`px-5 py-2 rounded-sm text-sm font-racing uppercase tracking-widest transition-all duration-200 ${
                mode === "fpv" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              FPV Arena
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.id}
                className={`relative border ${plan.color} bg-card transition-transform duration-200`}
                data-testid={`pricing-card-${plan.id}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground font-racing text-xs tracking-widest uppercase px-3">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-2 pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-md ${plan.popular ? "bg-primary/15 border border-primary/30" : "bg-secondary border border-border/40"} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${plan.accentColor}`} />
                    </div>
                    <span className={`text-xs font-racing uppercase tracking-widest px-2 py-0.5 rounded-sm ${plan.badgeColor}`}>
                      {plan.category}
                    </span>
                  </div>

                  <div className="font-racing text-xl font-bold uppercase tracking-wide text-foreground">
                    {plan.name}
                  </div>

                  <div className="flex items-baseline gap-1 mt-2">
                    <span className={`font-racing text-4xl font-bold ${plan.accentColor}`}>
                      ${mode === "sim" ? plan.price.sim : plan.price.fpv}
                    </span>
                    <span className="text-xs text-muted-foreground">/ {plan.duration}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-4">
                  <div className="space-y-2.5 mb-6">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 text-sm" data-testid={`feature-${plan.id}-${feature.slice(0, 20).replace(/\s/g, "-").toLowerCase()}`}>
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.accentColor}`} />
                        <span className="text-muted-foreground leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full font-racing uppercase tracking-widest ${
                      plan.popular
                        ? ""
                        : plan.id === "champion"
                        ? "bg-accent text-accent-foreground"
                        : "variant-outline"
                    }`}
                    variant={plan.popular ? "default" : plan.id === "champion" ? "default" : "outline"}
                    asChild
                    data-testid={`button-select-${plan.id}`}
                  >
                    <a href="#booking">Select Plan</a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          All prices are inclusive of equipment and safety briefing.{" "}
          <a href="#booking" className="text-primary underline underline-offset-2">Contact us</a> for corporate events and custom packages.
        </p>
      </div>
    </section>
  );
}
