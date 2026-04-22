import { Mail, Phone, MapPin, Clock, Twitter, Linkedin, Instagram, Globe } from "lucide-react";

const OfficeInfo = () => (
  <div className="space-y-12">
    <div>
      <h3 className="font-display text-2xl font-800 text-foreground mb-8">Our Headquarters</h3>
      <div className="space-y-6">
        <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-sm transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent shrink-0">
            <MapPin size={24} />
          </div>
          <div>
            <p className="font-bold text-foreground mb-1">Main Office</p>
            <p className="text-muted-foreground leading-relaxed">ICT Unit, Alvan Ikoku Federal University of Education, Owerri</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-sm transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-purple-500/5 flex items-center justify-center text-purple-600 shrink-0">
            <Phone size={24} />
          </div>
          <div>
            <p className="font-bold text-foreground mb-1">Phone Numbers</p>
            <p className="text-muted-foreground">08136744931</p>
            <p className="text-muted-foreground">09067023544</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-sm transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-600 shrink-0">
            <Mail size={24} />
          </div>
          <div>
            <p className="font-bold text-foreground mb-1">Email Support</p>
            <p className="text-muted-foreground">info@upskillinstitute.org</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-sm transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-rose-500/5 flex items-center justify-center text-rose-600 shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="font-bold text-foreground mb-1">Working Hours</p>
            <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 6:00 PM</p>
            <p className="text-muted-foreground">Sat: 10:00 AM - 2:00 PM</p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 className="font-display text-xl font-800 text-foreground mb-6">Join the Conversation</h3>
      <div className="flex flex-wrap gap-4">
        {[
          { icon: Twitter, label: "Twitter", color: "hover:bg-blue-400" },
          { icon: Linkedin, label: "LinkedIn", color: "hover:bg-blue-700" },
          { icon: Instagram, label: "Instagram", color: "hover:bg-pink-600" },
          { icon: Globe, label: "Website", color: "hover:bg-accent" },
        ].map((social) => (
          <a
            key={social.label}
            href="#"
            className={`flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border/60 text-foreground font-semibold transition-all group hover:text-white ${social.color}`}
          >
            <social.icon size={20} className="group-hover:scale-110 transition-transform" />
            {social.label}
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default OfficeInfo;
