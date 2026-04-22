import { UserPlus, HeartHandshake, Globe2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const options = [
  {
    title: "Join as a Mentor",
    desc: "Share your expertise and guide the next generation of African tech leaders. Spend as little as 2 hours a month.",
    icon: UserPlus,
    cta: "Apply to Mentor",
  },
  {
    title: "Become a Chapter Lead",
    desc: "Bring the UST community to your local city. Start a chapter, host meetups, and foster a local tech culture.",
    icon: Globe2,
    cta: "Start a Chapter",
  },
  {
    title: "Sponsor a Student",
    desc: "Change a life by providing a scholarship. 100% of your contribution goes directly to course fees and data stipends.",
    icon: HeartHandshake,
    cta: "Sponsor Now",
  },
];

const GetInvolvedSection = () => (
  <section className="py-24 bg-accent relative overflow-hidden">
    {/* Decorative abstract shapes */}
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
    </div>

    <div className="container relative z-10">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-800 text-white mb-6 tracking-tight">Ready to Make an Impact?</h2>
        <p className="text-white/80 text-lg leading-relaxed">
          The UST community grows because people like you choose to give back. Find the path that resonates with your journey and join us today.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {options.map((opt) => (
          <div key={opt.title} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl hover:bg-white/20 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-white text-accent flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
              <opt.icon size={28} />
            </div>
            <h3 className="font-display text-2xl font-700 text-white mb-4">{opt.title}</h3>
            <p className="text-white/70 leading-relaxed mb-8">
              {opt.desc}
            </p>
            <Button variant="secondary" className="w-full h-12 rounded-xl font-bold gap-2 group-hover:bg-white transition-colors">
              {opt.cta} <ArrowRight size={18} />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-20 pt-12 border-t border-white/10 text-center">
        <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10 text-white/80 text-sm">
          <span>Need more information?</span>
          <a href="#" className="font-bold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-all">Download our Community Guide</a>
        </div>
      </div>
    </div>
  </section>
);

export default GetInvolvedSection;
