import { Play, Image as ImageIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryItems = [
  { 
    title: "EcoTech Hackathon 2023", 
    type: "image", 
    tag: "Event",
    color: "bg-blue-500/10",
  },
  { 
    title: "Alumni Reunion Night", 
    type: "video", 
    tag: "Community",
    color: "bg-purple-500/10",
  },
  { 
    title: "Women in Tech Workshop", 
    type: "image", 
    tag: "Education",
    color: "bg-rose-500/10",
  },
  { 
    title: "UST Lagos Launch", 
    type: "image", 
    tag: "Milestone",
    color: "bg-amber-500/10",
  },
  { 
    title: "Student Project Showcase", 
    type: "video", 
    tag: "Talent",
    color: "bg-emerald-500/10",
  },
  { 
    title: "Partner Networking Mixer", 
    type: "image", 
    tag: "Network",
    color: "bg-cyan-500/10",
  },
];

const CommunityGallery = () => (
  <section className="py-24 bg-background">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
        <div>
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Moments & Memories</p>
          <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground uppercase tracking-tight">Community Gallery</h2>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="rounded-full px-6">Photos</Button>
          <Button variant="outline" size="sm" className="rounded-full px-6">Videos</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item, idx) => (
          <div 
            key={`${item.title}-${idx}`} 
            className={`group relative aspect-[4/3] rounded-3xl overflow-hidden border border-border/40 ${item.color} shadow-sm hover:shadow-xl transition-all duration-500`}
          >
            {/* Placeholder Visual */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-500 group-hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center mb-4 text-accent/60 shadow-inner">
                {item.type === 'video' ? <Play className="fill-accent/40" size={28} /> : <ImageIcon size={28} />}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent/80 mb-2">{item.tag}</p>
              <h4 className="font-display text-xl font-800 text-foreground/80 leading-tight">
                {item.title}
              </h4>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4">View Media</span>
              <Button size="icon" variant="secondary" className="rounded-full w-14 h-14 bg-white text-accent hover:scale-110 transition-transform">
                <Search size={24} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 p-8 rounded-3xl bg-accent/5 border border-accent/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="font-display text-2xl font-800 text-foreground mb-2 italic">"Capturing the spirit of innovation, one moment at a time."</h3>
          <p className="text-muted-foreground">Follow our social media for daily updates and live community stories.</p>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors cursor-pointer">In</div>
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors cursor-pointer">Tw</div>
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors cursor-pointer">Ig</div>
        </div>
      </div>
    </div>
  </section>
);

export default CommunityGallery;
