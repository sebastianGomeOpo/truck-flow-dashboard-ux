
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";

// Define the order interface based on the requirements
export interface Order {
  id: string;
  driverName: string;
  plate: string;
  destination: string;
  arrivalTime: string;
  departureTime?: string;
  status: 'active' | 'en-route' | 'completed' | 'delayed' | 'critical';
  timeRemaining?: number; // in minutes
  priority: 'low' | 'medium' | 'high';
}

interface OrdersTableProps {
  orders: Order[];
  onViewDetails?: (orderId: string) => void;
}

export default function OrdersTable({ orders, onViewDetails }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-card rounded-lg shadow-sm p-8 text-center border">
        <p className="text-muted-foreground">No hay órdenes para mostrar</p>
      </div>
    );
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      case 'medium': return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      case 'low': return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      default: return '';
    }
  };

  const formatTimeRemaining = (minutes?: number) => {
    if (minutes === undefined) return 'N/A';
    
    if (minutes < 0) {
      return <span className="text-red-600 font-medium">{Math.abs(minutes)} min retraso</span>;
    } else if (minutes <= 15) {
      return <span className="text-yellow-600 font-medium">{minutes} min restantes</span>;
    } else {
      return <span>{minutes} min restantes</span>;
    }
  };

  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-sm border">
      <div className="table-container">
        <table className="truck-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Chofer</th>
              <th>Placa</th>
              <th>Destino</th>
              <th>Estado</th>
              <th>Llegada</th>
              <th>Tiempo</th>
              <th>Prioridad</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="font-medium">{order.id}</td>
                <td>{order.driverName}</td>
                <td>{order.plate}</td>
                <td className="max-w-[180px] truncate">{order.destination}</td>
                <td><StatusBadge status={order.status} /></td>
                <td>{order.arrivalTime}</td>
                <td>{formatTimeRemaining(order.timeRemaining)}</td>
                <td>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityClass(order.priority)}`}>
                    {order.priority === 'high' ? 'Alta' : 
                     order.priority === 'medium' ? 'Media' : 'Baja'}
                  </span>
                </td>
                <td>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onViewDetails?.(order.id)}
                  >
                    Detalles
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
