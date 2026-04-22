import { Target, Eye, Heart } from "lucide-react";

const items = [
  {
    title: "Our Mission",
    description: "To cultivate a pipeline of top-tier African tech global leaders by providing industry-aligned skills training and employment pathways.",
    icon: Target,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Our Vision",
    description: "To become the leading catalyst for digital transformation in Africa through education, innovation, and community building.",
    icon: Eye,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Our Values",
    description: "Growth Mindset, Innovation, Inclusivity, and Integrity. We believe in learning by doing and growing together.",
    icon: Heart,
    color: "bg-rose-500/10 text-rose-600",
  },
];

const MissionVisionValues = () => (
  <section className="py-20 bg-card/30 border-y border-border/50">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.title} className="p-8 rounded-2xl bg-card border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <item.icon size={28} />
            </div>
            <h3 className="font-display text-2xl font-700 text-foreground mb-4">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MissionVisionValues;
