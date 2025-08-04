import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete, duration = 2500 }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Логотип с анимацией */}
        <div className="relative">
          <div className="text-4xl font-bold text-white mb-2">
            workstab
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="text-primary font-bold text-lg animate-pulse">
              ▁▂▄▆█▆▄▂▁
            </div>
            <span className="text-2xl font-bold text-primary">.com</span>
          </div>
        </div>

        {/* Анимированное сердце */}
        <div className="flex justify-center">
          <div className="text-6xl animate-bounce text-red-500">
            ❤️
          </div>
        </div>

        {/* Прогресс бар */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary to-pink-500 h-full rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-primary font-semibold">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Анимированный текст */}
        <div className="text-white/70 font-medium">
          <div className="flex items-center justify-center space-x-1">
            <span>Анализируем ваше рабочее место</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Фоновая анимация */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-500/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-primary/25 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-red-500/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default Preloader;