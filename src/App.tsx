
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Offer from "./pages/Offer";
import Privacy from "./pages/Privacy";
import CustomPayment from "./pages/CustomPayment";
import NotFound from "./pages/NotFound";
import Preloader from "./components/Preloader";

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  // Не показываем прелоадер на странице оплаты
  const shouldShowPreloader = isLoading && location.pathname !== '/custom-payment';

  return (
    <>
      {shouldShowPreloader && <Preloader onComplete={() => setIsLoading(false)} />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/custom-payment" element={<CustomPayment />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
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