import { useState } from "react";
import { Button } from "@/components/ui/button";
import instructor1 from "@/assets/instructor-1.png";
import instructor2 from "@/assets/instructor-2.png";
import leader1 from "@/assets/leader-1.png";
import leader2 from "@/assets/leader-2.png";

const categories = ["All", "Software Development", "Cybersecurity", "Data Science", "Product Management"];

const instructors = [
  { name: "John Doe", role: "Fullstack Web Developer", category: "Software Development", image: instructor1 },
  { name: "Sarah Smith", role: "Cybersecurity Analyst", category: "Cybersecurity", image: instructor2 },
  { name: "David Chen", role: "Senior Data Scientist", category: "Data Science", image: leader1 },
  { name: "Maria Garcia", role: "Product Manager", category: "Product Management", image: leader2 },
  { name: "James Wilson", role: "React Expert", category: "Software Development", image: instructor1 },
  { name: "Elena Petrov", role: "Network Security Specialist", category: "Cybersecurity", image: instructor2 },
  { name: "Michael Abiodun", role: "Machine Learning Engineer", category: "Data Science", image: leader1 },
  { name: "Linda Johnson", role: "Agile Coach", category: "Product Management", image: leader2 },
];

const InstructorsDirectory = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredInstructors = activeCategory === "All" 
    ? instructors 
    : instructors.filter(inst => inst.category === activeCategory);

  return (
    <section className="py-20 bg-card/10">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Our Faculty</p>
          <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground mb-6">Expert Instructors</h2>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "cta" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className="rounded-full px-6 transition-all duration-300"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
          {filteredInstructors.map((inst, idx) => (
            <div 
              key={`${inst.name}-${idx}`} 
              className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-background shadow-inner">
                <img src={inst.image} alt={inst.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <h3 className="font-display text-lg font-700 text-foreground mb-1">{inst.name}</h3>
                <p className="text-sm text-muted-foreground font-medium mb-3">{inst.role}</p>
                <div className="inline-block px-3 py-1 rounded-full bg-accent/5 text-[10px] font-bold text-accent uppercase tracking-tighter border border-accent/10">
                  {inst.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsDirectory;
