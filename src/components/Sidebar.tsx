
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Truck, Clock, AlertTriangle } from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
  badge: number;
}

const navItems: NavItem[] = [
  { title: "Órdenes Activas", path: "/", icon: Truck, badge: 24 },
  { title: "En Camino", path: "/en-camino", icon: Clock, badge: 15 },
  { title: "Fuera de Tiempo", path: "/fuera-tiempo", icon: AlertTriangle, badge: 8 },
];

export default function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <aside 
      className={cn(
        "sidebar fixed h-[calc(100vh-60px)] top-[60px] left-0 bg-white border-r shadow-sm transition-all duration-200",
        collapsed ? "w-[60px]" : "w-[220px]"
      )}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 py-4">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors group relative",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="size-5 flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.title}</span>}
                  
                  {/* Badge */}
                  <span className={cn(
                    "bg-secondary rounded-full text-secondary-foreground text-xs flex items-center justify-center font-medium",
                    collapsed ? "absolute -top-1 -right-1 size-5" : "ml-auto size-5"
                  )}>
                    {item.badge}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-2 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "w-full flex justify-center",
              collapsed ? "px-0" : ""
            )} 
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            <ChevronRight className={cn(
              "size-4 transition-transform", 
              collapsed ? "rotate-180" : ""
            )} />
            {!collapsed && <span className="ml-1">Colapsar</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
