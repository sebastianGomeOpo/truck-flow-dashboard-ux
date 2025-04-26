
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import OrdersTable, { Order } from "@/components/OrdersTable";
import KPICard from "@/components/KPICard";

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
  
  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing details for order: ${orderId}`);
    // In a real application, this would navigate to a detail page
    // or open a modal with the order details
  };
  
  return (
    <DashboardLayout 
      title="En Camino" 
      description="Monitoreo de camiones en tránsito hacia la instalación"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard
          title="Camiones En Ruta"
          value={15}
          description="Camiones actualmente en tránsito"
          trend={2}
          variant="default"
        />
        <KPICard
          title="Tiempo Est. de Llegada"
          value="28 min"
          description="Promedio para próximas llegadas"
          variant="default"
        />
        <KPICard
          title="Camiones Retrasados"
          value={1}
          description="Camiones con retraso en tránsito"
          variant="warning"
        />
      </div>
      
      <div className="bg-white dark:bg-card rounded-lg shadow-sm border p-4 mb-6">
        <h3 className="text-sm font-medium mb-2">Estado del tráfico</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
            <span className="text-xs text-muted-foreground">Norte</span>
            <p className="font-medium text-green-700 dark:text-green-400">Fluido</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md">
            <span className="text-xs text-muted-foreground">Sur</span>
            <p className="font-medium text-yellow-700 dark:text-yellow-400">Moderado</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
            <span className="text-xs text-muted-foreground">Este</span>
            <p className="font-medium text-red-700 dark:text-red-400">Congestionado</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
            <span className="text-xs text-muted-foreground">Oeste</span>
            <p className="font-medium text-green-700 dark:text-green-400">Fluido</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Camiones En Camino</h2>
        <select className="text-sm border rounded-md px-2 py-1">
          <option value="all">Todos los destinos</option>
          <option value="north">Terminal Norte</option>
          <option value="south">Terminal Sur</option>
          <option value="east">Centro de Distribución Este</option>
          <option value="main">Bodega Principal</option>
        </select>
      </div>
      
      <OrdersTable orders={orders} onViewDetails={handleViewDetails} />
    </DashboardLayout>
  );
}
