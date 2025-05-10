
import DashboardMainLayout from "@/components/DashboardMainLayout";
import DashboardContent from "@/components/DashboardContent";
import TrafficStatusPanel from "@/components/TrafficStatusPanel";
import TruckQueueTable from "@/components/TruckQueueTable";
import OperationalKPICards from "@/components/OperationalKPICards";
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
        {/* First row with status panel and truck queue */}
        <div className="grid grid-cols-12 gap-4">
          <TrafficStatusPanel />
          <TruckQueueTable />
        </div>
        
        {/* Second row with KPI cards */}
        <div className="grid grid-cols-12 gap-4">
          <OperationalKPICards />
        </div>
        
        {/* Additional components can be added here */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 bg-muted/30 p-6 rounded-lg border text-center">
            <p className="text-muted-foreground">
              Próximamente: Visualización geoespacial del puerto y línea de tiempo de arribos programados
            </p>
          </div>
        </div>
      </DashboardContent>
    </DashboardMainLayout>
  );
}
