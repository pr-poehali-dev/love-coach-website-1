import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

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

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTariffForm, setShowTariffForm] = useState(false);
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
        <DialogContent className="max-w-lg w-[95vw] mx-2 xs:mx-4 max-h-[90vh] overflow-y-auto">
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