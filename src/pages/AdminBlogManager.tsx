import { useState, useEffect, useRef, useCallback } from "react";
import {
  Plus, Search, Edit2, Trash2, Eye, EyeOff, ArrowLeft,
  Loader2, Calendar, User as UserIcon, ImagePlus, X, Tag,
  Globe, FileText, CheckCircle2, Clock, Upload, Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BlogPost } from "@/lib/blog-data";
import {
  getAllPosts, createPost, updatePost, deletePost,
  togglePostStatus, uploadFeaturedImage,
} from "@/lib/firebase/blog-service";

// ─── Quill toolbar config ─────────────────────────────────────────────────────
const QUILL_MODULES = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ align: [] }],
    ["clean"],
  ],
};
const QUILL_FORMATS = [
  "header", "bold", "italic", "underline", "strike", "blockquote", "code-block",
  "list", "bullet", "link", "image", "align",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const slugify = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

const PRESET_TAGS = ["Insights", "Education", "Careers", "Tech", "News", "Events", "Alumni"];

const emptyPost = (): Partial<BlogPost> => ({
  title: "", slug: "", excerpt: "", content: "",
  image: "", tags: [], author: "Admin", authorRole: "UST Staff",
  authorImage: "", status: "draft",
  seoTitle: "", seoDescription: "",
});

// ─── Status badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: "draft" | "published" }) =>
  status === "published" ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
      <CheckCircle2 size={10} /> Published
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
      <Clock size={10} /> Draft
    </span>
  );

