
import { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import StatusBadge from "./StatusBadge";
import { cn } from "@/lib/utils";

interface Truck {
  id: string;
  plate: string;
  arrivalTime: string;
  waitTime: string;
  cargo: string;
  status: 'active' | 'en-route' | 'completed' | 'delayed' | 'critical';
  type: 'client' | 'warehouse'; // Nuevo campo para diferenciar entre cliente y almacén
}

// Mock data for the trucks with type field added
const mockTrucks: Truck[] = [
  { id: "T-001", plate: "ABC-123", arrivalTime: "08:30", waitTime: "0:45", cargo: "Contenedor", status: "active", type: "client" },
  { id: "T-002", plate: "DEF-456", arrivalTime: "09:15", waitTime: "1:20", cargo: "Granel", status: "en-route", type: "warehouse" },
  { id: "T-003", plate: "GHI-789", arrivalTime: "10:00", waitTime: "2:35", cargo: "Líquido", status: "critical", type: "client" },
  { id: "T-004", plate: "JKL-012", arrivalTime: "10:45", waitTime: "0:15", cargo: "Contenedor", status: "active", type: "warehouse" },
  { id: "T-005", plate: "MNO-345", arrivalTime: "11:30", waitTime: "0:30", cargo: "Granel", status: "delayed", type: "client" },
  { id: "T-006", plate: "PQR-678", arrivalTime: "12:15", waitTime: "1:05", cargo: "Contenedor", status: "en-route", type: "warehouse" },
];

export default function TruckQueueTable() {
  const [loading, setLoading] = useState(false);
  const [trucks, setTrucks] = useState<Truck[]>(mockTrucks);

  // This would be where you'd fetch real data
  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrucks(mockTrucks);
      setLoading(false);
    }, 800);
  };

  // Función para obtener la clase según el tipo
  const getTypeClass = (type: string) => {
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
  const getTypeLabel = (type: string) => {
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
        return null;
    }
  };

  return (
    <div className="col-span-12 lg:col-span-8">
      <h2 className="text-xl font-semibold mb-4">Cola de Camiones</h2>
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg flex justify-between">
            <span>Camiones en Espera</span>
            <div className="text-sm font-normal text-muted-foreground">
              Última actualización: {new Date().toLocaleTimeString()}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto max-h-[350px]">
            {loading ? (
              <TableSkeleton rows={5} columns={7} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Placa</TableHead>
                    <TableHead>Hora de llegada</TableHead>
                    <TableHead>Tiempo de espera</TableHead>
                    <TableHead>Tipo de carga</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Tipo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trucks.map((truck) => (
                    <TableRow 
                      key={truck.id} 
                      className={cn(
                        "hover:bg-muted/50 cursor-pointer transition-colors",
                        truck.status === "critical" && "pulse-border",
                        getTypeClass(truck.type)
                      )}
                    >
                      <TableCell className="font-medium">{truck.id}</TableCell>
                      <TableCell>{truck.plate}</TableCell>
                      <TableCell>{truck.arrivalTime}</TableCell>
                      <TableCell>{truck.waitTime}</TableCell>
                      <TableCell>{truck.cargo}</TableCell>
                      <TableCell>
                        <StatusBadge status={truck.status} />
                      </TableCell>
                      <TableCell>
                        {getTypeLabel(truck.type)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          
          {/* Leyenda */}
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
              <span>Cliente</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
              <span>Almacén</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TableSkeleton({ rows = 5, columns = 6 }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array(columns).fill(0).map((_, i) => (
            <TableHead key={`header-${i}`}>
              <Skeleton className="h-4 w-[80px]" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(rows).fill(0).map((_, rowIndex) => (
          <TableRow key={`row-${rowIndex}`}>
            {Array(columns).fill(0).map((_, colIndex) => (
              <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                <Skeleton className="h-4 w-[80%]" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
