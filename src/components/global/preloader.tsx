import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface PreloaderProps {
  isVisible: boolean;
  className?: string;
}

export function Preloader({ isVisible, className }: PreloaderProps) {
  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center",
      className
    )}>
      <div className="text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mx-auto" />
        <p className="text-sm text-muted-foreground">
          Loading system health...
        </p>
      </div>
    </div>
  );
} 