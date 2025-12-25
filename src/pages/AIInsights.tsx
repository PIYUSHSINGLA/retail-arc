import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sparkles,
  TrendingUp,
  Package,
  Target,
  BarChart3,
  Clock,
  ChevronDown,
  ChevronRight,
  Play,
  AlertTriangle,
  CheckCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface InsightCard {
  id: string;
  headline: string;
  whatsHappening: string;
  whyHappening: string;
  impact: string;
  impactType: "opportunity" | "risk";
  timeHorizon: "immediate" | "short-term" | "seasonal";
  actions: string[];
  explainability?: {
    metrics: string[];
    benchmarks: string[];
    analogues: string[];
  };
}

const priorityInsights: InsightCard[] = [
  {
    id: "p1",
    headline: "Energy Drinks demand surge in North London",
    whatsHappening: "14% week-on-week volume increase detected across 45 stores in North London cluster",
    whyHappening: "Combination of new gym partnership promotions and seasonal fitness trend uptick",
    impact: "£42K upside",
    impactType: "opportunity",
    timeHorizon: "immediate",
    actions: ["Increase stock allocation to North London DC", "Extend gym partnership promo by 2 weeks"],
    explainability: { metrics: ["WoW volume +14%", "Store penetration 89%"], benchmarks: ["vs South London +8%"], analogues: ["Similar pattern Jan 2024"] },
  },
  {
    id: "p2",
    headline: "Margin erosion in Sports Drinks from promo overlap",
    whatsHappening: "2.3pp margin decline due to three overlapping promotions running simultaneously",
    whyHappening: "Uncoordinated supplier promotional calendars causing cannibalisation",
    impact: "£18.5K downside",
    impactType: "risk",
    timeHorizon: "immediate",
    actions: ["Consolidate promo windows", "Negotiate supplier contributions"],
    explainability: { metrics: ["Margin -2.3pp", "Promo overlap 3 SKUs"], benchmarks: ["vs target margin 22%"], analogues: ["Q3 2024 similar issue"] },
  },
  {
    id: "p3",
    headline: "Spring Water 1L approaching stockout",
    whatsHappening: "Only 1.2 weeks cover remaining on highest velocity water SKU",
    whyHappening: "Supplier delivery delay combined with unseasonably warm weather demand surge",
    impact: "£24K lost sales risk",
    impactType: "risk",
    timeHorizon: "immediate",
    actions: ["Expedite supplier order", "Explore alternative supplier options"],
    explainability: { metrics: ["Cover 1.2 wks", "Velocity +22%"], benchmarks: ["Safety stock 3 wks"], analogues: ["Similar shortage Aug 2024"] },
  },
  {
    id: "p4",
    headline: "New Tropical Blast SKU exceeding launch forecasts",
    whatsHappening: "45% above forecast in first 4 weeks of launch across all regions",
    whyHappening: "Strong social media buzz and effective sampling campaign driving trial",
    impact: "£28K upside",
    impactType: "opportunity",
    timeHorizon: "short-term",
    actions: ["Increase buy quantity by 30%", "Expand distribution to remaining stores"],
    explainability: { metrics: ["vs Forecast +45%", "Trial rate 12%"], benchmarks: ["vs avg launch +18%"], analogues: ["Berry Blast launch pattern"] },
  },
  {
    id: "p5",
    headline: "Competitor X price reduction threatening market share",
    whatsHappening: "Key competitor reduced prices by 5% on core energy drinks range",
    whyHappening: "Competitive response to our recent market share gains",
    impact: "£35K share risk",
    impactType: "risk",
    timeHorizon: "short-term",
    actions: ["Run pricing simulation", "Consider targeted promotional response"],
    explainability: { metrics: ["Competitor price -5%", "Elasticity -1.2"], benchmarks: ["Price index 102"], analogues: ["Q2 2024 price war"] },
  },
];

