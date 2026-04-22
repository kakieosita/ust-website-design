// ─── BlogPost Type ────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;          // HTML from rich text editor
  image: string;            // Featured image URL (Firebase Storage or external)
  tags: string[];           // Multiple tags e.g. ["Insights", "Tech"]
  tag: string;              // Primary tag (kept for backward-compat)
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;             // Human-readable publish date
  readTime: string;
  status: "draft" | "published";
  publishedAt?: string;     // ISO timestamp when first published
  createdAt?: string;
  updatedAt?: string;
  // SEO
  seoTitle?: string;
  seoDescription?: string;
}

// ─── Fallback mock data (used when Firestore is unreachable) ──────────────────
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "nigerian-graduate-digital-skills-2026",
    title: "Why Every Nigerian Graduate Needs Digital Skills in 2026",
    tag: "Insights",
    tags: ["Insights"],
    author: "Dr. Chima Okoro",
    authorRole: "Founder & CEO",
    authorImage: "/assets/leader-1.png",
    date: "Apr 8, 2026",
    readTime: "5 min read",
    status: "published",
    excerpt:
      "The job market is evolving fast. Here's why coding and data literacy are now essential for every career path.",
    content: `
      <p>The landscape of the Nigerian job market has undergone a seismic shift over the last few years. As we move further into 2026, the traditional boundaries between "tech" and "non-tech" roles have almost completely dissolved.</p>
      <p>Today, whether you are a lawyer, an accountant, or a marketing professional, your ability to leverage digital tools is the single most important factor in your career growth.</p>
      <h3>The Data-Driven Organization</h3>
      <p>Most modern Nigerian companies—from fintech startups in Yaba to established banks on Marina—are now data-driven.</p>
      <blockquote>"Digitization isn't just a trend; it's the new operating system of the global economy." — Dr. Chima Okoro</blockquote>
    `,
    image: "/assets/hero-bg.jpg",
  },
  {
    id: "2",
    slug: "bootcamp-vs-university",
    title: "How UST's Bootcamp Model Differs From University Education",
    tag: "Education",
    tags: ["Education"],
    author: "Aminat Yusuf",
    authorRole: "Chief Technology Officer",
    authorImage: "/assets/leader-2.png",
    date: "Mar 22, 2026",
    readTime: "7 min read",
    status: "published",
    excerpt:
      "A deep dive into experiential learning and why it produces job-ready talent faster than traditional academic routes.",
    content: `<p>While universities provide a critical theoretical foundation, the pace of technological change often outstrips the ability of traditional academic institutions to update their curricula.</p>`,
    image: "/assets/hero-bg.jpg",
  },
  {
    id: "3",
    slug: "cybersecurity-career-paths",
    title: "5 Career Paths in Cybersecurity You Should Know About",
    tag: "Careers",
    tags: ["Careers"],
    author: "James Wilson",
    authorRole: "Cybersecurity Lead",
    authorImage: "/assets/instructor-1.png",
    date: "Mar 10, 2026",
    readTime: "6 min read",
    status: "published",
    excerpt:
      "From penetration testing to GRC — explore the fastest-growing roles in the cybersecurity domain.",
    content: `<p>Cybersecurity is no longer just a support function; it's a board-level priority.</p>`,
    image: "/assets/hero-bg.jpg",
  },
];
