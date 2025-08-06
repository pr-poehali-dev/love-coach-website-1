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
    <section 
      id="contact" 
      className="py-20 relative"
      style={{
        backgroundColor: '#f8f7fc',
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23db2777' fill-opacity='0.06'%3E%3C!-- Сердце --%3E%3Cpath d='M12 18c0-3.3 2.7-6 6-6s6 2.7 6 6c0 4-6 8-6 8s-6-4-6-8z'/%3E%3C!-- Звезда --%3E%3Cpath d='M38 10l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z'/%3E%3C!-- Смайлик --%3E%3Ccircle cx='65' cy='15' r='6'/%3E%3Ccircle cx='62' cy='13' r='1'/%3E%3Ccircle cx='68' cy='13' r='1'/%3E%3Cpath d='M62 17c1 1 2 1 3 1s2 0 3-1' stroke='%23db2777' fill='none' stroke-width='1'/%3E%3C!-- Кольцо --%3E%3Ccircle cx='15' cy='45' r='5' fill='none' stroke='%23db2777' stroke-width='1.5'/%3E%3Ccircle cx='15' cy='42' r='1.5'/%3E%3C!-- Цветок --%3E%3Ccircle cx='45' cy='45' r='3'/%3E%3Ccircle cx='42' cy='42' r='2'/%3E%3Ccircle cx='48' cy='42' r='2'/%3E%3Ccircle cx='42' cy='48' r='2'/%3E%3Ccircle cx='48' cy='48' r='2'/%3E%3C!-- Письмо --%3E%3Crect x='60' y='40' width='12' height='8' fill='none' stroke='%23db2777' stroke-width='1'/%3E%3Cpath d='M60 40l6 4 6-4' fill='none' stroke='%23db2777' stroke-width='1'/%3E%3C!-- Луна --%3E%3Cpath d='M20 70c0-4 2-7 5-7-1-2-3-3-5-3-4 0-7 3-7 7s3 7 7 7c2 0 4-1 5-3-3 0-5-3-5-7z'/%3E%3C!-- Молния --%3E%3Cpath d='M50 65l-3 5h2l-2 5 3-5h-2l2-5z'/%3E%3C!-- Плюс --%3E%3Cpath d='M65 65h6m-3-3v6' stroke='%23db2777' stroke-width='1.5' fill='none'/%3E%3C/g%3E%3C/svg%3E")
        `
      }}
    >
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