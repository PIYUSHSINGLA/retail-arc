import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Settings,
  Layers,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

function InsightCardComponent({ insight }: { insight: InsightCard }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={cn(
      "shadow-card border-l-4 transition-all",
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
            <Button size="sm" className="text-xs h-7">
              <Play className="w-3 h-3 mr-1" />
              Run Simulation
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-7">
              <Settings className="w-3 h-3 mr-1" />
              Edit Assumptions
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              <Layers className="w-3 h-3 mr-1" />
              Combine
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

function InsightSection({ title, icon: Icon, insights, iconColor }: { 
  title: string; 
  icon: React.ComponentType<{ className?: string }>; 
  insights: InsightCard[];
  iconColor: string;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className={cn("w-5 h-5", iconColor)} />
        <h2 className="text-lg font-semibold">{title}</h2>
        <Badge variant="secondary" className="text-xs">{insights.length}</Badge>
      </div>
      <div className="grid gap-4">
        {insights.map((insight) => (
          <InsightCardComponent key={insight.id} insight={insight} />
        ))}
      </div>
    </section>
  );
}

const AIInsights = () => {
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Insights</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Your daily intelligence briefing for category management decisions
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Generated: 24 Dec 2025, 09:02 GMT
          </div>
        </div>

        {/* Priority Insights */}
        <InsightSection 
          title="Priority Insights" 
          icon={Sparkles} 
          insights={priorityInsights}
          iconColor="text-primary"
        />

        {/* Demand Signals */}
        <InsightSection 
          title="Demand Signals" 
          icon={TrendingUp} 
          insights={demandSignals}
          iconColor="text-success"
        />

        {/* Inventory Risks */}
        <InsightSection 
          title="Inventory Risks" 
          icon={Package} 
          insights={inventoryRisks}
          iconColor="text-warning"
        />

        {/* Competitor Intelligence */}
        <InsightSection 
          title="Competitor Intelligence" 
          icon={Target} 
          insights={competitorIntel}
          iconColor="text-info"
        />

        {/* Benchmarks & Performance Gaps */}
        <InsightSection 
          title="Benchmarks & Performance Gaps" 
          icon={BarChart3} 
          insights={benchmarks}
          iconColor="text-secondary"
        />
      </div>
    </MainLayout>
  );
};

export default AIInsights;