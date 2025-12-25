import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Heart,
  RefreshCw,
  UserPlus,
  Repeat,
  Target,
  Percent,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const segmentData = [
  { segment: "Loyal High-Value", penetration: 18, frequency: 4.2, avgSpend: 42.50, contribution: 38.5, growth: 5.2 },
  { segment: "Regular Buyers", penetration: 32, frequency: 2.8, avgSpend: 28.30, contribution: 35.2, growth: 2.1 },
  { segment: "Occasional", penetration: 28, frequency: 1.2, avgSpend: 18.50, contribution: 15.8, growth: -1.5 },
  { segment: "New Customers", penetration: 12, frequency: 1.0, avgSpend: 22.00, contribution: 6.8, growth: 12.5 },
  { segment: "Lapsed", penetration: 10, frequency: 0.3, avgSpend: 15.20, contribution: 3.7, growth: -8.2 },
];

const affinityData = [
  { category: "Snacks - Crisps", affinity: 72, lift: 2.4, basketShare: 45 },
  { category: "Confectionery", affinity: 58, lift: 1.9, basketShare: 32 },
  { category: "Dairy - Milk", affinity: 42, lift: 1.5, basketShare: 28 },
  { category: "Frozen - Ice Cream", affinity: 38, lift: 1.8, basketShare: 22 },
  { category: "Bakery - Fresh", affinity: 35, lift: 1.4, basketShare: 25 },
];

const buyerTrendData = [
  { week: "W1", new: 1200, repeat: 4500 },
  { week: "W2", new: 1350, repeat: 4600 },
  { week: "W3", new: 1100, repeat: 4700 },
  { week: "W4", new: 1450, repeat: 4550 },
  { week: "W5", new: 1280, repeat: 4800 },
  { week: "W6", new: 1520, repeat: 4650 },
  { week: "W7", new: 1380, repeat: 4900 },
  { week: "W8", new: 1600, repeat: 4750 },
];

const basketComposition = [
  { name: "Energy Drinks", value: 35, color: "hsl(var(--primary))" },
  { name: "Soft Drinks", value: 25, color: "hsl(var(--secondary))" },
  { name: "Water", value: 20, color: "hsl(var(--info))" },
  { name: "Sports Drinks", value: 12, color: "hsl(var(--success))" },
  { name: "Other", value: 8, color: "hsl(var(--muted))" },
];

const loyaltyTrends = [
  { month: "Jul", members: 42000, redemption: 28 },
  { month: "Aug", members: 43500, redemption: 31 },
  { month: "Sep", members: 44200, redemption: 29 },
  { month: "Oct", members: 45800, redemption: 33 },
  { month: "Nov", members: 47200, redemption: 35 },
  { month: "Dec", members: 49500, redemption: 38 },
];

const CustomerBasket = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Customer & Basket Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Customer behavior, basket composition, and loyalty trends
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold">124K</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-info" />
                <div>
                  <p className="text-xs text-muted-foreground">Penetration</p>
                  <p className="text-2xl font-bold">18.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Repeat className="w-8 h-8 text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Repeat Rate</p>
                  <p className="text-2xl font-bold">68%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-secondary" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg Basket</p>
                  <p className="text-2xl font-bold">£28.40</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Frequency</p>
                  <p className="text-2xl font-bold">2.4x</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-destructive" />
                <div>
                  <p className="text-xs text-muted-foreground">Loyalty Members</p>
                  <p className="text-2xl font-bold">49.5K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="behavior" className="space-y-6">
          <TabsList>
            <TabsTrigger value="behavior">Customer Behavior</TabsTrigger>
            <TabsTrigger value="basket">Basket Analysis</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty Trends</TabsTrigger>
          </TabsList>

          {/* Customer Behavior Tab */}
          <TabsContent value="behavior" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">New vs Repeat Buyers Trend</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={buyerTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                      <Legend />
                      <Bar dataKey="new" name="New Buyers" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="repeat" name="Repeat Buyers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Segment Contribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={segmentData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" tick={{ fontSize: 10 }} />
                      <YAxis type="category" dataKey="segment" tick={{ fontSize: 10 }} width={100} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                      <Bar dataKey="contribution" name="Contribution %" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Customer Segment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Segment</TableHead>
                      <TableHead className="text-right">Penetration %</TableHead>
                      <TableHead className="text-right">Frequency</TableHead>
                      <TableHead className="text-right">Avg Spend (£)</TableHead>
                      <TableHead className="text-right">Contribution %</TableHead>
                      <TableHead className="text-right">Growth %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {segmentData.map((seg, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{seg.segment}</TableCell>
                        <TableCell className="text-right">{seg.penetration}%</TableCell>
                        <TableCell className="text-right">{seg.frequency}x</TableCell>
                        <TableCell className="text-right">£{seg.avgSpend.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{seg.contribution}%</TableCell>
                        <TableCell className="text-right">
                          <span className={seg.growth >= 0 ? "text-success" : "text-destructive"}>
                            {seg.growth >= 0 ? "+" : ""}{seg.growth}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Basket Analysis Tab */}
          <TabsContent value="basket" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Basket Composition</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={basketComposition} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" label={({ name, value }) => `${name}: ${value}%`} labelLine={false}>
                        {basketComposition.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Category Affinity Scores</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={affinityData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" tick={{ fontSize: 10 }} domain={[0, 100]} />
                      <YAxis type="category" dataKey="category" tick={{ fontSize: 9 }} width={110} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                      <Bar dataKey="affinity" name="Affinity Score" fill="hsl(var(--success))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Top Affinity Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Affinity Score</TableHead>
                      <TableHead className="text-right">Lift</TableHead>
                      <TableHead className="text-right">Basket Share %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {affinityData.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell className="text-right">{item.affinity}</TableCell>
                        <TableCell className="text-right">{item.lift}x</TableCell>
                        <TableCell className="text-right">{item.basketShare}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loyalty Trends Tab */}
          <TabsContent value="loyalty" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Loyalty Program Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={loyaltyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="members" name="Total Members" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                    <Line yAxisId="right" type="monotone" dataKey="redemption" name="Redemption Rate %" stroke="hsl(var(--success))" strokeWidth={2} dot={{ fill: "hsl(var(--success))" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CustomerBasket;
