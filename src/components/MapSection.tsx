const MapSection = () => (
  <section className="h-[500px] w-full bg-muted/30 relative">
    {/* Map Iframe Overlay */}
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15888.658145115!2d7.004264!3d5.495205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104259b1a0364f7b%3A0x6797a48d886ff2cb!2sAlvan%20Ikoku%20Federal%20University%20of%20Education%2C%20Owerri!5e0!3m2!1sen!2sng!4v1713695500000!5m2!1sen!2sng"
      className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
    
    {/* Overlay tag for branding */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-card px-8 py-4 rounded-2xl shadow-2xl border border-border/60 flex items-center gap-4 animate-fade-in-up">
      <div className="w-4 h-4 rounded-full bg-accent animate-ping" />
      <span className="font-display font-800 text-foreground uppercase tracking-wider text-sm">ICT Unit, Alvan Ikoku Fed. Univ. of Edu., Owerri</span>
    </div>
  </section>
);

export default MapSection;
