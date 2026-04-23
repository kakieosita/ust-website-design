import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import BlogSearch from "@/components/BlogSearch";
import { BlogPost } from "@/lib/blog-data";
import { getAllPosts, getPublishedPosts } from "@/lib/firebase/blog-service";
import { Loader2, Bug } from "lucide-react";

interface DebugInfo {
  allCount: number;
  publishedCount: number;
  draftCount: number;
  allPosts: Array<{ id: string; title: string; slug: string; status: string; publishedAt?: string | null }>;
  publishedPosts: Array<{ id: string; title: string; slug: string; status: string; publishedAt?: string | null }>;
  fetchedAt: string;
  error?: string;
}

const BlogListing = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [showDebug, setShowDebug] = useState(
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("debug")
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch published (what /blog renders) and ALL (what's in Firestore/CMS)
        // in parallel so we can compare counts in the debug panel.
        const [published, all] = await Promise.all([
          getPublishedPosts(),
          getAllPosts().catch((e) => {
            console.warn("DEBUG: getAllPosts failed (likely rules block unauth reads):", e);
            return [] as BlogPost[];
          }),
        ]);
        setPosts(published || []);

        const summarize = (p: BlogPost) => ({
          id: p.id || "",
          title: p.title,
          slug: p.slug,
          status: (p as any).status || "unknown",
          publishedAt: p.publishedAt ?? null,
        });
        setDebugInfo({
          allCount: all.length,
          publishedCount: published.length,
          draftCount: all.filter((p: any) => p.status === "draft").length,
          allPosts: all.map(summarize),
          publishedPosts: published.map(summarize),
          fetchedAt: new Date().toISOString(),
        });
      } catch (err: any) {
        console.error("DEBUG: BlogListing fetch error:", err);
        setError(
          err?.code === "permission-denied"
            ? "Unable to load posts: Firestore security rules are blocking public reads on blog_posts."
            : "Unable to load posts. Please try again later."
        );
        setPosts([]);
        setDebugInfo({
          allCount: 0,
          publishedCount: 0,
          draftCount: 0,
          allPosts: [],
          publishedPosts: [],
          fetchedAt: new Date().toISOString(),
          error: err?.message || String(err),
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Collect unique tags from published posts
  const categories = Array.from(
    new Set(posts.flatMap(p => p.tags?.length ? p.tags : [p.tag]).filter(Boolean))
  );

  // Filter by search query + active category
  const filteredPosts = posts.filter(post => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(q) ||
      (post.excerpt || "").toLowerCase().includes(q);
    const postTags = post.tags?.length ? post.tags : [post.tag];
    const matchesCategory = activeCategory === "All" || postTags.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero / Search */}
        <section className="py-20 bg-accent/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 text-foreground mb-6">
                UST{" "}
                <span className="text-accent underline decoration-accent/20 underline-offset-8">
                  Perspectives
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Insights, guides, and stories from the heart of the African tech ecosystem.
              </p>
            </div>

            <BlogSearch
              onSearch={setSearchQuery}
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </section>

        {/* Posts grid */}
        <section className="py-20">
          <div className="container">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="animate-spin mb-4 text-accent" size={40} />
                <p className="font-semibold tracking-wide">Fetching the latest insights...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-destructive/40">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4 text-destructive text-2xl">
                  ⚠️
                </div>
                <h3 className="font-display text-xl font-700 text-foreground mb-2">
                  Couldn't load articles
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">{error}</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border/60">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground text-2xl">
                  🔍
                </div>
                <h3 className="font-display text-xl font-700 text-foreground mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogListing;