const demandSignals: InsightCard[] = [
  {
    id: "d1",
    headline: "Energy Drinks accelerating +8.2% vs forecast",
    whatsHappening: "Category outperforming forecast driven by flavored variants and sugar-free options",
    whyHappening: "Health-conscious consumer shift towards functional beverages with perceived benefits",
    impact: "£52K opportunity",
    impactType: "opportunity",
    timeHorizon: "short-term",
    actions: ["Expand sugar-free range", "Increase flavored variant facings"],
    explainability: { metrics: ["vs Forecast +8.2%", "Sugar-free +15%"], benchmarks: ["vs market +3.1%"], analogues: ["2024 health trend"] },
  },
  {
    id: "d2",
    headline: "Flavored Water penetration declining in under-25s",
    whatsHappening: "5% drop in purchase frequency among younger demographic segment",
    whyHappening: "Shift towards energy drinks and protein waters in this age group",
    impact: "£18K risk",
    impactType: "risk",
    timeHorizon: "seasonal",
    actions: ["Review flavored water positioning", "Consider youth-targeted variants"],
    explainability: { metrics: ["Under-25 freq -5%", "Switching to energy +12%"], benchmarks: ["vs 25-35 stable"], analogues: ["Similar shift 2023"] },
  },
  {
    id: "d3",
    headline: "Weekend demand spike in convenience format",
    whatsHappening: "35% higher velocity on 500ml bottles during weekend periods",
    whyHappening: "On-the-go consumption patterns align with leisure activities",
    impact: "£15K opportunity",
    impactType: "opportunity",
    timeHorizon: "short-term",
    actions: ["Adjust weekend stock allocations", "Review convenience format pricing"],
    explainability: { metrics: ["Weekend velocity +35%", "500ml share +8%"], benchmarks: ["vs weekday baseline"], analogues: ["Summer 2024 pattern"] },
  },
];

const inventoryRisks: InsightCard[] = [
  {
    id: "i1",
    headline: "5 SKUs at critical overstock levels (>8 weeks cover)",
    whatsHappening: "ED-030, SD-078, and 3 others carrying excess inventory risking wastage",
    whyHappening: "Overoptimistic seasonal forecasts not adjusted for mild weather",
    impact: "£42K wastage risk",
    impactType: "risk",
    timeHorizon: "immediate",
    actions: ["Run markdown simulation", "Reduce next buy quantities"],
    explainability: { metrics: ["Avg cover 9.2 wks", "Wastage rate 2.1%"], benchmarks: ["Target 4-6 wks"], analogues: ["Q4 2023 overstock"] },
  },
  {
    id: "i2",
    headline: "Red Bull 4-pack approaching safety stock threshold",
    whatsHappening: "High velocity multipack at 1.8 weeks cover, below 3-week safety threshold",
    whyHappening: "Promotional uplift exceeded forecast by 25%",
    impact: "£18K lost sales risk",
    impactType: "risk",
    timeHorizon: "immediate",
    actions: ["Place emergency order", "Adjust forecast model"],
    explainability: { metrics: ["Cover 1.8 wks", "Promo uplift +25%"], benchmarks: ["Safety 3 wks"], analogues: ["Dec 2023 shortage"] },
  },
  {
    id: "i3",
    headline: "Seasonal water range approaching shelf-life limit",
    whatsHappening: "Limited edition summer water SKUs with 4 weeks to expiry",
    whyHappening: "Lower than expected demand due to unseasonably cool weather",
    impact: "£8K wastage risk",
    impactType: "risk",
    timeHorizon: "immediate",
    actions: ["Initiate markdown schedule", "Consider bundle promotions"],
    explainability: { metrics: ["Shelf-life 4 wks", "Current velocity 0.3x"], benchmarks: ["vs normal 1.0x"], analogues: ["Summer 2023 clearance"] },
  },
];

const competitorIntel: InsightCard[] = [
  {
    id: "c1",
    headline: "Competitor X aggressive pricing on Energy Drinks",
    whatsHappening: "5% price reduction across core energy range in 120+ stores",
    whyHappening: "Defensive response to our 2pp market share gain in Q3",
    impact: "£35K share risk",
    impactType: "risk",
    timeHorizon: "short-term",
    actions: ["Run competitive pricing simulation", "Evaluate targeted promotional response"],
    explainability: { metrics: ["Price gap now -5%", "Elasticity -1.2"], benchmarks: ["Historical response +3% sales"], analogues: ["Q2 2024 price war"] },
  },
  {
    id: "c2",
    headline: "Competitor Y expanding Sports Drinks range",
    whatsHappening: "8 new SKUs launched targeting premium hydration segment",
    whyHappening: "Competitor following market trend towards functional sports nutrition",
    impact: "£22K share risk",
    impactType: "risk",
    timeHorizon: "seasonal",
    actions: ["Accelerate own NPD pipeline", "Review premium range positioning"],
    explainability: { metrics: ["New SKUs 8", "Premium segment +12%"], benchmarks: ["Our range 24 SKUs"], analogues: ["2023 range expansion"] },
  },
];

