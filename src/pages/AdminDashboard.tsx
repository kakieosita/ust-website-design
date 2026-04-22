import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Menu,
  X,
  PlusCircle,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/firebase/auth";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Blog Posts", href: "/admin/blog", icon: FileText },
    { label: "Page Content", href: "/admin/pages", icon: Settings },
    { label: "Partners", href: "/admin/partners", icon: Briefcase },
    { label: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-background border-b p-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="font-display font-800 text-xl tracking-tight">UST CMS</h1>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border/60 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 shadow-lg md:shadow-none
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border/50">
            <h1 className="font-display font-800 text-2xl tracking-tighter text-foreground">UST <span className="text-accent italic">CMS</span></h1>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link 
                  key={item.label}
                  to={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group
                    ${isActive ? "bg-accent text-white shadow-md shadow-accent/20" : "text-muted-foreground hover:bg-muted hover:text-foreground"}
                  `}
                >
                  <item.icon size={18} className={`${isActive ? "text-white" : "text-muted-foreground group-hover:text-accent"}`} />
                  {item.label}
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border/50 space-y-4">
            <div className="bg-muted/50 p-4 rounded-xl">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Signed in as</p>
              <p className="text-sm font-bold text-foreground truncate">Admin User</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50/50 border-red-100"
              onClick={handleLogout}
            >
              <LogOut size={18} /> Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
