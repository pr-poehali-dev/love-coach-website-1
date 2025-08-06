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
      {/* Креативная сеть связей */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          {/* Узлы сети */}
          <circle cx="120" cy="100" r="3" fill="rgb(219 39 119)" opacity="0.4" className="animate-pulse">
            <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="80" r="2" fill="rgb(219 39 119)" opacity="0.3" className="animate-pulse" style={{animationDelay: '0.5s'}}>
            <animate attributeName="r" values="2;3;2" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="480" cy="150" r="3" fill="rgb(219 39 119)" opacity="0.5" className="animate-pulse" style={{animationDelay: '1s'}}>
            <animate attributeName="r" values="2;5;2" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="220" r="2" fill="rgb(219 39 119)" opacity="0.3" className="animate-pulse" style={{animationDelay: '1.5s'}}>
            <animate attributeName="r" values="2;4;2" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="650" cy="180" r="3" fill="rgb(219 39 119)" opacity="0.4" className="animate-pulse" style={{animationDelay: '2s'}}>
            <animate attributeName="r" values="2;4;2" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="300" r="2" fill="rgb(219 39 119)" opacity="0.3" className="animate-pulse" style={{animationDelay: '0.8s'}}>
            <animate attributeName="r" values="2;3;2" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="400" r="3" fill="rgb(219 39 119)" opacity="0.5" className="animate-pulse" style={{animationDelay: '2.5s'}}>
            <animate attributeName="r" values="2;5;2" dur="3.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="420" r="2" fill="rgb(219 39 119)" opacity="0.3" className="animate-pulse" style={{animationDelay: '1.2s'}}>
            <animate attributeName="r" values="2;4;2" dur="2.9s" repeatCount="indefinite" />
          </circle>

          {/* Связующие линии с анимацией */}
          <line x1="120" y1="100" x2="300" y2="80" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.15">
            <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="300" y1="80" x2="480" y2="150" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="5s" repeatCount="indefinite" begin="0.5s" />
          </line>
          <line x1="120" y1="100" x2="200" y2="220" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.12">
            <animate attributeName="opacity" values="0.05;0.25;0.05" dur="3.5s" repeatCount="indefinite" begin="1s" />
          </line>
          <line x1="480" y1="150" x2="650" y2="180" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.18">
            <animate attributeName="opacity" values="0.1;0.35;0.1" dur="4.2s" repeatCount="indefinite" begin="1.5s" />
          </line>
          <line x1="200" y1="220" x2="400" y2="300" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.15">
            <animate attributeName="opacity" values="0.08;0.28;0.08" dur="3.8s" repeatCount="indefinite" begin="0.8s" />
          </line>
          <line x1="400" y1="300" x2="150" y2="400" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.13">
            <animate attributeName="opacity" values="0.05;0.3;0.05" dur="4.5s" repeatCount="indefinite" begin="2s" />
          </line>
          <line x1="150" y1="400" x2="600" y2="420" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.16">
            <animate attributeName="opacity" values="0.1;0.32;0.1" dur="3.3s" repeatCount="indefinite" begin="1.8s" />
          </line>
          <line x1="650" y1="180" x2="600" y2="420" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.14">
            <animate attributeName="opacity" values="0.06;0.26;0.06" dur="4.8s" repeatCount="indefinite" begin="2.3s" />
          </line>

          {/* Градиенты */}
          <defs>
            <linearGradient id="connectionGradient" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="rgb(219 39 119)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="rgb(219 39 119)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="rgb(219 39 119)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Дополнительные геометрические элементы */}
        <div className="absolute top-20 right-20 w-1 h-16 bg-gradient-to-b from-primary/20 to-transparent transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-12 h-1 bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 border border-primary/10 rounded-full transform rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
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