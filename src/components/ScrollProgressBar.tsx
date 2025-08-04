import { useState, useEffect, useRef } from "react";

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
        const clampedProgress = Math.min(Math.max(progress, 0), 100);
        
        // Прямое обновление для синхронности со скроллом
        setScrollProgress(clampedProgress);
        
        setIsVisible(currentScroll > 10);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Вызываем сразу для установки начального значения

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className={`fixed top-[72px] left-0 right-0 z-40 transition-all duration-500 ${
      isVisible ? 'h-1 opacity-100' : 'h-0 opacity-0'
    } bg-gray-200/30 backdrop-blur-sm`}>
      <div 
        className="h-full bg-gradient-to-r from-primary via-secondary to-primary shadow-glow transition-none"
        style={{ 
          width: `${scrollProgress}%`,
          boxShadow: scrollProgress > 0 ? '0 0 8px hsl(var(--primary) / 0.4)' : 'none'
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;