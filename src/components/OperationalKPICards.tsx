
import { Card, CardContent } from "./ui/card";
import { TrendingDown, TrendingUp, CheckCircle, Timer, BarChart } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
}

const KPICard = ({ title, value, trend, icon }: KPICardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-muted/50 rounded-md">
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? (
                <TrendingUp className="mr-1 size-4" />
              ) : (
                <TrendingDown className="mr-1 size-4" />
              )}
              <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
            </div>
          )}
        </div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};

export default function OperationalKPICards() {
  return (
    <div className="col-span-12">
      <h2 className="text-xl font-semibold mb-4">Métricas Operacionales</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard
          title="Tiempo Promedio en Puerto"
          value="1h 24m"
          trend={{ value: 12, isPositive: true }}
          icon={<Timer className="size-5 text-blue-600" />}
        />
        <KPICard
          title="Entregas a Tiempo"
          value="87%"
          trend={{ value: 5, isPositive: true }}
          icon={<CheckCircle className="size-5 text-green-600" />}
        />
        <KPICard
          title="Cumplimiento de Proceso"
          value="92%"
          trend={{ value: 3, isPositive: false }}
          icon={<BarChart className="size-5 text-blue-600" />}
        />
      </div>
    </div>
  );
}
