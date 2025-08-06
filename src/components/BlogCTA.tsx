import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const BlogCTA = () => {
  const scrollToSection = (section: string) => {
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Если мы не на главной странице, переходим туда
      window.location.href = `/#${section}`;
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-2xl p-4 sm:p-6 md:p-8 text-white my-8 sm:my-12">
      <div className="text-center">
        <div className="mb-6">
          <Icon name="Heart" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-white/90" />
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            Готовы улучшить свои отношения?
          </h3>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto px-2">
            Если эта статья оказалась полезной, представьте, что может дать персональная работа с семейным психологом. 
            Запишитесь на консультацию и начните строить счастливые отношения уже сегодня.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center">
          <Button
            onClick={() => scrollToSection('booking')}
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 w-full sm:w-auto text-sm sm:text-base"
          >
            <Icon name="Calendar" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Записаться на консультацию
          </Button>
          
          <Button
            onClick={() => scrollToSection('services')}
            variant="outline" 
            size="lg"
            className="border-white border-2 text-white hover:bg-white hover:text-primary font-semibold px-6 sm:px-8 py-3 bg-transparent transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
          >
            <Icon name="Info" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Узнать о услугах
          </Button>
        </div>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/80">
          <div className="flex items-center">
            <Icon name="CheckCircle" className="w-4 h-4 mr-2" />
            Первая консультация бесплатно
          </div>
          <div className="flex items-center">
            <Icon name="Clock" className="w-4 h-4 mr-2" />
            Удобное время
          </div>
          <div className="flex items-center">
            <Icon name="Shield" className="w-4 h-4 mr-2" />
            Полная конфиденциальность
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCTA;