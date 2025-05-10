
import { Card, CardContent } from "./ui/card";
import { AlertTriangle, Clock, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrafficStatusItemProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  status?: 'normal' | 'warning' | 'critical';
  subtitle?: string;
}

const TrafficStatusItem = ({ label, value, icon, status = 'normal', subtitle }: TrafficStatusItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4">
      <div className={cn(
        "p-3 rounded-lg",
        status === 'normal' && "bg-blue-100",
        status === 'warning' && "bg-yellow-100",
        status === 'critical' && "bg-red-100"
      )}>
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-sm text-muted-foreground">{label}</h3>
        <p className="font-semibold text-xl">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
};

export default function TrafficStatusPanel() {
  return (
    <div className="col-span-12 lg:col-span-4">
      <h2 className="text-xl font-semibold mb-4">Estado del Tráfico</h2>
      <Card>
        <CardContent className="p-0 divide-y">
          <TrafficStatusItem
            label="Camiones en Puerto"
            value={24}
            icon={<Truck className="size-6 text-blue-600" />}
            subtitle="8 en descarga, 16 en espera"
          />
          
          <TrafficStatusItem
            label="Tiempo Promedio"
            value="1h 45m"
            icon={<Clock className="size-6 text-blue-600" />}
            status="normal"
            subtitle="↓ 15min respecto al promedio"
          />
          
          <TrafficStatusItem
            label="Zonas Congestionadas"
            value={2}
            icon={<AlertTriangle className="size-6 text-red-600" />}
            status="critical"
            subtitle="Zona B y Zona D"
          />
        </CardContent>
      </Card>
    </div>
  );
}
