
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import { cn } from "@/lib/utils";
import TableSkeleton from "./TableSkeleton";

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
  type?: 'client' | 'warehouse'; // Nuevo campo para diferenciar entre cliente y almacén
}

interface OrdersTableProps {
  orders: Order[];
  loading?: boolean;
  onViewDetails?: (orderId: string) => void;
}

export default function OrdersTable({ orders, loading = false, onViewDetails }: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  if (loading) {
    return <TableSkeleton rows={5} columns={6} />;
  }
  
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center border">
        <p className="text-muted-foreground">No hay órdenes para mostrar</p>
      </div>
    );
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700';
      case 'medium': return 'bg-yellow-50 text-yellow-700';
      case 'low': return 'bg-green-50 text-green-700';
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

  const isRowCritical = (order: Order) => {
    return order.timeRemaining !== undefined && order.timeRemaining < -20;
  };
  
  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    if (onViewDetails) {
      onViewDetails(order.id);
    }
  };

  // Get current time for "last updated" display
  const updatedTime = new Date().toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit'
  });

  // Función para obtener la clase según el tipo
  const getTypeClass = (type?: string) => {
    switch (type) {
      case 'client':
        return 'border-l-4 border-l-blue-400'; // Borde azul para clientes
      case 'warehouse':
        return 'border-l-4 border-l-green-400'; // Borde verde para almacén
      default:
        return '';
    }
  };

  // Función para obtener el texto de tipo
  const getTypeLabel = (type?: string) => {
    switch (type) {
      case 'client':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
            Cliente
          </span>
        );
      case 'warehouse':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700">
            Almacén
          </span>
        );
      default:
        return <span className="text-gray-400">No especificado</span>;
    }
  };

  return (
    <div className="space-y-2">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Chofer</TableHead>
              <TableHead>Placa</TableHead>
              <TableHead className="hidden md:table-cell">Destino</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="hidden md:table-cell">Llegada</TableHead>
              <TableHead>Tiempo</TableHead>
              <TableHead className="hidden md:table-cell">Prioridad</TableHead>
              <TableHead>Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const isCritical = isRowCritical(order);
              
              return (
                <TableRow 
                  key={order.id}
                  className={cn(
                    "cursor-pointer hover:bg-gray-100 transition-colors",
                    isCritical && "relative pulse-border",
                    getTypeClass(order.type)
                  )}
                  onClick={() => handleRowClick(order)}
                >
                  {/* Critical indicator */}
                  {isCritical && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />
                  )}
                  
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.driverName}</TableCell>
                  <TableCell>{order.plate}</TableCell>
                  <TableCell className="max-w-[180px] truncate hidden md:table-cell">{order.destination}</TableCell>
                  <TableCell><StatusBadge status={order.status} /></TableCell>
                  <TableCell className="hidden md:table-cell">{order.arrivalTime}</TableCell>
                  <TableCell>{formatTimeRemaining(order.timeRemaining)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                      getPriorityClass(order.priority)
                    )}>
                      {order.priority === 'high' ? 'Alta' : 
                      order.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {getTypeLabel(order.type)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-xs text-muted-foreground text-right">
        Actualizado: {updatedTime}
      </div>
      
      {/* Detail drawer */}
      <Drawer>
        <DrawerTrigger asChild>
          <span className="sr-only">Open Detail</span>
        </DrawerTrigger>
        <DrawerContent>
          {selectedOrder && (
            <>
              <DrawerHeader>
                <DrawerTitle>Detalle de Orden: {selectedOrder.id}</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Chofer</h4>
                    <p>{selectedOrder.driverName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Placa</h4>
                    <p>{selectedOrder.plate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Estado</h4>
                    <StatusBadge status={selectedOrder.status} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Prioridad</h4>
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                      getPriorityClass(selectedOrder.priority)
                    )}>
                      {selectedOrder.priority === 'high' ? 'Alta' : 
                      selectedOrder.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Hora de llegada</h4>
                    <p>{selectedOrder.arrivalTime}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Destino</h4>
                    <p>{selectedOrder.destination}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Tipo</h4>
                    {getTypeLabel(selectedOrder.type)}
                  </div>
                </div>
                
                <div className="border-t mt-4 pt-4">
                  <Button 
                    className="w-full" 
                    variant={selectedOrder.status === 'critical' ? 'destructive' : 'default'}
                  >
                    {selectedOrder.status === 'critical' ? 'Atender urgentemente' : 'Procesar orden'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
