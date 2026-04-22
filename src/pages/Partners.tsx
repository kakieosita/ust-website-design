import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnersIntro from "@/components/PartnersIntro";
import PartnershipTypes from "@/components/PartnershipTypes";
import PartnerLogoGrid from "@/components/PartnerLogoGrid";
import PartnersBenefitSection from "@/components/PartnersBenefitSection";
import PartnerApplicationForm from "@/components/PartnerApplicationForm";

const Partners = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-20">
      <PartnersIntro />
      <PartnershipTypes />
      <PartnerLogoGrid />
      <PartnersBenefitSection />
      <PartnerApplicationForm />
    </main>
    <Footer />
  </div>
);

export default Partners;
