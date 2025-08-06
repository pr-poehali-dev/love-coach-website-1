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
      {/* Морфирующие формы */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Основная морфирующая форма */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-5"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgb(219 39 119), transparent, rgb(147 51 234), transparent)',
            borderRadius: '50% 30% 70% 40%',
            filter: 'blur(60px)',
            animation: 'morphing 12s ease-in-out infinite',
            transform: 'scale(1.2)',
          }}
        />
        
        {/* Вторичная форма */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-4"
          style={{
            background: 'radial-gradient(ellipse at center, rgb(219 39 119), transparent 70%)',
            borderRadius: '60% 40% 30% 70%',
            filter: 'blur(40px)',
            animation: 'morphing2 15s ease-in-out infinite reverse',
            animationDelay: '3s',
          }}
        />

        {/* Минималистичные акценты */}
        <div className="absolute top-20 right-1/3 w-px h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent transform rotate-12"></div>
        <div className="absolute bottom-32 left-1/3 w-24 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"></div>
      </div>
      
      <style jsx>{`
        @keyframes morphing {
          0%, 100% {
            border-radius: 50% 30% 70% 40%;
            transform: scale(1.2) rotate(0deg);
          }
          25% {
            border-radius: 30% 70% 50% 60%;
            transform: scale(1.4) rotate(90deg);
          }
          50% {
            border-radius: 70% 50% 30% 40%;
            transform: scale(1.1) rotate(180deg);
          }
          75% {
            border-radius: 40% 60% 70% 30%;
            transform: scale(1.3) rotate(270deg);
          }
        }
        
        @keyframes morphing2 {
          0%, 100% {
            border-radius: 60% 40% 30% 70%;
            transform: scale(1) rotate(0deg);
          }
          33% {
            border-radius: 30% 60% 70% 40%;
            transform: scale(1.2) rotate(120deg);
          }
          66% {
            border-radius: 70% 30% 40% 60%;
            transform: scale(0.9) rotate(240deg);
          }
        }
      `}</style>
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