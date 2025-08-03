import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import Icon from "@/components/ui/icon";

// Импорт созданных компонентов
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PaymentModal from "@/components/PaymentModal";

// Tariff Details Component
const TariffDetails = ({ tariff, isOpen, onClose, showForm, setShowForm, setShowContactForm }: {
  tariff: string | null;
  isOpen: boolean;
  onClose: () => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  setShowContactForm: (show: boolean) => void;
}) => {
  const tariffData = {
    individual: {
      title: "Индивидуальная сессия",
      price: "3 000 ₽",
      duration: "60 минут",
      description: "Персональная работа с коучем один на один",
      benefits: [
        "Глубокая проработка личных проблем",
        "Индивидуальный подход",
        "Конфиденциальность",
        "Гибкий график",
        "Быстрые результаты"
      ],
      process: "Работаем с вашими внутренними блоками, помогаем найти причины проблем в отношениях и разработать стратегию их решения.",
      icon: "User"
    },
    couple: {
      title: "Сессия для пары",
      price: "5 000 ₽",
      duration: "90 минут",
      description: "Совместная работа над отношениями",
      benefits: [
        "Улучшение коммуникации",
        "Разрешение конфликтов",
        "Восстановление близости",
        "Общие цели",
        "Крепкие отношения"
      ],
      process: "Работаем с парой, учим эффективному общению, помогаем найти компромиссы и восстановить эмоциональную связь.",
      icon: "Users"
    },
    support: {
      title: "Поддержка 7 дней",
      price: "4 000 ₽",
      duration: "Неделя поддержки",
      description: "Круглосуточная поддержка в чате",
      benefits: [
        "Постоянная поддержка",
        "Быстрые ответы",
        "Экстренная помощь",
        "Доступность",
        "Практические советы"
      ],
      process: "Получаете доступ к личному чату с коучем на неделю. Отвечаем на вопросы, даём советы и поддерживаем в трудные моменты.",
      icon: "MessageSquare"
    }
  };

  const currentTariff = tariff ? tariffData[tariff as keyof typeof tariffData] : null;

  const handleBooking = () => {
    setShowForm(false);
    setShowContactForm(true);
    onClose();
  };

  if (!currentTariff) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
              <Icon name={currentTariff.icon as any} className="h-6 w-6 text-primary" />
            </div>
            {currentTariff.title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-600">
            {currentTariff.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
            <div>
              <div className="text-2xl font-bold text-primary">{currentTariff.price}</div>
              <div className="text-sm text-gray-600">{currentTariff.duration}</div>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Icon name="Calendar" className="mr-2 h-5 w-5" />
              Записаться
            </Button>
          </div>

          {!showForm ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Что входит:</h3>
                <ul className="space-y-2">
                  {currentTariff.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Как проходит:</h3>
                <p className="text-gray-700 leading-relaxed">{currentTariff.process}</p>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowForm(true)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <Icon name="Calendar" className="mr-2 h-5 w-5" />
                  Записаться на сессию
                </Button>
                <Button 
                  onClick={onClose}
                  variant="outline"
                  size="lg"
                >
                  Закрыть
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Записаться на сессию</h3>
                <Button 
                  onClick={() => setShowForm(false)}
                  variant="ghost"
                  size="sm"
                >
                  <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                  Назад
                </Button>
              </div>
              <ContactForm />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
    setIsMenuOpen(false);
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

      {/* Statistics Section */}
      <section id="stats" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Users" className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold">500+</div>
              <p className="text-gray-300">Довольных клиентов</p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Heart" className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-4xl font-bold">95%</div>
              <p className="text-gray-300">Улучшили отношения</p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Star" className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold">4.9</div>
              <p className="text-gray-300">Средняя оценка</p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Clock" className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-4xl font-bold">3 года</div>
              <p className="text-gray-300">Опыт работы</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary">О нас</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Почему выбирают нас</h2>
            <p className="text-xl text-gray-600 mb-12">
              Мы помогаем людям строить здоровые и счастливые отношения через понимание и принятие
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Brain" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Научный подход</h3>
                <p className="text-gray-600">Используем проверенные методики психологии и коучинга</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Конфиденциальность</h3>
                <p className="text-gray-600">Гарантируем полную конфиденциальность всех сессий</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Target" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Результат</h3>
                <p className="text-gray-600">Фокусируемся на конкретных результатах и изменениях</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary">Услуги</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">С чем мы работаем</h2>
            <p className="text-xl text-gray-600">Помогаем решить самые распространённые проблемы в отношениях</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "MessageCircle", title: "Проблемы в общении", desc: "Учим говорить и слушать друг друга" },
              { icon: "Heart", title: "Потеря близости", desc: "Восстанавливаем эмоциональную связь" },
              { icon: "Zap", title: "Частые конфликты", desc: "Находим корень проблем и решаем их" },
              { icon: "Users", title: "Семейные кризисы", desc: "Поддерживаем в сложные периоды" },
              { icon: "Smile", title: "Недоверие", desc: "Работаем с восстановлением доверия" },
              { icon: "Star", title: "Планирование будущего", desc: "Помогаем строить общие цели" }
            ].map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={service.icon as any} className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PricingSection 
        setShowContactForm={setShowContactForm}
        setSelectedTariff={setSelectedTariff}
      />

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Часто задаваемые вопросы</h2>
            <p className="text-xl text-gray-600">Ответы на самые популярные вопросы</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left">Как проходят сессии?</AccordionTrigger>
                <AccordionContent>
                  Сессии проходят онлайн в удобное для вас время. Мы используем безопасные платформы для видеозвонков. 
                  Каждая сессия структурирована и направлена на достижение конкретных целей.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left">Сколько нужно сессий?</AccordionTrigger>
                <AccordionContent>
                  Количество сессий зависит от сложности ситуации. Обычно первые результаты видны уже после 2-3 встреч, 
                  полная проработка может занять 5-10 сессий.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left">Гарантируете ли вы результат?</AccordionTrigger>
                <AccordionContent>
                  Мы гарантируем профессиональный подход и качественную работу. Результат зависит от вашего желания 
                  работать над отношениями и применять полученные инструменты.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left">Можно ли работать только с одним партнёром?</AccordionTrigger>
                <AccordionContent>
                  Да, можно работать и индивидуально. Даже работа с одним партнёром может значительно улучшить отношения, 
                  так как меняется модель поведения и коммуникации.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary">Контакты</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Свяжитесь с нами</h2>
              <p className="text-xl text-gray-600">Готовы начать путь к лучшим отношениям?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Форма обратной связи</h3>
                <ContactForm />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Контактная информация</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">info@workstab.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Телефон</h4>
                      <p className="text-gray-600">+7 (999) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Время работы</h4>
                      <p className="text-gray-600">Пн-Пт: 9:00-21:00<br />Сб-Вс: 10:00-18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Heart" className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">Workstab.com</span>
              </div>
              <p className="text-gray-400 mb-4">
                Помогаем строить крепкие и счастливые отношения через понимание, принятие и любовь.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Icon name="Instagram" className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Icon name="Facebook" className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Icon name="Twitter" className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('services')}>Индивидуальный коучинг</button></li>
                <li><button onClick={() => scrollToSection('services')}>Парная терапия</button></li>
                <li><button onClick={() => scrollToSection('services')}>Онлайн поддержка</button></li>
                <li><button onClick={() => scrollToSection('services')}>Семейное консультирование</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Информация</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('about')}>О нас</button></li>
                <li><button onClick={() => scrollToSection('faq')}>Вопросы и ответы</button></li>
                <li><a href="/offer" className="hover:text-white transition-colors">Публичная оферта</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Workstab.com. Все права защищены.</p>
          </div>
        </div>
      </footer>

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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Записаться на консультацию</DialogTitle>
            <DialogDescription>
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