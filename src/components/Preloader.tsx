import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let finishInterval: NodeJS.Timeout;

    // Быстрая загрузка для кешированного контента
    const navigationEntries = performance.getEntriesByType('navigation');
    const navigationTiming = navigationEntries.length > 0 ? navigationEntries[0] as PerformanceNavigationTiming : null;
    const isCachedContent = document.readyState === 'complete' && 
                           navigationTiming?.type === 'navigate'; // navigate, not reload

    const progressSpeed = isCachedContent ? 25 : 100; // Быстрее для кеша
    const progressIncrement = isCachedContent ? 15 : 6;

    const startProgress = () => {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          const maxProgress = isCachedContent ? 95 : 90;
          if (prev >= maxProgress) {
            return maxProgress;
          }
          return prev + Math.random() * progressIncrement + 2;
        });
      }, progressSpeed);
    };

    const finishLoading = () => {
      clearInterval(progressInterval);
      
      const finishSpeed = isCachedContent ? 30 : 50;
      finishInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(finishInterval);
            const hideDelay = isCachedContent ? 100 : 300;
            setTimeout(() => {
              setIsVisible(false);
              onComplete?.();
            }, hideDelay);
            return 100;
          }
          return prev + 8;
        });
      }, finishSpeed);
    };

    const checkIfLoaded = () => {
      if (document.readyState === 'complete') {
        finishLoading();
      } else {
        setTimeout(checkIfLoaded, 50);
      }
    };

    startProgress();
    
    const initialDelay = isCachedContent ? 100 : 500;
    
    if (document.readyState === 'complete') {
      setTimeout(finishLoading, initialDelay);
    } else {
      window.addEventListener('load', finishLoading);
      checkIfLoaded();
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(finishInterval);
      window.removeEventListener('load', finishLoading);
    };
  }, [onComplete]);

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
        <div className="flex flex-col items-center space-y-6">
          {/* Логотип */}
          <div className="flex items-center space-x-2">
            <Icon name="Heart" className="h-7 w-7 text-primary heartbeat" style={{ strokeWidth: 2.7 }} />
            <div className="relative">
              <span className="text-2xl font-bold text-gray-900">workstab</span>
              <span className="absolute -bottom-3 -right-2 text-base font-bold text-primary">.com</span>
            </div>
          </div>

          {/* Прогресс бар */}
          <div className="w-48">
            <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 text-primary font-semibold text-sm text-center">
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preloader;