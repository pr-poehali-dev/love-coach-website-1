import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";
import Logo from "@/components/ui/Logo";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  setShowPaymentModal: (show: boolean) => void;
  scrollToSection: (section: string) => void;
}

const Header = ({ isMenuOpen, setIsMenuOpen, setShowPaymentModal, scrollToSection }: HeaderProps) => {
  const navigate = useNavigate();
  const navItems = [
    { href: "services", label: "Услуги" },
    { href: "about", label: "О нас" },
    { href: "prices", label: "Цены" },
    { href: "blog", label: "Блог", isExternal: true },
    { href: "faq", label: "Вопросы" },
    { href: "contact", label: "Контакты" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo onClick={() => navigate('/')} />
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button 
                key={item.href}
                onClick={() => {
                  if (item.isExternal) {
                    navigate(`/${item.href}`);
                  } else {
                    scrollToSection(item.href);
                  }
                }}
                className="text-gray-600 hover:text-primary transition-colors relative group"
                aria-label={`Перейти к разделу ${item.label}`}
              >
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <Button 
                onClick={() => setShowPaymentModal(true)}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
                aria-label="Открыть форму оплаты"
              >
                <Icon name="CreditCard" className="mr-2 h-4 w-4" />
                Оплата
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary hover:bg-primary/90 group relative overflow-hidden"
                aria-label="Записаться на консультацию"
              >
                <span className="relative z-10">
                  Записаться
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
              </Button>
            </div>
            
            {/* Mobile menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  aria-label="Открыть меню навигации"
                >
                  <Icon name="Menu" className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[400px] overflow-y-auto max-h-screen"
                aria-label="Меню навигации"
              >
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Icon name="Heart" className="h-7 w-7 text-primary" style={{ strokeWidth: 2.7 }} />
                    <div className="relative">
                      <span className="text-2xl font-bold text-gray-900">workstab</span>
                      <span className="absolute -bottom-3 -right-2 text-base font-bold text-primary">.com</span>
                    </div>
                  </div>
                  
                  {navItems.map((item) => (
                    <button 
                      key={item.href}
                      onClick={() => {
                        if (item.isExternal) {
                          navigate(`/${item.href}`);
                        } else {
                          scrollToSection(item.href);
                        }
                        setTimeout(() => setIsMenuOpen(false), 100);
                      }}
                      className="text-lg text-gray-700 hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5 text-left w-full"
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  <div className="space-y-3 mt-6">
                    <Button 
                      onClick={() => {
                        setShowPaymentModal(true);
                        setTimeout(() => setIsMenuOpen(false), 100);
                      }}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/5"
                    >
                      <Icon name="CreditCard" className="mr-2 h-5 w-5" />
                      Оплата
                    </Button>
                    <Button 
                      onClick={() => {
                        scrollToSection('contact');
                        setTimeout(() => setIsMenuOpen(false), 100);
                      }}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Icon name="Calendar" className="mr-2 h-5 w-5" />
                      Записаться на консультацию
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;