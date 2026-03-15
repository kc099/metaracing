import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Zap, Users, Trophy, Star, Clock, Moon } from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    tag: "Single",
    price30: 249,
    priceHour: 449,
    showDualRate: true,
    borderClass: "border-border/50",
    accentClass: "text-muted-foreground",
    iconBg: "bg-secondary border-border/40",
    popular: false,
    features: [
      "Sim Racing or FPV (your choice)",
      "30 min / 1 hour session",
      "Safety gear included",
      "Equipment briefing",
      "Digital lap time record",
      "Locker access",
    ],
  },
  {
    id: "racer",
    name: "Racer",
    icon: Star,
    tag: "Premium",
    price30: 299,
    priceHour: 549,
    showDualRate: true,
    borderClass: "border-primary/50 glow-border-red",
    accentClass: "text-primary",
    iconBg: "bg-primary/15 border-primary/30",
    popular: true,
    features: [
      "Sim Racing or FPV (your choice)",
      "30 min / 1 hour session",
      "Priority track access",
      "Leaderboard tracking",
      "15-min pit crew coaching",
      "Free refreshments",
      "Dedicated support",
    ],
  },
  {
    id: "squad",
    name: "Squad",
    icon: Users,
    tag: "Group",
    price30: null,
    priceHour: 499,
    perNote: "per person · 4–6 members",
    showDualRate: false,
    borderClass: "border-accent/40 glow-border-cyan",
    accentClass: "text-accent",
    iconBg: "bg-accent/15 border-accent/30",
    popular: false,
    features: [
      "4 to 6 racers per session",
      "1-hour group session",
      "Team championship format",
      "Group leaderboard",
      "Team photo & video",
      "Discounted food & drinks",
      "Group event coordinator",
    ],
  },
  {
    id: "tournament",
    name: "Tournament",
    icon: Trophy,
    tag: "Pro · After 10PM",
    price30: null,
    priceHour: 999,
    perNote: "per session · pro racing",
    showDualRate: false,
    borderClass: "border-amber-500/50",
    accentClass: "text-amber-400",
    iconBg: "bg-amber-500/15 border-amber-500/30",
    popular: false,
    nightOnly: true,
    features: [
      "After 10 PM slots only",
      "Professional race format",
      "Full sim & FPV access",
      "Live race commentary",
      "Official timing system",
      "Winner's trophy & prize",
      "Pro coaching available",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden" data-testid="section-pricing">
      <div className="absolute top-0 left-0 right-0 h-px neon-divider opacity-40" />
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
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Flexible packages for every type of racer. All prices in INR, inclusive of equipment and safety briefing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.id}
                className={`relative border ${plan.borderClass} bg-card transition-transform duration-200`}
                data-testid={`pricing-card-${plan.id}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground font-racing text-xs tracking-widest uppercase px-3">
                      Most Popular
                    </Badge>
                  </div>
                )}
                {plan.nightOnly && (
                  <div className="absolute -top-3 right-3 z-10">
                    <Badge className="bg-amber-500/80 text-amber-950 font-racing text-xs uppercase px-2 flex items-center gap-1">
                      <Moon className="w-3 h-3" />
                      Night
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-2 pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-md border ${plan.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${plan.accentClass}`} />
                    </div>
                    <span className="text-xs font-racing uppercase tracking-widest text-muted-foreground">
                      {plan.tag}
                    </span>
                  </div>

                  <div className="font-racing text-xl font-bold uppercase tracking-wide text-foreground">
                    {plan.name}
                  </div>

                  {/* Price display */}
                  {plan.showDualRate ? (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className={`font-racing text-3xl font-bold ${plan.accentClass}`}>
                          ₹{plan.price30?.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />/ 30 min
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className={`font-racing text-xl font-bold ${plan.accentClass} opacity-70`}>
                          ₹{plan.priceHour?.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-muted-foreground">/ hour</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <div className="flex items-baseline gap-1">
                        <span className={`font-racing text-3xl font-bold ${plan.accentClass}`}>
                          ₹{plan.priceHour?.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-muted-foreground">/ hr</span>
                      </div>
                      {plan.perNote && (
                        <div className="text-xs text-muted-foreground mt-0.5">{plan.perNote}</div>
                      )}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="pt-4">
                  <div className="space-y-2.5 mb-6">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.accentClass}`} />
                        <span className="text-muted-foreground leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full font-racing uppercase tracking-widest ${
                      plan.id === "squad" ? "bg-accent text-accent-foreground" :
                      plan.id === "tournament" ? "bg-amber-500 text-amber-950" : ""
                    }`}
                    variant={plan.popular ? "default" : plan.id === "squad" || plan.id === "tournament" ? "default" : "outline"}
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
          All prices include equipment, safety gear, and briefing. Tournament slots only available after 10 PM.{" "}
          <a href="#booking" className="text-primary underline underline-offset-2">Contact us</a> for corporate & custom packages.
        </p>
      </div>
    </section>
  );
}
