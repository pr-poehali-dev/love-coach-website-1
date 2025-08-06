
import { useState, useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Preloader from "./components/Preloader";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Offer = lazy(() => import("./pages/Offer"));
const Privacy = lazy(() => import("./pages/Privacy"));
const CustomPayment = lazy(() => import("./pages/CustomPayment"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();
  
  // Проверяем нужен ли прелоадер
  const shouldShowLoader = () => {
    // На первой загрузке показываем всегда
    if (isInitialLoad && document.readyState !== 'complete') {
      return true;
    }
    
    // При переходах показываем только если требуется время на загрузку
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const navigationTiming = navigationEntries[0] as PerformanceNavigationTiming;
      if (navigationTiming.type === 'reload') {
        return true;
      }
    }
    
    return false;
  };
  
  // Сбрасываем прелоадер при смене маршрута
  useEffect(() => {
    if (shouldShowLoader()) {
      setIsLoading(true);
      
      // Минимальное время показа для плавности UX
      const minTime = isInitialLoad ? 1200 : 300;
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, minTime);
      
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  }, [location.pathname, isInitialLoad]);
  
  // Не показываем прелоадер на странице оплаты
  const shouldShowPreloader = isLoading && location.pathname !== '/custom-payment';

  return (
    <>
      {shouldShowPreloader && <Preloader onComplete={() => setIsLoading(false)} />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/custom-payment" element={<CustomPayment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;