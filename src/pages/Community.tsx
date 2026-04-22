import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityIntro from "@/components/CommunityIntro";
import CommunityPrograms from "@/components/CommunityPrograms";
import ImpactReports from "@/components/ImpactReports";
import CommunityGallery from "@/components/CommunityGallery";
import GetInvolvedSection from "@/components/GetInvolvedSection";

const Community = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-20">
      <CommunityIntro />
      <CommunityPrograms />
      <ImpactReports />
      <CommunityGallery />
      <GetInvolvedSection />
    </main>
    <Footer />
  </div>
);

export default Community;
