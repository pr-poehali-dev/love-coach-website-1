import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useSEO from "@/hooks/useSEO";
import { getOrganizationStructuredData, getWebsiteStructuredData, getServiceStructuredData } from "@/utils/structuredData";

// Импорт созданных компонентов
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatisticsSection from "@/components/StatisticsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TariffDetails from "@/components/TariffDetails";
import PaymentModal from "@/components/PaymentModal";
import StickyButton from "@/components/StickyButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import BlogPreview from "@/components/BlogPreview";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTariffForm, setShowTariffForm] = useState(false);

  // SEO оптимизация главной страницы
  useSEO({
    title: "Коучинг отношений - Укрепление пар и развитие близости | workstab.com",
    description: "Профессиональный коучинг отношений и близости. Помогаем парам укрепить связь, преодолеть кризисы и построить счастливые отношения. Консультации онлайн.",
    keywords: "коучинг отношений, коуч по отношениям, близость в отношениях, семейный коуч, отношения, кризис в отношениях, парная терапия",
    url: "https://workstab.com",
    type: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        getOrganizationStructuredData(),
        getWebsiteStructuredData(),
        getServiceStructuredData()
      ]
    }
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Высота фиксированного хедера
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgressBar />
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setShowPaymentModal={setShowPaymentModal}
        scrollToSection={scrollToSection}
      />

      <HeroSection scrollToSection={scrollToSection} />

      <StatisticsSection />

      <TestimonialsSection />

      <AboutSection />

      <ServicesSection />

      <PricingSection 
        setShowContactForm={setShowContactForm}
        setSelectedTariff={setSelectedTariff}
      />

      <BlogPreview />

      <FaqSection />

      <ContactSection />

      <Footer scrollToSection={scrollToSection} />

      {/* Modals */}
      <TariffDetails 
        tariff={selectedTariff}
        isOpen={!!selectedTariff}
        onClose={() => setSelectedTariff(null)}
        showForm={showTariffForm}
        setShowForm={setShowTariffForm}
        setShowContactForm={setShowContactForm}
      />

      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="max-w-lg w-screen sm:w-[95vw] mx-0 sm:mx-auto h-screen sm:h-auto sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 sm:rounded-lg rounded-none">
          <DialogHeader>
            <DialogTitle className="text-base xs:text-lg sm:text-xl">Записаться на консультацию</DialogTitle>
            <DialogDescription className="text-xs xs:text-sm sm:text-base">
              Заполните форму и мы свяжемся с вами в течение 24 часов
            </DialogDescription>
          </DialogHeader>
          <ContactForm />
        </DialogContent>
      </Dialog>

      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
    </div>
  );
};

export default Index;