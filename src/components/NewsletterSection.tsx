import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-800 text-primary-foreground mb-4">Stay in the Loop</h2>
          <p className="text-primary-foreground/70 mb-8">Get the latest on new programs, scholarships, and tech opportunities delivered to your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded-xl"
            />
            <Button variant="cta" size="lg" className="gap-2">
              Subscribe <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
