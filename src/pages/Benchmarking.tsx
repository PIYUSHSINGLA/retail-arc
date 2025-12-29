import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  BarChart3,
  TrendingUp,
  Target,
  Upload,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Store,
  Truck,
  Percent,
  DollarSign,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import { InsightResultsModal } from "@/components/dashboard/InsightResultsModal";
import { toast } from "sonner";

// Category vs Market Index
const categoryMarketData = [
  { metric: "Sales Growth", you: 108, market: 100, gap: 8 },
  { metric: "Price Index", you: 102, market: 100, gap: 2 },
  { metric: "Promo Intensity", you: 115, market: 100, gap: 15 },
  { metric: "Range Depth", you: 95, market: 100, gap: -5 },
  { metric: "Availability", you: 104, market: 100, gap: 4 },
  { metric: "Margin %", you: 98, market: 100, gap: -2 },
];

// Store vs Store Ranking
const storeRankingData = [
  { store: "Store 001 - London Central", sales: "£245K", margin: "22.4%", growth: "+12%", rank: 1, trend: "up" },
  { store: "Store 015 - Manchester", sales: "£198K", margin: "21.8%", growth: "+8%", rank: 2, trend: "stable" },
  { store: "Store 008 - Birmingham", sales: "£176K", margin: "23.1%", growth: "+15%", rank: 3, trend: "up" },
  { store: "Store 022 - Leeds", sales: "£152K", margin: "20.2%", growth: "-2%", rank: 4, trend: "down" },
  { store: "Store 031 - Bristol", sales: "£148K", margin: "21.5%", growth: "+5%", rank: 5, trend: "stable" },
];

// Supplier Comparison
const supplierComparisonData = [
  { supplier: "Supplier A", sales: "£420K", margin: "24.2%", growth: "+8%", fillRate: "98%", share: "32%" },
  { supplier: "Supplier B", sales: "£380K", margin: "22.8%", growth: "+5%", fillRate: "94%", share: "29%" },
  { supplier: "Supplier C", sales: "£285K", margin: "25.1%", growth: "+12%", fillRate: "97%", share: "22%" },
  { supplier: "Supplier D", sales: "£220K", margin: "20.5%", growth: "-3%", fillRate: "91%", share: "17%" },
];

// Competitor Promo Intensity
const promoIntensityData = [
  { competitor: "You", intensity: 28, market: 24 },
  { competitor: "Competitor A", intensity: 32, market: 24 },
  { competitor: "Competitor B", intensity: 22, market: 24 },
  { competitor: "Competitor C", intensity: 25, market: 24 },
];

// Performance Radar Data
const radarData = [
  { metric: "Sales", you: 85, market: 70 },
  { metric: "Margin", you: 72, market: 75 },
  { metric: "Growth", you: 88, market: 65 },
  { metric: "Availability", you: 92, market: 85 },
  { metric: "Promo ROI", you: 68, market: 72 },
  { metric: "Range Opt.", you: 78, market: 80 },
];

// AI Insights
const benchmarkInsights = [
  {
    type: "warning",
    title: "Over-investing in Promo",
    description: "You are over-investing in promo vs peers by 12%. Consider rebalancing to improve ROI.",
    impact: "-£18K margin",
    action: "Simulate promo reduction",
    insightType: "promo-reduction" as const,
  },
  {
    type: "success",
    title: "Strong Sales Growth",
    description: "Sales growth outperforming market by 8pp. Maintain current strategy in high-performing categories.",
    impact: "+£45K incremental",
    action: "Identify growth drivers",
    insightType: "growth-drivers" as const,
  },
  {
    type: "info",
    title: "Range Gap Identified",
    description: "Range depth 5% below market. Consider adding 8-10 SKUs in Sports Drinks to match peers.",
    impact: "+£22K potential",
    action: "Simulate range expansion",
    insightType: "range-expansion" as const,
  },
];

