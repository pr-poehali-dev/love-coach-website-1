import Icon from "@/components/ui/icon";

interface FooterProps {
  scrollToSection: (section: string) => void;
}

const Footer = ({ scrollToSection }: FooterProps) => {
  const services = [
    { label: "Индивидуальный коучинг", section: "services" },
    { label: "Парная терапия", section: "services" },
    { label: "Онлайн поддержка", section: "services" },
    { label: "Семейное консультирование", section: "services" }
  ];

  const infoLinks = [
    { label: "О нас", section: "about" },
    { label: "Вопросы и ответы", section: "faq" },
    { label: "Публичная оферта", href: "/offer" },
    { label: "Политика конфиденциальности", href: "/privacy" }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="sm:col-span-2 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Heart" className="h-8 w-8 text-primary" />
              <span className="text-xl sm:text-2xl font-bold">Workstab.com</span>
            </div>
            <p className="text-gray-400 mb-4">
              Помогаем строить крепкие и счастливые отношения через понимание, принятие и любовь.
            </p>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-gray-400">
              {services.map((service, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(service.section)}
                    className="hover:text-white transition-colors"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Информация</h3>
            <ul className="space-y-2 text-gray-400">
              {infoLinks.map((link, index) => (
                <li key={index}>
                  {link.href ? (
                    <a 
                      href={link.href} 
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button 
                      onClick={() => scrollToSection(link.section!)}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Workstab.com. Все права защищены.</p>
          <p className="mt-2 text-sm">
            ИП [ФИО], ОГРНИП: [ОГРНИП], ИНН: [ИНН]<br />
            Юридический адрес: [Адрес регистрации ИП]
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;