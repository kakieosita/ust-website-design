import { useState, useEffect } from "react";
import { Calendar, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { firestoreService } from "@/lib/firebase/services";
import { Event } from "@/types/firestore";

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await firestoreService.getAll<Event>("events");
        setEvents(data);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Upcoming Events</p>
            <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground">Join Our Next Cohort</h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all">
            View All <ArrowRight size={14} />
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-accent" size={40} />
          </div>
        ) : (
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-1.5 px-1.5">
            {events.map((e) => {
              const formattedDate = new Date(e.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              });
              return (
                <div key={e.id} className="min-w-[280px] flex-shrink-0 snap-start bg-card rounded-2xl p-6 shadow-sm border border-border/60 hover:shadow-lg transition-shadow">
                  <div className="w-full h-32 rounded-xl mb-4 overflow-hidden">
                    <img src={e.image} alt={e.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-display text-lg font-700 text-card-foreground mb-3">{e.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar size={14} /> {formattedDate}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={14} /> {e.location}
                  </div>
                  <Button variant="cta" size="sm" className="mt-5 w-full">Register Now</Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
