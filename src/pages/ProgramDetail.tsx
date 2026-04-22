import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, Calendar, Monitor, MapPin, Users, ArrowLeft, CheckCircle2, GraduationCap, Loader2 } from "lucide-react";
import { firestoreService } from "@/lib/firebase/services";
import { Program } from "@/types/firestore";

const programsData: Record<string, {
  name: string;
  tagline: string;
  level: string;
  mode: string;
  duration: string;
  schedule: string;
  price: string;
  overview: string;
  highlights: string[];
  curriculum: { title: string; topics: string[] }[];
  instructor: { name: string; role: string; bio: string };
}> = {
  "software-engineering": {
    name: "Software Engineering Bootcamp",
    tagline: "Build production-ready applications from day one.",
    level: "Beginner",
    mode: "Hybrid",
    duration: "16 Weeks",
    schedule: "Mon – Fri, 9:00 AM – 3:00 PM WAT",
    price: "₦350,000",
    overview:
      "This intensive bootcamp takes you from zero to a job-ready software engineer. You'll learn HTML, CSS, JavaScript, React, Node.js, databases, and deployment — building real-world projects every week with mentorship from senior engineers.",
    highlights: [
      "Build 8+ portfolio-ready projects",
      "Industry mentorship & career support",
      "Certificate of completion",
      "Access to alumni community",
    ],
    curriculum: [
      { title: "Module 1: Foundations of Web Development", topics: ["HTML5 & Semantic Markup", "CSS3, Flexbox & Grid", "Responsive Design Principles", "Git & Version Control"] },
      { title: "Module 2: JavaScript & Programming", topics: ["Core JavaScript (ES6+)", "DOM Manipulation", "Asynchronous JavaScript", "APIs & Fetch"] },
      { title: "Module 3: React & Frontend Frameworks", topics: ["React Fundamentals & Hooks", "State Management", "Routing & Navigation", "Component Design Patterns"] },
      { title: "Module 4: Backend & Databases", topics: ["Node.js & Express", "RESTful API Design", "PostgreSQL & MongoDB", "Authentication & Authorization"] },
      { title: "Module 5: Deployment & Career Prep", topics: ["CI/CD & Cloud Deployment", "Testing & Debugging", "Portfolio & Resume Building", "Interview Preparation"] },
    ],
    instructor: {
      name: "Chidi Okonkwo",
      role: "Lead Software Engineering Instructor",
      bio: "Chidi has 10+ years building scalable web applications at companies across Lagos and London. He's passionate about mentoring the next generation of African developers.",
    },
  },
  "data-science": {
    name: "Data Science & Analytics",
    tagline: "Turn raw data into actionable business insights.",
    level: "Intermediate",
    mode: "Online",
    duration: "12 Weeks",
    schedule: "Mon, Wed, Fri — 6:00 PM – 9:00 PM WAT",
    price: "₦300,000",
    overview:
      "Gain practical skills in data analysis, visualization, statistical modelling, and machine learning. Work on real datasets from African industries to solve meaningful problems.",
    highlights: [
      "Hands-on projects with real datasets",
      "Python, SQL, Tableau & Power BI",
      "Capstone project with industry partner",
      "Job placement assistance",
    ],
    curriculum: [
      { title: "Module 1: Data Foundations", topics: ["Python for Data Science", "NumPy & Pandas", "Data Cleaning & Wrangling", "Exploratory Data Analysis"] },
      { title: "Module 2: Statistics & Visualization", topics: ["Descriptive & Inferential Statistics", "Matplotlib & Seaborn", "Tableau & Power BI", "Storytelling with Data"] },
      { title: "Module 3: Machine Learning", topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation & Tuning", "Feature Engineering"] },
      { title: "Module 4: Capstone & Career", topics: ["Industry Capstone Project", "Portfolio Development", "Interview Prep", "Networking & Job Search"] },
    ],
    instructor: {
      name: "Amina Bello",
      role: "Senior Data Science Instructor",
      bio: "Amina is a data scientist with experience at fintech startups and consulting firms across West Africa. She holds an MSc in Applied Statistics.",
    },
  },
};

// Fallback for programs not yet fully detailed
const fallback = {
  tagline: "Launch your career in tech with UST.",
  level: "Beginner",
  mode: "Hybrid",
  duration: "12 Weeks",
  schedule: "Weekdays, flexible hours",
  price: "Contact Us",
  overview: "This program is designed to give you practical, industry-relevant skills to thrive in the tech industry. Details coming soon.",
  highlights: ["Hands-on projects", "Expert instructors", "Career support", "Certificate of completion"],
  curriculum: [
    { title: "Module 1: Foundations", topics: ["Core concepts", "Tools & setup", "Best practices"] },
    { title: "Module 2: Intermediate Skills", topics: ["Applied techniques", "Projects", "Collaboration"] },
    { title: "Module 3: Advanced & Capstone", topics: ["Real-world project", "Portfolio building", "Career prep"] },
  ],
  instructor: {
    name: "UST Instructor",
    role: "Program Lead",
    bio: "Our instructors are seasoned professionals with years of hands-on industry experience across Africa and globally.",
  },
};

const programNames: Record<string, string> = {
  "software-engineering": "Software Engineering Bootcamp",
  "data-science": "Data Science & Analytics",
  "cybersecurity": "Cybersecurity Fundamentals",
  "cloud-computing": "Cloud Computing & DevOps",
  "ui-ux-design": "UI/UX Design Masterclass",
  "product-management": "Product Management",
  "corporate-training": "Corporate Tech Training",
  "ai-machine-learning": "AI & Machine Learning",
};

const levelColor: Record<string, string> = {
  Beginner: "bg-accent/15 text-accent border-accent/30",
  Intermediate: "bg-cta/15 text-cta border-cta/30",
  Advanced: "bg-primary/15 text-primary border-primary/30",
};

const ProgramDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      if (!slug) return;
      try {
        const data = await firestoreService.getOne<Program>("programs", slug);
        if (data) {
          setProgram(data);
        }
      } catch (error) {
        console.error("Failed to load program details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
  }, [slug]);

  // Priority: 1. Firestore, 2. Mock Data, 3. Fallback
  const fullMock = slug ? programsData[slug] : null;
  const dbData = program ? {
    name: program.title,
    tagline: program.tagline || fallback.tagline,
    level: program.level || "Beginner",
    mode: program.deliveryMode,
    duration: program.duration,
    schedule: program.schedule || fallback.schedule,
    price: program.price,
    overview: program.overview || program.description || fallback.overview,
    highlights: program.highlights || fallback.highlights,
    curriculum: program.curriculum || fallback.curriculum,
    instructor: program.instructor || fallback.instructor,
  } : null;

  const data = dbData || fullMock || { name: programNames[slug || ""] || "Program", ...fallback };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-accent" size={48} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container max-w-4xl">
            <Link to="/programs" className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-6">
              <ArrowLeft size={16} /> Back to Programs
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline" className={`${levelColor[data.level] || ""} border`}>
                {data.level}
              </Badge>
              <span className="text-primary-foreground/60 text-sm flex items-center gap-1">
                {data.mode === "Online" ? <Monitor size={14} /> : data.mode === "Physical" ? <MapPin size={14} /> : <Users size={14} />}
                {data.mode}
              </span>
            </div>
            <h1 className="font-display font-800 text-3xl md:text-5xl leading-tight mb-3">
              {data.name}
            </h1>
            <p className="text-primary-foreground/70 text-lg">{data.tagline || fallback.tagline}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl space-y-16">

            {/* Overview */}
            <div>
              <h2 className="font-display font-700 text-2xl mb-4">Program Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{data.overview}</p>

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {data.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Clock size={20} />, label: "Duration", value: data.duration },
                { icon: <Calendar size={20} />, label: "Schedule", value: data.schedule },
                { icon: <GraduationCap size={20} />, label: "Level", value: data.level },
                { icon: <Monitor size={20} />, label: "Mode", value: data.mode },
              ].map((item) => (
                <div key={item.label} className="bg-card rounded-xl border border-border p-4 text-center space-y-1.5">
                  <div className="text-primary mx-auto w-fit">{item.icon}</div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-sm">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="font-display font-700 text-2xl mb-6">Curriculum</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {data.curriculum.map((mod, i) => (
                  <AccordionItem key={i} value={`mod-${i}`} className="bg-card border border-border rounded-xl px-5 overflow-hidden">
                    <AccordionTrigger className="font-display font-600 text-base hover:no-underline">
                      {mod.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pb-2">
                        {mod.topics.map((t) => (
                          <li key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Instructor */}
            <div>
              <h2 className="font-display font-700 text-2xl mb-6">Your Instructor</h2>
              <div className="bg-card rounded-xl border border-border p-6 flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-display font-800 text-2xl flex-shrink-0">
                  {data.instructor.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-display font-700 text-lg">{data.instructor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{data.instructor.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{data.instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* Pricing + CTA */}
            <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 md:p-12 text-primary-foreground text-center space-y-4">
              <h2 className="font-display font-800 text-2xl md:text-3xl">Ready to Get Started?</h2>
              <p className="text-primary-foreground/70 max-w-md mx-auto">
                Invest in your future with world-class training and career support.
              </p>
              <div className="text-4xl font-display font-800 my-4">{data.price}</div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="cta" size="lg" className="text-base px-8">
                  Enroll Now
                </Button>
                <Button variant="heroOutline" size="lg" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProgramDetail;
