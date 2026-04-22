import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StorySection from "@/components/StorySection";
import MissionVisionValues from "@/components/MissionVisionValues";
import LeadershipSection from "@/components/LeadershipSection";
import InstructorsDirectory from "@/components/InstructorsDirectory";
import AchievementsSection from "@/components/AchievementsSection";
import { firestoreService } from "@/lib/firebase/services";
import { Loader2 } from "lucide-react";

const About = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await firestoreService.getOne("pages", "about");
        setContent(data);
      } catch (error) {
        console.error("Failed to load about page content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero portion of the About page */}
        <section className="relative py-24 bg-accent/5 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 mask-image-b" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-10 opacity-50">
                  <Loader2 className="animate-spin text-accent mb-4" size={32} />
                  <p className="text-sm font-semibold tracking-widest uppercase">Fetching Content...</p>
                </div>
              ) : (
                <>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-800 text-foreground mb-8 leading-tight tracking-tighter">
                    {content?.hero?.title || "Empowering the Next Generation of Tech Talent"}
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {content?.hero?.subtitle || "Upskill School of Technology (UST) is more than just a training institute. We are a community of innovators, builders, and leaders committed to bridging the global tech talent gap."}
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <StorySection />
        <MissionVisionValues />
        <AchievementsSection />
        <LeadershipSection />
        <InstructorsDirectory />
      </main>
      <Footer />
    </div>
  );
};

export default About;
