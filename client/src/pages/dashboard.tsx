import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User, Calendar, Clock, LogOut, Trophy, Zap, ChevronRight,
  Monitor, Radio, Users, Star
} from "lucide-react";

const experienceIcons: Record<string, any> = {
  sim: Monitor,
  fpv: Radio,
  both: Zap,
};

const planColors: Record<string, string> = {
  starter: "bg-secondary text-secondary-foreground border-border/40",
  racer: "bg-primary/15 text-primary border-primary/30",
  champion: "bg-accent/15 text-accent border-accent/30",
  squad: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  tournament: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

function StatCard({ icon: Icon, label, value, color = "text-primary" }: any) {
  return (
    <Card className="border-border/40">
      <CardContent className="p-5 flex items-center gap-4">
        <div className={`w-10 h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <div className="font-racing text-2xl font-bold text-foreground">{value}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [, navigate] = useLocation();
  const { customer, logout, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !customer) {
      navigate("/login");
    }
  }, [customer, isLoading, navigate]);

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery<any[]>({
    queryKey: ["/api/customers", customer?.id, "bookings"],
    enabled: !!customer,
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isLoading || !customer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalSessions = bookings.length;
  const upcomingSessions = bookings.filter((b: any) => new Date(b.date) >= new Date()).length;

  return (
    <div className="min-h-screen bg-background" data-testid="page-dashboard">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4">
            <a href="/" className="flex items-center gap-2" data-testid="link-dashboard-home">
              <img src="/images/metaracing-logo.png" alt="MetaRacing" className="h-8 w-8 object-contain" />
              <span className="font-racing text-base font-bold tracking-widest uppercase text-foreground">
                Meta<span className="text-primary">Racing</span>
              </span>
            </a>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-primary" />
                </div>
                <span>{customer.name}</span>
              </div>
              <Button size="sm" variant="outline" onClick={handleLogout} data-testid="button-logout">
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="font-racing text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground mb-1">
            Welcome, <span className="text-primary">{customer.name.split(" ")[0]}</span>
          </h1>
          <p className="text-muted-foreground">Track your races, manage bookings, and view your performance.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard icon={Calendar} label="Total Sessions" value={totalSessions} />
          <StatCard icon={Clock} label="Upcoming" value={upcomingSessions} color="text-accent" />
          <StatCard icon={Trophy} label="Best Rank" value={totalSessions > 0 ? "#4" : "—"} color="text-amber-400" />
          <StatCard icon={Star} label="MetaPoints" value={totalSessions * 50} color="text-purple-400" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Booking history */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-racing text-lg font-bold uppercase tracking-wide text-foreground">
                My Bookings
              </h2>
              <Button size="sm" asChild data-testid="button-book-new">
                <a href="/#booking">
                  <Zap className="w-3.5 h-3.5 mr-1.5" />
                  Book New Session
                </a>
              </Button>
            </div>

            {bookingsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-md" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <Card className="border-border/40 border-dashed">
                <CardContent className="p-10 flex flex-col items-center text-center gap-3">
                  <Calendar className="w-10 h-10 text-muted-foreground/40" />
                  <div>
                    <p className="font-semibold text-foreground">No sessions yet</p>
                    <p className="text-sm text-muted-foreground">Book your first MetaRacing experience</p>
                  </div>
                  <Button size="sm" asChild>
                    <a href="/#booking">Book Now</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking: any) => {
                  const ExpIcon = experienceIcons[booking.experience] || Zap;
                  return (
                    <Card key={booking.id} className="border-border/40 hover-elevate" data-testid={`booking-row-${booking.id}`}>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                          <ExpIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm text-foreground capitalize">{booking.experience} Session</span>
                            <span className={`text-xs font-racing uppercase tracking-widest px-2 py-0.5 rounded-sm border ${planColors[booking.plan] || planColors.starter}`}>
                              {booking.plan}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {booking.date} · {booking.guests} guest{Number(booking.guests) > 1 ? "s" : ""}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar: Quick links + profile */}
          <div className="space-y-5">
            {/* Profile card */}
            <Card className="border-border/40">
              <CardHeader className="pb-2">
                <h3 className="font-racing text-sm uppercase tracking-widest text-foreground">Racer Profile</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{customer.name}</div>
                    <div className="text-xs text-muted-foreground">{customer.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-primary/30 text-primary font-racing text-xs uppercase">
                    <Trophy className="w-3 h-3 mr-1" />
                    Rookie Racer
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick actions */}
            <Card className="border-border/40">
              <CardHeader className="pb-2">
                <h3 className="font-racing text-sm uppercase tracking-widest text-foreground">Quick Actions</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { icon: Monitor, label: "Book Simulator", href: "/#booking" },
                  { icon: Radio, label: "Book FPV Session", href: "/#booking" },
                  { icon: Users, label: "Book Squad Event", href: "/#booking" },
                  { icon: Trophy, label: "View Leaderboard", href: "/#leaderboard" },
                ].map((action) => {
                  const ActionIcon = action.icon;
                  return (
                    <a
                      key={action.label}
                      href={action.href}
                      data-testid={`quick-action-${action.label.toLowerCase().replace(/\s/g, "-")}`}
                      className="flex items-center gap-3 p-2.5 rounded-md border border-border/30 hover-elevate group transition-colors"
                    >
                      <ActionIcon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{action.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
