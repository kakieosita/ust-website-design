const partners = [
  "Microsoft", "Google", "AWS", "Andela", "NITDA", 
  "Federal Ministry of Education", "Flutterwave", "MTN", 
  "Access Bank", "UNICEF", "Mastercard Foundation", "Oracle"
];

const PartnerLogoGrid = () => (
  <section className="py-20 bg-muted/30">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Our Network</p>
        <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground">Trusted by Industry Leaders</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {partners.map((name) => (
          <div 
            key={name} 
            className="flex items-center justify-center h-24 md:h-32 bg-card rounded-2xl border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent/40 grayscale hover:grayscale-0"
          >
            <span className="text-sm md:text-base font-display font-800 text-muted-foreground transition-colors group-hover:text-foreground text-center px-4">
              {name}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-muted-foreground italic">Join over 120+ organizations building with UST.</p>
      </div>
    </div>
  </section>
);

export default PartnerLogoGrid;
