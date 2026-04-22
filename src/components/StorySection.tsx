import { Calendar, Users, Trophy, Globe } from "lucide-react";

const milestones = [
  {
    year: "2020",
    title: "The Vision",
    description: "UST was founded with a single mission: to make world-class tech education accessible to Africans everywhere.",
    icon: Calendar,
  },
  {
    year: "2021",
    title: "First Batch of Graduates",
    description: "Our first cohort of 50 students graduated, with 90% securing jobs in top-tier tech companies within 6 months.",
    icon: Users,
  },
  {
    year: "2022",
    title: "Expansion to 10+ Cities",
    description: "We expanded our reach, launching physical learning hubs in 10 cities across West Africa.",
    icon: Globe,
  },
  {
    year: "2023",
    title: "Recognized as Top 10 Tech School",
    description: "UST was recognized as one of the top 10 fastest-growing tech schools in the region.",
    icon: Trophy,
  },
];

const StorySection = () => (
  <section className="py-20 bg-background overflow-hidden">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Our Journey</p>
        <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground mb-4">Building a Legacy of Excellence</h2>
        <p className="text-muted-foreground">From humble beginnings to a pan-African tech powerhouse—here is our story.</p>
      </div>

      <div className="relative">
        {/* Vertical line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border/60 -translate-x-1/2" />

        <div className="space-y-12 md:space-y-0">
          {milestones.map((m, idx) => (
            <div key={m.year} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Content */}
              <div className="flex-1 w-full md:w-auto">
                <div className={`p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-4">{m.year}</span>
                  <h3 className="font-display text-xl font-700 text-foreground mb-3">{m.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{m.description}</p>
                </div>
              </div>

              {/* Center Icon */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/25">
                <m.icon size={20} />
              </div>

              {/* Empty space for alignment */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default StorySection;
