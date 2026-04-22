import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCommentsByPostId, addComment, Comment } from "@/lib/firebase/comment-service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BlogCommentSectionProps {
  postId: string;
}

const BlogCommentSection = ({ postId }: BlogCommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return;
      try {
        const data = await getCommentsByPostId(postId);
        setComments(data);
      } catch (error) {
        console.error("Failed to load comments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setSubmitting(true);
    try {
      const author = "Guest User"; // In a real app, this would come from auth
      const comment = await addComment(postId, author, newComment);
      setComments([comment, ...comments]);
      setNewComment("");
      toast.success("Comment posted!");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-20 flex justify-center py-10">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

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
            disabled={submitting}
            className="min-h-[120px] rounded-xl border-border/60 bg-white"
          />
          <Button type="submit" variant="cta" disabled={submitting} className="rounded-full px-8">
            {submitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </form>

      <div className="space-y-10">
        {comments.map((c) => {
          const dateStr = c.createdAt?.seconds 
            ? new Date(c.createdAt.seconds * 1000).toLocaleDateString()
            : "Just now";
            
          return (
            <div key={c.id} className="flex gap-4">
              <Avatar className="w-10 h-10 shadow-sm border border-border/20">
                <AvatarFallback className="bg-accent/10 text-accent font-bold">
                  {c.author ? c.author[0] : "G"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-700 text-foreground text-sm">{c.author}</span>
                  <span className="text-xs text-muted-foreground">{dateStr}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{c.content}"
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogCommentSection;
