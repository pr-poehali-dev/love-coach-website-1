import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <section className="relative py-12 xs:py-16 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-pink-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 xs:gap-12 items-center">
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-primary/10 text-primary">Эмоциональный коучинг</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Коучинг для пар и индивидуальных отношений
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Пойми друг друга. Услышь. Почувствуй.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4">
              <Button 
                onClick={() => scrollToSection('contact')}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-4 group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  <Icon name="Calendar" className="mr-2 h-5 w-5" />
                  <span className="hidden xs:inline">Записаться на консультацию</span>
                  <span className="xs:hidden">Записаться</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Button>
              <Button 
                onClick={() => scrollToSection('stats')}
                variant="outline" 
                size="lg" 
                className="text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-4 group hover:bg-primary/5 transition-all duration-300"
              >
                <Icon name="Play" className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                <span className="hidden xs:inline">Узнать больше</span>
                <span className="xs:hidden">Подробнее</span>
              </Button>
            </div>
          </div>
          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl sm:rounded-3xl transform rotate-3"></div>
            <img 
              src="/img/d79b259a-f752-49d3-a266-4caf5221b9c6.jpg" 
              alt="Счастливая пара"
              className="relative rounded-2xl sm:rounded-3xl shadow-2xl w-full h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;