import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ImageLoader from './ImageLoader';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  width?: number;
  height?: number;
}

const LazyImage = ({
  src,
  alt,
  className,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDEzVjE3TTEyIDEzSDhNMTIgMTNIMTYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHN2Zz4K",
  onLoad,
  onError,
  width,
  height
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [needsLoader, setNeedsLoader] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Проверяем кеш изображения
  const isImageCached = (src: string): boolean => {
    const img = new Image();
    img.src = src;
    return img.complete && img.naturalHeight !== 0;
  };

  useEffect(() => {
    // Сначала проверяем кеш
    if (isImageCached(src)) {
      setIsLoaded(true);
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Показываем лоадер только если изображение не в кеше
          if (!isImageCached(src)) {
            setNeedsLoader(true);
          }
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setNeedsLoader(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div 
      ref={imgRef}
      className={cn("relative overflow-hidden bg-gray-100", className)}
      style={{ width, height }}
    >
      {!isInView ? (
        <img
          src={placeholder}
          alt=""
          className="w-full h-full object-cover opacity-20"
          aria-hidden="true"
        />
      ) : (
        <>
          {needsLoader && !isLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <ImageLoader size="sm" className="text-primary" />
            </div>
          )}
          <img
            src={isInView ? src : placeholder}
            alt={alt}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            decoding="async"
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;