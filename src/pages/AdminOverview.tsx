import { useState, useEffect } from "react";
import { 
  Users, 
  FileText, 
  Eye, 
  TrendingUp, 
  Database,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { seedDatabase } from "@/lib/firebase/seed-data";
import { toast } from "sonner";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    posts: 0,
    pageViews: "12,402",
    users: 0,
    activePrograms: 8
  });
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const postsSnap = await getCountFromServer(collection(db, "blog_posts"));
        const usersSnap = await getCountFromServer(collection(db, "users"));
        setStats(prev => ({
          ...prev,
          posts: postsSnap.data().count,
          users: usersSnap.data().count
        }));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const handleSeed = async () => {
    if (!confirm("Are you sure you want to seed the database? This might overwrite existing data with the same IDs.")) return;
    
    setSeeding(true);
    const result = await seedDatabase();
    setSeeding(false);

    if (result.success) {
      toast.success("Database seeded successfully!");
    } else {
      toast.error("Seeding failed. Check your Firebase connection.");
    }
  };

  const statCards = [
    { title: "Total Posts", value: stats.posts, icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Avg. Views", value: stats.pageViews, icon: Eye, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Admin Users", value: stats.users, icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Engagement", value: "+14.2%", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-800 text-foreground mb-2">Welcome to your Dashboard</h2>
        <p className="text-muted-foreground">Here is what is happening with your website today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border/60 shadow-sm overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <p className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-3xl font-800 text-foreground tracking-tight">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mt-12">
        {/* System Health */}
        <Card className="lg:col-span-2 border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="font-display text-xl">Quick Actions & Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 rounded-3xl bg-accent/5 border border-accent/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Database size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Initialize Content</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Seed your Firestore database with the initial website contents (About, Blog, Partners).
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleSeed} 
                disabled={seeding}
                variant="cta" 
                className="rounded-xl px-6 min-w-[140px]"
              >
                {seeding ? "Seeding..." : "Seed Database"}
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-border/40 hover:bg-muted/30 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span className="font-bold text-sm">Auth Sync</span>
                </div>
                <p className="text-xs text-muted-foreground">Connected to Firebase Authentication</p>
              </div>
              <div className="p-4 rounded-2xl border border-border/40 hover:bg-muted/30 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle size={18} className="text-amber-500" />
                  <span className="font-bold text-sm">Storage Rules</span>
                </div>
                <p className="text-xs text-muted-foreground">Review your public access permissions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Mockup */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="font-display text-xl">System Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 pb-4 border-b border-border/40 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Admin logged in</p>
                    <p className="text-xs text-muted-foreground">2 hours ago • IP: 192.168.1.{i}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
