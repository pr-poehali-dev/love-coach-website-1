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
      {/* Креативный анимированный фон */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Плавающие сердечки */}
        <div className="floating-hearts">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`floating-heart heart-${i + 1}`}
              style={{
                left: `${15 + i * 12}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.3}s`
              }}
            >
              ♥
            </div>
          ))}
        </div>
        
        {/* Градиентные круги */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-gradient-to-tl from-primary/8 to-primary/3 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-r from-primary/6 to-primary/2 rounded-full blur-md animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Волновые линии */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,100 Q250,50 500,100 T1000,100"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.1"
            className="animate-pulse"
          />
          <path
            d="M0,200 Q300,150 600,200 T1200,200"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.08"
            className="animate-pulse"
            style={{animationDelay: '1.5s'}}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(219 39 119)" stopOpacity="0" />
              <stop offset="50%" stopColor="rgb(219 39 119)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(219 39 119)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <style jsx>{`
        .floating-heart {
          position: absolute;
          color: rgb(219 39 119);
          font-size: 20px;
          animation: floatUp linear infinite;
        }
        
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-50px) rotate(360deg);
            opacity: 0;
          }
        }
        
        .heart-1 { font-size: 16px; }
        .heart-2 { font-size: 24px; }
        .heart-3 { font-size: 18px; }
        .heart-4 { font-size: 20px; }
        .heart-5 { font-size: 22px; }
        .heart-6 { font-size: 16px; }
        .heart-7 { font-size: 26px; }
        .heart-8 { font-size: 18px; }
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