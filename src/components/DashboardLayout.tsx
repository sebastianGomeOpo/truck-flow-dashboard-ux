
import { ReactNode } from "react";
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
    <div className="min-h-screen bg-muted/30">
      <DashboardNav />
      
      <main className="container max-w-7xl mx-auto px-4 py-6">
        {(title || description) && (
          <div className="mb-6">
            {title && <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>}
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>
        )}
        
        {children}
      </main>
      
      <footer className="py-6 border-t">
        <div className="container max-w-7xl mx-auto px-4 text-sm text-muted-foreground">
          <p>© 2025 Truck Flow Dashboard - v1.0.0</p>
        </div>
      </footer>
    </div>
  );
}
