import { collection, setDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "./config";
import { blogPosts } from "../blog-data";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop";
const DEFAULT_AUTHOR_ID = "ust_admin_001";

export const seedDatabase = async () => {
  try {
    const batch = writeBatch(db);
    console.log("Starting full seeding process...");

    // 1. Create Default Author
    const authorRef = doc(db, "users", DEFAULT_AUTHOR_ID);
    batch.set(authorRef, {
      name: "UST Admin",
      email: "admin@ust.edu.ng",
      role: "admin",
      createdAt: new Date().toISOString()
    });

    // 2. Seed Blog Posts (Linked to Author)
    for (const post of blogPosts) {
      const blogRef = doc(db, "blogs", post.slug);
      batch.set(blogRef, {
        ...post,
        authorId: DEFAULT_AUTHOR_ID,
        featuredImage: post.image || PLACEHOLDER_IMAGE,
        status: 'published',
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    // 3. Seed Programs
    const programsData = [
      { id: "p1", title: "Corporate Tech Upskilling", category: "Software", duration: "3 Months", price: "₦250k", deliveryMode: "Hybrid" },
      { id: "p2", title: "Full-Stack Web Dev", category: "Software", duration: "6 Months", price: "₦450k", deliveryMode: "On-campus" },
      { id: "p3", title: "Cybersecurity Ops", category: "Cybersecurity", duration: "4 Months", price: "₦350k", deliveryMode: "Online" }
    ];

    for (const p of programsData) {
      const pRef = doc(db, "programs", p.id);
      batch.set(pRef, {
        ...p,
        description: "Intensive project-based training designed for industry relevance.",
        featuredImage: PLACEHOLDER_IMAGE,
        createdAt: new Date().toISOString()
      });
    }

    // 4. Seed Events
    const eventsData = [
      { id: "e1", title: "Tech Career Fair 2026", location: "Lagos", date: "2026-05-15T10:00:00Z" },
      { id: "e2", title: "AI for Business Seminar", location: "Online", date: "2026-06-20T14:00:00Z" }
    ];

    for (const e of eventsData) {
      const eRef = doc(db, "events", e.id);
      batch.set(eRef, {
        ...e,
        description: "Join us for an insightful session with industry leaders.",
        image: PLACEHOLDER_IMAGE
      });
    }

    // 5. Seed Testimonials
    const testimonialsData = [
      { id: "t1", name: "Amina Okoro", role: "Frontend Dev at FinTech X", content: "UST transformed my career path entirely." },
      { id: "t2", name: "Emeka Obi", role: "Security Analyst", content: "The mentorship here is unparalleled." }
    ];

    for (const t of testimonialsData) {
      const tRef = doc(db, "testimonials", t.id);
      batch.set(tRef, {
        ...t,
        image: "https://i.pravatar.cc/150?u=" + t.id
      });
    }

    // 6. Seed Pages
    const pagesCol = doc(db, "pages", "about");
    batch.set(pagesCol, {
      name: "About Us",
      sections: [
        { id: "hero", type: "hero", data: { title: "Building the Future", subtitle: "Innovation starts here." } }
      ],
      lastUpdated: new Date().toISOString()
    });

    await batch.commit();
    console.log("Full seeding completed successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error seeding database:", error);
    return { success: false, error };
  }
};
