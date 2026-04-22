import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BlogCommentSection = () => {
  const [comments, setComments] = useState([
    { id: 1, author: "Tunde Bakare", date: "2 days ago", content: "Great insights! This really cleared up my confusion between universities and bootcamps." },
    { id: 2, author: "Chidera Uzor", date: "1 week ago", content: "Excited to see more posts on Cybersecurity. Do you offer scholarship opportunities for these courses?" },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      author: "Guest User",
      date: "Just now",
      content: newComment,
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="mt-20 pt-12 border-t border-border/50 max-w-3xl mx-auto">
      <h3 className="font-display text-2xl font-800 text-foreground mb-10">Comments ({comments.length})</h3>

      <form onSubmit={handleSubmit} className="mb-12 bg-muted/30 p-6 rounded-2xl border border-border/40">
        <div className="space-y-4">
          <Label htmlFor="comment" className="text-sm font-semibold">Join the discussion</Label>
          <Textarea 
            id="comment" 
            placeholder="What are your thoughts on this article?" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[120px] rounded-xl border-border/60 bg-white"
          />
          <Button type="submit" variant="cta" className="rounded-full px-8">Post Comment</Button>
        </div>
      </form>

      <div className="space-y-10">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-4">
            <Avatar className="w-10 h-10 shadow-sm border border-border/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-accent/10 text-accent font-bold">{c.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-700 text-foreground text-sm">{c.author}</span>
                <span className="text-xs text-muted-foreground">{c.date}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "{c.content}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCommentSection;
