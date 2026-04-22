import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const PartnerApplicationForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Partnership application sent successfully! We'll be in touch soon.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="partner-form" className="py-24 bg-card/20 border-t border-border/50">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/60 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-2 bg-accent" />
            
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-800 text-foreground mb-4">Partner Success Form</h2>
              <p className="text-muted-foreground">Fill out the form below and our team will get back to you within 48 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" placeholder="e.g. Acme Tech" required className="rounded-xl border-border/60 focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input id="contact-person" placeholder="Your Full Name" required className="rounded-xl border-border/60 focus:border-accent" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input id="email" type="email" placeholder="you@organization.com" required className="rounded-xl border-border/60 focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partnership-type">Partnership Type</Label>
                  <Select required>
                    <SelectTrigger className="rounded-xl border-border/60 focus:border-accent">
                      <SelectValue placeholder="Select interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporate">Corporate Training</SelectItem>
                      <SelectItem value="stem">STEM Programs</SelectItem>
                      <SelectItem value="sponsorship">Sponsorships</SelectItem>
                      <SelectItem value="other">Other Collaboration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message / Scope of Interest</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us a bit about your goals and how we can work together..." 
                  className="min-h-[120px] rounded-xl border-border/60 focus:border-accent"
                  required
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="cta" 
                  className="w-full h-12 rounded-xl text-md font-bold shadow-md shadow-accent/20"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerApplicationForm;
