import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Info,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const insights = {
  summary: [
    {
      id: 1,
      type: "surge",
      icon: TrendingUp,
      title: "Energy Drinks +14% WoW",
      description: "Demand surge detected in North London stores",
      confidence: "high",
    },
    {
      id: 2,
      type: "warning",
      icon: AlertTriangle,
      title: "Margin Leakage Detected",
      description: "Promo overlap causing -2.3pp margin erosion in Sports Drinks",
      confidence: "high",
    },
    {
      id: 3,
      type: "opportunity",
      icon: CheckCircle2,
      title: "Transfer Opportunity",
      description: "67% demand retention if ED-015 dropped",
      confidence: "medium",
    },
  ],
  goingWell: [
    "Energy Drinks category exceeding forecast by 8.2%",
    "New Tropical Blast SKU showing strong adoption",
    "Margin improvement in Flavored Water +1.2pp",
  ],
  needsAttention: [
    "5 SKUs at >8 weeks stock cover (overstock risk)",
    "Zero Sugar Boost underperforming forecast by -16.3%",
    "Competitor pricing pressure in Sports Drinks",
  ],
  actions: [
    {
      id: "a1",
      title: "Review markdown schedule for ED-030",
      priority: "high",
      assignee: "Unassigned",
      dueDate: "Dec 27",
    },
    {
      id: "a2",
      title: "Increase buy quantity for ED-101",
      priority: "medium",
      assignee: "Unassigned",
      dueDate: "Dec 30",
    },
    {
      id: "a3",
      title: "Analyze promo overlap in Sports Drinks",
      priority: "high",
      assignee: "Unassigned",
      dueDate: "Dec 26",
    },
  ],
};

export function AIInsightsPanel() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const getConfidenceBadge = (confidence: string) => {
    const config: Record<string, { color: string; label: string }> = {
      high: { color: "bg-success/10 text-success", label: "High" },
      medium: { color: "bg-warning/10 text-warning", label: "Medium" },
      low: { color: "bg-muted text-muted-foreground", label: "Low" },
    };
    const { color, label } = config[confidence] || config.medium;
    return <Badge className={cn("text-[10px] font-medium", color)}>{label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "destructive" | "default" | "secondary"> = {
      high: "destructive",
      medium: "default",
      low: "secondary",
    };
    return <Badge variant={variants[priority] || "secondary"} className="text-[10px]">{priority}</Badge>;
  };

  return (
    <Card className="shadow-card h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Insights
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="h-7 px-2 text-xs"
          >
            <RefreshCw className={cn("w-3 h-3 mr-1", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <Clock className="w-3 h-3" />
          Generated at 09:02 using Model v2.4
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            Confidence: High
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="multiple" defaultValue={["summary", "actions"]} className="space-y-2">
          {/* Quick Summary */}
          <AccordionItem value="summary" className="border rounded-lg px-3">
            <AccordionTrigger className="text-sm font-medium py-2 hover:no-underline">
              Quick Summary
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-3">
              <div className="space-y-2">
                {insights.summary.map((insight) => (
                  <div
                    key={insight.id}
                    className="flex items-start gap-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <insight.icon
                      className={cn(
                        "w-4 h-4 mt-0.5 flex-shrink-0",
                        insight.type === "surge" && "text-success",
                        insight.type === "warning" && "text-warning",
                        insight.type === "opportunity" && "text-info"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-medium truncate">{insight.title}</p>
                        {getConfidenceBadge(insight.confidence)}
                      </div>
                      <p className="text-xs text-muted-foreground">{insight.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* What's Going Well */}
          <AccordionItem value="well" className="border rounded-lg px-3">
            <AccordionTrigger className="text-sm font-medium py-2 hover:no-underline">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                What's Going Well
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-3">
              <ul className="space-y-2">
                {insights.goingWell.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Needs Attention */}
          <AccordionItem value="attention" className="border rounded-lg px-3">
            <AccordionTrigger className="text-sm font-medium py-2 hover:no-underline">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                Needs Attention
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-3">
              <ul className="space-y-2">
                {insights.needsAttention.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Action Items */}
          <AccordionItem value="actions" className="border rounded-lg px-3">
            <AccordionTrigger className="text-sm font-medium py-2 hover:no-underline">
              Action Items
              <Badge variant="secondary" className="ml-2 text-[10px]">
                {insights.actions.length}
              </Badge>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-3">
              <div className="space-y-2">
                {insights.actions.map((action) => (
                  <div
                    key={action.id}
                    className="p-2 rounded-lg border border-border/50 hover:border-border transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{action.title}</p>
                      {getPriorityBadge(action.priority)}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{action.assignee}</span>
                      <span>•</span>
                      <span>Due {action.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button variant="outline" size="sm" className="w-full text-xs">
          <Info className="w-3 h-3 mr-1" />
          Explain Insights
        </Button>
      </CardContent>
    </Card>
  );
}
