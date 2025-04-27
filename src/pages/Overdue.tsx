
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import OrdersTable, { Order } from "@/components/OrdersTable";
import KPICard from "@/components/KPICard";
import RefreshButton from "@/components/RefreshButton";
import { AlertOctagon, Clock, BarChart3 } from "lucide-react";

// Mock data
const mockOrders: Order[] = [
  {
    id: "ORD-2930",
    driverName: "Juan Pérez",
    plate: "AAA-111",
    destination: "Terminal Norte",
    arrivalTime: "9:30 AM",
    status: "critical",
    timeRemaining: -35,
    priority: "high"
  },
  {
    id: "ORD-2934",
    driverName: "María López",
    plate: "BBB-222",
    destination: "Centro de Distribución Este",
    arrivalTime: "9:45 AM",
    status: "critical",
    timeRemaining: -27,
    priority: "high"
  },
  {
    id: "ORD-2938",
    driverName: "Pedro García",
    plate: "CCC-333",
    destination: "Bodega Principal",
    arrivalTime: "10:00 AM",
    status: "critical",
    timeRemaining: -22,
    priority: "high"
  },
  {
    id: "ORD-2947",
    driverName: "Ana Martinez",
    plate: "DEF-456",
    destination: "Bodega Principal",
    arrivalTime: "11:00 AM",
    status: "delayed",
    timeRemaining: -5,
    priority: "high"
  },
  {
    id: "ORD-2952",
    driverName: "Fernando Ruiz",
    plate: "STU-901",
    destination: "Bodega Principal",
    arrivalTime: "1:00 PM",
    status: "delayed",
    timeRemaining: -10,
    priority: "high"
  }
];

// Delay cause data for the bar chart
const delayCauses = [
  { name: "Documentación incompleta", percentage: 38 },
  { name: "Problemas en balanza", percentage: 24 },
  { name: "Llegada tarde del conductor", percentage: 21 },
  { name: "Otras causas", percentage: 17 }
];

export default function Overdue() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing details for order: ${orderId}`);
    // In a real application, this would open a drawer with order details
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refreshing data
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <DashboardLayout 
      title="Fuera de Tiempo" 
      description="Órdenes que han excedido su tiempo objetivo de procesamiento"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard
          title="Órdenes Fuera de Tiempo"
          value={8}
          description="Total de órdenes retrasadas"
          trend={-12}
          variant="danger"
          icon={<AlertOctagon className="h-5 w-5 text-gray-600/20" />}
        />
        <KPICard
          title="Retraso Promedio"
          value="24 min"
          description="Tiempo promedio de retraso"
          trend={8}
          variant="danger"
          icon={<Clock className="h-5 w-5 text-gray-600/20" />}
        />
        <KPICard
          title="Cumplimiento Diario"
          value="82%"
          description="Porcentaje de órdenes a tiempo"
          trend={-5}
          variant="warning"
          icon={<BarChart3 className="h-5 w-5 text-gray-600/20" />}
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-[20px] font-semibold mb-2">Causas de Retraso</h3>
        <div className="bg-white dark:bg-card rounded-lg shadow-sm border p-6">
          <div className="space-y-6">
            {delayCauses.map((cause, index) => (
              <div key={index} className="relative">
                <div 
                  className="flex justify-between text-sm mb-1"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <span>{cause.name}</span>
                  <span className="font-medium">{cause.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-destructive/70 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${cause.percentage}%` }}
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  ></div>
                </div>
                {hoveredBar === index && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-md">
                    {cause.percentage}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-semibold">Órdenes Fuera de Tiempo</h2>
        <div className="flex gap-2">
          <select className="text-sm border rounded-md px-2 py-1">
            <option value="all">Todos los retrasos</option>
            <option value="15">{'>'} 15 minutos</option>
            <option value="30">{'>'} 30 minutos</option>
          </select>
          <button className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
            Reportar
          </button>
        </div>
      </div>
      
      <OrdersTable 
        orders={orders} 
        onViewDetails={handleViewDetails}
        isLoading={isLoading} 
      />
      
      <RefreshButton onRefresh={handleRefresh} />
    </DashboardLayout>
  );
}
