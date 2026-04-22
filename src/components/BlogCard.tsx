import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const primaryTag = (post.tags && post.tags.length > 0) ? post.tags[0] : post.tag;
  const displayDate = post.date || post.publishedAt?.slice(0,10) || "Unknown date";
  
  return (
  <Link 
    to={`/blog/${post.slug}`} 
    className="group bg-card rounded-2xl overflow-hidden border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
  >
    <div className="relative h-56 overflow-hidden bg-muted/30">
      {post.image ? (
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
      ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No Image</div>
      )}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-accent text-[10px] font-bold uppercase tracking-wider shadow-sm">
          {primaryTag}
        </span>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
        <span>•</span>
        <span>{displayDate}</span>
      </div>
      <h3 className="font-display text-xl font-700 text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
        {post.title}
      </h3>
      <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
        {post.excerpt}
      </p>
      <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center overflow-hidden">
            {post.authorImage ? (
                <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
            ) : (
                <span className="text-accent font-bold text-xs">{post.author ? post.author[0] : 'U'}</span>
            )}
          </div>
          <span className="text-xs font-semibold text-foreground">{post.author}</span>
        </div>
        <ArrowRight size={18} className="text-accent transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>
)};

export default BlogCard;
