
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import OrdersTable, { Order } from "@/components/OrdersTable";
import KPICard from "@/components/KPICard";
import { Truck, Clock, AlertTriangle } from "lucide-react";

// Mock data
const mockOrders: Order[] = [
  {
    id: "ORD-2950",
    driverName: "Roberto Gómez",
    plate: "MNO-345",
    destination: "Terminal Norte",
    arrivalTime: "12:30 PM",
    status: "en-route",
    timeRemaining: 25,
    priority: "medium"
  },
  {
    id: "ORD-2951",
    driverName: "Patricia Vega",
    plate: "PQR-678",
    destination: "Centro de Distribución Este",
    arrivalTime: "12:45 PM",
    status: "en-route",
    timeRemaining: 40,
    priority: "low"
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
  },
  {
    id: "ORD-2953",
    driverName: "Carmen Flores",
    plate: "VWX-234",
    destination: "Terminal Sur",
    arrivalTime: "1:15 PM",
    status: "en-route",
    timeRemaining: 55,
    priority: "medium"
  }
];

export default function EnRoute() {
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
        <h1 className="text-[32px] font-semibold mb-2">En Camino</h1>
        <p className="text-muted-foreground">
          Monitoreo de camiones en tránsito hacia la instalación
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard
          title="Camiones En Ruta"
          value={15}
          description="Camiones actualmente en tránsito"
          trend={2}
          variant="default"
          icon={<Truck className="size-5 text-slate-600" />}
        />
        <KPICard
          title="Tiempo Est. de Llegada"
          value="28 min"
          description="Promedio para próximas llegadas"
          variant="default"
          icon={<Clock className="size-5 text-slate-600" />}
        />
        <KPICard
          title="Camiones Retrasados"
          value={1}
          description="Camiones con retraso en tránsito"
          variant="warning"
          icon={<AlertTriangle className="size-5 text-yellow-600" />}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <h3 className="text-sm font-medium mb-2">Estado del tráfico</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-3 rounded-md">
            <span className="text-xs text-muted-foreground">Norte</span>
            <p className="font-medium text-green-700">Fluido</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-md">
            <span className="text-xs text-muted-foreground">Sur</span>
            <p className="font-medium text-yellow-700">Moderado</p>
          </div>
          <div className="bg-red-50 p-3 rounded-md">
            <span className="text-xs text-muted-foreground">Este</span>
            <p className="font-medium text-red-700">Congestionado</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md">
            <span className="text-xs text-muted-foreground">Oeste</span>
            <p className="font-medium text-green-700">Fluido</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Camiones En Camino</h2>
      </div>
      
      <OrdersTable 
        orders={orders} 
        onViewDetails={handleViewDetails}
        loading={isLoading}
      />
    </MainLayout>
  );
}
