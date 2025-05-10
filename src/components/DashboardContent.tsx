
import { ReactNode } from "react";

interface DashboardContentProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardContent({ children, title, subtitle }: DashboardContentProps) {
  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div>
          {title && <h1 className="text-3xl font-semibold">{title}</h1>}
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
