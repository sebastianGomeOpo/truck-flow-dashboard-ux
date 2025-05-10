
import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

export default function DashboardMainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const location = useLocation();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + R to refresh
      if (e.altKey && e.key === 'r') {
        handleRefresh();
      }
      
      // Alt + 1/2/3 to navigate
      if (e.altKey && e.key === '1') {
        window.location.href = '/';
      } else if (e.altKey && e.key === '2') {
        window.location.href = '/en-camino';
      } else if (e.altKey && e.key === '3') {
        window.location.href = '/fuera-tiempo';
      }
      
      // Arrow keys for navigation when focused on sidebar
      if (document.activeElement?.closest('.sidebar')) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          const currentPath = location.pathname;
          const routes = ['/', '/en-camino', '/fuera-tiempo'];
          const currentIndex = routes.indexOf(currentPath);
          
          if (e.key === 'ArrowRight' && currentIndex < routes.length - 1) {
            window.location.href = routes[currentIndex + 1];
          } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            window.location.href = routes[currentIndex - 1];
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [location]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refresh action
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Datos actualizados");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <main className={cn(
          "flex-1 transition-all duration-200 overflow-auto",
          sidebarCollapsed ? "ml-[60px]" : "ml-[220px]"
        )}>
          <div className="container max-w-[1440px] mx-auto px-4 py-6">
            {children}
            
            <Button
              onClick={handleRefresh}
              className={cn(
                "fixed bottom-6 right-6 rounded-full size-12 shadow-md transition-all will-change-transform",
                isRefreshing && "animate-spin"
              )}
              aria-label="Refrescar datos"
            >
              <RefreshCw className="size-5" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
