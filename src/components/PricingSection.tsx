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
    <section id="prices" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/10 text-secondary">Тарифы</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Прозрачные цены</h2>
          <p className="text-xl text-gray-600">Выберите формат, который подходит именно вам</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
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

          <Card className="relative hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Settings" className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Индивидуальный формат</CardTitle>
              <CardDescription>Нестандартные задачи</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">По согласованию</div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Формат для нестандартных задач, которые требуют индивидуального подхода. 
                Подходит для ситуаций, не укладывающихся в рамки стандартных пакетов.
              </p>
              <div className="text-sm text-gray-500 mb-6">
                <p>Например:</p>
                <p className="text-xs mt-1">• Личная встреча с коучем</p>
                <p className="text-xs">• Связь в любое время суток</p>
                <p className="text-xs">• И другие задачи</p>
              </div>
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