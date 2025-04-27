
import { useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ClientData {
  name: string;
  value: number;
}

interface BarChartClientesProps {
  data: ClientData[];
}

export default function BarChartClientes({ data }: BarChartClientesProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Add hover effect to bars
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!chartRef.current) return;
      
      const bars = chartRef.current.querySelectorAll('.recharts-bar-rectangle');
      if (!bars.length) return;
      
      let hoveredBar: Element | null = null;
      bars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          hoveredBar = bar;
          bar.classList.add('bar-hover');
        } else {
          bar.classList.remove('bar-hover');
        }
      });
    };
    
    const chart = chartRef.current;
    chart?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      chart?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border shadow-sm text-sm">
          <p className="font-medium">{`${payload[0].payload.name}`}</p>
          <p className="text-red-600">{`${payload[0].value} órdenes con retraso`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Clientes con Órdenes Fuera de Tiempo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="rgba(239, 68, 68, 0.7)" 
                radius={[4, 4, 0, 0]} 
                className="bar-chart-bar" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
