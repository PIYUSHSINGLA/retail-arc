import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "W1", revenue: 245000, units: 12400, forecast: 240000 },
  { name: "W2", revenue: 258000, units: 13200, forecast: 252000 },
  { name: "W3", revenue: 276000, units: 14100, forecast: 268000 },
  { name: "W4", revenue: 289000, units: 14800, forecast: 280000 },
  { name: "W5", revenue: 312000, units: 16200, forecast: 295000 },
  { name: "W6", revenue: 298000, units: 15400, forecast: 310000 },
  { name: "W7", revenue: 325000, units: 16800, forecast: 320000 },
  { name: "W8", revenue: 342000, units: 17500, forecast: 335000 },
  { name: "W9", revenue: 368000, units: 18900, forecast: 350000 },
  { name: "W10", revenue: 385000, units: 19700, forecast: 370000 },
  { name: "W11", revenue: 395000, units: 20200, forecast: 385000 },
  { name: "W12", revenue: 418000, units: 21400, forecast: 400000 },
];

export function RevenueChart() {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          Revenue & Units Trend
          <div className="flex items-center gap-4 text-xs font-normal">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              Units
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-muted-foreground/50" style={{ borderStyle: 'dashed' }} />
              Forecast
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(260, 100%, 58%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(260, 100%, 58%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(270, 15%, 90%)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(263, 20%, 45%)", fontSize: 11 }}
                axisLine={{ stroke: "hsl(270, 15%, 90%)" }}
              />
              <YAxis
                yAxisId="revenue"
                tick={{ fill: "hsl(263, 20%, 45%)", fontSize: 11 }}
                axisLine={{ stroke: "hsl(270, 15%, 90%)" }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <YAxis
                yAxisId="units"
                orientation="right"
                tick={{ fill: "hsl(263, 20%, 45%)", fontSize: 11 }}
                axisLine={{ stroke: "hsl(270, 15%, 90%)" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(270, 15%, 90%)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ color: "hsl(263, 54%, 19%)", fontWeight: 600 }}
                formatter={(value: number, name: string) => [
                  name === "revenue" || name === "forecast"
                    ? `$${value.toLocaleString()}`
                    : value.toLocaleString(),
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
              />
              <Area
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                fill="url(#revenueGradient)"
                stroke="none"
              />
              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                stroke="hsl(260, 100%, 58%)"
                strokeWidth={2.5}
                dot={{ fill: "hsl(260, 100%, 58%)", strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, stroke: "hsl(260, 100%, 58%)", strokeWidth: 2, fill: "white" }}
              />
              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="forecast"
                stroke="hsl(263, 20%, 45%)"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                yAxisId="units"
                type="monotone"
                dataKey="units"
                stroke="hsl(186, 100%, 34%)"
                strokeWidth={2}
                dot={{ fill: "hsl(186, 100%, 34%)", strokeWidth: 0, r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
