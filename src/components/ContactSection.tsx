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
      description: "hello@workstab.com"
    },
    {
      icon: "Phone",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Телефон",
      description: "+7 (914) 752-18-75"
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
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
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