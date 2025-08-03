import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const AboutSection = () => {
  const features = [
    {
      icon: "Brain",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Научный подход",
      description: "Используем проверенные методики психологии и коучинга"
    },
    {
      icon: "Shield",
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      title: "Конфиденциальность",
      description: "Гарантируем полную конфиденциальность всех сессий"
    },
    {
      icon: "Target",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Результат",
      description: "Фокусируемся на конкретных результатах и изменениях"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/10 text-primary">О нас</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Почему выбирают нас</h2>
          <p className="text-xl text-gray-600 mb-12">
            Мы помогаем людям строить здоровые и счастливые отношения через понимание и принятие
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon name={feature.icon as any} className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;