import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Monitor, Users, MapPin } from "lucide-react";

const programs = [
  {
    id: "software-engineering",
    name: "Software Engineering Bootcamp",
    description: "Master full-stack development with hands-on projects using modern frameworks and tools.",
    duration: "16 Weeks",
    level: "Beginner",
    category: "Engineering",
    mode: "Hybrid",
    price: "₦350,000",
  },
  {
    id: "data-science",
    name: "Data Science & Analytics",
    description: "Learn to extract insights from data using Python, SQL, machine learning and visualization tools.",
    duration: "12 Weeks",
    level: "Intermediate",
    category: "Data",
    mode: "Online",
    price: "₦300,000",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Fundamentals",
    description: "Build expertise in network security, ethical hacking, and security operations.",
    duration: "10 Weeks",
    level: "Beginner",
    category: "Security",
    mode: "Physical",
    price: "₦280,000",
  },
  {
    id: "cloud-computing",
    name: "Cloud Computing & DevOps",
    description: "Deploy and manage scalable infrastructure on AWS, Azure, and GCP with CI/CD pipelines.",
    duration: "12 Weeks",
    level: "Advanced",
    category: "Engineering",
    mode: "Online",
    price: "₦320,000",
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design Masterclass",
    description: "Design beautiful, user-centered digital products from research to high-fidelity prototypes.",
    duration: "8 Weeks",
    level: "Beginner",
    category: "Design",
    mode: "Hybrid",
    price: "₦220,000",
  },
  {
    id: "product-management",
    name: "Product Management",
    description: "Learn to build and ship digital products with Agile, user research, and go-to-market strategies.",
    duration: "8 Weeks",
    level: "Intermediate",
    category: "Business",
    mode: "Online",
    price: "₦250,000",
  },
  {
    id: "corporate-training",
    name: "Corporate Tech Training",
    description: "Customized upskilling programs for teams in software, data, cloud, and digital transformation.",
    duration: "Flexible",
    level: "All Levels",
    category: "Business",
    mode: "Hybrid",
    price: "Custom",
  },
  {
    id: "ai-machine-learning",
    name: "AI & Machine Learning",
    description: "Dive into deep learning, NLP, computer vision and deploy AI-powered applications.",
    duration: "14 Weeks",
    level: "Advanced",
    category: "Data",
    mode: "Online",
    price: "₦400,000",
  },
];

const categories = ["All", "Engineering", "Data", "Security", "Design", "Business"];
const modes = ["All", "Online", "Physical", "Hybrid"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const levelColor: Record<string, string> = {
  Beginner: "bg-accent/15 text-accent border-accent/30",
  Intermediate: "bg-cta/15 text-cta border-cta/30",
  Advanced: "bg-primary/15 text-primary border-primary/30",
  "All Levels": "bg-muted text-muted-foreground border-border",
};

const modeIcon: Record<string, React.ReactNode> = {
  Online: <Monitor size={14} />,
  Physical: <MapPin size={14} />,
  Hybrid: <Users size={14} />,
};

const Programs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [mode, setMode] = useState("All");
  const [level, setLevel] = useState("All");

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || p.category === category;
      const matchMode = mode === "All" || p.mode === mode;
      const matchLevel = level === "All" || p.level === level;
      return matchSearch && matchCat && matchMode && matchLevel;
    });
  }, [search, category, mode, level]);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20 md:py-28">
          <div className="container text-center space-y-6">
            <h1 className="font-display font-800 text-4xl md:text-5xl lg:text-6xl">
              Explore Our Programs
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              Industry-aligned courses designed to launch and accelerate your tech career.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search programs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 rounded-xl bg-primary-foreground text-foreground border-none shadow-lg text-base"
              />
            </div>
          </div>
        </section>

        {/* Filters + Grid */}
        <section className="py-12 md:py-16">
          <div className="container">
            {/* Filters */}
            <div className="flex flex-wrap gap-6 mb-10">
              <FilterGroup label="Category" options={categories} value={category} onChange={setCategory} />
              <FilterGroup label="Delivery Mode" options={modes} value={mode} onChange={setMode} />
              <FilterGroup label="Skill Level" options={levels} value={level} onChange={setLevel} />
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> program{filtered.length !== 1 ? "s" : ""}
            </p>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="group bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Color bar */}
                    <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className={`text-xs ${levelColor[p.level]}`}>
                          {p.level}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          {modeIcon[p.mode]} {p.mode}
                        </span>
                      </div>

                      <h3 className="font-display font-700 text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                        {p.description}
                      </p>

                      <div className="flex items-center justify-between text-sm mb-4">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock size={14} /> {p.duration}
                        </span>
                        <span className="font-semibold text-foreground">{p.price}</span>
                      </div>

                      <Link to={`/programs/${p.id}`}>
                        <Button variant="cta" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No programs match your filters.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => { setSearch(""); setCategory("All"); setMode("All"); setLevel("All"); }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

const FilterGroup = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-2">
    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            value === opt
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default Programs;
