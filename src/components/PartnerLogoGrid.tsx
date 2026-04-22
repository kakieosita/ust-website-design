import { useState, useEffect } from "react";
import { firestoreService } from "@/lib/firebase/services";
import { Partner } from "@/types/firestore";
import { Loader2 } from "lucide-react";

const PartnerLogoGrid = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await firestoreService.getAll<Partner>("partners");
        setPartners(data);
      } catch (error) {
        console.error("Failed to load partners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Our Network</p>
          <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground">Trusted by Industry Leaders</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-accent" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {partners.map((p) => (
              <div 
                key={p.id} 
                className="flex items-center justify-center h-24 md:h-32 bg-card rounded-2xl border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent/40 grayscale hover:grayscale-0 p-6"
              >
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-sm md:text-base font-display font-800 text-muted-foreground transition-colors group-hover:text-foreground text-center">
                    {p.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground italic">Join over 120+ organizations building with UST.</p>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogoGrid;
