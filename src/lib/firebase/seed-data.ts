import { doc, writeBatch } from "firebase/firestore";
import { db } from "./config";
import { blogPosts } from "../blog-data";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop";
const DEFAULT_AUTHOR_ID = "ust_admin_001";
const now = () => new Date().toISOString();

export const seedDatabase = async () => {
  try {
    const batch = writeBatch(db);
    console.log("Starting full seeding process...");

    // 1. Default Author (users)
    batch.set(doc(db, "users", DEFAULT_AUTHOR_ID), {
      name: "UST Admin",
      email: "admin@ust.edu.ng",
      role: "admin",
      createdAt: now(),
    });

    // 2. Blog Posts (collection: blog_posts — matches blog-service.ts)
    for (const post of blogPosts) {
      const blogRef = doc(db, "blog_posts", post.slug);
      batch.set(blogRef, {
        ...post,
        authorId: DEFAULT_AUTHOR_ID,
        featuredImage: post.image || PLACEHOLDER_IMAGE,
        status: "published",
        publishedAt: now(),
        createdAt: now(),
        updatedAt: now(),
      });
    }

    // 3. Programs
    const programsData = [
      {
        id: "p1",
        title: "Full-Stack Web Development",
        category: "Software",
        duration: "6 Months",
        price: "₦450,000",
        deliveryMode: "On-campus",
      },
      {
        id: "p2",
        title: "Corporate Tech Upskilling",
        category: "Software",
        duration: "3 Months",
        price: "₦250,000",
        deliveryMode: "Hybrid",
      },
      {
        id: "p3",
        title: "Cybersecurity Operations",
        category: "Cybersecurity",
        duration: "4 Months",
        price: "₦350,000",
        deliveryMode: "Online",
      },
      {
        id: "p4",
        title: "Data Analytics & BI",
        category: "Data",
        duration: "5 Months",
        price: "₦400,000",
        deliveryMode: "Hybrid",
      },
    ];
    for (const p of programsData) {
      batch.set(doc(db, "programs", p.id), {
        ...p,
        description:
          "Intensive project-based training designed for industry relevance.",
        featuredImage: PLACEHOLDER_IMAGE,
        createdAt: now(),
      });
    }

    // 4. Events
    const eventsData = [
      {
        id: "e1",
        title: "Tech Career Fair 2026",
        location: "Lagos",
        date: "2026-05-15T10:00:00Z",
      },
      {
        id: "e2",
        title: "AI for Business Seminar",
        location: "Online",
        date: "2026-06-20T14:00:00Z",
      },
      {
        id: "e3",
        title: "Cybersecurity Bootcamp Kickoff",
        location: "Abuja",
        date: "2026-07-05T09:00:00Z",
      },
    ];
    for (const e of eventsData) {
      batch.set(doc(db, "events", e.id), {
        ...e,
        description: "Join us for an insightful session with industry leaders.",
        image: PLACEHOLDER_IMAGE,
      });
    }

    // 5. Testimonials
    const testimonialsData = [
      {
        id: "t1",
        name: "Amina Okoro",
        role: "Frontend Dev at FinTech X",
        content: "UST transformed my career path entirely.",
      },
      {
        id: "t2",
        name: "Emeka Obi",
        role: "Security Analyst",
        content: "The mentorship here is unparalleled.",
      },
      {
        id: "t3",
        name: "Tunde Bakare",
        role: "Data Engineer at PayFlow",
        content: "Hands-on projects gave me real production experience.",
      },
    ];
    for (const t of testimonialsData) {
      batch.set(doc(db, "testimonials", t.id), {
        ...t,
        image: "https://i.pravatar.cc/150?u=" + t.id,
      });
    }

    // 6. Partners
    const partnersData = [
      {
        id: "pa1",
        name: "MTN Nigeria",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/MTN_Logo.svg/2560px-MTN_Logo.svg.png",
        website: "https://mtn.ng",
      },
      {
        id: "pa2",
        name: "Andela",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Andela_logo.svg/2560px-Andela_logo.svg.png",
        website: "https://andela.com",
      },
      {
        id: "pa3",
        name: "Flutterwave",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Flutterwave_Logo.png/640px-Flutterwave_Logo.png",
        website: "https://flutterwave.com",
      },
    ];
    for (const p of partnersData) {
      batch.set(doc(db, "partners", p.id), {
        name: p.name,
        logo: p.logo,
        website: p.website,
      });
    }

    // 7. Pages (CMS)
    const pagesData = [
      {
        id: "about",
        name: "About Us",
        sections: [
          {
            id: "hero",
            type: "hero",
            data: {
              title: "Building the Future",
              subtitle: "Innovation starts here.",
            },
          },
        ],
      },
      {
        id: "home",
        name: "Home",
        sections: [
          {
            id: "hero",
            type: "hero",
            data: {
              title: "Upskill School of Technology",
              subtitle: "Africa's next-gen tech talent starts here.",
            },
          },
        ],
      },
      {
        id: "contact",
        name: "Contact",
        sections: [
          {
            id: "intro",
            type: "intro",
            data: { title: "Get in Touch", subtitle: "We'd love to hear from you." },
          },
        ],
      },
    ];
    for (const pg of pagesData) {
      batch.set(doc(db, "pages", pg.id), {
        name: pg.name,
        sections: pg.sections,
        lastUpdated: now(),
      });
    }

    // 8. Media (sample index entry)
    batch.set(doc(db, "media", "sample_001"), {
      fileUrl: PLACEHOLDER_IMAGE,
      type: "image",
      uploadedAt: now(),
    });

    await batch.commit();
    console.log("Full seeding completed successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error seeding database:", error);
    return { success: false, error };
  }
};
