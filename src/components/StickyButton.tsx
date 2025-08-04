import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface StickyButtonProps {
  onClick: () => void;
}

const StickyButton = ({ onClick }: StickyButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      const heroSection = document.querySelector('[data-section="hero"]');
      const contactSection = document.querySelector('[data-section="contact"]');
      
      let shouldShow = scrolled;
      
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const isContactVisible = contactRect.top < window.innerHeight;
        shouldShow = scrolled && !isContactVisible;
      }
      
      setIsVisible(shouldShow);
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Плавающая кнопка */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}>
        <Button
          onClick={onClick}
          size="lg"
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-floating hover:shadow-glow transition-all duration-300 animate-pulse-glow group relative overflow-hidden"
        >
          <Icon name="MessageSquare" className="h-6 w-6 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        </Button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            Записаться на консультацию
            <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 rotate-45 transform -translate-y-1"></div>
          </div>
        </div>
      </div>

      {/* Мобильная sticky кнопка */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 sm:hidden transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 shadow-2xl">
          <Button
            onClick={onClick}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              <Icon name="Calendar" className="mr-2 h-5 w-5" />
              Записаться на консультацию
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default StickyButton;