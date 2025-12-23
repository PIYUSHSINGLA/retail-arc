import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Energy Drinks", value: 420000, percentage: 35 },
  { name: "Sports Drinks", value: 264000, percentage: 22 },
  { name: "Flavored Water", value: 180000, percentage: 15 },
  { name: "Soda", value: 156000, percentage: 13 },
  { name: "Juice", value: 108000, percentage: 9 },
  { name: "Other", value: 72000, percentage: 6 },
];

const COLORS = [
  "hsl(260, 100%, 58%)",
  "hsl(328, 100%, 45%)",
  "hsl(186, 100%, 34%)",
  "hsl(145, 63%, 42%)",
  "hsl(38, 92%, 56%)",
  "hsl(263, 20%, 45%)",
];

export function CategoryMixChart() {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Category Mix by Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(270, 15%, 90%)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="circle"
                iconSize={8}
                formatter={(value, entry: any) => (
                  <span className="text-xs text-foreground">
                    {value}{" "}
                    <span className="text-muted-foreground font-mono">
                      ({entry.payload.percentage}%)
                    </span>
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
