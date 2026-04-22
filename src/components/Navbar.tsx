import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ustLogo from "@/assets/ust-logo.png";

const navLinks = [
  { label: "Home", href: "/", isRoute: true },
  { label: "About", href: "/about", isRoute: true },
  { label: "Programs", href: "/programs", isRoute: true },
  { label: "Partners", href: "/partners", isRoute: true },
  { label: "Community", href: "/community", isRoute: true },
  { label: "Blog", href: "/blog", isRoute: true },
  { label: "Contact", href: "/contact", isRoute: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center">
          <img src={ustLogo} alt="Upskill School of Technology" className="h-10" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) =>
            l.isRoute ? (
              <Link key={l.label} to={l.href} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
                {l.label}
              </a>
            )
          )}
          <Button variant="cta" size="sm">Enroll Now</Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border px-6 pb-6 space-y-4 animate-fade-in-up">
          {navLinks.map((l) =>
            l.isRoute ? (
              <Link key={l.label} to={l.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground/70 hover:text-primary">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground/70 hover:text-primary">
                {l.label}
              </a>
            )
          )}
          <Button variant="cta" size="sm" className="w-full">Enroll Now</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