// ─── Main Component ────────────────────────────────────────────────────────────
const AdminBlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "edit">("list");
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>(emptyPost());
  const [saving, setSaving] = useState(false);
  const [savingAs, setSavingAs] = useState<"draft" | "published" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // ── Auto-slug from title ──────────────────────────────────────────────────
  const handleTitleChange = (title: string) => {
    setCurrentPost(p => ({
      ...p, title,
      // Only auto-generate if slug is empty or was auto-generated
      slug: !p.id || p.slug === slugify(p.title || "") ? slugify(title) : p.slug,
    }));
  };

  // ── Tag management ────────────────────────────────────────────────────────
  const addTag = (tag: string) => {
    const t = tag.trim();
    if (!t || currentPost.tags?.includes(t)) return;
    setCurrentPost(p => ({ ...p, tags: [...(p.tags || []), t] }));
    setTagInput("");
  };
  const removeTag = (tag: string) =>
    setCurrentPost(p => ({ ...p, tags: (p.tags || []).filter(t => t !== tag) }));

  // ── Image selection ───────────────────────────────────────────────────────
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ── Save handler ──────────────────────────────────────────────────────────
  const handleSave = async (targetStatus: "draft" | "published") => {
    if (!currentPost.title?.trim()) {
      toast.error("Please add a title before saving.");
      return;
    }
    setSaving(true);
    setSavingAs(targetStatus);

    try {
      let imageUrl = currentPost.image || "";

      // Upload image if a new file was selected
      if (imageFile) {
        setUploadingImage(true);
        try {
          imageUrl = await uploadFeaturedImage(
            imageFile,
            currentPost.slug || slugify(currentPost.title || "untitled")
          );
        } catch (err: any) {
          throw new Error("Image upload failed. " + err.message);
        } finally {
          setUploadingImage(false);
        }
      }

      const payload: Partial<BlogPost> = {
        ...currentPost,
        image: imageUrl,
        status: targetStatus,
        tag: (currentPost.tags || [])[0] || "",
      };

      if (currentPost.id) {
        await updatePost(currentPost.id, payload);
        toast.success(targetStatus === "published" ? "Post published! 🎉" : "Draft saved.");
      } else {
        await createPost(payload as Omit<BlogPost, "id" | "createdAt" | "updatedAt">);
        toast.success(targetStatus === "published" ? "Post published! 🎉" : "Draft created.");
      }

      setImageFile(null);
      setImagePreview("");
      setView("list");
      fetchPosts();
    } catch (error: any) {
      console.error(error);
      toast.error("Save failed: " + (error.message || "Unknown error"));
    } finally {
      setSaving(false);
      setSavingAs(null);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setImagePreview(post.image || "");
    setImageFile(null);
    setView("edit");
  };

  const handleCreate = () => {
    setCurrentPost(emptyPost());
    setImagePreview("");
    setImageFile(null);
    setView("edit");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    try {
      await deletePost(id);
      toast.success("Post deleted.");
      fetchPosts();
    } catch {
      toast.error("Delete failed.");
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    try {
      await togglePostStatus(post.id, post.status);
      toast.success(post.status === "published" ? "Moved to drafts." : "Post published! 🎉");
      fetchPosts();
    } catch {
      toast.error("Failed to update status.");
    }
  };

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filtered = posts.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(q) || (p.excerpt || "").toLowerCase().includes(q);
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // EDITOR VIEW
  // ─────────────────────────────────────────────────────────────────────────────
  if (view === "edit") {
    const isEditing = !!currentPost.id;

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Top bar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Button variant="ghost" onClick={() => setView("list")} className="gap-2 -ml-2 rounded-xl">
            <ArrowLeft size={18} /> Back to Posts
          </Button>
          <div className="flex gap-3 flex-wrap">
            <Button
              variant="outline"
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="rounded-xl gap-2"
            >
              {savingAs === "draft" ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
              Save Draft
            </Button>
            <Button
              variant="cta"
              onClick={() => handleSave("published")}
              disabled={saving}
              className="rounded-xl gap-2 px-6 shadow-lg shadow-accent/20"
            >
              {savingAs === "published" ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
              {currentPost.status === "published" ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* ── Left Column: Main Content ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card className="border-border/60 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-bold">Article Title *</Label>
                  <Input
                    value={currentPost.title || ""}
                    onChange={e => handleTitleChange(e.target.value)}
                    placeholder="Enter a compelling title..."
                    className="text-lg font-bold h-12 rounded-xl border-border/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold flex items-center gap-2">
                    Slug (URL path)
                    <span className="text-xs text-muted-foreground font-normal">Auto-generated from title</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground shrink-0">/blog/</span>
                    <Input
                      value={currentPost.slug || ""}
                      onChange={e => setCurrentPost(p => ({ ...p, slug: e.target.value }))}
                      placeholder="post-url-slug"
                      className="rounded-xl border-border/60 font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold">Excerpt (Preview Text)</Label>
                  <Textarea
                    value={currentPost.excerpt || ""}
                    onChange={e => setCurrentPost(p => ({ ...p, excerpt: e.target.value }))}
                    placeholder="A short summary shown in blog listings..."
                    className="rounded-xl border-border/60 min-h-[80px] resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Rich Text Editor */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold">Article Content</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pb-6">
                <div className="bg-white rounded-b-xl overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={currentPost.content || ""}
                    onChange={val => setCurrentPost(p => ({ ...p, content: val }))}
                    modules={QUILL_MODULES}
                    formats={QUILL_FORMATS}
                    className="min-h-[450px]"
                    placeholder="Start writing your article..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO Panel */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Globe size={16} className="text-accent" /> SEO Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-bold">SEO Title</Label>
                  <Input
                    value={currentPost.seoTitle || ""}
                    onChange={e => setCurrentPost(p => ({ ...p, seoTitle: e.target.value }))}
                    placeholder={currentPost.title || "SEO page title..."}
                    className="rounded-xl border-border/60"
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground">{(currentPost.seoTitle || "").length}/60 characters</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold">SEO Description</Label>
                  <Textarea
                    value={currentPost.seoDescription || ""}
                    onChange={e => setCurrentPost(p => ({ ...p, seoDescription: e.target.value }))}
                    placeholder={currentPost.excerpt || "Brief description for search engines..."}
                    className="rounded-xl border-border/60 min-h-[80px] resize-none"
                    maxLength={160}
                  />
                  <p className="text-xs text-muted-foreground">{(currentPost.seoDescription || "").length}/160 characters</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Right Column: Sidebar ── */}
          <div className="space-y-6">
            {/* Status */}
            <Card className="border-border/60 shadow-sm">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Status</span>
                  <StatusBadge status={(currentPost.status as "draft" | "published") || "draft"} />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {currentPost.status === "published"
                    ? "This post is live. Click \"Update Post\" to save changes."
                    : "Save as Draft to keep it private, or Publish to make it live."}
                </p>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <ImagePlus size={15} className="text-accent" /> Featured Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(imagePreview || currentPost.image) ? (
                  <div className="relative group rounded-xl overflow-hidden aspect-video border border-border/60">
                    <img
                      src={imagePreview || currentPost.image}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg bg-white text-foreground border-white gap-1 text-xs"
                        onClick={() => imageInputRef.current?.click()}
                      >
                        <Upload size={12} /> Change
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg bg-white text-red-500 border-white gap-1 text-xs"
                        onClick={() => {
                          setImagePreview("");
                          setImageFile(null);
                          setCurrentPost(p => ({ ...p, image: "" }));
                        }}
                      >
                        <X size={12} /> Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="w-full aspect-video border-2 border-dashed border-border/60 rounded-xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    <ImagePlus size={28} />
                    <span className="text-xs font-semibold">Click to upload image</span>
                    <span className="text-[10px]">JPG, PNG, WebP — max 5MB</span>
                  </button>
                )}
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
                {imageFile && (
                  <p className="text-xs text-accent font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} /> {imageFile.name} selected — will upload on save
                  </p>
                )}
                {uploadingImage && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Loader2 size={12} className="animate-spin" /> Uploading to Cloudinary...
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Tag size={15} className="text-accent" /> Tags & Category
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Selected tags */}
                {(currentPost.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {(currentPost.tags || []).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold"
                      >
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Preset tags */}
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_TAGS.filter(t => !(currentPost.tags || []).includes(t)).map(tag => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      className="px-2.5 py-1 rounded-full border border-border/60 text-[11px] font-semibold text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>

                {/* Custom tag input */}
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag(tagInput))}
                    placeholder="Custom tag..."
                    className="rounded-xl text-sm h-9 border-border/60"
                  />
                  <Button size="sm" variant="outline" onClick={() => addTag(tagInput)} className="rounded-xl px-3 h-9">
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Author */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <UserIcon size={15} className="text-accent" /> Author
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Name</Label>
                  <Input
                    value={currentPost.author || ""}
                    onChange={e => setCurrentPost(p => ({ ...p, author: e.target.value }))}
                    className="rounded-xl text-sm h-9 border-border/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Role / Title</Label>
                  <Input
                    value={currentPost.authorRole || ""}
                    onChange={e => setCurrentPost(p => ({ ...p, authorRole: e.target.value }))}
                    className="rounded-xl text-sm h-9 border-border/60"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // LIST VIEW
  // ─────────────────────────────────────────────────────────────────────────────
  const publishedCount = posts.filter(p => p.status === "published").length;
  const draftCount = posts.filter(p => p.status === "draft").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-800 text-foreground mb-1 tracking-tight">Blog Management</h2>
          <p className="text-muted-foreground text-sm">Create, edit, and manage your website articles.</p>
        </div>
        <Button onClick={handleCreate} variant="cta" className="rounded-xl gap-2 h-11 px-6 shadow-lg shadow-accent/20">
          <Plus size={18} /> New Post
        </Button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Posts", value: posts.length, icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Published", value: publishedCount, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Drafts", value: draftCount, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        ].map(s => (
          <Card key={s.label} className="border-border/60 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
                <s.icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-800 text-foreground">{s.value}</p>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-5 border-b border-border/50 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="pl-9 rounded-xl border-border/60"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "published", "draft"] as const).map(s => (
              <Button
                key={s}
                variant={filterStatus === s ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(s)}
                className="rounded-xl capitalize"
              >
                {s === "all" ? "All" : s === "published" ? "Published" : "Drafts"}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="animate-spin mb-3 text-accent" size={36} />
              <p className="font-semibold">Loading posts...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center text-muted-foreground">
              <FileText size={40} className="mb-3 opacity-30" />
              <p className="font-bold text-lg text-foreground mb-1">No posts found</p>
              <p className="text-sm">
                {searchQuery ? "Try a different search term" : "Click \"New Post\" to get started"}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-muted/30 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-left">
                <tr>
                  <th className="px-6 py-4">Post</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Tags</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filtered.map(post => (
                  <tr key={post.id} className="hover:bg-muted/20 transition-colors group">
                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-lg overflow-hidden border border-border/40 shrink-0 bg-muted/30">
                          {post.image ? (
                            <img src={post.image} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImagePlus size={16} className="text-muted-foreground/40" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-foreground group-hover:text-accent transition-colors text-sm line-clamp-1">
                            {post.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground font-mono">/blog/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(post.tags || [post.tag]).filter(Boolean).slice(0, 2).map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-muted-foreground font-semibold">{post.author}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-muted-foreground">{post.date || post.publishedAt?.slice(0, 10)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* Toggle publish */}
                        <Button
                          variant="ghost"
                          size="icon"
                          title={post.status === "published" ? "Unpublish" : "Publish"}
                          className={`w-8 h-8 rounded-lg ${post.status === "published" ? "hover:bg-amber-50 hover:text-amber-600" : "hover:bg-emerald-50 hover:text-emerald-600"}`}
                          onClick={() => handleToggleStatus(post)}
                        >
                          {post.status === "published" ? <EyeOff size={15} /> : <Eye size={15} />}
                        </Button>
                        {/* Edit */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 rounded-lg hover:bg-accent/10 hover:text-accent"
                          onClick={() => handleEdit(post)}
                        >
                          <Edit2 size={15} />
                        </Button>
                        {/* Delete */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 rounded-lg hover:bg-red-50 hover:text-red-500"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 size={15} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdminBlogManager;
