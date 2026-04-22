import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Globe, 
  Image as ImageIcon,
  Loader2,
  ExternalLink,
  Save,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { firestoreService } from "@/lib/firebase/services";
import { toast } from "sonner";

interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  category: string;
}

const AdminPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Partner>>({
    name: "",
    logo: "/assets/partner-placeholder.png",
    website: "https://",
    category: "Corporate"
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const data = await firestoreService.getAll<Partner>("partners");
      setPartners(data);
    } catch (error) {
      toast.error("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await firestoreService.update("partners", editingId, formData);
        toast.success("Partner updated");
      } else {
        await firestoreService.create("partners", formData);
        toast.success("Partner added");
      }
      setEditingId(null);
      setFormData({ name: "", logo: "/assets/partner-placeholder.png", website: "https://", category: "Corporate" });
      fetchPartners();
    } catch (error) {
      toast.error("Process failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await firestoreService.delete("partners", id);
      toast.success("Partner removed");
      fetchPartners();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const startEdit = (partner: Partner) => {
    setEditingId(partner.id);
    setFormData(partner);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-800 text-foreground mb-2 uppercase">Partner Management</h2>
          <p className="text-muted-foreground italic">Manage institutional collaborations and logo grid.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <Card className="border-border/60 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {editingId ? <Edit2 size={18} /> : <Plus size={18} />}
              {editingId ? "Edit Partner" : "Add New Partner"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g. Google Nigeria"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Logo URL</Label>
                <div className="flex gap-2">
                  <Input 
                    value={formData.logo} 
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    required
                    placeholder="/assets/logo.png"
                    className="rounded-xl"
                  />
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border/40 overflow-hidden">
                    <img src={formData.logo} className="w-full h-full object-contain p-1" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Website URL</Label>
                <Input 
                  value={formData.website} 
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://..."
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input 
                  value={formData.category} 
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Corporate / STEM / NGO"
                  className="rounded-xl"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={saving} variant="cta" className="flex-1 rounded-xl">
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} className="mr-2" />}
                  {editingId ? "Update" : "Create"}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" className="rounded-xl" onClick={() => { setEditingId(null); setFormData({ name: "", logo: "/assets/partner-placeholder.png", website: "https://", category: "Corporate" }); }}>
                    <X size={18} />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* List Column */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p>Loading logos...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {partners.map((partner) => (
                <Card key={partner.id} className="border-border/60 shadow-sm group hover:border-accent/40 transition-colors">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-muted/50 p-2 border border-border/40 overflow-hidden shrink-0">
                      <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground truncate">{partner.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/5 px-2 py-0.5 rounded-full border border-accent/10">
                          {partner.category}
                        </span>
                        <a href={partner.website} target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={() => startEdit(partner)}>
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:text-red-500" onClick={() => handleDelete(partner.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {partners.length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-border/60 rounded-3xl">
                  <ImageIcon size={48} className="mx-auto mb-4 text-muted-foreground/30" />
                  <p className="text-muted-foreground font-semibold italic underline underline-offset-8 decoration-accent/20">No partners listed in Firestore yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPartners;
