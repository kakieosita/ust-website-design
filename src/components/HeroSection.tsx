import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { GraduationCap, Handshake, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Students Trained" },
  { icon: GraduationCap, value: "1,200+", label: "Graduates" },
  { icon: Handshake, value: "50+", label: "Partners" },
];

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="African students learning technology in a modern classroom" width={1920} height={1080} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/75" />
    </div>

    <div className="container relative z-10 py-16 md:py-24">
      <div className="max-w-2xl space-y-6">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 leading-tight text-primary-foreground text-balance">
          Transforming Society Through Technology
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl">
          Upskill School of Technology equips young Africans with world-class digital skills to thrive in the global tech economy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Button variant="cta" size="xl">Explore Programs</Button>
          <Button variant="heroOutline" size="xl">Enroll Now</Button>
        </div>
      </div>

      {/* Floating stats */}
      <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
        {stats.map((s) => (
          <div key={s.label} className="bg-primary-foreground/10 backdrop-blur-md rounded-xl p-4 text-center border border-primary-foreground/10">
            <s.icon className="mx-auto mb-1 text-accent" size={22} />
            <div className="text-2xl font-display font-800 text-primary-foreground">{s.value}</div>
            <div className="text-xs text-primary-foreground/70">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroSection;
