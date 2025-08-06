// CSS optimization utilities
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const loadCriticalCSS = () => {
  const criticalCSS = `
    .animate-spin { 
      animation: spin 1s linear infinite; 
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-pulse { 
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; 
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: .5; }
    }
  `;
  
  if (!document.querySelector('#critical-css')) {
    const style = document.createElement('style');
    style.id = 'critical-css';
    style.textContent = criticalCSS;
    document.head.appendChild(style);
  }
};

export const removeUnusedCSS = () => {
  const sheets = Array.from(document.styleSheets);
  const usedSelectors = new Set<string>();
  
  // Get all elements with classes
  const allElements = Array.from(document.querySelectorAll('*'));
  allElements.forEach(el => {
    Array.from(el.classList).forEach(className => {
      usedSelectors.add(`.${className}`);
    });
  });
  
  return usedSelectors.size;
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const links = [
    { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
    { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossOrigin: 'anonymous' }
  ];
  
  links.forEach(({ href, rel, crossOrigin }) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.href = href;
      link.rel = rel;
      if (crossOrigin) link.crossOrigin = crossOrigin;
      document.head.appendChild(link);
    }
  });
};