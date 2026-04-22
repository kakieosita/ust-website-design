import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Loader2 } from "lucide-react";
import { firestoreService } from "@/lib/firebase/services";
import { Testimonial } from "@/types/firestore";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await firestoreService.getAll<Testimonial>("testimonials");
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const t = testimonials[current];

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-muted flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={40} />
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Success Stories</p>
          <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground">What Our Students Say</h2>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border/40 relative">
          <Quote className="text-accent/20 absolute top-6 left-6" size={48} />
          <div className="flex flex-col md:flex-row items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <img src={t.image} alt={t.name} loading="lazy" width={512} height={512} className="w-24 h-24 rounded-full object-cover ring-4 ring-accent/20 flex-shrink-0" />
            <div>
              <p className="text-foreground text-lg mb-4 italic leading-relaxed">"{t.content}"</p>
              <p className="font-display font-700 text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent/10 transition-colors">
              <ChevronLeft size={18} className="text-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-accent" : "bg-border"}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent/10 transition-colors">
              <ChevronRight size={18} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
