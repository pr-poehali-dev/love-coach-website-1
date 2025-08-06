import React from 'react';
import { cn } from '@/lib/utils';

interface SteppedLoaderProps {
  className?: string;
  steps?: number;
  size?: 'sm' | 'md' | 'lg';
}

const SteppedLoader: React.FC<SteppedLoaderProps> = ({ 
  className, 
  steps = 5, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-1 w-8',
    md: 'h-2 w-12',
    lg: 'h-3 w-16'
  };

  const gapClasses = {
    sm: 'gap-1',
    md: 'gap-2', 
    lg: 'gap-3'
  };

  return (
    <>
      <style>{`
        @keyframes step-loader {
          0%, 20% { opacity: 0.3; transform: scaleY(0.4); }
          40% { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0.3; transform: scaleY(0.4); }
        }
        .step-loader-bar {
          animation: step-loader 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className={cn('flex items-end', gapClasses[size], className)}>
        {Array.from({ length: steps }, (_, index) => (
          <div
            key={index}
            className={cn(
              'step-loader-bar bg-primary rounded-sm',
              sizeClasses[size]
            )}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default SteppedLoader;