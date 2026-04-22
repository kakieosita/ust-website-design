import { Button } from "@/components/ui/button";
import { Users2, Heart, Sparkles } from "lucide-react";

const CommunityIntro = () => (
  <section className="relative py-24 bg-card/10 overflow-hidden border-b border-border/50">
    {/* Animated background elements */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse" />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
    
    <div className="container relative z-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6 animate-fade-in-up">
        <Sparkles size={16} />
        <span>Join the UST Movement</span>
      </div>
      <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-800 text-foreground mb-8 tracking-tight animate-fade-in-up">
        A Thriving Ecosystem of <br />
        <span className="text-accent underline decoration-accent/20 underline-offset-8">Leaders & Innovators</span>
      </h1>
      <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed mb-12 animate-fade-in-up delay-100">
        Beyond education, UST is a lifelong home for those who dare to build. Connect with 10,000+ members driving digital transformation across Africa.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up delay-200">
        <Button variant="cta" size="lg" className="rounded-full px-10 h-14 text-lg">
          Join the Community
        </Button>
        <div className="flex -space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-accent/20 flex items-center justify-center text-accent font-bold">
              {String.fromCharCode(64 + i)}
            </div>
          ))}
          <div className="w-12 h-12 rounded-full border-4 border-background bg-muted flex items-center justify-center text-xs font-bold">
            +10k
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CommunityIntro;
