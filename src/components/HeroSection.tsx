import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <section className="relative py-12 xs:py-16 md:py-32 overflow-hidden" data-section="hero">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-pink-50"></div>
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-60"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 xs:gap-12 items-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-gradient-to-r from-primary/15 to-secondary/15 text-primary border-primary/20 backdrop-blur-sm animate-shimmer relative overflow-hidden">
              <span className="relative z-10">✨ Эмоциональный коучинг</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight animate-slide-up">
              Коучинг для пар и индивидуальных отношений
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
              Пойми друг друга. Услышь. Почувствуй. 💕
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <Button 
                onClick={() => scrollToSection('contact')}
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-5 group relative overflow-hidden shadow-card hover:shadow-floating transition-all duration-500 transform hover:scale-105 animate-pulse-glow"
              >
                <span className="relative z-10 flex items-center font-semibold">
                  <Icon name="Calendar" className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  <span className="hidden xs:inline">Записаться на консультацию</span>
                  <span className="xs:hidden">Записаться</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              <Button 
                onClick={() => scrollToSection('stats')}
                variant="outline" 
                size="lg" 
                className="text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-5 group hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm"
              >
                <Icon name="Play" className="mr-2 h-5 w-5 group-hover:text-primary group-hover:scale-110 transition-all" />
                <span className="hidden xs:inline group-hover:text-primary transition-colors">Узнать больше</span>
                <span className="xs:hidden group-hover:text-primary transition-colors">Подробнее</span>
              </Button>
            </div>
          </div>
          <div className="relative animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/15 rounded-2xl sm:rounded-3xl transform rotate-3 animate-float"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl sm:rounded-3xl blur-xl opacity-60 animate-pulse-glow"></div>
            <img 
              src="/img/d79b259a-f752-49d3-a266-4caf5221b9c6.jpg" 
              alt="Счастливая пара"
              className="relative rounded-2xl sm:rounded-3xl shadow-floating w-full h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700 interactive-card"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl sm:rounded-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;