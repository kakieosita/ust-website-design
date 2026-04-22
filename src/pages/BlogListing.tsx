import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import BlogSearch from "@/components/BlogSearch";
import { blogPosts as mockPosts, BlogPost } from "@/lib/blog-data";
import { getPublishedPosts, getPostsByTag } from "@/lib/firebase/blog-service";
import { Loader2 } from "lucide-react";

const BlogListing = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Only fetch PUBLISHED posts for the public page
        const data = await getPublishedPosts();
        
        // Only fallback to mock data if Firestore is absolutely empty or unreachable
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          console.warn("No published posts found in Firestore, falling back to local data.");
          setPosts(mockPosts);
        }
      } catch (error) {
        console.error("DEBUG: BlogListing fetch error:", error);
        setPosts(mockPosts);
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
