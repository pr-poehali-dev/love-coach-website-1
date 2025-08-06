import { type NavItem } from '@/types/icons';

// Centralized navigation configuration
export const mainNavItems: NavItem[] = [
  { href: "services", label: "Услуги", section: "services" },
  { href: "about", label: "О нас", section: "about" },
  { href: "prices", label: "Цены", section: "prices" },
  { href: "blog", label: "Блог", isExternal: true },
  { href: "faq", label: "Вопросы", section: "faq" },
  { href: "contact", label: "Контакты", section: "contact" }
];

export const footerServiceItems: NavItem[] = [
  { href: "services", label: "Индивидуальный коучинг", section: "services" },
  { href: "services", label: "Парная терапия", section: "services" },
  { href: "services", label: "Онлайн поддержка", section: "services" },
  { href: "services", label: "Семейное консультирование", section: "services" }
];

export const footerInfoLinks: NavItem[] = [
  { href: "about", label: "О нас", section: "about" },
  { href: "/blog", label: "Блог", isExternal: true },
  { href: "faq", label: "Вопросы и ответы", section: "faq" },
  { href: "/offer", label: "Публичная оферта", isExternal: true },
  { href: "/privacy", label: "Политика конфиденциальности", isExternal: true }
];

// Centralized scroll utility
export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 80;
    const elementPosition = element.offsetTop - headerHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};