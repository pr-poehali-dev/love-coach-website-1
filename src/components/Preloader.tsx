import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface PreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete, duration = 2500 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
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
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          {/* Логотип */}
          <div className="flex items-center space-x-2">
            <Icon name="Heart" className="h-7 w-7 text-primary heartbeat" style={{ strokeWidth: 2.7 }} />
            <div className="relative">
              <span className="text-2xl font-bold text-gray-900">workstab</span>
              <span className="absolute -bottom-3 -right-2 text-base font-bold text-primary">.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preloader;