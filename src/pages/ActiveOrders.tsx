
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import OrdersTable, { Order } from "@/components/OrdersTable";
import KPICard from "@/components/KPICard";
import RefreshButton from "@/components/RefreshButton";
import { Clock, AlertCircle, Timer } from "lucide-react";

// Mock data
const mockOrders: Order[] = [
  {
    id: "ORD-2945",
    driverName: "Carlos Mendoza",
    plate: "ABC-123",
    destination: "Terminal Norte",
    arrivalTime: "10:30 AM",
    departureTime: "11:45 AM",
    status: "active",
    timeRemaining: 45,
    priority: "low"
  },
  {
    id: "ORD-2946",
    driverName: "Luis Rodriguez",
    plate: "XYZ-789",
    destination: "Centro de Distribución Este",
    arrivalTime: "10:45 AM",
    departureTime: undefined,
    status: "active",
    timeRemaining: 12,
    priority: "medium"
  },
  {
    id: "ORD-2947",
    driverName: "Ana Martinez",
    plate: "DEF-456",
    destination: "Bodega Principal",
    arrivalTime: "11:00 AM",
    departureTime: undefined,
    status: "delayed",
    timeRemaining: -5,
    priority: "high"
  },
  {
    id: "ORD-2948",
    driverName: "Miguel Herrera",
    plate: "GHI-789",
    destination: "Terminal Sur",
    arrivalTime: "11:15 AM",
    departureTime: undefined,
    status: "active",
    timeRemaining: 60,
    priority: "low"
  },
  {
    id: "ORD-2949",
    driverName: "Sofia Vargas",
    plate: "JKL-012",
    destination: "Centro Logístico",
    arrivalTime: "11:30 AM",
    departureTime: undefined,
    status: "active",
    timeRemaining: 32,
    priority: "medium"
  }
];

export default function ActiveOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  // Calculate KPI values
  const totalActiveOrders = 24;
  const percentageOverdue = 12.5; // 12.5% of orders are overdue
  const averageProcessingTime = 36; // 36 minutes average processing time
  
  return (
    <DashboardLayout 
      title="Órdenes Activas" 
      description="Monitor de órdenes actualmente en proceso"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard
          title="Total Órdenes Activas"
          value={totalActiveOrders}
          description="Órdenes en proceso actualmente"
          trend={5}
          variant="default"
          icon={<Clock className="h-5 w-5 text-gray-600/20" />}
        />
        <KPICard
          title="% Fuera de Objetivo"
          value={`${percentageOverdue}%`}
          description="Porcentaje fuera del tiempo objetivo"
          trend={-8}
          variant="danger"
          icon={<AlertCircle className="h-5 w-5 text-gray-600/20" />}
        />
        <KPICard
          title="Promedio Minutos"
          value={`${averageProcessingTime} min`}
          description="Tiempo promedio de procesamiento"
          trend={15}
          variant="success"
          icon={<Timer className="h-5 w-5 text-gray-600/20" />}
        />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-semibold">Lista de Órdenes Activas</h2>
        <div className="flex gap-2">
          <select className="text-sm border rounded-md px-2 py-1">
            <option value="all">Todos los estados</option>
            <option value="active">Activas</option>
            <option value="delayed">Retrasadas</option>
          </select>
          <select className="text-sm border rounded-md px-2 py-1">
            <option value="all">Todas las prioridades</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
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
