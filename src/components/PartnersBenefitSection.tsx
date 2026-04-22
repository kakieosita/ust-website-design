import { CheckCircle2, TrendingUp, Users, Award, ShieldCheck } from "lucide-react";

const benefits = [
  {
    title: "Access to Top Talent",
    desc: "Get priority access to our pool of highly-skilled, industry-ready graduates across various tech stacks.",
    icon: Users,
  },
  {
    title: "Customized Training",
    desc: "Tailor our curriculum to meet your specific team requirements and technological stack.",
    icon: TrendingUp,
  },
  {
    title: "Brand Visibility",
    desc: "Feature your brand in our events, bootcamps, and digital channels reaching thousands of tech enthusiasts.",
    icon: Award,
  },
  {
    title: "CSR Impact",
    desc: "Contribute to building a more inclusive and digitally-empowered African tech ecosystem.",
    icon: ShieldCheck,
  },
];

const PartnersBenefitSection = () => (
  <section className="py-24 bg-background">
    <div className="container">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Why Partner With Us</p>
          <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground mb-6">Strategic Benefits for Your Organization</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Partnering with UST goes beyond just training. It's about building a sustainable pipeline of talent and driving innovation within your industry.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <div className="flex-shrink-0 mt-1 text-accent">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-display font-700 text-foreground mb-1">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-lg">
          <div className="relative p-8 rounded-3xl bg-accent/5 border border-accent/10">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            
            <div className="relative z-10 space-y-6">
              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <p className="text-sm text-muted-foreground mb-4">"UST has been instrumental in helping us source and train our junior developers. The quality of graduates is exceptional."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">JD</div>
                  <div>
                    <p className="text-sm font-bold text-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">CTO, TechCorp</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm ml-8">
                <p className="text-sm text-muted-foreground mb-4">"Their STEM programs have reached over 500 students in our local community this year alone."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-600 font-bold text-xs">SA</div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Sarah Alabi</p>
                    <p className="text-xs text-muted-foreground">Foundation Lead</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PartnersBenefitSection;
