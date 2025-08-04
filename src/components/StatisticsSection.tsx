import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

interface CounterProps {
  end: number;
  duration?: number;
  isVisible: boolean;
}

const Counter = ({ end, duration = 2000, isVisible }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isVisible && !hasStarted) {
      setHasStarted(true);
      const increment = end / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, end, duration, hasStarted]);

  return <span>{count}</span>;
};

const useIntersectionObserver = (ref: React.RefObject<Element>, options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};

const StatisticsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.3 });
  
  const stats = [
    {
      icon: "Users",
      iconColor: "text-primary",
      bgColor: "bg-gradient-to-br from-primary/20 to-primary/30",
      number: 500,
      suffix: "+",
      label: "Довольных клиентов"
    },
    {
      icon: "Heart",
      iconColor: "text-secondary",
      bgColor: "bg-gradient-to-br from-secondary/20 to-secondary/30",
      number: 95,
      suffix: "%",
      label: "Улучшили отношения"
    },
    {
      icon: "Star",
      iconColor: "text-primary",
      bgColor: "bg-gradient-to-br from-primary/20 to-primary/30",
      number: 4.9,
      suffix: "",
      label: "Средняя оценка"
    },
    {
      icon: "Clock",
      iconColor: "text-secondary",
      bgColor: "bg-gradient-to-br from-secondary/20 to-secondary/30",
      number: 3,
      suffix: " года",
      label: "Опыт работы"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="stats" 
      className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Результаты нашей работы
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Цифры, которые говорят о качестве наших услуг
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 interactive-card animate-fade-in`}
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className={`w-18 h-18 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto shadow-card hover:shadow-glow transition-all duration-300 animate-bounce-gentle`}
                   style={{animationDelay: `${index * 0.3}s`}}>
                <Icon name={stat.icon as any} className={`h-8 w-8 ${stat.iconColor} drop-shadow-sm`} />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-counter">
                {isVisible && (
                  <>
                    <Counter end={stat.number} isVisible={isVisible} />
                    {stat.suffix}
                  </>
                )}
                {!isVisible && (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <p className="text-gray-300 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;