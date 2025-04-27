
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface RefreshButtonProps {
  onRefresh: () => void;
  className?: string;
}

export default function RefreshButton({ onRefresh, className }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    
    // Reset after animation completes
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };
  
  return (
    <Button
      size="icon"
      variant="secondary"
      className={cn(
        "h-12 w-12 rounded-full shadow-md fixed bottom-20 md:bottom-8 right-8 z-10",
        isRefreshing && "animate-rotate-refresh",
        className
      )}
      onClick={handleRefresh}
      aria-label="Actualizar datos"
    >
      <RefreshCcw className="h-5 w-5" />
      <span className="sr-only">Actualizar</span>
    </Button>
  );
}
