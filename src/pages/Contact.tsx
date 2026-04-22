import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import OfficeInfo from "@/components/OfficeInfo";
import MapSection from "@/components/MapSection";
import LiveChatPlaceholder from "@/components/LiveChatPlaceholder";

const Contact = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-20">
      <ContactHero />
      <div className="container py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <ContactForm />
          <OfficeInfo />
        </div>
      </div>
      <MapSection />
      <LiveChatPlaceholder />
    </main>
    <Footer />
  </div>
);

export default Contact;
