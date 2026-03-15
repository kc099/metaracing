import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trophy, Medal, Crown, Clock, Zap, Radio } from "lucide-react";

const simLeaderboard = [
  { rank: 1, name: "Arjun Mehta", time: "1:23.456", track: "Monza GP", sessions: 47, badge: "Champion" },
  { rank: 2, name: "Priya Sharma", time: "1:23.891", track: "Monza GP", sessions: 38, badge: "Pro" },
  { rank: 3, name: "Rahul Verma", time: "1:24.123", track: "Monza GP", sessions: 55, badge: "Elite" },
  { rank: 4, name: "Zara Khan", time: "1:24.567", track: "Spa-F", sessions: 22, badge: "Racer" },
  { rank: 5, name: "Dev Patel", time: "1:24.890", track: "Monza GP", sessions: 31, badge: "Racer" },
  { rank: 6, name: "Nisha Rao", time: "1:25.234", track: "Silverstone", sessions: 18, badge: "Rookie" },
  { rank: 7, name: "Kiran Singh", time: "1:25.678", track: "Spa-F", sessions: 12, badge: "Rookie" },
];

const fpvLeaderboard = [
  { rank: 1, name: "Sky Pilot_X", time: "0:48.23", track: "Pro Circuit", sessions: 61, badge: "Champion" },
  { rank: 2, name: "FPV_King99", time: "0:48.91", track: "Pro Circuit", sessions: 44, badge: "Pro" },
  { rank: 3, name: "DroneMaster", time: "0:49.45", track: "Pro Circuit", sessions: 39, badge: "Elite" },
  { rank: 4, name: "ZeroGravity", time: "0:50.12", track: "Speed Loop", sessions: 27, badge: "Racer" },
  { rank: 5, name: "Throttle_Q", time: "0:50.88", track: "Pro Circuit", sessions: 33, badge: "Racer" },
  { rank: 6, name: "AirRacer7", time: "0:51.33", track: "Speed Loop", sessions: 15, badge: "Rookie" },
  { rank: 7, name: "NeonDrone", time: "0:52.01", track: "Beginner", sessions: 9, badge: "Rookie" },
];

const badgeColors: Record<string, string> = {
  Champion: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Pro: "bg-primary/20 text-primary border-primary/30",
  Elite: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Racer: "bg-accent/20 text-accent border-accent/30",
  Rookie: "bg-secondary text-secondary-foreground border-border/40",
};

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-5 h-5 text-amber-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-slate-300" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-700" />;
  return <span className="font-racing text-sm text-muted-foreground w-5 text-center">{rank}</span>;
}

export default function LeaderboardSection() {
  const [tab, setTab] = useState<"sim" | "fpv">("sim");
  const data = tab === "sim" ? simLeaderboard : fpvLeaderboard;

  return (
    <section id="leaderboard" className="py-24 relative overflow-hidden" data-testid="section-leaderboard">
      <div className="absolute top-0 left-0 right-0 h-px neon-divider opacity-40" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div>
            <Badge variant="outline" className="border-primary/40 text-primary font-racing text-xs tracking-widest uppercase mb-4">
              Leaderboard
            </Badge>
            <h2 className="font-racing text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground mb-4">
              Who's On <span className="text-primary">Top?</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Every session you race, your best lap time is recorded and ranked against other MetaRacing competitors. Climb the board, claim your crown.
            </p>

            {/* Trophy display */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {data.slice(0, 3).map((entry) => (
                <Card
                  key={entry.rank}
                  className={`text-center border ${
                    entry.rank === 1
                      ? "border-amber-500/40 bg-amber-500/5"
                      : entry.rank === 2
                      ? "border-slate-400/30 bg-slate-400/5"
                      : "border-amber-700/30 bg-amber-700/5"
                  }`}
                  data-testid={`podium-card-${entry.rank}`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-center mb-2">
                      <RankIcon rank={entry.rank} />
                    </div>
                    <div className="font-racing text-xs font-bold uppercase text-foreground truncate">{entry.name.split(" ")[0]}</div>
                    <div className="font-mono text-xs text-primary mt-1">{entry.time}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                Updated in real-time
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Trophy className="w-4 h-4 text-amber-400" />
                Monthly tournament prizes
              </div>
            </div>
          </div>

          {/* Right: Full table */}
          <div>
            {/* Tab */}
            <div className="flex gap-1 mb-4 bg-card border border-border/50 rounded-md p-1 w-fit">
              <button
                onClick={() => setTab("sim")}
                data-testid="leaderboard-tab-sim"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-sm text-xs font-racing uppercase tracking-widest transition-all ${
                  tab === "sim" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                <Zap className="w-3 h-3" /> Sim Racing
              </button>
              <button
                onClick={() => setTab("fpv")}
                data-testid="leaderboard-tab-fpv"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-sm text-xs font-racing uppercase tracking-widest transition-all ${
                  tab === "fpv" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                <Radio className="w-3 h-3" /> FPV Arena
              </button>
            </div>

            <Card className="border-border/50">
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="grid grid-cols-[40px_1fr_auto_auto] gap-3 text-xs font-racing uppercase tracking-widest text-muted-foreground">
                  <span>#</span>
                  <span>Pilot</span>
                  <span>Best Lap</span>
                  <span className="text-right">Rank</span>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-1">
                  {data.map((entry, i) => (
                    <div
                      key={entry.rank}
                      className={`grid grid-cols-[40px_1fr_auto_auto] gap-3 items-center p-2.5 rounded-md transition-colors ${
                        entry.rank <= 3 ? "bg-muted/30" : ""
                      } hover-elevate`}
                      data-testid={`leaderboard-row-${entry.rank}`}
                    >
                      <div className="flex justify-center">
                        <RankIcon rank={entry.rank} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{entry.name}</div>
                        <div className="text-xs text-muted-foreground">{entry.sessions} sessions · {entry.track}</div>
                      </div>
                      <div className="font-mono text-sm font-bold text-primary">{entry.time}</div>
                      <div className="flex justify-end">
                        <span className={`text-xs font-racing uppercase tracking-widest px-2 py-0.5 rounded-sm border ${badgeColors[entry.badge]}`}>
                          {entry.badge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
