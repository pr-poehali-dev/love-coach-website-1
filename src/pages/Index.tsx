import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import Icon from "@/components/ui/icon";

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Сообщение отправлено!",
        description: "Мы свяжемся с вами в течение 24 часов.",
      });
      
      setFormData({ name: '', email: '', message: '', agreeToTerms: false });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
        <Input 
          placeholder="Ваше имя" 
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <Input 
          type="email" 
          placeholder="your@email.com" 
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
        <Textarea 
          placeholder="Расскажите о вашей ситуации..." 
          rows={4}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          required
        />
      </div>
      <div className="flex items-start space-x-2">
        <input 
          type="checkbox" 
          id="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          required
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
          Я согласен с{' '}
          <a href="/offer" target="_blank" className="text-primary hover:underline">
            публичной офертой
          </a>
          {' '}и{' '}
          <a href="/privacy" target="_blank" className="text-primary hover:underline">
            политикой конфиденциальности
          </a>
        </label>
      </div>
      <Button 
        type="submit" 
        size="lg" 
        className="w-full" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
            Отправляем...
          </>
        ) : (
          <>
            <Icon name="Send" className="mr-2 h-5 w-5" />
            Отправить сообщение
          </>
        )}
      </Button>
    </form>
  );
};

// Tariff Details Component
const TariffDetails = ({ tariff, isOpen, onClose, scrollToSection }: { 
  tariff: string; 
  isOpen: boolean; 
  onClose: () => void;
  scrollToSection: (id: string) => void; 
}) => {
  const [showForm, setShowForm] = useState(false);
  const tariffData = {
    'individual': {
      title: 'Индивидуальный коучинг',
      description: 'Персональная работа с эмоциональными блоками и развитием навыков общения',
      price: '3,000₽',
      duration: '60 минут',
      features: [
        'Глубокая диагностика эмоциональных паттернов',
        'Персональные упражнения и техники',
        'Работа с детскими травмами и блоками',
        'Развитие эмоционального интеллекта',
        'Поддержка между сессиями',
        'Запись сессии для повторного прослушивания'
      ],
      benefits: [
        'Понимание своих эмоциональных реакций',
        'Улучшение самооценки и уверенности',
        'Навыки здорового выражения чувств',
        'Преодоление страхов в отношениях'
      ]
    },
    'couple': {
      title: 'Парный коучинг',
      description: 'Совместная работа пары над улучшением взаимопонимания и решением конфликтов',
      price: '5,000₽',
      duration: '90 минут',
      features: [
        'Диагностика паттернов взаимодействия',
        'Техники активного слушания',
        'Работа с конфликтными ситуациями',
        'Восстановление эмоциональной близости',
        'Домашние задания для пары',
        'Методы поддержания близости'
      ],
      benefits: [
        'Улучшение качества общения',
        'Разрешение застарелых конфликтов',
        'Восстановление доверия и близости',
        'Создание общих целей и ценностей'
      ]
    },
    'support': {
      title: 'Поддержка в чате',
      description: 'Круглосуточная поддержка и консультации в сложных ситуациях',
      price: '4,000₽',
      duration: '7 дней',
      features: [
        'Ответы на сообщения в течение 2 часов',
        'Кризисная поддержка 24/7',
        'Практические советы и техники',
        'Аудиосообщения с упражнениями',
        'Мотивационная поддержка',
        'Еженедельные видеозвонки (30 мин)'
      ],
      benefits: [
        'Быстрая помощь в кризисных ситуациях',
        'Постоянное сопровождение процесса',
        'Удобный формат общения',
        'Накопление опыта решения проблем'
      ]
    }
  };

  const data = tariffData[tariff as keyof typeof tariffData];
  if (!data) return null;

  const handleClose = () => {
    setShowForm(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
            {showForm ? 'Записаться на консультацию' : data.title}
          </DialogTitle>
          {!showForm && (
            <DialogDescription className="text-base sm:text-lg text-gray-600 mt-2">
              {data.description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          {showForm ? (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{data.title}</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-700">{data.price}</div>
                <div className="text-sm text-gray-600">{data.duration}</div>
              </div>
              <ContactForm />
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="w-full"
              >
                <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                Назад к описанию
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{data.price}</div>
                  <div className="text-sm text-gray-600">{data.duration}</div>
                </div>
                <Button 
                  onClick={() => setShowForm(true)} 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                >
                  <Icon name="Calendar" className="mr-2 h-5 w-5" />
                  Записаться
                </Button>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Что включено:</h3>
                <div className="grid gap-2">
                  {data.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Icon name="Check" className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Результаты:</h3>
                <div className="grid gap-2">
                  {data.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <Icon name="Star" className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600">
                  <Icon name="Info" className="h-3 w-3 sm:h-4 sm:w-4 text-primary inline mr-1 sm:mr-2" />
                  Первая консультация всегда бесплатная. Мы обсудим ваши цели и подберём оптимальный формат работы.
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Payment Modal Component
const PaymentModal = ({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [selectedTariff, setSelectedTariff] = useState('individual');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();

  const tariffs = [
    {
      id: 'individual',
      title: 'Индивидуальная сессия',
      price: '3,000₽',
      duration: '60 минут',
      description: 'Персональная работа 1 на 1',
      icon: 'User',
      popular: false
    },
    {
      id: 'couple',
      title: 'Сессия для пары',
      price: '5,000₽',
      duration: '90 минут',
      description: 'Совместная работа над отношениями',
      icon: 'Users',
      popular: true
    },
    {
      id: 'support',
      title: 'Поддержка в чате',
      price: '4,000₽',
      duration: '7 дней',
      description: 'Круглосуточная поддержка',
      icon: 'MessageCircle',
      popular: false
    }
  ];

  const selectedTariffData = tariffs.find(t => t.id === selectedTariff);

  const handlePayment = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Заполните все поля",
        description: "Все поля обязательны для заполнения",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Переход к оплате",
      description: "Вы будете перенаправлены на страницу оплаты",
    });
    
    // Здесь будет интеграция с платёжной системой
    console.log('Payment data:', { ...formData, tariff: selectedTariff });
  };

  const handleClose = () => {
    setFormData({ fullName: '', email: '', phone: '' });
    setSelectedTariff('individual');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
            Оплата услуг
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-600">
            Выберите тариф и заполните данные для оплаты
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Выбор тарифа */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Выберите тариф</h3>
            <div className="grid gap-3">
              {tariffs.map((tariff) => (
                <div 
                  key={tariff.id}
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTariff === tariff.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTariff(tariff.id)}
                >

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedTariff === tariff.id ? 'bg-primary/20' : 'bg-gray-100'
                      }`}>
                        <Icon 
                          name={tariff.icon as any} 
                          className={`h-5 w-5 ${
                            selectedTariff === tariff.id ? 'text-primary' : 'text-gray-600'
                          }`} 
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{tariff.title}</h4>
                        <p className="text-sm text-gray-600">{tariff.description}</p>
                        <p className="text-xs text-gray-500">{tariff.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">{tariff.price}</div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedTariff === tariff.id 
                          ? 'border-primary bg-primary' 
                          : 'border-gray-300'
                      }`}>
                        {selectedTariff === tariff.id && (
                          <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Форма данных */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Контактные данные</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ФИО *
                </label>
                <Input
                  placeholder="Иванов Иван Иванович"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон *
                </label>
                <Input
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Итого */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{selectedTariffData?.title}</h4>
                <p className="text-sm text-gray-600">{selectedTariffData?.duration}</p>
              </div>
              <div className="text-2xl font-bold text-primary">
                {selectedTariffData?.price}
              </div>
            </div>
            
            <Button 
              onClick={handlePayment}
              className="w-full bg-primary hover:bg-primary/90" 
              size="lg"
            >
              <Icon name="CreditCard" className="mr-2 h-5 w-5" />
              Перейти к оплате
            </Button>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <button onClick={() => window.open('/offer', '_blank')} className="text-primary hover:underline">
                офертой
              </button>
              {' '}и{' '}
              <button onClick={() => window.open('/privacy', '_blank')} className="text-primary hover:underline">
                политикой конфиденциальности
              </button>
            </p>
          </div>
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { href: "services", label: "Услуги" },
    { href: "about", label: "О нас" },
    { href: "prices", label: "Цены" },
    { href: "faq", label: "Вопросы" },
    { href: "contact", label: "Контакты" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Heart" className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">Workstab.com</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button 
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-600 hover:text-primary transition-colors relative group"
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
                >
                  <Icon name="CreditCard" className="mr-2 h-4 w-4" />
                  Оплата
                </Button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary hover:bg-primary/90 group relative overflow-hidden"
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
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Icon name="Menu" className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-6 mt-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <Icon name="Heart" className="h-8 w-8 text-primary" />
                      <span className="text-2xl font-bold text-gray-900">Workstab.com</span>
                    </div>
                    
                    {navItems.map((item) => (
                      <button 
                        key={item.href}
                        onClick={() => scrollToSection(item.href)}
                        className="text-lg text-gray-700 hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5 text-left w-full"
                      >
                        {item.label}
                      </button>
                    ))}
                    
                    <div className="space-y-3 mt-6">
                      <Button 
                        onClick={() => setShowPaymentModal(true)}
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary/5"
                      >
                        <Icon name="CreditCard" className="mr-2 h-5 w-5" />
                        Оплата
                      </Button>
                      <Button 
                        onClick={() => scrollToSection('contact')}
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

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-pink-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-primary/10 text-primary">Эмоциональный коучинг</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Коучинг для пар и индивидуальных отношений
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Пойми друг друга. Услышь. Почувствуй.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => scrollToSection('contact')}
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    <Icon name="Calendar" className="mr-2 h-5 w-5" />
                    Записаться на консультацию
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </Button>
                <Button 
                  onClick={() => scrollToSection('stats')}
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-4 group hover:bg-primary/5 transition-all duration-300"
                >
                  <Icon name="Play" className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
              <img 
                src="/img/d79b259a-f752-49d3-a266-4caf5221b9c6.jpg" 
                alt="Счастливая пара"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">Наши результаты</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Цифры, которые говорят сами за себя</h2>
            <p className="text-xl text-gray-300">Реальная статистика работы с клиентами</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Users" className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">500+</div>
              <p className="text-gray-300">Счастливых пар</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Heart" className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">89%</div>
              <p className="text-gray-300">Улучшили отношения</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Clock" className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">3</div>
              <p className="text-gray-300">Года опыта</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Award" className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">98%</div>
              <p className="text-gray-300">Довольных клиентов</p>
            </div>
          </div>
        </div>
      </section>



      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Отзывы</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Что говорят наши клиенты</h2>
            <p className="text-xl text-gray-600">Реальные истории изменений и роста</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 animate-slide-in-left">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mr-4">
                    <Icon name="Heart" className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Анна, 32 года</h4>
                    <p className="text-sm text-gray-600">Индивидуальный коучинг</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "Честно, скептически относилась к коучингу. Но уже после первой сессии поняла — это работает! 
                  Теперь мы с мужем говорим о чувствах без криков и обид. Это просто космос! 🚀"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 animate-scale-in">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                    <Icon name="Users" className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Михаил и Елена</h4>
                    <p className="text-sm text-gray-600">Парный коучинг</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "15 лет брака, а ругались как подростки! Сеансы изменили всё — теперь обсуждаем проблемы 
                  спокойно, без взаимных упрёков. Дети даже заметили, что мы стали добрее друг к другу."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 animate-slide-in-right">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                    <Icon name="MessageCircle" className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Дарья, 28 лет</h4>
                    <p className="text-sm text-gray-600">Поддержка в кризисе</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "Парень подал на развод. На улице плакала, не знала куда деваться. Посчастливилось 
                  найти этот сервис. Через неделю поняла, как действовать. Мы помирились!"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                    <Icon name="Lightbulb" className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Олег, 35 лет</h4>
                    <p className="text-sm text-gray-600">Индивидуальная работа</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "Мужики не плачут, так учил отец. Ошибался! После сеансов научился 
                  делиться эмоциями. Жена сказала: 'Олег, ты стал настоящим мужчиной.' Лучший комплимент!"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mr-4">
                    <Icon name="Smile" className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Виктория, 29 лет</h4>
                    <p className="text-sm text-gray-600">Кризисная поддержка</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "Обман с ипотекой вскрылся, муж обиделся до слёз... Казалось, всё кончено. 
                  Но почему-то сумела найти слова, которые вернули нам отношения. Магия!"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                    <Icon name="Target" className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Алексей и Мария</h4>
                    <p className="text-sm text-gray-600">Семейная терапия</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "Кричали друг на друга при детях, понимали — так нельзя. Но как по-другому? 
                  Коуч показал конкретные приёмы. И знаете что? Работает!"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary">О проекте</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Кто мы</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Наша миссия — помочь людям научиться строить эмоционально зрелые и устойчивые отношения. 
              Мы основываемся на soft-навыках, эмпатии и практиках осознанности.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-slide-in-left">
              <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-2 group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors animate-float">
                    <Icon name="Users" className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Эмоциональная зрелость</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Развиваем навыки здорового общения и эмоционального интеллекта</p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-scale-in">
              <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-2 group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors animate-bounce-gentle">
                    <Icon name="Heart" className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle>Эмпатия</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Учимся понимать и чувствовать друг друга на более глубоком уровне</p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-slide-in-right">
              <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-2 group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors animate-float">
                    <Icon name="Brain" className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Осознанность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Практикуем mindfulness и осознанное отношение к партнёру</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Наши услуги</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">С какими запросами мы работаем</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: "MessageCircle", title: "Частые конфликты", desc: "Поможем найти корень проблем и научиться конструктивно решать споры" },
              { icon: "Snowflake", title: "Эмоциональный холод", desc: "Восстанавливаем близость и тепло в отношениях" },
              { icon: "ArrowsUpFromLine", title: "Желание вернуть близость", desc: "Работаем над возрождением интимности и доверия" },
              { icon: "Shield", title: "Неразрешённые обиды", desc: "Учимся прощать и отпускать прошлое" },
              { icon: "AlertTriangle", title: "Страх расставания", desc: "Преодолеваем тревоги и укрепляем отношения" },
              { icon: "Compass", title: "Поиск себя в отношениях", desc: "Находим баланс между \"я\" и \"мы\"" }
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mb-3">
                    <Icon name={item.icon as any} className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>


        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary">Тарифы</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Прозрачные цены</h2>
            <p className="text-xl text-gray-600">Выберите формат, который подходит именно вам</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="User" className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Индивидуальная сессия</CardTitle>
                <CardDescription>Персональная работа 1 на 1</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">3 000 ₽</div>
                <p className="text-gray-600 mb-6">60 минут</p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-primary hover:bg-primary/90" 
                    size="lg"
                  >
                    <Icon name="Calendar" className="mr-2 h-5 w-5" />
                    Записаться
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setSelectedTariff('individual')}
                  >
                    <Icon name="Info" className="mr-2 h-4 w-4" />
                    Узнать больше
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-xl transition-all duration-300 border-2 border-primary shadow-lg scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-white px-4 py-1">Популярное</Badge>
              </div>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Сессия для пары</CardTitle>
                <CardDescription>Совместная работа</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">5 000 ₽</div>
                <p className="text-gray-600 mb-6">90 минут</p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-primary hover:bg-primary/90" 
                    size="lg"
                  >
                    <Icon name="Calendar" className="mr-2 h-5 w-5" />
                    Записаться
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setSelectedTariff('couple')}
                  >
                    <Icon name="Info" className="mr-2 h-4 w-4" />
                    Узнать больше
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageSquare" className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Поддержка 7 дней</CardTitle>
                <CardDescription>Помощь в чате</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">4 000 ₽</div>
                <p className="text-gray-600 mb-6">Неделя поддержки</p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-primary hover:bg-primary/90" 
                    size="lg"
                  >
                    <Icon name="Calendar" className="mr-2 h-5 w-5" />
                    Записаться
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setSelectedTariff('support')}
                  >
                    <Icon name="Info" className="mr-2 h-4 w-4" />
                    Узнать больше
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Часто задаваемые вопросы</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="text-left hover:no-underline">
                  Это психотерапия?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Нет, это коучинг без медицинской диагностики. Мы предоставляем немедицинские консультации общего характера с целью улучшения эмоционального фона и межличностной коммуникации.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="text-left hover:no-underline">
                  Как проходят сессии?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Сессии проходят онлайн в удобное для вас время. Мы используем практики осознанности, техники эмоционального интеллекта и soft-skills для работы с отношениями.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="text-left hover:no-underline">
                  Сколько сессий потребуется?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Количество сессий индивидуально. Многие клиенты видят первые результаты уже после 2-3 встреч. Для глубокой работы рекомендуем курс из 6-8 сессий.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="text-left hover:no-underline">
                  Можно ли вернуть деньги?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Да, возврат возможен в течение 14 дней с момента оплаты, если сессия ещё не состоялась. Подробности в договоре оферты.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="text-left hover:no-underline">
                  Конфиденциальность гарантирована?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Абсолютно. Мы соблюдаем полную конфиденциальность и не передаём ваши данные третьим лицам согласно ФЗ-152.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary">Контакты</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Свяжитесь с нами</h2>
            <p className="text-xl text-gray-600">Ответим на любые вопросы в течение 24 часов</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Форма обратной связи</h3>
              <ContactForm />
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Контактная информация</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Mail" className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">hello@workstab.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MessageCircle" className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Telegram</p>
                    <p className="text-gray-600">@workstab_support</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Phone" className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp</p>
                    <p className="text-gray-600">+7 (999) 123-45-67</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <strong>Важно:</strong> Услуги не являются медицинскими, психологическими или психиатрическими. 
                    Мы предоставляем коучинговую поддержку в развитии межличностных навыков.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Heart" className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">Workstab.com</span>
              </div>
              <p className="text-gray-400">
                Помогаем строить здоровые и счастливые отношения через развитие эмоциональных навыков.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => setSelectedTariff('individual')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Индивидуальный коучинг
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedTariff('couple')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Коучинг для пар
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedTariff('support')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Поддержка в чате
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" onClick={() => window.open('/offer', '_blank')} className="hover:text-white transition-colors">Оферта</a></li>
                <li><a href="#" onClick={() => window.open('/privacy', '_blank')} className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Вопросы и ответы</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>hello@workstab.com</li>
                <li>ИНН: 123456789012</li>
                <li>Самозанятый</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Workstab.com. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Tariff Details Modal */}
      <TariffDetails 
        tariff={selectedTariff || ''} 
        isOpen={!!selectedTariff} 
        onClose={() => setSelectedTariff(null)}
        scrollToSection={scrollToSection}
      />

      {/* Contact Form Modal */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
              Записаться на консультацию
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-600">
              Заполните форму и мы свяжемся с вами в течение 24 часов
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <ContactForm />
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
      />
    </div>
  );
};

export default Index;