import { Briefcase, GraduationCap, Gift } from "lucide-react";

const opportunities = [
  {
    title: "Corporate Training",
    description: "Upskill your workforce with custom-tailored tech training programs designed to meet your specific organizational needs and goals.",
    icon: Briefcase,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "STEM Programs",
    description: "Partner with us to bring high-quality tech education to high schools and youth communities, fostering the next generation of engineers.",
    icon: GraduationCap,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Sponsorship",
    description: "Sponsor talented students from underserved communities or provide resources for our bootcamps and hackathons.",
    icon: Gift,
    color: "bg-rose-500/10 text-rose-600",
  },
];

const PartnershipTypes = () => (
  <section id="partnership-types" className="py-24 bg-background">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">How to Collaborate</p>
        <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground mb-4">Partnership Opportunities</h2>
        <p className="text-muted-foreground leading-relaxed">
          We offer diverse ways for organizations to engage with UST and contribute to the growth of the tech ecosystem.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {opportunities.map((opp) => (
          <div key={opp.title} className="p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300 group">
            <div className={`w-16 h-16 rounded-2xl ${opp.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
              <opp.icon size={32} />
            </div>
            <h3 className="font-display text-2xl font-700 text-foreground mb-4">{opp.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {opp.description}
            </p>
            <div className="flex items-center gap-2 text-accent font-semibold text-sm cursor-pointer hover:gap-3 transition-all" onClick={() => document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More <span>&rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnershipTypes;
