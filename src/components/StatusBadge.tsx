
import { cn } from "@/lib/utils";

type StatusType = 'active' | 'en-route' | 'completed' | 'delayed' | 'critical';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  'active': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-800 dark:text-blue-300',
    label: 'Activa'
  },
  'en-route': {
    bgColor: 'bg-secondary-100 dark:bg-secondary-900/30',
    textColor: 'text-secondary-800 dark:text-secondary-300',
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
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-800 dark:text-red-300',
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