const benchmarks: InsightCard[] = [
  {
    id: "b1",
    headline: "Category outperforming company average by +3.2%",
    whatsHappening: "Beverages leading company growth with strongest volume and value performance",
    whyHappening: "Effective promotional strategy and strong supplier partnerships",
    impact: "£85K contribution",
    impactType: "opportunity",
    timeHorizon: "short-term",
    actions: ["Share best practices with other categories", "Maintain promotional investment"],
    explainability: { metrics: ["vs Company +3.2%", "Margin +0.8pp"], benchmarks: ["Company avg 4.8%"], analogues: ["Top quartile performance"] },
  },
  {
    id: "b2",
    headline: "Price index 3.2% above competitive target",
    whatsHappening: "Category pricing running slightly above competitive parity target of 100",
    whyHappening: "Recent cost increases not fully absorbed, passed to retail price",
    impact: "£28K elasticity risk",
    impactType: "risk",
    timeHorizon: "short-term",
    actions: ["Run price optimisation simulation", "Review promotional depth strategy"],
    explainability: { metrics: ["Price index 103.2", "Elasticity -1.1"], benchmarks: ["Target index 100"], analogues: ["Q1 2024 price review"] },
  },
];

function InsightCardComponent({ 
  insight, 
  onRunSimulation 
}: { 
  insight: InsightCard;
  onRunSimulation: (insight: InsightCard) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={cn(
      "shadow-card border-l-4 transition-all hover:shadow-md",
      insight.impactType === "opportunity" ? "border-l-success" : "border-l-destructive"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={insight.impactType === "opportunity" ? "default" : "destructive"} className="text-[10px]">
                {insight.impactType === "opportunity" ? "Opportunity" : "Risk"}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {insight.timeHorizon}
              </Badge>
            </div>
            <h3 className="font-semibold text-sm mb-2">{insight.headline}</h3>
            <p className="text-sm text-muted-foreground mb-2">{insight.whatsHappening}</p>
            <p className="text-xs text-muted-foreground"><span className="font-medium">Why:</span> {insight.whyHappening}</p>
          </div>
          <div className="text-right">
            <p className={cn(
              "text-lg font-bold",
              insight.impactType === "opportunity" ? "text-success" : "text-destructive"
            )}>
              {insight.impact}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t">
          <p className="text-xs font-medium mb-2">Recommended Actions:</p>
          <ul className="space-y-1 mb-3">
            {insight.actions.map((action, idx) => (
              <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                <ChevronRight className="w-3 h-3" />
                {action}
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <Button size="sm" className="text-xs h-7" onClick={() => onRunSimulation(insight)}>
              <Play className="w-3 h-3 mr-1" />
              Run Simulation
            </Button>
          </div>
        </div>

        {insight.explainability && (
          <Collapsible open={expanded} onOpenChange={setExpanded}>
            <CollapsibleTrigger className="flex items-center gap-1 text-xs text-muted-foreground mt-3 hover:text-foreground">
              <ChevronDown className={cn("w-3 h-3 transition-transform", expanded && "rotate-180")} />
              {expanded ? "Hide" : "Show"} explainability
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 p-3 bg-muted/30 rounded-lg text-xs">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-medium mb-1">Key Metrics</p>
                  {insight.explainability.metrics.map((m, i) => (
                    <p key={i} className="text-muted-foreground">{m}</p>
                  ))}
                </div>
                <div>
                  <p className="font-medium mb-1">Benchmarks</p>
                  {insight.explainability.benchmarks.map((b, i) => (
                    <p key={i} className="text-muted-foreground">{b}</p>
                  ))}
                </div>
                <div>
                  <p className="font-medium mb-1">Historical</p>
                  {insight.explainability.analogues.map((a, i) => (
                    <p key={i} className="text-muted-foreground">{a}</p>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}

function InsightsList({ 
  insights, 
  onRunSimulation 
}: { 
  insights: InsightCard[];
  onRunSimulation: (insight: InsightCard) => void;
}) {
  return (
    <div className="grid gap-4">
      {insights.map((insight) => (
        <InsightCardComponent 
          key={insight.id} 
          insight={insight} 
          onRunSimulation={onRunSimulation}
        />
      ))}
    </div>
  );
}

function OverviewTab({ onRunSimulation }: { onRunSimulation: (insight: InsightCard) => void }) {
  const allRisks = [...priorityInsights, ...demandSignals, ...inventoryRisks, ...competitorIntel, ...benchmarks]
    .filter(i => i.impactType === "risk")
    .slice(0, 5);
  
  const allOpportunities = [...priorityInsights, ...demandSignals, ...inventoryRisks, ...competitorIntel, ...benchmarks]
    .filter(i => i.impactType === "opportunity")
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-muted-foreground">Total Risks</span>
          </div>
          <p className="text-2xl font-bold">8</p>
          <p className="text-xs text-muted-foreground">£145K exposure</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-sm text-muted-foreground">Opportunities</span>
          </div>
          <p className="text-2xl font-bold">5</p>
          <p className="text-xs text-muted-foreground">£222K upside</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">Immediate</span>
          </div>
          <p className="text-2xl font-bold">5</p>
          <p className="text-xs text-muted-foreground">Action required</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-info" />
            <span className="text-sm text-muted-foreground">Resolved</span>
          </div>
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs text-muted-foreground">This week</p>
        </Card>
      </div>

      {/* Priority Insights */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Priority Insights</h2>
          <Badge variant="secondary" className="text-xs">{priorityInsights.length}</Badge>
        </div>
        <InsightsList insights={priorityInsights} onRunSimulation={onRunSimulation} />
      </div>
    </div>
  );
}

const AIInsights = () => {
  const navigate = useNavigate();
  const [simulationModalOpen, setSimulationModalOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<InsightCard | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunSimulation = (insight: InsightCard) => {
    setSelectedInsight(insight);
    setSimulationModalOpen(true);
  };

  const handleStartSimulation = () => {
    setIsRunning(true);
    // Simulate background process
    setTimeout(() => {
      setIsRunning(false);
      setSimulationModalOpen(false);
      toast.success("Simulation started successfully", {
        description: "You'll be notified when results are ready.",
        action: {
          label: "View Simulations",
          onClick: () => navigate("/simulations"),
        },
      });
    }, 2000);
  };

  const handleGoToSimulations = () => {
    setSimulationModalOpen(false);
    navigate("/simulations/new");
  };

  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshInsights = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsRefreshing(false);
      toast.success("Insights refreshed", {
        description: "All insights have been updated with latest data.",
      });
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Insights</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Your daily intelligence briefing for category management decisions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Generated: {lastRefresh.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}, {lastRefresh.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} GMT
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshInsights}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Insights
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-5 h-10">
            <TabsTrigger value="overview" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="demand" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Demand
            </TabsTrigger>
            <TabsTrigger value="inventory" className="text-xs">
              <Package className="w-3 h-3 mr-1" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="competitor" className="text-xs">
              <Target className="w-3 h-3 mr-1" />
              Competitor
            </TabsTrigger>
            <TabsTrigger value="benchmarks" className="text-xs">
              <BarChart3 className="w-3 h-3 mr-1" />
              Benchmarks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab onRunSimulation={handleRunSimulation} />
          </TabsContent>

          <TabsContent value="demand">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-success" />
                <h2 className="text-lg font-semibold">Demand Signals</h2>
                <Badge variant="secondary" className="text-xs">{demandSignals.length}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                AI-detected changes in customer demand patterns and emerging trends.
              </p>
              <InsightsList insights={demandSignals} onRunSimulation={handleRunSimulation} />
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-warning" />
                <h2 className="text-lg font-semibold">Inventory Risks</h2>
                <Badge variant="secondary" className="text-xs">{inventoryRisks.length}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Stock availability concerns and inventory efficiency opportunities.
              </p>
              <InsightsList insights={inventoryRisks} onRunSimulation={handleRunSimulation} />
            </div>
          </TabsContent>

          <TabsContent value="competitor">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-info" />
                <h2 className="text-lg font-semibold">Competitor Intelligence</h2>
                <Badge variant="secondary" className="text-xs">{competitorIntel.length}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Competitive moves and market positioning updates.
              </p>
              <InsightsList insights={competitorIntel} onRunSimulation={handleRunSimulation} />
            </div>
          </TabsContent>

          <TabsContent value="benchmarks">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-secondary" />
                <h2 className="text-lg font-semibold">Benchmarks & Performance Gaps</h2>
                <Badge variant="secondary" className="text-xs">{benchmarks.length}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Category performance against internal and external benchmarks.
              </p>
              <InsightsList insights={benchmarks} onRunSimulation={handleRunSimulation} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Run Simulation Modal */}
      <Dialog open={simulationModalOpen} onOpenChange={setSimulationModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Run Simulation</DialogTitle>
            <DialogDescription>
              Choose how you'd like to proceed with the simulation for this insight.
            </DialogDescription>
          </DialogHeader>
          
          {selectedInsight && (
            <div className="py-4">
              <div className="p-3 rounded-lg bg-muted/50 mb-4">
                <p className="text-sm font-medium">{selectedInsight.headline}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Estimated impact: <span className={selectedInsight.impactType === "opportunity" ? "text-success" : "text-destructive"}>{selectedInsight.impact}</span>
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Recommended actions to simulate:</p>
                <ul className="space-y-1">
                  {selectedInsight.actions.map((action, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <ChevronRight className="w-3 h-3" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button variant="outline" onClick={handleGoToSimulations}>
              Create Custom Simulation
            </Button>
            <Button onClick={handleStartSimulation} disabled={isRunning}>
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Quick Run
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default AIInsights;
