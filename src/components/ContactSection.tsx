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
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23db2777' fill-opacity='0.08'%3E%3Cpath d='M15 15 C15 12.2386 17.2386 10 20 10 C22.7614 10 25 12.2386 25 15 C25 17.7614 22.7614 20 20 20 C17.2386 20 15 17.7614 15 15Z M15 7 L17 5 L19 7 L17 9 Z M35 25 C37.7614 25 40 22.7614 40 20 C40 17.2386 37.7614 15 35 15 C32.2386 15 30 17.2386 30 20 C30 22.7614 32.2386 25 35 25Z M42 42 L44 40 L46 42 L44 44 Z M7 35 C9.7614 35 12 32.7614 12 30 C12 27.2386 9.7614 25 7 25 C4.2386 25 2 27.2386 2 30 C2 32.7614 4.2386 35 7 35Z M48 15 C50.7614 15 53 12.7614 53 10 C53 7.2386 50.7614 5 48 5 C45.2386 5 43 7.2386 43 10 C43 12.7614 45.2386 15 48 15Z M27 42 L29 40 L31 42 L29 44 Z M53 35 C55.7614 35 58 32.7614 58 30 C58 27.2386 55.7614 25 53 25 C50.2386 25 48 27.2386 48 30 C48 32.7614 50.2386 35 53 35Z M35 55 C37.7614 55 40 52.7614 40 50 C40 47.2386 37.7614 45 35 45 C32.2386 45 30 47.2386 30 50 C30 52.7614 32.2386 55 35 55Z M7 55 C9.7614 55 12 52.7614 12 50 C12 47.2386 9.7614 45 7 45 C4.2386 45 2 47.2386 2 50 C2 52.7614 4.2386 55 7 55Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
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