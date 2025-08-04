import { useState, useEffect } from "react";

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Вызываем сразу для установки начального значения

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-20 left-0 right-0 z-40 h-1 bg-gray-200/50 backdrop-blur-sm">
      <div 
        className="h-full bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-300 ease-out shadow-glow"
        style={{ 
          width: `${scrollProgress}%`,
          boxShadow: scrollProgress > 0 ? '0 0 10px hsl(var(--primary) / 0.5)' : 'none'
        }}
      >
        {/* Анимированная точка на конце */}
        {scrollProgress > 0 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse-glow shadow-glow transform translate-x-1/2">
            <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollProgressBar;