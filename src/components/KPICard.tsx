
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: number;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export default function KPICard({
  title,
  value,
  description,
  trend,
  icon,
  variant = 'default',
  className
}: KPICardProps) {
  const variantStyles = {
    default: "bg-white dark:bg-card border-muted/50",
    success: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    danger: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
  };

  return (
    <div className={cn(
      "rounded-lg shadow-sm border p-4 flex flex-col",
      variantStyles[variant],
      className
    )}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      
      <div className="flex items-baseline">
        <p className="text-2xl font-bold">{value}</p>
        
        {trend !== undefined && (
          <span className={cn(
            "ml-2 text-xs font-medium",
            trend > 0 ? "text-green-600 dark:text-green-400" : 
            trend < 0 ? "text-red-600 dark:text-red-400" : 
            "text-gray-500"
          )}>
            {trend > 0 ? `+${trend}%` : trend < 0 ? `${trend}%` : `${trend}%`}
          </span>
        )}
      </div>
      
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
