
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import EnRoute from "./pages/EnRoute";
import Overdue from "./pages/Overdue";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Keyboard navigation component
const KeyboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Navigation with arrow keys
      if (event.altKey && event.key === 'ArrowRight') {
        event.preventDefault();
        if (location.pathname === '/') {
          navigate('/en-camino');
        } else if (location.pathname === '/en-camino') {
          navigate('/fuera-tiempo');
        }
      }
      
      if (event.altKey && event.key === 'ArrowLeft') {
        event.preventDefault();
        if (location.pathname === '/fuera-tiempo') {
          navigate('/en-camino');
        } else if (location.pathname === '/en-camino') {
          navigate('/');
        }
      }
      
      // Refresh with R key
      if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        // This will trigger a page refresh - in a real app, you'd connect this to your refresh logic
        window.dispatchEvent(new CustomEvent('app-refresh'));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, location]);
  
  return null;
};

const AppRoutes = () => {
  return (
    <>
      <KeyboardNavigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/en-camino" element={<EnRoute />} />
        <Route path="/fuera-tiempo" element={<Overdue />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
