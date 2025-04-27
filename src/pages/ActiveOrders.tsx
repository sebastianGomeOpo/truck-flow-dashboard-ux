
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import OrdersTable, { Order } from "@/components/OrdersTable";
import KPICard from "@/components/KPICard";

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
  const [orders] = useState<Order[]>(mockOrders);
  
  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing details for order: ${orderId}`);
    // In a real application, this would navigate to a detail page
    // or open a modal with the order details
  };
  
  return (
    <DashboardLayout 
      title="Órdenes Activas" 
      description="Monitor de órdenes actualmente en proceso"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard
          title="Órdenes Activas"
          value={24}
          description="Órdenes en proceso actualmente"
          trend={5}
          variant="default"
        />
        <KPICard
          title="Tiempo Promedio"
          value="36 min"
          description="Tiempo promedio de procesamiento"
          trend={-8}
          variant="success"
        />
        <KPICard
          title="Órdenes Retrasadas"
          value={3}
          description="Órdenes fuera del tiempo objetivo"
          trend={15}
          variant="danger"
        />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lista de Órdenes Activas</h2>
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
      
      <OrdersTable orders={orders} onViewDetails={handleViewDetails} />
    </DashboardLayout>
  );
}
