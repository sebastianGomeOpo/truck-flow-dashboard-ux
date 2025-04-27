
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Truck, Clock, AlertCircle } from "lucide-react";

interface NavItem {
  title: string;
  path: string;
  badge?: number;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { title: "Órdenes Activas", path: "/", badge: 24, icon: Clock },
  { title: "En Camino", path: "/en-camino", badge: 15, icon: Truck },
  { title: "Fuera de Tiempo", path: "/fuera-tiempo", badge: 8, icon: AlertCircle },
];

export default function DashboardNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-background border-t">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center py-2 px-4 text-center",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              end
            >
              <span className="relative">
                <item.icon size={20} />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[10px] font-medium bg-secondary text-secondary-foreground">
                    {item.badge}
                  </span>
                )}
              </span>
              <span className="text-xs mt-1">{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Desktop navigation - collapsible sidebar */}
      <div 
        className={cn(
          "hidden md:flex flex-col border-r bg-white dark:bg-card transition-all duration-300 sticky top-0 h-screen z-10",
          isCollapsed ? "w-[60px]" : "w-[220px]"
        )}
      >
        <div className="flex items-center h-[60px] border-b px-4">
          {!isCollapsed && (
            <h1 className="font-bold text-primary">Truck Flow</h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            className={cn("ml-auto p-1 h-6 w-6", isCollapsed && "mx-auto")}
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-2 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  isCollapsed && "justify-center"
                )}
                end
              >
                <span className="relative flex-shrink-0">
                  <item.icon size={18} />
                  {item.badge && !isCollapsed && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[10px] font-medium bg-secondary text-secondary-foreground">
                      {item.badge}
                    </span>
                  )}
                  {item.badge && isCollapsed && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[10px] font-medium bg-secondary text-secondary-foreground">
                      {item.badge}
                    </span>
                  )}
                </span>
                
                {!isCollapsed && (
                  <span className="ml-3 truncate">{item.title}</span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="border-t p-4">
          {!isCollapsed && (
            <p className="text-xs text-muted-foreground">v1.0.0</p>
          )}
        </div>
      </div>
    </>
  );
}
