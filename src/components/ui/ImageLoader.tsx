import React from 'react';
import { cn } from '@/lib/utils';

interface ImageLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ 
  className, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <>
      <style>{`
        @keyframes imageLoader {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes imageLoaderInner {
          0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 90, 200; stroke-dashoffset: -35; }
          100% { stroke-dasharray: 90, 200; stroke-dashoffset: -124; }
        }
        .image-loader-outer {
          animation: imageLoader 2s linear infinite;
        }
        .image-loader-inner {
          animation: imageLoaderInner 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className={cn('image-loader-outer', sizeClasses[size], className)}>
        <svg className="w-full h-full" viewBox="22 22 44 44">
          <circle
            className="image-loader-inner"
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.6"
            strokeDasharray="1, 200"
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
};

export default ImageLoader;