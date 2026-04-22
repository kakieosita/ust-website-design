import { FileDown, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  {
    year: "2023",
    title: "Annual Impact Report",
    desc: "A comprehensive look at our reach, graduate employment rates, and community growth throughout the fiscal year.",
    icon: BarChart3,
    size: "4.2 MB",
  },
  {
    year: "2022",
    title: "Diversity in Tech",
    desc: "Detailed insights into our efforts to bridge the gender gap and support underrepresented groups in the tech space.",
    icon: PieChart,
    size: "3.8 MB",
  },
  {
    year: "2023",
    title: "Economic Impact Study",
    desc: "Measuring the localized economic growth driven by UST graduates and partner organizations in West Africa.",
    icon: TrendingUp,
    size: "5.1 MB",
  },
];

const ImpactReports = () => (
  <section className="py-24 bg-card/30">
    <div className="container">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Transparency & Results</p>
          <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground">Impact Reports</h2>
          <p className="mt-4 text-muted-foreground text-lg italic">
            "Numbers tell a story, but lives changed define our success."
          </p>
        </div>
        <Button variant="outline" className="rounded-full px-6 border-accent/20 text-accent">
          View All Documents
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {reports.map((report) => (
          <div key={report.title} className="group relative bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute -right-8 -bottom-8 text-accent/5 transform group-hover:scale-150 transition-transform duration-700">
              <report.icon size={160} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-accent/20">
                  {report.year}
                </span>
                <span className="text-xs text-muted-foreground font-medium">{report.size}</span>
              </div>
              <h3 className="font-display text-2xl font-700 text-foreground mb-4">{report.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {report.desc}
              </p>
              <Button className="w-full rounded-xl bg-accent/5 text-accent hover:bg-accent hover:text-white transition-all gap-2 group/btn h-12">
                Download PDF <FileDown size={18} className="group-hover/btn:translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactReports;
