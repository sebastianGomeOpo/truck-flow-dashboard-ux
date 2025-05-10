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
}

// Mock data for the trucks
const mockTrucks: Truck[] = [
  { id: "T-001", plate: "ABC-123", arrivalTime: "08:30", waitTime: "0:45", cargo: "Contenedor", status: "active" },
  { id: "T-002", plate: "DEF-456", arrivalTime: "09:15", waitTime: "1:20", cargo: "Granel", status: "en-route" },
  { id: "T-003", plate: "GHI-789", arrivalTime: "10:00", waitTime: "2:35", cargo: "Líquido", status: "critical" },
  { id: "T-004", plate: "JKL-012", arrivalTime: "10:45", waitTime: "0:15", cargo: "Contenedor", status: "active" },
  { id: "T-005", plate: "MNO-345", arrivalTime: "11:30", waitTime: "0:30", cargo: "Granel", status: "delayed" },
  { id: "T-006", plate: "PQR-678", arrivalTime: "12:15", waitTime: "1:05", cargo: "Contenedor", status: "en-route" },
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
              <TableSkeleton rows={5} columns={6} />
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trucks.map((truck) => (
                    <TableRow 
                      key={truck.id} 
                      className={cn(
                        "hover:bg-muted/50 cursor-pointer transition-colors",
                        truck.status === "critical" && "pulse-border"
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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
