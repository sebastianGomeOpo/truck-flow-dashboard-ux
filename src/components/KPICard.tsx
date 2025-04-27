
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: number;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

// Map variants to semantic colors from our design system
const variantStyles = {
  default: "bg-white border-muted/50",
  success: "bg-white border-green-600/20",
  warning: "bg-white border-yellow-600/20",
  danger: "bg-white border-red-600/20"
};

// Map variants to icon background colors
const iconBgStyles = {
  default: "bg-slate-100",
  success: "bg-green-50",
  warning: "bg-yellow-50",
  danger: "bg-red-50"
};

// Map variants to trend text colors
const trendTextStyles = {
  positive: "text-green-600",
  negative: "text-red-600",
  neutral: "text-gray-500"
};

export default function KPICard({
  title,
  value,
  description,
  trend,
  icon,
  variant = 'default',
  className
}: KPICardProps) {
  return (
    <div className={cn(
      "rounded-lg shadow-sm border p-6 flex flex-col", // Increased padding to 24px (6*4)
      variantStyles[variant],
      className
    )}>
      <div className="flex justify-between items-start mb-3">
        {icon && (
          <div className={cn(
            "flex items-center justify-center size-10 rounded-md",
            iconBgStyles[variant]
          )}>
            {icon}
          </div>
        )}
        <h3 className="text-base font-medium text-muted-foreground">{title}</h3>
      </div>
      
      <div className="flex items-baseline mt-1">
        <p className="text-2xl font-bold">{value}</p>
        
        {trend !== undefined && (
          <div className="ml-3 flex items-center gap-1 text-sm">
            {trend > 0 ? (
              <>
                <TrendingUp className="size-3.5" />
                <span className={trendTextStyles.positive}>+{trend}%</span>
              </>
            ) : trend < 0 ? (
              <>
                <TrendingDown className="size-3.5" />
                <span className={trendTextStyles.negative}>{trend}%</span>
              </>
            ) : (
              <span className={trendTextStyles.neutral}>{trend}%</span>
            )}
          </div>
        )}
      </div>
      
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
