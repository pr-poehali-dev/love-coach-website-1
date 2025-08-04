import { useState, useEffect, useRef } from "react";

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>();
  const progressRef = useRef(0);

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
        
        // Плавная интерполяция для устранения рывков
        const smoothProgress = progressRef.current + (clampedProgress - progressRef.current) * 0.1;
        progressRef.current = smoothProgress;
        
        setScrollProgress(smoothProgress);
        setIsVisible(currentScroll > 10); // Показываем только после небольшой прокрутки
      });
    };

    // Добавляем throttling для лучшей производительности
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Вызываем сразу для установки начального значения

    return () => {
      window.removeEventListener('scroll', throttledScroll);
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
        className="h-full bg-gradient-to-r from-primary via-secondary to-primary shadow-glow transition-all duration-200 ease-out"
        style={{ 
          width: `${scrollProgress}%`,
          boxShadow: scrollProgress > 0 ? '0 0 8px hsl(var(--primary) / 0.4)' : 'none',
          transformOrigin: 'left center',
          transform: `scaleX(${Math.max(scrollProgress / 100, 0.01)})`,
        }}
      >
        {/* Анимированная точка на конце */}
        {scrollProgress > 2 && (
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full shadow-glow transform translate-x-1/2 transition-all duration-200"
            style={{
              opacity: Math.min(scrollProgress / 10, 1),
              transform: `translateX(50%) translateY(-50%) scale(${Math.min(scrollProgress / 50, 1)})`
            }}
          >
            <div className="absolute inset-0 bg-white/40 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollProgressBar;