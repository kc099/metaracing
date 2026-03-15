import Navbar from "@/components/Navbar";
import VideoTeaser from "@/components/VideoTeaser";
import HeroSection from "@/components/HeroSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import PricingSection from "@/components/PricingSection";
import LeaderboardSection from "@/components/LeaderboardSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Headphones, ShieldCheck, Star, ThumbsUp, Users } from "lucide-react";

const testimonials = [
  {
    name: "Karthik R.",
    role: "Weekend Warrior",
    text: "The motion platform completely fooled my senses. I genuinely felt every apex and every kerb. MetaRacing is insane!",
    rating: 5,
    experience: "Racing Sim",
  },
  {
    name: "Meera J.",
    role: "FPV Enthusiast",
    text: "Flying through those neon gates at full throttle in FPV goggles? Absolute madness. Best experience I've had in Bangalore.",
    rating: 5,
    experience: "FPV Arena",
  },
  {
    name: "Tanveer A.",
    role: "Corporate Team Lead",
    text: "Booked the Squad package for our team. The competitive atmosphere and leaderboard made it so engaging. Everyone loved it!",
    rating: 5,
    experience: "Squad Event",
  },
];

const whyUs = [
  { icon: Award, title: "Pro-Grade Equipment", desc: "Only the best: Fanatec wheels, RTX 4090 rigs, DJI FPV systems." },
  { icon: ShieldCheck, title: "Safety First", desc: "Full safety briefing for every session. Beginner-friendly staff on hand." },
  { icon: Headphones, title: "Expert Coaching", desc: "Our racing coaches help you find your limits and improve lap times." },
  { icon: Users, title: "Community Driven", desc: "Regular tournaments, community nights, and league racing events." },
  { icon: ThumbsUp, title: "Easy Booking", desc: "Instant online booking with flexible scheduling 7 days a week." },
  { icon: Star, title: "Loyalty Rewards", desc: "Earn MetaPoints with every session and redeem for free races." },
];

function WhyUsSection() {
  return (
    <section className="py-24 relative overflow-hidden" data-testid="section-why-us">
      <div className="absolute top-0 left-0 right-0 h-px neon-divider opacity-40" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <Badge variant="outline" className="border-primary/40 text-primary font-racing text-xs tracking-widest uppercase mb-4">
            Why MetaRacing
          </Badge>
          <h2 className="font-racing text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground mb-4">
            Built For <span className="text-primary">Champions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            We don't just offer a game — we deliver a full racing experience that pushes boundaries every time you visit.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="border-border/40 hover-elevate group" data-testid={`why-card-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-racing text-base font-bold uppercase tracking-wide text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 relative overflow-hidden" data-testid="section-testimonials">
      <div className="absolute top-0 left-0 right-0 h-px neon-divider opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="border-primary/40 text-primary font-racing text-xs tracking-widest uppercase mb-4">
            Testimonials
          </Badge>
          <h2 className="font-racing text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground mb-4">
            Hear From The <span className="text-primary">Track</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border/40 hover-elevate" data-testid={`testimonial-card-${t.name.replace(/\s/g, "-").replace(".", "").toLowerCase()}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary font-racing text-xs uppercase">
                    {t.experience}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="py-16 overflow-hidden" data-testid="section-gallery">
      <div className="absolute top-0 left-0 right-0 h-px neon-divider opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="outline" className="border-accent/40 text-accent font-racing text-xs tracking-widest uppercase mb-4">
            Gallery
          </Badge>
          <h2 className="font-racing text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground mb-4">
            The <span className="text-accent">Arena</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden aspect-square md:aspect-auto hover-elevate group">
            <img src="/images/racing-sim.png" alt="Racing Simulator Setup" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="font-racing text-sm uppercase tracking-widest text-foreground">Simulator Bay</span>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-video hover-elevate group">
            <img src="/images/fpv-arena.png" alt="FPV Arena" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="font-racing text-xs uppercase tracking-widest text-accent">FPV Arena</span>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-video hover-elevate group">
            <img src="/images/steering-wheel.png" alt="Racing Wheel" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="font-racing text-xs uppercase tracking-widest text-primary">Pro Equipment</span>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-video hover-elevate group">
            <img src="/images/hero-bg.png" alt="Racing Track" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="font-racing text-xs uppercase tracking-widest text-foreground">The Track</span>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-video hover-elevate group">
            <img src="/images/fpv-arena.png" alt="Night Racing" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="font-racing text-xs uppercase tracking-widest text-accent">Night Races</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <VideoTeaser />
      <HeroSection />
      <ExperiencesSection />
      <WhyUsSection />
      <PricingSection />
      <LeaderboardSection />
      <GallerySection />
      <TestimonialsSection />
      <BookingSection />
      <Footer />
    </div>
  );
}
