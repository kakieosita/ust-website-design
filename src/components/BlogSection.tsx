import { ArrowRight, Clock } from "lucide-react";

const posts = [
  { title: "Why Every Nigerian Graduate Needs Digital Skills in 2026", tag: "Insights", date: "Apr 8, 2026", excerpt: "The job market is evolving fast. Here's why coding and data literacy are now essential." },
  { title: "How UST's Bootcamp Model Differs From University Education", tag: "Education", date: "Mar 22, 2026", excerpt: "A deep dive into experiential learning and why it produces job-ready talent faster." },
  { title: "5 Career Paths in Cybersecurity You Should Know About", tag: "Careers", date: "Mar 10, 2026", excerpt: "From penetration testing to GRC — explore the fastest-growing roles in cyber." },
];

const BlogSection = () => (
  <section id="blog" className="py-20 md:py-28 bg-background">
    <div className="container">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">From Our Blog</p>
          <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground">Latest Articles</h2>
        </div>
        <a href="#" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all">
          Read More <ArrowRight size={14} />
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article key={p.title} className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border/60 hover:shadow-lg transition-shadow">
            <div className="h-44 bg-gradient-to-br from-primary/10 to-accent/10" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">{p.tag}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={12} /> {p.date}</span>
              </div>
              <h3 className="font-display text-base font-700 text-card-foreground mb-2 group-hover:text-accent transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
