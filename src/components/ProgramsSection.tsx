import { useState, useEffect } from "react";
import { Code, Briefcase, Shield, Database, Cpu, BarChart3, ArrowRight, Loader2 } from "lucide-react";
import { firestoreService } from "@/lib/firebase/services";
import { Program } from "@/types/firestore";

const iconMap: Record<string, any> = {
  "Corporate Tech Upskilling": Briefcase,
  "Full-Stack Web Dev": Code,
  "Cybersecurity Ops": Shield,
  "default": Database
};

const ProgramsSection = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await firestoreService.getAll<Program>("programs");
        setPrograms(data);
      } catch (error) {
        console.error("Failed to load programs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <section id="programs" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Our Programs</p>
          <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground">World-Class Tech Education</h2>
          <p className="mt-4 text-muted-foreground">From beginner bootcamps to advanced enterprise training — find the right path for your career.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-accent" size={40} />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p) => {
              const Icon = iconMap[p.title] || iconMap.default;
              return (
                <div key={p.id} className="group bg-card rounded-2xl p-6 shadow-sm border border-border/60 hover:shadow-lg hover:border-accent/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    {p.featuredImage ? (
                      <img src={p.featuredImage} alt={p.title} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <Icon className="text-accent" size={24} />
                    )}
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-lg font-700 text-card-foreground">{p.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/5 px-2 py-0.5 rounded-full border border-accent/10">
                      {p.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                    <span className="font-bold text-foreground">{p.price}</span>
                    <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all">
                      Enroll Now <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgramsSection;
