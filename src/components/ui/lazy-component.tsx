import React, { Suspense, lazy } from 'react';

interface LazyComponentProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

const LazyWrapper: React.FC<LazyComponentProps> = ({ 
  children, 
  fallback = <div className="animate-pulse bg-gray-100 h-32 rounded-lg" /> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

// HOC для создания lazy компонентов
export const withLazy = <T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));
  
  return (props: T) => (
    <LazyWrapper fallback={fallback}>
      <LazyComponent {...props} />
    </LazyWrapper>
  );
};

export default LazyWrapper;