import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp } from "lucide-react";

const weeklyData = [
  { week: "W1", sales: 245, margin: 21.2, volume: 12.4, value: 8.2, share: 24.5 },
  { week: "W2", sales: 258, margin: 21.5, volume: 11.8, value: 7.9, share: 24.8 },
  { week: "W3", sales: 262, margin: 21.8, volume: 12.1, value: 8.4, share: 25.1 },
  { week: "W4", sales: 248, margin: 21.0, volume: 11.5, value: 7.6, share: 24.3 },
  { week: "W5", sales: 275, margin: 22.1, volume: 13.2, value: 9.1, share: 25.5 },
  { week: "W6", sales: 282, margin: 22.4, volume: 13.8, value: 9.5, share: 25.8 },
  { week: "W7", sales: 268, margin: 21.9, volume: 12.9, value: 8.8, share: 25.2 },
  { week: "W8", sales: 291, margin: 22.6, volume: 14.2, value: 9.8, share: 26.1 },
  { week: "W9", sales: 285, margin: 22.3, volume: 13.5, value: 9.2, share: 25.6 },
  { week: "W10", sales: 298, margin: 22.8, volume: 14.5, value: 10.2, share: 26.4 },
  { week: "W11", sales: 312, margin: 23.1, volume: 15.1, value: 10.8, share: 26.9 },
  { week: "W12", sales: 305, margin: 22.9, volume: 14.8, value: 10.5, share: 26.6 },
  { week: "W13", sales: 325, margin: 23.4, volume: 15.8, value: 11.2, share: 27.2 },
];

const volumeValueData = [
  { period: "Q1", volumeGrowth: 5.2, valueGrowth: 7.8 },
  { period: "Q2", volumeGrowth: 6.1, valueGrowth: 8.4 },
  { period: "Q3", volumeGrowth: 4.8, valueGrowth: 6.9 },
  { period: "Q4", volumeGrowth: 7.2, valueGrowth: 9.5 },
];

export function CategoryPerformanceSnapshot() {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Category Performance Snapshot
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sales-margin" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sales-margin" className="text-xs">Sales & Margin</TabsTrigger>
            <TabsTrigger value="volume-value" className="text-xs">Volume vs Value</TabsTrigger>
            <TabsTrigger value="share" className="text-xs">Category Share</TabsTrigger>
          </TabsList>

          <TabsContent value="sales-margin" className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  name="Sales (£K)"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="margin"
                  name="Margin %"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="volume-value" className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeValueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="period" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="volumeGrowth" name="Volume Growth %" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="valueGrowth" name="Value Growth %" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="share" className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <YAxis domain={[22, 30]} tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Line
                  type="monotone"
                  dataKey="share"
                  name="Category Share %"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--secondary))", strokeWidth: 0, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}