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
    <div className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-2xl p-8 text-white my-12">
      <div className="text-center">
        <div className="mb-6">
          <Icon name="Heart" className="w-16 h-16 mx-auto mb-4 text-white/90" />
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Готовы улучшить свои отношения?
          </h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Если эта статья оказалась полезной, представьте, что может дать персональная работа с семейным психологом. 
            Запишитесь на консультацию и начните строить счастливые отношения уже сегодня.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => scrollToSection('booking')}
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3"
          >
            <Icon name="Calendar" className="w-5 h-5 mr-2" />
            Записаться на консультацию
          </Button>
          
          <Button
            onClick={() => scrollToSection('services')}
            variant="outline" 
            size="lg"
            className="border-white border-2 text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 bg-transparent transition-all duration-300"
          >
            <Icon name="Info" className="w-5 h-5 mr-2" />
            Узнать о услугах
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-white/80">
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