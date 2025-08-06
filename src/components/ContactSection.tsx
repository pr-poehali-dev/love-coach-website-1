import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ContactForm from "@/components/ContactForm";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: "Mail",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Email",
      description: "info@workstab.com"
    },
    {
      icon: "Phone",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Телефон",
      description: "+7 (999) 123-45-67"
    },
    {
      icon: "MessageCircle",
      iconColor: "text-green-500",
      bgColor: "bg-green-500/10",
      title: "WhatsApp",
      description: "+7 (999) 123-45-67"
    },
    {
      icon: "Send",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
      title: "Telegram",
      description: "@workstab_support"
    },
    {
      icon: "Clock",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Время работы",
      description: "Пн-Пт: 9:00-21:00\nСб-Вс: 10:00-18:00"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Декоративные иконки */}
      <div className="absolute inset-0 pointer-events-none">
        <Icon name="Heart" className="absolute top-20 left-10 text-primary/15 w-6 h-6 animate-pulse" />
        <Icon name="Users" className="absolute top-32 right-16 text-primary/10 w-5 h-5" />
        <Icon name="MessageCircle" className="absolute top-48 left-1/4 text-primary/20 w-4 h-4" />
        <Icon name="Heart" className="absolute top-24 right-1/3 text-primary/8 w-7 h-7" />
        <Icon name="Sparkles" className="absolute bottom-40 left-8 text-primary/15 w-5 h-5" />
        <Icon name="Star" className="absolute bottom-56 right-20 text-primary/12 w-4 h-4" />
        <Icon name="Heart" className="absolute bottom-28 left-1/3 text-primary/18 w-6 h-6 animate-pulse" />
        <Icon name="Smile" className="absolute bottom-72 right-1/4 text-primary/10 w-5 h-5" />
        <Icon name="Users" className="absolute top-40 left-1/2 text-primary/12 w-4 h-4" />
        <Icon name="MessageCircle" className="absolute bottom-44 right-1/2 text-primary/15 w-5 h-5" />
        <Icon name="Sparkles" className="absolute top-64 left-20 text-primary/8 w-6 h-6" />
        <Icon name="Star" className="absolute bottom-20 right-12 text-primary/12 w-4 h-4" />
        <Icon name="Heart" className="absolute top-80 right-8 text-primary/15 w-5 h-5" />
        <Icon name="Users" className="absolute bottom-64 left-16 text-primary/10 w-4 h-4" />
        <Icon name="Sparkles" className="absolute top-52 right-1/2 text-primary/12 w-6 h-6 animate-pulse" />
        <Icon name="Smile" className="absolute bottom-36 left-1/2 text-primary/18 w-5 h-5" />
        <Icon name="Star" className="absolute top-36 left-3/4 text-primary/8 w-4 h-4" />
        <Icon name="Heart" className="absolute bottom-52 right-3/4 text-primary/12 w-7 h-7" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Контакты</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Свяжитесь с нами</h2>
            <p className="text-xl text-gray-600">Готовы начать путь к лучшим отношениям?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Форма обратной связи</h3>
              <ContactForm />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Контактная информация</h3>
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-10 h-10 ${contact.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon name={contact.icon as any} className={`h-5 w-5 ${contact.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{contact.title}</h4>
                      <p className="text-gray-600" style={{ whiteSpace: 'pre-line' }}>
                        {contact.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;