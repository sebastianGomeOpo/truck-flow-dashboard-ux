import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import OrdersTable, { Order } from "@/components/OrdersTable";
import KPICard from "@/components/KPICard";
import { AlertTriangle, Clock, TrendingDown } from "lucide-react";
import BarChartClientes from "@/components/BarChartClientes";

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "ORD-2930",
    driverName: "Juan Pérez",
    plate: "AAA-111",
    destination: "Terminal Norte",
    arrivalTime: "9:30 AM",
    status: "critical",
    timeRemaining: -35,
    priority: "high",
    type: "client"
  },
  {
    id: "ORD-2934",
    driverName: "María López",
    plate: "BBB-222",
    destination: "Centro de Distribución Este",
    arrivalTime: "9:45 AM",
    status: "critical",
    timeRemaining: -27,
    priority: "high",
    type: "warehouse"
  },
  {
    id: "ORD-2938",
    driverName: "Pedro García",
    plate: "CCC-333",
    destination: "Bodega Principal",
    arrivalTime: "10:00 AM",
    status: "critical",
    timeRemaining: -22,
    priority: "high",
    type: "client"
  },
  {
    id: "ORD-2947",
    driverName: "Ana Martinez",
    plate: "DEF-456",
    destination: "Bodega Principal",
    arrivalTime: "11:00 AM",
    status: "delayed",
    timeRemaining: -5,
    priority: "high",
    type: "warehouse"
  },
  {
    id: "ORD-2952",
    driverName: "Fernando Ruiz",
    plate: "STU-901",
    destination: "Bodega Principal",
    arrivalTime: "1:00 PM",
    status: "delayed",
    timeRemaining: -10,
    priority: "high",
    type: "client"
  }
];

// Mock data for clients chart
const mockClientsData = [
  { name: "Transportes SA", value: 4 },
  { name: "LogiTruck", value: 3 },
  { name: "CargoExpress", value: 2 },
  { name: "FastShipping", value: 1 },
  { name: "TransNorte", value: 1 }
];

export default function Overdue() {
  const [orders] = useState<Order[]>(mockOrders);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing details for order: ${orderId}`);
    // Analytics event
    console.log('Analytics event: click_row_timeOverdue', { order_id: orderId });
  };
  
  // Check if there are any critical delays (>150% of target time)
  const hasCriticalDelays = orders.some(order => order.timeRemaining && order.timeRemaining < -30);
  
  return (
    <MainLayout>
      {/* Banner for critical orders */}
      {hasCriticalDelays && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6 flex items-center text-red-700">
          <AlertTriangle className="size-5 mr-2" />
          <p className="font-medium">Camiones críticos: {orders.filter(o => o.timeRemaining && o.timeRemaining < -30).length}</p>
        </div>
      )}
      
      <div className="mb-6">
        <h1 className="text-[32px] font-semibold mb-2">Fuera de Tiempo</h1>
        <p className="text-muted-foreground">
          Órdenes que han excedido su tiempo objetivo de procesamiento
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard
          title="Órdenes Fuera de Tiempo"
          value={8}
          description="Total de órdenes retrasadas"
          trend={-12}
          variant="danger"
          icon={<AlertTriangle className="size-5 text-red-600" />}
        />
        <KPICard
          title="Retraso Promedio"
          value="24 min"
          description="Tiempo promedio de retraso"
          trend={8}
          variant="danger"
          icon={<Clock className="size-5 text-red-600" />}
        />
        <KPICard
          title="Cumplimiento Diario"
          value="82%"
          description="Porcentaje de órdenes a tiempo"
          trend={-5}
          variant="warning"
          icon={<TrendingDown className="size-5 text-yellow-600" />}
        />
      </div>
      
      {/* Bar Chart for Clients */}
      <BarChartClientes data={mockClientsData} />
      
      {/* Orders Table */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Órdenes Fuera de Tiempo</h2>
      </div>
      
      <OrdersTable 
        orders={orders} 
        onViewDetails={handleViewDetails}
        loading={isLoading}
      />
    </MainLayout>
  );
}
