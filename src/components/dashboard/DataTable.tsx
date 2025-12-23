import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const data = [
  {
    id: "ED-101",
    name: "Energy Rush Original",
    category: "Energy Drinks",
    currentPrice: 2.49,
    forecastUnits: 15200,
    actualUnits: 16450,
    varianceUnits: 8.2,
    forecastRevenue: 37848,
    actualRevenue: 40961,
    varianceRevenue: 8.2,
    margin: 23.5,
    sellThrough: 94.2,
    stockCover: 3.2,
    status: "strong",
  },
  {
    id: "ED-109",
    name: "Tropical Blast 500ml",
    category: "Energy Drinks",
    currentPrice: 2.79,
    forecastUnits: 12800,
    actualUnits: 13100,
    varianceUnits: 2.3,
    forecastRevenue: 35712,
    actualRevenue: 36549,
    varianceRevenue: 2.3,
    margin: 21.8,
    sellThrough: 88.5,
    stockCover: 4.1,
    status: "good",
  },
  {
    id: "SD-045",
    name: "Hydrate Pro Lemon",
    category: "Sports Drinks",
    currentPrice: 1.99,
    forecastUnits: 18500,
    actualUnits: 17200,
    varianceUnits: -7.0,
    forecastRevenue: 36815,
    actualRevenue: 34228,
    varianceRevenue: -7.0,
    margin: 18.2,
    sellThrough: 72.3,
    stockCover: 6.8,
    status: "attention",
  },
  {
    id: "FW-022",
    name: "Crystal Spring Berry",
    category: "Flavored Water",
    currentPrice: 1.49,
    forecastUnits: 22000,
    actualUnits: 21500,
    varianceUnits: -2.3,
    forecastRevenue: 32780,
    actualRevenue: 32035,
    varianceRevenue: -2.3,
    margin: 25.1,
    sellThrough: 82.1,
    stockCover: 5.2,
    status: "good",
  },
  {
    id: "ED-030",
    name: "Zero Sugar Boost",
    category: "Energy Drinks",
    currentPrice: 2.69,
    forecastUnits: 9800,
    actualUnits: 8200,
    varianceUnits: -16.3,
    forecastRevenue: 26362,
    actualRevenue: 22058,
    varianceRevenue: -16.3,
    margin: 15.8,
    sellThrough: 58.2,
    stockCover: 9.5,
    status: "critical",
  },
];

type SortKey = keyof typeof data[0];

export function DataTable() {
  const [sortKey, setSortKey] = useState<SortKey>("varianceRevenue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      strong: { variant: "default", label: "Strong" },
      good: { variant: "secondary", label: "Good" },
      attention: { variant: "outline", label: "Attention" },
      critical: { variant: "destructive", label: "Critical" },
    };
    const config = variants[status] || variants.good;
    return <Badge variant={config.variant} className="text-xs">{config.label}</Badge>;
  };

  const SortHeader = ({ label, sortKey: key }: { label: string; sortKey: SortKey }) => (
    <button
      onClick={() => handleSort(key)}
      className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
      {sortKey === key && (
        sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
      )}
    </button>
  );

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          Actuals vs Forecast
          <Button variant="outline" size="sm" className="text-xs">
            View All
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-3 font-medium text-muted-foreground text-xs">SKU</th>
                <th className="text-left p-3 font-medium text-muted-foreground text-xs">Product</th>
                <th className="text-right p-3"><SortHeader label="Price" sortKey="currentPrice" /></th>
                <th className="text-right p-3"><SortHeader label="Act. Units" sortKey="actualUnits" /></th>
                <th className="text-right p-3"><SortHeader label="Var %" sortKey="varianceUnits" /></th>
                <th className="text-right p-3"><SortHeader label="Revenue" sortKey="actualRevenue" /></th>
                <th className="text-right p-3"><SortHeader label="Margin %" sortKey="margin" /></th>
                <th className="text-right p-3"><SortHeader label="Sell-Thru" sortKey="sellThrough" /></th>
                <th className="text-right p-3"><SortHeader label="Cover (W)" sortKey="stockCover" /></th>
                <th className="text-center p-3 text-xs font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <td className="p-3 font-mono text-xs text-muted-foreground">{row.id}</td>
                  <td className="p-3">
                    <div>
                      <p className="font-medium text-sm">{row.name}</p>
                      <p className="text-xs text-muted-foreground">{row.category}</p>
                    </div>
                  </td>
                  <td className="p-3 text-right font-mono">${row.currentPrice.toFixed(2)}</td>
                  <td className="p-3 text-right font-mono">{row.actualUnits.toLocaleString()}</td>
                  <td className={cn(
                    "p-3 text-right font-mono font-medium",
                    row.varianceUnits > 0 ? "text-success" : row.varianceUnits < -5 ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {row.varianceUnits > 0 ? "+" : ""}{row.varianceUnits.toFixed(1)}%
                  </td>
                  <td className="p-3 text-right font-mono">${row.actualRevenue.toLocaleString()}</td>
                  <td className="p-3 text-right font-mono">{row.margin.toFixed(1)}%</td>
                  <td className="p-3 text-right font-mono">{row.sellThrough.toFixed(1)}%</td>
                  <td className={cn(
                    "p-3 text-right font-mono",
                    row.stockCover > 8 ? "text-warning" : ""
                  )}>
                    {row.stockCover.toFixed(1)}
                  </td>
                  <td className="p-3 text-center">{getStatusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
