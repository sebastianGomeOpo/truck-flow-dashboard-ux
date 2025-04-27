
import { cn } from "@/lib/utils";

type StatusType = 'active' | 'en-route' | 'completed' | 'delayed' | 'critical';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

// Per design guideline #4: Color = state, not decoration
// Blue 600 = En camino, Green 600 = Activa, Red 600 = Fuera tiempo
const statusConfig = {
  'active': {
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    label: 'Activa'
  },
  'en-route': {
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    label: 'En Camino'
  },
  'completed': {
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
    label: 'Completada'
  },
  'delayed': {
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    label: 'Retrasada'
  },
  'critical': {
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
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
