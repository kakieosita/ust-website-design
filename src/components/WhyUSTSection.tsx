import { Award, Users, Globe, TrendingUp } from "lucide-react";

const reasons = [
  { icon: Users, stat: "5,000+", title: "Students Trained", desc: "Empowering the next generation of African tech talent." },
  { icon: Award, stat: "95%", title: "Job Placement", desc: "Graduates secure roles within 6 months of completion." },
  { icon: Globe, stat: "12+", title: "Countries Reached", desc: "Our alumni work across Africa and globally." },
  { icon: TrendingUp, stat: "50+", title: "Industry Partners", desc: "Collaborations with leading tech companies." },
];

const WhyUSTSection = () => (
  <section id="why-ust" className="py-20 md:py-28 bg-primary">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Why Choose UST</p>
        <h2 className="font-display text-3xl md:text-4xl font-800 text-primary-foreground">Built for Impact</h2>
        <p className="mt-4 text-primary-foreground/70">We combine rigorous curricula with real-world projects and mentorship.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r) => (
          <div key={r.title} className="text-center p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <r.icon className="text-accent" size={26} />
            </div>
            <div className="text-3xl font-display font-800 text-primary-foreground mb-1">{r.stat}</div>
            <h3 className="font-display font-700 text-primary-foreground mb-1">{r.title}</h3>
            <p className="text-sm text-primary-foreground/60">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUSTSection;
