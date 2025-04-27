
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import OrdersTable, { Order } from "@/components/OrdersTable";
import KPICard from "@/components/KPICard";

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

export default function Overdue() {
  const [orders] = useState<Order[]>(mockOrders);
  
  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing details for order: ${orderId}`);
    // In a real application, this would navigate to a detail page
    // or open a modal with the order details
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
        />
        <KPICard
          title="Retraso Promedio"
          value="24 min"
          description="Tiempo promedio de retraso"
          trend={8}
          variant="danger"
        />
        <KPICard
          title="Cumplimiento Diario"
          value="82%"
          description="Porcentaje de órdenes a tiempo"
          trend={-5}
          variant="warning"
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Causas de Retraso</h3>
        <div className="bg-white dark:bg-card rounded-lg shadow-sm border p-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Documentación incompleta</span>
                <span className="font-medium">38%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Problemas en balanza</span>
                <span className="font-medium">24%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Llegada tarde del conductor</span>
                <span className="font-medium">21%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '21%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Otras causas</span>
                <span className="font-medium">17%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '17%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Órdenes Fuera de Tiempo</h2>
        <div className="flex gap-2">
          <select className="text-sm border rounded-md px-2 py-1">
            <option value="all">Todos los retrasos</option>
            <option value="15">{'>'} 15 minutos</option>
            <option value="30">{'>'} 30 minutos</option>
          </select>
          <button className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-md">
            Reportar
          </button>
        </div>
      </div>
      
      <OrdersTable orders={orders} onViewDetails={handleViewDetails} />
    </DashboardLayout>
  );
}
