
import { cn } from "@/lib/utils";

type StatusType = 'active' | 'en-route' | 'completed' | 'delayed' | 'critical';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  'active': {
    bgColor: 'bg-success/10',
    textColor: 'text-success',
    label: 'Activa'
  },
  'en-route': {
    bgColor: 'bg-info/10',
    textColor: 'text-info',
    label: 'En Camino'
  },
  'completed': {
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-800 dark:text-green-300',
    label: 'Completada'
  },
  'delayed': {
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    textColor: 'text-yellow-800 dark:text-yellow-300',
    label: 'Retrasada'
  },
  'critical': {
    bgColor: 'bg-destructive/10',
    textColor: 'text-destructive',
    label: 'Fuera de Tiempo'
  }
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      config.bgColor,
      config.textColor,
      className
    )}>
      {config.label}
    </span>
  );
}
