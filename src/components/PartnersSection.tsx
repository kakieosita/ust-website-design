import { useState, useEffect } from "react";
import { firestoreService } from "@/lib/firebase/services";

const mockPartners = [
  "Microsoft", "Google", "AWS", "Andela", "NITDA", "Federal Ministry of Education",
  "Flutterwave", "MTN", "Access Bank", "UNICEF",
];

const PartnersSection = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await firestoreService.getAll("partners");
        setPartners(data.length > 0 ? data : mockPartners.map(name => ({ name })));
      } catch (error) {
        setPartners(mockPartners.map(name => ({ name })));
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  return (
    <section className="py-16 bg-muted overflow-hidden">
      <div className="container text-center mb-8">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Trusted By</p>
        <h2 className="font-display text-2xl md:text-3xl font-800 text-foreground">Our Partners & Collaborators</h2>
      </div>
      <div className="relative">
        <div className="flex animate-scroll-left w-max gap-12 px-6">
          {[...partners, ...partners].map((partner, i) => (
            <div key={i} className="flex-shrink-0 h-14 px-8 bg-card rounded-xl border border-border/60 flex items-center justify-center shadow-sm">
              <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
