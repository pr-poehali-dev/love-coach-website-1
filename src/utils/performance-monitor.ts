// Performance monitoring utilities

// Web Vitals мониторинг
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Measure First Contentful Paint
  const measureFCP = () => {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
      });
    });
    observer.observe({ entryTypes: ['paint'] });
  };

  // Measure Largest Contentful Paint
  const measureLCP = () => {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  };

  // Measure Cumulative Layout Shift
  const measureCLS = () => {
    let clsValue = 0;
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      console.log('CLS:', clsValue);
    });
    observer.observe({ entryTypes: ['layout-shift'] });
  };

  measureFCP();
  measureLCP();
  measureCLS();
};

// Resource hints для оптимизации загрузки
export const preloadCriticalImages = (images: string[]) => {
  images.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Lazy loading для изображений
export const observeImages = () => {
  if (!('IntersectionObserver' in window)) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
};

// Bundle size analysis (development only)
export const analyzeBundleSize = () => {
  if (import.meta.env.PROD) return;

  console.group('Bundle Analysis');
  console.log('React:', React);
  console.log('Total modules loaded:', performance.getEntriesByType('resource').length);
  console.groupEnd();
};

export default {
  measureWebVitals,
  preloadCriticalImages,
  observeImages,
  analyzeBundleSize
};