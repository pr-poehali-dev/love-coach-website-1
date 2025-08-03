import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#services", label: "Услуги" },
    { href: "#about", label: "О нас" },
    { href: "#prices", label: "Цены" },
    { href: "#faq", label: "Вопросы" },
    { href: "#contact", label: "Контакты" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Heart" className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">LoveCoach.Pro</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a 
                  key={item.href}
                  href={item.href} 
                  className="text-gray-600 hover:text-primary transition-colors relative group"
                >
                  {item.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button className="hidden sm:flex bg-primary hover:bg-primary/90 group relative overflow-hidden">
                <span className="relative z-10">
                  Записаться
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
              </Button>
              
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
                      <span className="text-2xl font-bold text-gray-900">LoveCoach.Pro</span>
                    </div>
                    
                    {navItems.map((item) => (
                      <a 
                        key={item.href}
                        href={item.href} 
                        className="text-lg text-gray-700 hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                    
                    <Button className="mt-6 bg-primary hover:bg-primary/90">
                      <Icon name="Calendar" className="mr-2 h-5 w-5" />
                      Записаться на консультацию
                    </Button>
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
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="relative z-10 flex items-center">
                    <Icon name="Calendar" className="mr-2 h-5 w-5" />
                    Записаться на консультацию
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 group hover:bg-primary/5 transition-all duration-300">
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
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
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

      {/* Video Presentation Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary">Видео-презентация</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Посмотрите, как мы работаем</h2>
            <p className="text-xl text-gray-600 mb-12">Узнайте больше о нашем подходе к коучингу отношений</p>
            
            <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 mb-8 group hover:from-primary/20 hover:to-secondary/20 transition-all duration-500">
              <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
                <Button size="lg" className="relative z-10 bg-white text-gray-900 hover:bg-gray-100 rounded-full w-20 h-20 group-hover:scale-110 transition-transform">
                  <Icon name="Play" className="h-8 w-8 ml-1" />
                </Button>
              </div>
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">"Как восстановить близость в отношениях"</h3>
                <p className="text-gray-600">5-минутное видео о наших методах работы с парами</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Button size="lg" className="bg-primary hover:bg-primary/90 group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <Icon name="Calendar" className="mr-2 h-5 w-5" />
                  Записаться на бесплатную консультацию
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Button>
              
              <Button variant="outline" size="lg" className="group hover:bg-primary/5">
                <Icon name="Download" className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                Скачать гайд по отношениям
              </Button>
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
                  <img 
                    src="/img/fc53113c-98d3-457c-b43b-ed3bc861dd3c.jpg" 
                    alt="Анна"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Анна, 32 года</h4>
                    <p className="text-sm text-gray-600">Индивидуальный коучинг</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "После трёх сессий я научилась лучше понимать свои эмоции и выражать их партнёру. 
                  Наши отношения стали гораздо глубже и теплее."
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
                  <img 
                    src="/img/3f3146b0-c9d8-49c7-9d2e-64536bc2e132.jpg" 
                    alt="Михаил"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Михаил и Елена</h4>
                    <p className="text-sm text-gray-600">Парный коучинг</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "Мы были на грани расставания. За месяц работы научились слышать друг друга 
                  и решать конфликты конструктивно. Спасибо!"
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
                    <Icon name="User" className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Дарья, 28 лет</h4>
                    <p className="text-sm text-gray-600">Поддержка в чате</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "Постоянная поддержка в течение недели помогла пережить сложный период. 
                  Чувствую себя увереннее в отношениях."
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Индивидуальный коучинг", desc: "Персональная работа 1 на 1", duration: "60 мин" },
              { title: "Коучинг для пар", desc: "Совместные сессии", duration: "90 мин" },
              { title: "Экспресс-сессии", desc: "Быстрая помощь", duration: "30 мин" },
              { title: "Месячное сопровождение", desc: "Постоянная поддержка", duration: "30 дней" }
            ].map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{service.duration}</Badge>
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
                <Button className="w-full" size="lg">
                  Оплатить
                </Button>
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
                <Button className="w-full bg-secondary hover:bg-secondary/90 group relative overflow-hidden" size="lg">
                  <span className="relative z-10 flex items-center justify-center">
                    <Icon name="CreditCard" className="mr-2 h-5 w-5" />
                    Оплатить
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </Button>
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
                <Button className="w-full" size="lg">
                  Оплатить
                </Button>
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
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                  <Textarea placeholder="Расскажите о вашей ситуации..." rows={4} />
                </div>
                <Button size="lg" className="w-full">
                  <Icon name="Send" className="mr-2 h-5 w-5" />
                  Отправить сообщение
                </Button>
              </form>
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
                    <p className="text-gray-600">hello@lovecoach.pro</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MessageCircle" className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Telegram</p>
                    <p className="text-gray-600">@lovecoach_pro</p>
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
                <span className="text-2xl font-bold">LoveCoach.Pro</span>
              </div>
              <p className="text-gray-400">
                Помогаем строить здоровые и счастливые отношения через развитие эмоциональных навыков.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Индивидуальный коучинг</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Коучинг для пар</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Поддержка в чате</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/offer" className="hover:text-white transition-colors">Оферта</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Вопросы и ответы</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>hello@lovecoach.pro</li>
                <li>ИНН: 123456789012</li>
                <li>Самозанятый</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 LoveCoach.Pro. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;