import { Mail, Phone, MapPin } from "lucide-react";
import ustLogo from "@/assets/ust-logo.png";

const Footer = () => (
  <footer id="footer" className="bg-card text-muted-foreground pt-16 pb-8 border-t border-border/50">
    <div className="container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <img src={ustLogo} alt="Upskill School of Technology" className="h-12 brightness-0 invert mb-2" />
          <p className="text-sm leading-relaxed">Upskill School of Technology — empowering the next generation of African tech leaders.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-700 text-foreground mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Programs", "About Us", "Admissions", "Blog", "Careers"].map((l) => (
              <li key={l}><a href="#" className="hover:text-foreground transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-700 text-foreground mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 flex-shrink-0" /> ICT Unit, Alvan Ikoku Federal University of Education, Owerri</li>
            <li className="flex items-center gap-2"><Phone size={16} /> 08136744931, 09067023544</li>
            <li className="flex items-center gap-2"><Mail size={16} /> info@upskillinstitute.org</li>
          </ul>
        </div>

        {/* Social & Accreditation */}
        <div>
          <h4 className="font-display font-700 text-foreground mb-4">Follow Us</h4>
          <div className="flex gap-3 mb-6">
            {["Twitter", "LinkedIn", "Instagram", "YouTube"].map((s) => (
              <a key={s} href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent/30 transition-colors text-xs font-semibold text-foreground">
                {s[0]}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/50">Accredited by NITDA & NUC</p>
        </div>
      </div>

      <div className="border-t border-border/50 pt-6 text-center text-xs text-muted-foreground/45">
        © {new Date().getFullYear()} Upskill School of Technology. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
