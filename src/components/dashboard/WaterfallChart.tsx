import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Base", value: 0, cumulative: 380000, displayValue: 380000, color: "hsl(263, 20%, 45%)" },
  { name: "Adds", value: 120000, cumulative: 500000, displayValue: 120000, color: "hsl(145, 63%, 42%)" },
  { name: "Drops", value: -62000, cumulative: 438000, displayValue: 62000, color: "hsl(0, 72%, 51%)" },
  { name: "Transfer", value: 42000, cumulative: 480000, displayValue: 42000, color: "hsl(186, 100%, 34%)" },
  { name: "Final", value: 0, cumulative: 480000, displayValue: 480000, color: "hsl(260, 100%, 58%)" },
];

export function WaterfallChart() {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          Revenue Change Waterfall
          <span className="text-sm font-normal text-success">+£100K Net Impact</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => `£${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  color: "hsl(var(--card-foreground))",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `£${props.payload.displayValue.toLocaleString()}`,
                  props.payload.name,
                ]}
              />
              <Bar dataKey="cumulative" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
              <ReferenceLine y={380000} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
