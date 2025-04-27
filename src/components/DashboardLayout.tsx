
import { ReactNode } from "react";
import Header from "./Header";
import DashboardNav from "./DashboardNav";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function DashboardLayout({
  children,
  title,
  description
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F5F7FA] dark:bg-muted/30">
      {/* Sidebar - 220px width, collapsable */}
      <DashboardNav />
      
      <div className="flex flex-col flex-1">
        {/* Header - 60px height */}
        <Header />
        
        {/* Content area */}
        <main className="container max-w-[1440px] mx-auto px-4 py-6 flex-1">
          {(title || description) && (
            <div className="mb-6">
              {title && <h1 className="text-[28px] font-semibold leading-tight">{title}</h1>}
              {description && <p className="text-muted-foreground mt-1">{description}</p>}
            </div>
          )}
          
          {children}
        </main>
        
        <footer className="py-4 border-t">
          <div className="container max-w-[1440px] mx-auto px-4 text-sm text-muted-foreground flex items-center justify-between">
            <p>© 2025 Truck Flow Dashboard - v1.0.0</p>
            <p className="text-xs">Actualizado ⟳ {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
