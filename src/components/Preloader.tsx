import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface PreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete, duration = 2500 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

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
    <>
      <style>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.2); }
          28% { transform: scale(1); }
          42% { transform: scale(1.2); }
          70% { transform: scale(1); }
        }
        .heartbeat {
          animation: heartbeat 1.2s ease-in-out infinite;
        }
      `}</style>
      <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
        <div className="text-center space-y-8">
          {/* Логотип */}
          <div className="flex items-center space-x-2">
            <Icon name="Heart" className="h-7 w-7 text-primary heartbeat" style={{ strokeWidth: 2.7 }} />
            <div className="relative">
              <span className="text-2xl font-bold text-gray-900">workstab</span>
              <span className="absolute -bottom-3 -right-2 text-base font-bold text-primary">.com</span>
            </div>
          </div>

          {/* Прогресс бар */}
          <div className="w-48 mx-auto">
            <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 text-primary font-semibold text-sm">
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preloader;