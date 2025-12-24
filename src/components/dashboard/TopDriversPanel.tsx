import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Building2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DriverItem {
  rank: number;
  name: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  contribution: string;
}

const growthDrivers: DriverItem[] = [
  { rank: 1, name: "Red Bull 250ml Original", value: "£42.3K", change: "+12.4%", changeType: "positive", contribution: "18.2%" },
  { rank: 2, name: "Monster Energy 500ml", value: "£38.1K", change: "+9.8%", changeType: "positive", contribution: "16.4%" },
  { rank: 3, name: "Tropical Blast 330ml", value: "£28.5K", change: "+45.2%", changeType: "positive", contribution: "12.3%" },
  { rank: 4, name: "Lucozade Sport 500ml", value: "£25.8K", change: "+7.6%", changeType: "positive", contribution: "11.1%" },
  { rank: 5, name: "Boost Original 250ml", value: "£22.4K", change: "+15.3%", changeType: "positive", contribution: "9.7%" },
];

const dragDrivers: DriverItem[] = [
  { rank: 1, name: "Zero Sugar Boost 250ml", value: "-£18.2K", change: "-16.3%", changeType: "negative", contribution: "-7.8%" },
  { rank: 2, name: "Hydrate Plus Berry", value: "-£12.4K", change: "-11.8%", changeType: "negative", contribution: "-5.3%" },
  { rank: 3, name: "Energy Lite 330ml", value: "-£9.8K", change: "-8.2%", changeType: "negative", contribution: "-4.2%" },
  { rank: 4, name: "Sparkling Water Lime", value: "-£7.1K", change: "-6.5%", changeType: "negative", contribution: "-3.1%" },
  { rank: 5, name: "Vitamin Water Orange", value: "-£5.6K", change: "-5.1%", changeType: "negative", contribution: "-2.4%" },
];

const supplierDrivers: DriverItem[] = [
  { rank: 1, name: "Red Bull UK", value: "£85.4K", change: "+8.2%", changeType: "positive", contribution: "32.4%" },
  { rank: 2, name: "Monster Beverage", value: "£62.1K", change: "+6.5%", changeType: "positive", contribution: "23.6%" },
  { rank: 3, name: "Suntory (Lucozade)", value: "£48.7K", change: "+4.8%", changeType: "positive", contribution: "18.5%" },
];

function DriverRow({ item, type }: { item: DriverItem; type: "growth" | "drag" | "supplier" }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <span className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
          type === "growth" ? "bg-success/10 text-success" :
          type === "drag" ? "bg-destructive/10 text-destructive" :
          "bg-primary/10 text-primary"
        )}>
          {item.rank}
        </span>
        <div>
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">Contribution: {item.contribution}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className={cn(
            "text-sm font-semibold",
            item.changeType === "positive" ? "text-success" : "text-destructive"
          )}>
            {item.value}
          </p>
          <p className={cn(
            "text-xs",
            item.changeType === "positive" ? "text-success" : "text-destructive"
          )}>
            {item.change} vs LY
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}

export function TopDriversPanel() {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Top Drivers Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="growth" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="growth" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1 text-success" />
              Growth
            </TabsTrigger>
            <TabsTrigger value="drag" className="text-xs">
              <TrendingDown className="w-3 h-3 mr-1 text-destructive" />
              Drag
            </TabsTrigger>
            <TabsTrigger value="supplier" className="text-xs">
              <Building2 className="w-3 h-3 mr-1" />
              Suppliers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Top 5 SKUs driving category growth</p>
            {growthDrivers.map((item) => (
              <DriverRow key={item.rank} item={item} type="growth" />
            ))}
          </TabsContent>

          <TabsContent value="drag" className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Top 5 SKUs dragging performance</p>
            {dragDrivers.map((item) => (
              <DriverRow key={item.rank} item={item} type="drag" />
            ))}
          </TabsContent>

          <TabsContent value="supplier" className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Top 3 suppliers by contribution</p>
            {supplierDrivers.map((item) => (
              <DriverRow key={item.rank} item={item} type="supplier" />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}