import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Loader2 } from "lucide-react";
import { BlogPost } from "@/lib/blog-data";
import { getPublishedPosts } from "@/lib/firebase/blog-service";

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Show only what's in Firestore — no mock fallback so the
        // homepage always reflects real CMS state.
        const data = await getPublishedPosts();
        setPosts((data || []).slice(0, 3));
      } catch (error) {
        console.error("DEBUG: BlogSection fetch error:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">From Our Blog</p>
            <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground">Latest Articles</h2>
          </div>
          <Link to="/blog" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all">
            Read More <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="py-16 flex items-center justify-center text-muted-foreground">
            <Loader2 className="animate-spin text-accent" size={32} />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => {
              const primaryTag = (p.tags && p.tags.length > 0) ? p.tags[0] : p.tag;
              const displayDate = p.date || p.publishedAt?.slice(0, 10) || "";
              return (
                <Link
                  key={p.id || p.slug}
                  to={`/blog/${p.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border/60 hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="h-44 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (img.dataset.fallback !== "1") {
                            img.dataset.fallback = "1";
                            img.src =
                              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop";
                          }
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">{primaryTag}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={12} /> {displayDate}</span>
                    </div>
                    <h3 className="font-display text-base font-700 text-card-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
