import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PartnersIntro = () => (
  <section className="py-20 bg-accent/5">
    <div className="container">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 animate-fade-in-up">Collaborate with UST</p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 text-foreground mb-8 leading-tight animate-fade-in-up">
          Building the Future of <span className="text-accent underline decoration-accent/30 underline-offset-8">Global Tech Talent</span> Together
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10 animate-fade-in-up delay-100">
          UST partners with organizations, governments, and educational institutions to bridge the tech talent gap. Whether you're looking to upskill your workforce or sponsor the next generation of innovators, we have a pathway for you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
          <Button variant="cta" size="lg" className="rounded-full shadow-lg shadow-accent/20 px-8" onClick={() => document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })}>
            Partner With Us <ArrowRight className="ml-2" size={18} />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8" onClick={() => document.getElementById('partnership-types')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Opportunities
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default PartnersIntro;
