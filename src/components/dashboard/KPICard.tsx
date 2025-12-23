import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  tooltip?: string;
  variant?: "default" | "success" | "warning" | "destructive";
}

export function KPICard({
  title,
  value,
  change,
  changeLabel = "vs LY",
  icon,
  tooltip,
  variant = "default",
}: KPICardProps) {
  const getTrendIcon = () => {
    if (change === undefined || change === 0) {
      return <Minus className="w-3 h-3" />;
    }
    return change > 0 ? (
      <TrendingUp className="w-3 h-3" />
    ) : (
      <TrendingDown className="w-3 h-3" />
    );
  };

  const getTrendColor = () => {
    if (change === undefined || change === 0) return "text-muted-foreground";
    if (variant === "destructive") {
      return change > 0 ? "text-destructive" : "text-success";
    }
    return change > 0 ? "text-success" : "text-destructive";
  };

  const cardContent = (
    <div className="bg-card rounded-xl p-4 shadow-card border border-border/50 hover:shadow-elevated transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </span>
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold font-mono tracking-tight">{value}</p>
        {change !== undefined && (
          <div className={cn("flex items-center gap-1.5 text-xs", getTrendColor())}>
            {getTrendIcon()}
            <span className="font-medium">
              {change > 0 ? "+" : ""}
              {change}%
            </span>
            <span className="text-muted-foreground">{changeLabel}</span>
          </div>
        )}
      </div>
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{cardContent}</TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs text-xs">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }

  return cardContent;
}
