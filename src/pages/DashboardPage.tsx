
import DashboardMainLayout from "@/components/DashboardMainLayout";
import DashboardContent from "@/components/DashboardContent";
import TrafficStatusPanel from "@/components/TrafficStatusPanel";
import TruckQueueTable from "@/components/TruckQueueTable";
import OperationalKPICards from "@/components/OperationalKPICards";
import ClientSelector from "@/components/ClientSelector";
import { useEffect } from "react";

export default function DashboardPage() {
  // Log analytics event for page view
  useEffect(() => {
    console.info("Analytics event: page_view_dashboard");
  }, []);

  return (
    <DashboardMainLayout>
      <DashboardContent 
        title="Panel de Control de Operaciones"
        subtitle="Monitoreo en tiempo real del tráfico de camiones y operaciones portuarias"
      >
        {/* Filters and actions section */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full max-w-xs">
            <ClientSelector />
          </div>
          <div className="flex gap-2 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
              <span>Cliente</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
              <span>Almacén</span>
            </div>
          </div>
        </div>
        
        {/* First row with status panel and truck queue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <TrafficStatusPanel />
          </div>
          <div className="lg:col-span-8">
            <TruckQueueTable />
          </div>
        </div>
        
        {/* Second row with KPI cards */}
        <div className="mt-6">
          <OperationalKPICards />
        </div>
        
        {/* Additional components section - future expansion */}
        <div className="mt-6 grid grid-cols-1 gap-4">
          <div className="col-span-1 bg-muted/20 p-6 rounded-lg border border-dashed text-center">
            <p className="text-muted-foreground">
              Próximamente: Visualización geoespacial del puerto y línea de tiempo de arribos programados
            </p>
          </div>
        </div>
      </DashboardContent>
    </DashboardMainLayout>
  );
}
