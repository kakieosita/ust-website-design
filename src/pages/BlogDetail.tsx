import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import BlogCommentSection from "@/components/BlogCommentSection";
import { blogPosts as mockPosts, BlogPost } from "@/lib/blog-data";
import { getPostBySlug, getPostsByTag } from "@/lib/firebase/blog-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await getPostBySlug(slug);
        if (data && data.status === "published") {
          setPost(data);
          // Fetch related by first tag
          const tagToSearch = (data.tags && data.tags.length > 0) ? data.tags[0] : data.tag;
          if (tagToSearch) {
              const related = await getPostsByTag(tagToSearch);
              setRelatedPosts(related.filter(p => p.slug !== slug).slice(0, 3));
          }
        } else {
          // Fallback to mock
          const mock = mockPosts.find(p => p.slug === slug);
          if (mock) {
            setPost(mock);
            const mockTag = (mock.tags && mock.tags.length > 0) ? mock.tags[0] : mock.tag;
            setRelatedPosts(mockPosts.filter(p => ((p.tags && p.tags.includes(mockTag)) || p.tag === mockTag) && p.slug !== slug).slice(0, 3));
          }
        }
      } catch (error) {
        console.error("Firestore error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/blog"><Button variant="cta">Back to Blog</Button></Link>
      </div>
    );
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const primaryTag = (post.tags && post.tags.length > 0) ? post.tags[0] : post.tag;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <article className="pb-24">
          {/* Hero Section */}
          <header className="py-20 bg-card border-b border-border/50">
            <div className="container max-w-4xl">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-8 hover:gap-3 transition-all"
              >
                <ArrowLeft size={16} /> Back to Blog
              </Link>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                  {primaryTag}
                </span>
                <span className="text-muted-foreground text-xs">• {post.readTime}</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 text-foreground mb-8 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center justify-between gap-6 py-6 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-accent/20">
                    <AvatarImage src={post.authorImage} />
                    <AvatarFallback className="bg-accent/10 text-accent font-bold">{post.author ? post.author[0] : 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-700 text-foreground text-md leading-none mb-1">{post.author}</p>
                    <p className="text-xs text-muted-foreground font-medium">{post.authorRole} • {post.date || post.publishedAt?.slice(0,10)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full w-9 h-9 border-border/60" onClick={copyLink}>
                    <LinkIcon size={16} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-9 h-9 border-border/60">
                    <Twitter size={16} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-9 h-9 border-border/60">
                    <Linkedin size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="container max-w-5xl -mt-10 mb-16">
            <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border-8 border-background bg-muted/30 flex items-center justify-center">
                {post.image ? (
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                   <span className="text-muted-foreground">No featured image</span>
                )}
            </div>
          </div>

          {/* Content area */}
          <div className="container max-w-3xl">
            <div 
              className="prose prose-lg prose-primary max-w-none dark:prose-invert
                prose-headings:font-display prose-headings:font-800 prose-headings:tracking-tight
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-strong:text-foreground prose-strong:font-700
                prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* SEO display for admins could go here, but public users don't need it */}
            
            {/* Share & Engage */}
            <div className="mt-16 pt-10 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-foreground">Share this article:</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-full gap-2 border-border/60">
                    <Twitter size={14} /> Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full gap-2 border-border/60">
                    <Linkedin size={14} /> LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full gap-2 border-border/60">
                    <Facebook size={14} /> Facebook
                  </Button>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-accent">
                <Share2 size={16} /> 24 Shares
              </Button>
            </div>

            <BlogCommentSection postId={post.id} />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-24 bg-muted/30 border-t border-border/50">
            <div className="container">
              <h2 className="font-display text-3xl font-800 text-foreground mb-12 text-center uppercase tracking-tight">Related Articles</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map(p => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
