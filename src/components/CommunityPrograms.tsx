import { Users, Code2, GraduationCap, Laptop } from "lucide-react";

const programs = [
  {
    title: "Alumni Network",
    desc: "A global network of UST graduates supporting each other through job referrals, technical mentorship, and industry insights.",
    icon: Users,
    stats: "5,000+ Members",
  },
  {
    title: "Mentorship Lab",
    desc: "One-on-one guidance from industry veterans to help students navigate their first steps in the tech world with confidence.",
    icon: GraduationCap,
    stats: "200+ Active Mentors",
  },
  {
    title: "Open Source Hub",
    desc: "Collaborate on real-world projects and build your public portfolio while contributing to tools that matter to our community.",
    icon: Code2,
    stats: "50+ Active Projects",
  },
  {
    title: "Tech Hub Chapters",
    desc: "Localized community chapters in cities across West Africa, hosting meetups, study groups, and networking events.",
    icon: Laptop,
    stats: "15 Cities Reached",
  },
];

const CommunityPrograms = () => (
  <section className="py-24 bg-background">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Our Pillars</p>
        <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground mb-4">Core Community Programs</h2>
        <p className="text-muted-foreground">We build frameworks that empower every member to grow, contribute, and lead.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {programs.map((program) => (
          <div key={program.title} className="p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shrink-0">
                <program.icon size={32} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-display text-2xl font-700 text-foreground">{program.title}</h3>
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-tight">
                    {program.stats}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {program.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CommunityPrograms;
