import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const ServicesSection = () => {
  const services = [
    { icon: "MessageCircle", title: "Проблемы в общении", desc: "Учим говорить и слушать друг друга" },
    { icon: "Heart", title: "Потеря близости", desc: "Восстанавливаем эмоциональную связь" },
    { icon: "Zap", title: "Частые конфликты", desc: "Находим корень проблем и решаем их" },
    { icon: "Users", title: "Семейные кризисы", desc: "Поддерживаем в сложные периоды" },
    { icon: "Smile", title: "Недоверие", desc: "Работаем с восстановлением доверия" },
    { icon: "Star", title: "Планирование будущего", desc: "Помогаем строить общие цели" }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/10 text-secondary">Услуги</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">С чем мы работаем</h2>
          <p className="text-xl text-gray-600">Помогаем решить самые распространённые проблемы в отношениях</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={service.icon as any} className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;