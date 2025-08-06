import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  className?: string;
}

const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ 
    src, 
    alt, 
    width, 
    height, 
    priority = false, 
    placeholder, 
    blurDataURL,
    className,
    ...props 
  }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    // Intersection Observer для lazy loading
    useEffect(() => {
      if (priority) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '50px'
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, [priority]);

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setError(true);
    };

    const imageSrc = isInView ? src : undefined;
    const showPlaceholder = !isLoaded && !error && (placeholder || blurDataURL);

    return (
      <div 
        ref={imgRef}
        className={cn("relative overflow-hidden", className)}
        style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
      >
        {/* Placeholder/blur */}
        {showPlaceholder && (
          <div 
            className="absolute inset-0 bg-gray-100 animate-pulse"
            style={{
              backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(10px) brightness(0.9)'
            }}
          />
        )}
        
        {/* Main image */}
        {imageSrc && (
          <img
            ref={ref}
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              error && "hidden"
            )}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            {...props}
          />
        )}

        {/* Error fallback */}
        {error && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Изображение недоступно</span>
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;