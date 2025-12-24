import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  TrendingDown,
  Package,
  DollarSign,
  Tag,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface AlertItem {
  id: string;
  title: string;
  value: string;
  change: string;
  impact: string;
  severity: "high" | "medium" | "low";
  details?: {
    description: string;
    rootCause: string;
    recommendation: string;
  };
}

const marginErosions: AlertItem[] = [
  {
    id: "m1",
    title: "Sports Drinks - Promo Overlap",
    value: "-2.3pp",
    change: "vs LW",
    impact: "£18.5K lost margin",
    severity: "high",
    details: {
      description: "Overlapping promotions on 3 key SKUs causing margin dilution",
      rootCause: "Uncoordinated promo calendar between suppliers",
      recommendation: "Review promo calendar and consolidate promotional windows",
    },
  },
  {
    id: "m2",
    title: "Zero Sugar Boost 250ml",
    value: "-1.8pp",
    change: "vs LY",
    impact: "£12.2K lost margin",
    severity: "high",
    details: {
      description: "Price elasticity impact from competitor price reduction",
      rootCause: "Competitor X reduced price by 8%",
      recommendation: "Consider targeted price adjustment or value-add bundle",
    },
  },
  {
    id: "m3",
    title: "Flavored Water Category",
    value: "-1.2pp",
    change: "vs Budget",
    impact: "£8.4K lost margin",
    severity: "medium",
    details: {
      description: "Cost increases not fully passed through",
      rootCause: "Supplier cost increase not reflected in retail price",
      recommendation: "Review pricing strategy and supplier negotiations",
    },
  },
  {
    id: "m4",
    title: "Energy Drinks 500ml",
    value: "-0.9pp",
    change: "vs LY",
    impact: "£6.1K lost margin",
    severity: "medium",
    details: {
      description: "Higher promotional depth than planned",
      rootCause: "Extended promotional period requested by supplier",
      recommendation: "Negotiate promotional contribution or reduce depth",
    },
  },
  {
    id: "m5",
    title: "Premium Juice Range",
    value: "-0.7pp",
    change: "vs LW",
    impact: "£4.8K lost margin",
    severity: "low",
    details: {
      description: "Wastage increase due to slow sales",
      rootCause: "New range not meeting sales expectations",
      recommendation: "Consider markdown or promotional support",
    },
  },
];

const oosRisks: AlertItem[] = [
  {
    id: "o1",
    title: "Spring Water 1L",
    value: "1.2 wks",
    change: "cover",
    impact: "£24K lost sales risk",
    severity: "high",
    details: {
      description: "Critical stock cover below safety threshold",
      rootCause: "Supplier delivery delay + demand surge",
      recommendation: "Expedite order and explore alternative suppliers",
    },
  },
  {
    id: "o2",
    title: "Red Bull 250ml 4-pack",
    value: "1.8 wks",
    change: "cover",
    impact: "£18K lost sales risk",
    severity: "high",
    details: {
      description: "High velocity SKU approaching stockout",
      rootCause: "Underestimated seasonal demand",
      recommendation: "Place emergency order and adjust forecast",
    },
  },
  {
    id: "o3",
    title: "Monster Energy 500ml",
    value: "2.1 wks",
    change: "cover",
    impact: "£15K lost sales risk",
    severity: "medium",
    details: {
      description: "Stock cover below target threshold",
      rootCause: "Promotional uplift exceeded forecast",
      recommendation: "Increase next order quantity by 25%",
    },
  },
  {
    id: "o4",
    title: "Lucozade Sport Berry",
    value: "2.4 wks",
    change: "cover",
    impact: "£11K lost sales risk",
    severity: "medium",
    details: {
      description: "Approaching critical stock level",
      rootCause: "Distribution center capacity constraints",
      recommendation: "Coordinate with logistics for priority allocation",
    },
  },
  {
    id: "o5",
    title: "Tropical Blast 330ml",
    value: "2.6 wks",
    change: "cover",
    impact: "£8K lost sales risk",
    severity: "low",
    details: {
      description: "New launch SKU with uncertain demand",
      rootCause: "Initial demand exceeding conservative forecast",
      recommendation: "Revise forecast upward based on early sales data",
    },
  },
];

