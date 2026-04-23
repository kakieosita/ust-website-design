import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/firebase/AuthContext";
import Index from "./pages/Index.tsx";
import Programs from "./pages/Programs.tsx";
import ProgramDetail from "./pages/ProgramDetail.tsx";
import About from "./pages/About.tsx";
import Partners from "./pages/Partners.tsx";
import Community from "./pages/Community.tsx";
import BlogListing from "./pages/BlogListing.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";
import Contact from "./pages/Contact.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminRegister from "./pages/AdminRegister.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminOverview from "./pages/AdminOverview.tsx";
import AdminBlogManager from "./pages/AdminBlogManager.tsx";
import AdminPageEditor from "./pages/AdminPageEditor.tsx";
import AdminPartners from "./pages/AdminPartners.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminOverview />} />
              <Route path="dashboard" element={<AdminOverview />} />
              <Route path="blog" element={<AdminBlogManager />} />
              <Route path="pages" element={<AdminPageEditor />} />
              <Route path="partners" element={<AdminPartners />} />
              <Route path="users" element={<div>User Management</div>} />
            </Route>
          </Route>

          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
);

export default App;
