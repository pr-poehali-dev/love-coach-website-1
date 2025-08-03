import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Анна, 32 года",
      service: "Индивидуальный коучинг",
      text: "Честно, скептически относилась к коучингу. Но уже после первой сессии поняла — это работает! Теперь мы с мужем говорим о чувствах без криков и обид. Это просто космос! 🚀",
      icon: "Heart",
      gradient: "from-pink-500 to-rose-500",
      animation: "animate-slide-in-left"
    },
    {
      name: "Михаил и Елена",
      service: "Парный коучинг",
      text: "15 лет брака, а ругались как подростки! Сеансы изменили всё — теперь обсуждаем проблемы спокойно, без взаимных упрёков. Дети даже заметили, что мы стали добрее друг к другу.",
      icon: "Users",
      gradient: "from-blue-500 to-cyan-500",
      animation: "animate-scale-in"
    },
    {
      name: "Дарья, 28 лет",
      service: "Поддержка в кризисе",
      text: "Парень подал на развод. На улице плакала, не знала куда деваться. Посчастливилось найти этот сервис. Через неделю поняла, как действовать. Мы помирились!",
      icon: "MessageCircle",
      gradient: "from-primary to-secondary",
      animation: "animate-slide-in-right"
    },
    {
      name: "Олег, 35 лет",
      service: "Индивидуальная работа",
      text: "Мужики не плачут, так учил отец. Ошибался! После сеансов научился делиться эмоциями. Жена сказала: 'Олег, ты стал настоящим мужчиной.' Лучший комплимент!",
      icon: "Lightbulb",
      gradient: "from-green-500 to-emerald-500",
      animation: ""
    },
    {
      name: "Виктория, 29 лет",
      service: "Кризисная поддержка",
      text: "Обман с ипотекой вскрылся, муж обиделся до слёз... Казалось, всё кончено. Но почему-то сумела найти слова, которые вернули нам отношения. Магия!",
      icon: "Smile",
      gradient: "from-purple-500 to-violet-500",
      animation: ""
    },
    {
      name: "Алексей и Мария",
      service: "Семейная терапия",
      text: "Кричали друг на друга при детях, понимали — так нельзя. Но как по-другому? Коуч показал конкретные приёмы. И знаете что? Работает!",
      icon: "Target",
      gradient: "from-orange-500 to-red-500",
      animation: ""
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary">Отзывы</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Что говорят наши клиенты</h2>
          <p className="text-xl text-gray-600">Реальные истории изменений и роста</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${testimonial.animation}`}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                    <Icon name={testimonial.icon as any} className="h-8 w-8 text-white flex-shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.service}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;