const priceBreaches: AlertItem[] = [
  {
    id: "p1",
    title: "Energy Drinks - Floor Breach",
    value: "£0.12",
    change: "below floor",
    impact: "8 stores affected",
    severity: "high",
    details: {
      description: "Price below agreed floor in promotional period",
      rootCause: "System error in promotional pricing",
      recommendation: "Correct pricing and review promo setup process",
    },
  },
  {
    id: "p2",
    title: "Sports Drinks - Ceiling Breach",
    value: "£0.08",
    change: "above ceiling",
    impact: "12 stores affected",
    severity: "medium",
    details: {
      description: "Price exceeds agreed ceiling post-promotion",
      rootCause: "Price reversion not applied correctly",
      recommendation: "Adjust prices and audit price change process",
    },
  },
  {
    id: "p3",
    title: "Water Category - Index Gap",
    value: "103.2",
    change: "vs target 100",
    impact: "Elasticity risk",
    severity: "medium",
    details: {
      description: "Price index above competitive target",
      rootCause: "Competitor price reduction not matched",
      recommendation: "Review competitive positioning strategy",
    },
  },
];

const promoUnderperformers: AlertItem[] = [
  {
    id: "pr1",
    title: "Zero Sugar Boost Promo",
    value: "-32%",
    change: "vs forecast",
    impact: "£14K below plan",
    severity: "high",
    details: {
      description: "Promotional uplift significantly below forecast",
      rootCause: "Competitor ran stronger promotion simultaneously",
      recommendation: "Review promo timing and competitive calendar",
    },
  },
  {
    id: "pr2",
    title: "Flavored Water BOGOF",
    value: "-24%",
    change: "vs forecast",
    impact: "£9K below plan",
    severity: "medium",
    details: {
      description: "BOGOF promotion not achieving expected uplift",
      rootCause: "Low awareness due to limited in-store visibility",
      recommendation: "Increase POS materials and digital support",
    },
  },
  {
    id: "pr3",
    title: "Sports Drinks 3-for-2",
    value: "-18%",
    change: "vs forecast",
    impact: "£7K below plan",
    severity: "medium",
    details: {
      description: "Multi-buy promotion underperforming",
      rootCause: "Price point still above key threshold",
      recommendation: "Consider deeper promotion or alternative mechanic",
    },
  },
];

function AlertCard({ item, icon: Icon }: { item: AlertItem; icon: React.ComponentType<{ className?: string }> }) {
  const [open, setOpen] = useState(false);
  
  const severityStyles = {
    high: "border-l-destructive bg-destructive/5",
    medium: "border-l-warning bg-warning/5",
    low: "border-l-muted-foreground bg-muted/30",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "flex items-center justify-between p-3 rounded-lg border-l-4 cursor-pointer transition-colors hover:bg-muted/50",
            severityStyles[item.severity]
          )}
        >
          <div className="flex items-center gap-3">
            <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.impact}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-semibold text-destructive">{item.value}</p>
              <p className="text-[10px] text-muted-foreground">{item.change}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            {item.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Impact</span>
            <span className="text-sm font-semibold">{item.impact}</span>
          </div>
          {item.details && (
            <>
              <div>
                <h4 className="text-sm font-medium mb-1">What's happening</h4>
                <p className="text-sm text-muted-foreground">{item.details.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Root cause</h4>
                <p className="text-sm text-muted-foreground">{item.details.rootCause}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Recommended action</h4>
                <p className="text-sm text-muted-foreground">{item.details.recommendation}</p>
              </div>
            </>
          )}
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1">
              Run Simulation
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              View Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ExceptionAlertsPanel() {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          Exceptions & Alerts
          <Badge variant="destructive" className="ml-2 text-[10px]">
            {marginErosions.length + oosRisks.length} Critical
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="margin" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="margin" className="text-xs">
              <TrendingDown className="w-3 h-3 mr-1" />
              Margin
            </TabsTrigger>
            <TabsTrigger value="oos" className="text-xs">
              <Package className="w-3 h-3 mr-1" />
              OOS
            </TabsTrigger>
            <TabsTrigger value="price" className="text-xs">
              <DollarSign className="w-3 h-3 mr-1" />
              Price
            </TabsTrigger>
            <TabsTrigger value="promo" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              Promo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="margin" className="space-y-2">
            {marginErosions.map((item) => (
              <AlertCard key={item.id} item={item} icon={TrendingDown} />
            ))}
          </TabsContent>

          <TabsContent value="oos" className="space-y-2">
            {oosRisks.map((item) => (
              <AlertCard key={item.id} item={item} icon={Package} />
            ))}
          </TabsContent>

          <TabsContent value="price" className="space-y-2">
            {priceBreaches.map((item) => (
              <AlertCard key={item.id} item={item} icon={DollarSign} />
            ))}
          </TabsContent>

          <TabsContent value="promo" className="space-y-2">
            {promoUnderperformers.map((item) => (
              <AlertCard key={item.id} item={item} icon={Tag} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}