const Benchmarking = () => {
  const [simulationModal, setSimulationModal] = useState(false);
  const [simulationType, setSimulationType] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  const [insightResultsModal, setInsightResultsModal] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<typeof benchmarkInsights[0] | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const openSimulation = (type: string) => {
    setSimulationType(type);
    setSimulationModal(true);
  };

  const handleInsightAction = (insight: typeof benchmarkInsights[0]) => {
    setSelectedInsight(insight);
    setInsightResultsModal(true);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    for (let i = 0; i <= 100; i += 25) {
      await new Promise(r => setTimeout(r, 300));
      setUploadProgress(i);
    }
    setIsUploading(false);
    setUploadModal(false);
    toast.success("Comparison data uploaded successfully");
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Benchmarking</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Compare performance vs internal and external benchmarks
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setUploadModal(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload LY Data
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">vs Last Year</p>
                  <p className="text-2xl font-bold text-success">+8.4%</p>
                  <p className="text-xs text-muted-foreground">Sales Growth</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-info" />
                <div>
                  <p className="text-xs text-muted-foreground">vs Market</p>
                  <p className="text-2xl font-bold text-success">+2.1pp</p>
                  <p className="text-xs text-muted-foreground">Share Growth</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">vs Target</p>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-xs text-warning">-2% to goal</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Price Index</p>
                  <p className="text-2xl font-bold">102</p>
                  <p className="text-xs text-muted-foreground">vs Market</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Percent className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Promo Intensity</p>
                  <p className="text-2xl font-bold text-warning">115</p>
                  <p className="text-xs text-warning">+15 vs peers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Benchmark Insights */}
        <Card className="shadow-card border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Benchmark Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {benchmarkInsights.map((insight, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-4 rounded-lg border",
                    insight.type === "warning" && "bg-warning/5 border-warning/20",
                    insight.type === "success" && "bg-success/5 border-success/20",
                    insight.type === "info" && "bg-info/5 border-info/20"
                  )}
                >
                  <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={cn(
                      insight.type === "warning" && "text-warning",
                      insight.type === "success" && "text-success",
                      insight.type === "info" && "text-info"
                    )}>
                      {insight.impact}
                    </Badge>
                    <Button variant="default" size="sm" onClick={() => handleInsightAction(insight)}>
                      {insight.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="market" className="space-y-4">
          <TabsList>
            <TabsTrigger value="market">Category vs Market</TabsTrigger>
            <TabsTrigger value="stores">Store vs Store</TabsTrigger>
            <TabsTrigger value="suppliers">Supplier vs Supplier</TabsTrigger>
            <TabsTrigger value="promo">Promo Intensity</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Index Bar Chart */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Performance Index vs Market (100 = Market)</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryMarketData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" domain={[80, 120]} tick={{ fontSize: 12 }} />
                      <YAxis dataKey="metric" type="category" tick={{ fontSize: 12 }} width={100} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="you" fill="hsl(var(--primary))" name="Your Performance" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="market" fill="hsl(var(--muted-foreground))" name="Market Benchmark" radius={[0, 4, 4, 0]} opacity={0.5} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Radar Chart */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Performance Radar</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar
                        name="Your Performance"
                        dataKey="you"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Market"
                        dataKey="market"
                        stroke="hsl(var(--muted-foreground))"
                        fill="hsl(var(--muted-foreground))"
                        fillOpacity={0.1}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Gap Analysis Table */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Gap Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead className="text-center">Your Index</TableHead>
                      <TableHead className="text-center">Market</TableHead>
                      <TableHead className="text-center">Gap</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryMarketData.map((item) => (
                      <TableRow key={item.metric}>
                        <TableCell className="font-medium">{item.metric}</TableCell>
                        <TableCell className="text-center">{item.you}</TableCell>
                        <TableCell className="text-center">{item.market}</TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "font-medium",
                            item.gap > 0 ? "text-success" : item.gap < -3 ? "text-destructive" : "text-muted-foreground"
                          )}>
                            {item.gap > 0 ? "+" : ""}{item.gap}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={
                            item.gap > 0 ? "default" : item.gap < -3 ? "destructive" : "secondary"
                          }>
                            {item.gap > 0 ? "Ahead" : item.gap < -3 ? "Behind" : "On Par"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.gap < 0 && (
                            <Button variant="ghost" size="sm" onClick={() => openSimulation(`close-${item.metric}-gap`)}>
                              Close Gap
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stores">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-primary" />
                  <CardTitle className="text-base">Store Performance Ranking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Rank</TableHead>
                      <TableHead>Store</TableHead>
                      <TableHead className="text-right">Sales</TableHead>
                      <TableHead className="text-center">Margin %</TableHead>
                      <TableHead className="text-center">Growth</TableHead>
                      <TableHead className="text-center">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {storeRankingData.map((item) => (
                      <TableRow key={item.store}>
                        <TableCell>
                          <Badge variant={item.rank <= 3 ? "default" : "outline"}>
                            #{item.rank}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{item.store}</TableCell>
                        <TableCell className="text-right">{item.sales}</TableCell>
                        <TableCell className="text-center">{item.margin}</TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "font-medium",
                            item.growth.startsWith("+") ? "text-success" : "text-destructive"
                          )}>
                            {item.growth}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.trend === "up" && <ArrowUpRight className="w-4 h-4 text-success mx-auto" />}
                          {item.trend === "down" && <ArrowDownRight className="w-4 h-4 text-destructive mx-auto" />}
                          {item.trend === "stable" && <span className="text-muted-foreground">—</span>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <CardTitle className="text-base">Supplier Comparison</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-right">Sales</TableHead>
                      <TableHead className="text-center">Margin %</TableHead>
                      <TableHead className="text-center">Growth</TableHead>
                      <TableHead className="text-center">Fill Rate</TableHead>
                      <TableHead className="text-center">Share</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplierComparisonData.map((item) => (
                      <TableRow key={item.supplier}>
                        <TableCell className="font-medium">{item.supplier}</TableCell>
                        <TableCell className="text-right">{item.sales}</TableCell>
                        <TableCell className="text-center">{item.margin}</TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "font-medium",
                            item.growth.startsWith("+") ? "text-success" : "text-destructive"
                          )}>
                            {item.growth}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={cn(
                            parseInt(item.fillRate) >= 96 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                          )}>
                            {item.fillRate}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{item.share}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promo">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Promotional Intensity vs Competitors</CardTitle>
                <Button variant="outline" size="sm" onClick={() => openSimulation("rebalance-promo")}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Simulate Promo Reduction
                </Button>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={promoIntensityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="competitor" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={[0, 40]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="intensity" fill="hsl(var(--primary))" name="Promo % of Sales" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="market" fill="hsl(var(--muted))" name="Market Average" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Simulation Modal */}
      <Dialog open={simulationModal} onOpenChange={setSimulationModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Benchmark Simulation
            </DialogTitle>
            <DialogDescription>
              Running simulation: {simulationType}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Analyzing benchmark gaps...</span>
                <span className="text-muted-foreground">48%</span>
              </div>
              <Progress value={48} />
            </div>
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-sm">Preliminary Results:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Gap Closure</p>
                  <p className="text-lg font-semibold text-success">+5pp</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Revenue Impact</p>
                  <p className="text-lg font-semibold text-success">+£28K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Market Position</p>
                  <p className="text-lg font-semibold">Top Quartile</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Confidence</p>
                  <p className="text-lg font-semibold text-success">High</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setSimulationModal(false)}>Cancel</Button>
              <Button>View Full Results</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Modal */}
      <Dialog open={uploadModal} onOpenChange={setUploadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload Comparison Data
            </DialogTitle>
            <DialogDescription>
              Upload last year data, market benchmarks, or competitor insights
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
              <p className="font-medium">Drop files here or click to browse</p>
              <p className="text-sm text-muted-foreground mt-1">Supports CSV, Excel, JSON</p>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setUploadModal(false)}>Cancel</Button>
              <Button>Upload</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Benchmarking;
