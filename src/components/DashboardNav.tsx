
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { title: "Órdenes Activas", path: "/", badge: 24 },
  { title: "En Camino", path: "/en-camino", badge: 15 },
  { title: "Fuera de Tiempo", path: "/fuera-tiempo", badge: 8 },
];

export default function DashboardNav() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      {/* Mobile navigation */}
      <div className="md:hidden py-2 px-4 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Truck Flow</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            {isMobileNavOpen ? 'Cerrar' : 'Menú'}
          </Button>
        </div>
        
        {isMobileNavOpen && (
          <div className="mt-2 space-y-2 p-2 bg-muted/50 rounded-md animate-fade-in">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "block py-2 px-3 rounded-md text-sm font-medium",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                )}
                onClick={() => setIsMobileNavOpen(false)}
                end
              >
                <div className="flex justify-between items-center">
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Desktop navigation */}
      <div className="hidden md:block border-b bg-background sticky top-0 z-10">
        <div className="px-6 flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-primary flex-shrink-0">
            Truck Flow Dashboard
          </h1>
          
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "px-4 py-2 rounded-md text-sm font-medium flex items-center",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                )}
                end
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="ml-2 bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex-shrink-0">
            <Button variant="ghost" size="sm">
              Notificaciones
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
