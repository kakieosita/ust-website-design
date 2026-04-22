import { useState, useEffect } from "react";
import { 
  Save, 
  RefreshCw, 
  Layout, 
  MousePointer2, 
  Image as ImageIcon,
  Type,
  List as ListIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { firestoreService } from "@/lib/firebase/services";
import { toast } from "sonner";

const AdminPageEditor = () => {
  const [selectedPage, setSelectedPage] = useState("about");
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPageContent();
  }, [selectedPage]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const data = await firestoreService.getOne("pages", selectedPage);
      if (data) {
        setContent(data);
      } else {
        setContent(null);
        toast.info("No content found for this page. You can create it by saving.");
      }
    } catch (error) {
      toast.error("Failed to load page content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (content.id) {
        const { id, ...saveData } = content;
        await firestoreService.update("pages", id, saveData);
      } else {
        await firestoreService.create("pages", { ...content, id: selectedPage });
      }
      toast.success("Page updated successfully!");
    } catch (error) {
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-muted-foreground animate-pulse">
        <RefreshCw className="animate-spin mb-4" size={32} />
        <p>Loading page schema from Firestore...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-800 text-foreground mb-2 uppercase">Page Content Editor</h2>
          <p className="text-muted-foreground italic">Modify text and metadata for specific website routes.</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger className="w-[200px] rounded-xl font-bold border-accent/20 text-accent">
              <SelectValue placeholder="Select Page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="about">About Page</SelectItem>
              <SelectItem value="community">Community Page</SelectItem>
              <SelectItem value="partners">Partners Page</SelectItem>
              <SelectItem value="home">Home Page</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSave} disabled={saving || !content} variant="cta" className="rounded-xl gap-2 shadow-lg shadow-accent/20 min-w-[120px]">
            {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
            {saving ? "Saving..." : "Save Page"}
          </Button>
        </div>
      </div>

      {!content ? (
        <Card className="border-border/60 shadow-sm border-dashed text-center py-20">
          <CardContent>
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layout size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-bold text-xl mb-2">No Configuration Set</h3>
            <p className="text-muted-foreground mb-8">Run the "Seed Database" utility from the main dashboard to initialize this page's schema.</p>
            <Button variant="outline" className="rounded-xl">Go to Dashboard</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Section: Hero */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <Type size={20} />
              </div>
              <CardTitle className="font-display text-xl">Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Main Heading</Label>
                <Input 
                  value={content.hero?.title || ""} 
                  onChange={(e) => updateSection("hero", "title", e.target.value)}
                  className="rounded-xl font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sub-heading / Description</Label>
                <Textarea 
                  value={content.hero?.subtitle || ""} 
                  onChange={(e) => updateSection("hero", "subtitle", e.target.value)}
                  className="rounded-xl min-h-[100px] leading-relaxed"
                />
              </div>
            </CardContent>
          </Card>

          {/* Section: Statistics */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <MousePointer2 size={20} />
              </div>
              <CardTitle className="font-display text-xl">Key Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Graduates</Label>
                  <Input 
                    value={content.stats?.graduates || ""} 
                    onChange={(e) => updateSection("stats", "graduates", e.target.value)}
                    className="rounded-xl text-center font-800 text-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Partners</Label>
                  <Input 
                    value={content.stats?.partners || ""} 
                    onChange={(e) => updateSection("stats", "partners", e.target.value)}
                    className="rounded-xl text-center font-800 text-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Success Rate</Label>
                  <Input 
                    value={content.stats?.satisfaction || ""} 
                    onChange={(e) => updateSection("stats", "satisfaction", e.target.value)}
                    className="rounded-xl text-center font-800 text-accent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Assets Preview (Read Only in this demo) */}
          <Card className="lg:col-span-2 border-border/60 shadow-sm bg-muted/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <ImageIcon size={20} className="text-muted-foreground" />
                <CardTitle className="text-lg">Page Layout Management</CardTitle>
              </div>
              <CardDescription>
                Advanced layout controls and multi-section editors are available in the specific component managers.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminPageEditor;
