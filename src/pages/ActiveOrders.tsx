import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import OrdersTable, { Order } from "@/components/OrdersTable";
import KPICard from "@/components/KPICard";
import { Truck, Clock, AlertTriangle } from "lucide-react";

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
    priority: "low",
    type: "client"
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
    priority: "medium",
    type: "warehouse"
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
    priority: "high",
    type: "client"
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
    priority: "low",
    type: "warehouse"
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
    priority: "medium",
    type: "client"
  }
];

export default function ActiveOrders() {
  const [orders] = useState<Order[]>(mockOrders);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing details for order: ${orderId}`);
    // In a real application, this would navigate to a detail page
    // or open a modal with the order details
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-[32px] font-semibold mb-2">Órdenes Activas</h1>
        <p className="text-muted-foreground">
          Monitor de órdenes actualmente en proceso
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard
          title="Órdenes Activas"
          value={24}
          description="Órdenes en proceso actualmente"
          trend={5}
          variant="default"
          icon={<Truck className="size-5 text-slate-600" />}
        />
        <KPICard
          title="Tiempo Promedio"
          value="36 min"
          description="Tiempo promedio de procesamiento"
          trend={-8}
          variant="success"
          icon={<Clock className="size-5 text-green-600" />}
        />
        <KPICard
          title="Órdenes Retrasadas"
          value={3}
          description="Órdenes fuera del tiempo objetivo"
          trend={15}
          variant="danger"
          icon={<AlertTriangle className="size-5 text-red-600" />}
        />
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Lista de Órdenes Activas</h2>
      </div>
      
      <OrdersTable 
        orders={orders} 
        onViewDetails={handleViewDetails}
        loading={isLoading}
      />
    </MainLayout>
  );
}
