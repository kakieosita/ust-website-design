import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/admin@upskillinstitute.org", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you shortly.");
        form.reset();
      } else {
        const data = await response.json();
        throw new Error(data.errors?.map((e: any) => e.message).join(", ") || "Failed to send message");
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-3xl p-8 md:p-10 border border-border/60 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent" />
      
      <div className="mb-8">
        <h2 className="font-display text-3xl font-800 text-foreground mb-4">Send a Message</h2>
        <p className="text-muted-foreground">Fill out the form below and our team will respond within 24 hours.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="fullName" placeholder="John Doe" required className="rounded-xl border-border/60" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" required className="rounded-xl border-border/60" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+234 ..." className="rounded-xl border-border/60" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="How can we help?" required className="rounded-xl border-border/60" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Your Message</Label>
          <Textarea 
            id="message" 
            name="message"
            placeholder="Type your message here..." 
            className="min-h-[150px] rounded-xl border-border/60"
            required
          />
        </div>

        <Button 
          type="submit" 
          variant="cta" 
          className="w-full h-12 rounded-xl text-md font-bold gap-2 shadow-lg shadow-accent/20"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"} <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
