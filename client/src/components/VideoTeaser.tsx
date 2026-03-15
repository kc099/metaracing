import { useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VideoTeaser() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "56.25vw", maxHeight: "85vh", minHeight: "320px" }} data-testid="section-video-teaser">
      {/* Video */}
      <video
        ref={videoRef}
        src="/images/metaracing-teaser.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="video-teaser"
      />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 pointer-events-none" />

      {/* Top-left branding overlay */}
      <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-6 md:p-10">
        <div className="flex items-center gap-3">
          <img
            src="/images/metaracing-logo.png"
            alt="MetaRacing"
            className="h-14 w-14 md:h-20 md:w-20 object-contain drop-shadow-lg"
            data-testid="img-teaser-logo"
          />
          <div>
            <div className="font-racing text-2xl md:text-4xl font-bold uppercase text-foreground tracking-widest glow-red leading-none">
              Meta<span className="text-primary">Racing</span>
            </div>
            <div className="font-racing text-xs md:text-sm uppercase tracking-widest text-accent mt-1">
              Simulator · FPV Arena · Bangalore
            </div>
          </div>
        </div>

        <Badge
          variant="outline"
          className="border-primary/60 text-primary font-racing text-xs tracking-widest uppercase hidden sm:flex animate-neon-pulse"
        >
          Now Open
        </Badge>
      </div>

      {/* Bottom controls + CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between">
        <div>
          <p className="font-racing text-base md:text-xl uppercase tracking-widest text-foreground/80 mb-3">
            Where <span className="text-primary">Speed</span> Meets <span className="text-accent">Reality</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="sm" asChild data-testid="button-teaser-book">
              <a href="#booking">Book Your Session</a>
            </Button>
            <Button size="sm" variant="outline" asChild data-testid="button-teaser-explore">
              <a href="#experiences">Explore Experiences</a>
            </Button>
          </div>
        </div>

        {/* Video controls */}
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={togglePlay}
            className="bg-background/30 backdrop-blur-sm border border-white/10"
            data-testid="button-video-play-pause"
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleMute}
            className="bg-background/30 backdrop-blur-sm border border-white/10"
            data-testid="button-video-mute"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Racing speed line accents */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />
    </section>
  );
}
