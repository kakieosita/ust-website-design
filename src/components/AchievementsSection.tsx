const stats = [
  { label: "Graduates", value: "5,000+", suffix: "Professionals Trained" },
  { label: "Courses", value: "25+", suffix: "Industry-Ready Programs" },
  { label: "Partners", value: "120+", suffix: "Hiring Organizations" },
  { label: "Reach", value: "10+", suffix: "West African Cities" },
];

const AchievementsSection = () => (
  <section className="py-20 bg-background relative overflow-hidden">
    {/* Decorative background element */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10" />

    <div className="container">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <h3 className="font-display text-4xl md:text-5xl font-800 text-accent mb-2 tracking-tight">
              {stat.value}
            </h3>
            <p className="text-lg font-700 text-foreground mb-1">{stat.label}</p>
            <p className="text-sm text-muted-foreground">{stat.suffix}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AchievementsSection;
