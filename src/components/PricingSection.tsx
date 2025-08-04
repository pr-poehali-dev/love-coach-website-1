import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface PricingSectionProps {
  setShowContactForm: (show: boolean) => void;
  setSelectedTariff: (tariff: string) => void;
}

const PricingSection = ({ setShowContactForm, setSelectedTariff }: PricingSectionProps) => {
  return (
    <section id="prices" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-secondary/3"></div>
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-6 bg-gradient-to-r from-secondary/10 to-secondary/20 text-secondary border-secondary/30 animate-shimmer">
            💰 Тарифы
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6 animate-slide-up">
            Прозрачные цены
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
            Выберите формат, который подходит именно вам ✨
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <Card className="relative hover:shadow-floating transition-all duration-500 border-2 hover:border-primary/50 bg-white/80 backdrop-blur-sm interactive-card group animate-scale-in" style={{animationDelay: '0.1s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            <CardHeader className="text-center relative z-10">
              <div className="w-18 h-18 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-card group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <Icon name="User" className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <CardTitle className="text-xl sm:text-2xl group-hover:text-primary transition-colors">Индивидуальная сессия</CardTitle>
              <CardDescription className="text-gray-600">Персональная работа 1 на 1</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">3 000 ₽</div>
              <p className="text-gray-600 mb-6">60 минут</p>
              <div className="space-y-3">
                <Button 
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-card hover:shadow-glow transition-all duration-300 group/btn" 
                  size="lg"
                >
                  <Icon name="Calendar" className="mr-2 h-5 w-5 group-hover/btn:rotate-12 transition-transform" />
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

          <Card className="relative hover:shadow-floating transition-all duration-500 border-2 border-primary shadow-floating scale-105 bg-gradient-to-br from-white via-primary/5 to-white group animate-scale-in" style={{animationDelay: '0.2s'}}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 shadow-glow animate-pulse-glow">
                ⭐ Популярное
              </Badge>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-20 rounded-lg"></div>
            <CardHeader className="text-center relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary/15 to-secondary/25 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-card group-hover:shadow-glow transition-all duration-300 group-hover:scale-110 animate-bounce-gentle">
                <Icon name="Users" className="h-9 w-9 text-secondary group-hover:scale-110 transition-transform" />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-primary font-bold">Сессия для пары</CardTitle>
              <CardDescription className="text-gray-600">Совместная работа</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">5 000 ₽</div>
              <p className="text-gray-600 mb-6">90 минут</p>
              <div className="space-y-3">
                <Button 
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-card hover:shadow-glow transition-all duration-300 group/btn" 
                  size="lg"
                >
                  <Icon name="Calendar" className="mr-2 h-5 w-5 group-hover/btn:rotate-12 transition-transform" />
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

          <Card className="relative hover:shadow-floating transition-all duration-500 border-2 hover:border-primary/50 bg-white/80 backdrop-blur-sm interactive-card group animate-scale-in" style={{animationDelay: '0.3s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            <CardHeader className="text-center relative z-10">
              <div className="w-18 h-18 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-card group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <Icon name="MessageSquare" className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">Поддержка 7 дней</CardTitle>
              <CardDescription>Помощь в чате</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">4 000 ₽</div>
              <p className="text-gray-600 mb-6">Неделя поддержки</p>
              <div className="space-y-3">
                <Button 
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-card hover:shadow-glow transition-all duration-300 group/btn" 
                  size="lg"
                >
                  <Icon name="Calendar" className="mr-2 h-5 w-5 group-hover/btn:rotate-12 transition-transform" />
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

          <Card className="relative hover:shadow-floating transition-all duration-500 border-2 hover:border-primary/50 bg-white/80 backdrop-blur-sm interactive-card group animate-scale-in" style={{animationDelay: '0.4s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            <CardHeader className="text-center relative z-10">
              <div className="w-18 h-18 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-card group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <Icon name="Settings" className="h-8 w-8 text-secondary group-hover:scale-110 transition-transform" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">Расширенный план</CardTitle>
              <CardDescription>Индивидуальные условия</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-2">
                <div className="relative inline-block">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-400">0 ₽</div>
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500 transform -translate-y-1/2 -rotate-[20deg] origin-center scale-110"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">Стоимость определяется индивидуально, до начала консультации</p>
              </div>
              <p className="text-gray-600 mb-6">Гибкий формат работы</p>
              <div className="space-y-3">
                <Button 
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-card hover:shadow-glow transition-all duration-300 group/btn" 
                  size="lg"
                >
                  <Icon name="Calendar" className="mr-2 h-5 w-5 group-hover/btn:rotate-12 transition-transform" />
                  Записаться
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setSelectedTariff('custom')}
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
  );
};

export default PricingSection;