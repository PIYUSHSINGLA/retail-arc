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
  DollarSign,
  TrendingUp,
  Target,
  AlertTriangle,
  Plus,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Tag,
  Upload,
  BarChart3,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  ComposedChart,
  Area,
} from "recharts";
import { cn } from "@/lib/utils";

// Price Index Data
const priceIndexData = [
  { competitor: "Competitor A", index: 98, gap: -2 },
  { competitor: "Competitor B", index: 105, gap: 5 },
  { competitor: "Competitor C", index: 102, gap: 2 },
  { competitor: "Market Avg", index: 100, gap: 0 },
];

// Elasticity Data
const elasticityData = [
  { sku: "ED-001", name: "Red Bull 250ml", elasticity: -1.8, pricePoint: "£1.99", optimal: "£2.09", opportunity: "+£12K" },
  { sku: "ED-002", name: "Monster 500ml", elasticity: -2.1, pricePoint: "£1.89", optimal: "£1.79", opportunity: "+£8K" },
  { sku: "SD-001", name: "Lucozade Sport", elasticity: -1.2, pricePoint: "£1.59", optimal: "£1.69", opportunity: "+£15K" },
  { sku: "FW-001", name: "Volvic Touch", elasticity: -0.8, pricePoint: "£1.29", optimal: "£1.35", opportunity: "+£6K" },
];

// Promo Performance Data
const promoPerformanceData = [
  { week: "W1", baseline: 4500, uplift: 2200, roi: 180 },
  { week: "W2", baseline: 4600, uplift: 1800, roi: 150 },
  { week: "W3", baseline: 4400, uplift: 3200, roi: 220 },
  { week: "W4", baseline: 4700, uplift: 2500, roi: 190 },
  { week: "W5", baseline: 4550, uplift: 1200, roi: 120 },
  { week: "W6", baseline: 4650, uplift: 2800, roi: 200 },
];

// Promo Effectiveness Table
const promoEffectiveness = [
  { promo: "BOGOF Energy", uplift: "245%", increment: "68%", roi: "2.4x", postDip: "-18%", status: "success" },
  { promo: "25% Off Sports", uplift: "180%", increment: "52%", roi: "1.8x", postDip: "-12%", status: "success" },
  { promo: "3 for £3", uplift: "120%", increment: "35%", roi: "1.2x", postDip: "-25%", status: "warning" },
  { promo: "Half Price Clearance", uplift: "380%", increment: "28%", roi: "0.9x", postDip: "-8%", status: "error" },
];

// Markdown Performance
const markdownData = [
  { sku: "ED-010", name: "Energy Lite 250ml", original: "£1.49", current: "£0.99", velocity: 3.2, margin: "8%", weeks: 3 },
  { sku: "SD-005", name: "Sport Berry 500ml", original: "£1.79", current: "£1.29", velocity: 2.8, margin: "12%", weeks: 2 },
  { sku: "FW-008", name: "Aqua Fresh 1L", original: "£1.19", current: "£0.89", velocity: 4.1, margin: "5%", weeks: 4 },
];

// Price Compliance
const priceCompliance = [
  { store: "Store 001", region: "London", issues: 3, impact: "£450", status: "urgent" },
  { store: "Store 015", region: "Manchester", issues: 2, impact: "£280", status: "warning" },
  { store: "Store 022", region: "Birmingham", issues: 1, impact: "£120", status: "minor" },
];

const Pricing = () => {
  const [simulationModal, setSimulationModal] = useState(false);
  const [simulationType, setSimulationType] = useState("");
  const [uploadModal, setUploadModal] = useState(false);

  const openSimulation = (type: string) => {
    setSimulationType(type);
    setSimulationModal(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Pricing & Promotions</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Optimize pricing, monitor promos, and manage markdowns
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setUploadModal(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Prices
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Pricing Scenario
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg. Price Index</p>
                  <p className="text-2xl font-bold">101.2</p>
                  <p className="text-xs text-success">vs Market</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Revenue Uplift</p>
                  <p className="text-2xl font-bold text-success">+£65K</p>
                  <p className="text-xs text-muted-foreground">Potential</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-info" />
                <div>
                  <p className="text-xs text-muted-foreground">Promo ROI</p>
                  <p className="text-2xl font-bold text-info">1.8x</p>
                  <p className="text-xs text-muted-foreground">Avg.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Percent className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Promo % Sales</p>
                  <p className="text-2xl font-bold">28.4%</p>
                  <p className="text-xs text-warning">+3.2pp vs LY</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <div>
                  <p className="text-xs text-muted-foreground">Price Gaps</p>
                  <p className="text-2xl font-bold text-destructive">12</p>
                  <p className="text-xs text-muted-foreground">vs Competitors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Tag className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Markdown Items</p>
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-xs text-muted-foreground">£42K recovery</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pricing" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pricing">Pricing Health</TabsTrigger>
            <TabsTrigger value="promotions">Promotion Effectiveness</TabsTrigger>
            <TabsTrigger value="markdown">Markdown Performance</TabsTrigger>
            <TabsTrigger value="compliance">Price Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="pricing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price Index vs Competitors */}
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Price Index vs Competitors</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => openSimulation("price-match")}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Simulate Price Match
                  </Button>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priceIndexData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" domain={[90, 110]} tick={{ fontSize: 12 }} />
                      <YAxis dataKey="competitor" type="category" tick={{ fontSize: 12 }} width={100} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="index"
                        fill="hsl(var(--primary))"
                        radius={[0, 4, 4, 0]}
                        label={{ position: "right", fontSize: 12 }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Elasticity Indicators */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Elasticity Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-center">Elasticity</TableHead>
                        <TableHead className="text-right">Current</TableHead>
                        <TableHead className="text-right">Optimal</TableHead>
                        <TableHead className="text-right">Opportunity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {elasticityData.map((item) => (
                        <TableRow key={item.sku}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className={cn(
                              Math.abs(item.elasticity) > 1.5 ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                            )}>
                              {item.elasticity}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{item.pricePoint}</TableCell>
                          <TableCell className="text-right font-medium">{item.optimal}</TableCell>
                          <TableCell className="text-right text-success font-medium">{item.opportunity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="promotions" className="space-y-6">
            {/* Promo Uplift Chart */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Promotional Performance (Last 6 Weeks)</CardTitle>
                <Button variant="outline" size="sm" onClick={() => openSimulation("promo-depth")}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Simulate Promo Depth Change
                </Button>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={promoPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="baseline" stackId="a" fill="hsl(var(--muted))" name="Baseline Sales" radius={[0, 0, 0, 0]} />
                    <Bar yAxisId="left" dataKey="uplift" stackId="a" fill="hsl(var(--success))" name="Promo Uplift" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="roi" stroke="hsl(var(--primary))" strokeWidth={2} name="ROI %" dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Promo Effectiveness Table */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Promotion Effectiveness Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Promotion</TableHead>
                      <TableHead className="text-center">Uplift</TableHead>
                      <TableHead className="text-center">Incrementality</TableHead>
                      <TableHead className="text-center">ROI</TableHead>
                      <TableHead className="text-center">Post-Promo Dip</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promoEffectiveness.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.promo}</TableCell>
                        <TableCell className="text-center">
                          <span className="text-success font-medium">{item.uplift}</span>
                        </TableCell>
                        <TableCell className="text-center">{item.increment}</TableCell>
                        <TableCell className="text-center font-medium">{item.roi}</TableCell>
                        <TableCell className="text-center">
                          <span className="text-destructive">{item.postDip}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={
                            item.status === "success" ? "default" :
                            item.status === "warning" ? "secondary" : "destructive"
                          }>
                            {item.status === "success" ? "Effective" :
                             item.status === "warning" ? "Review" : "Ineffective"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="markdown" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Markdown Performance</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Clearance velocity and margin recovery tracking</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => openSimulation("markdown-timing")}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Optimize Timing
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Original</TableHead>
                      <TableHead className="text-right">Current</TableHead>
                      <TableHead className="text-center">Velocity (x)</TableHead>
                      <TableHead className="text-center">Margin</TableHead>
                      <TableHead className="text-center">Weeks Active</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {markdownData.map((item) => (
                      <TableRow key={item.sku}>
                        <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right text-muted-foreground line-through">{item.original}</TableCell>
                        <TableCell className="text-right font-medium text-destructive">{item.current}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={cn(
                            item.velocity >= 3 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                          )}>
                            {item.velocity}x
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{item.margin}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            {item.weeks}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Adjust</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Aged Stock at Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-warning/10 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-warning">8</p>
                    <p className="text-sm text-muted-foreground">SKUs &gt;8 weeks cover</p>
                    <p className="text-xs text-warning mt-1">£28K at risk</p>
                  </div>
                  <div className="bg-destructive/10 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-destructive">3</p>
                    <p className="text-sm text-muted-foreground">SKUs &gt;12 weeks cover</p>
                    <p className="text-xs text-destructive mt-1">£15K at risk</p>
                  </div>
                  <div className="bg-success/10 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-success">£42K</p>
                    <p className="text-sm text-muted-foreground">Potential Recovery</p>
                    <p className="text-xs text-success mt-1">With optimized markdown</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Price Compliance Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead className="text-center">Issues</TableHead>
                      <TableHead className="text-right">Revenue Impact</TableHead>
                      <TableHead className="text-center">Priority</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {priceCompliance.map((item) => (
                      <TableRow key={item.store}>
                        <TableCell className="font-medium">{item.store}</TableCell>
                        <TableCell>{item.region}</TableCell>
                        <TableCell className="text-center font-medium">{item.issues}</TableCell>
                        <TableCell className="text-right text-destructive">{item.impact}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={
                            item.status === "urgent" ? "destructive" :
                            item.status === "warning" ? "secondary" : "outline"
                          }>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Resolve</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
              Pricing Simulation
            </DialogTitle>
            <DialogDescription>
              Running simulation: {simulationType}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Calculating impact...</span>
                <span className="text-muted-foreground">62%</span>
              </div>
              <Progress value={62} />
            </div>
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-sm">Preliminary Results:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Revenue Impact</p>
                  <p className="text-lg font-semibold text-success">+£38K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Margin Impact</p>
                  <p className="text-lg font-semibold text-success">+0.8pp</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Volume Change</p>
                  <p className="text-lg font-semibold">+2.4%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Competitive Position</p>
                  <p className="text-lg font-semibold text-success">Improved</p>
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
              Upload Pricing Data
            </DialogTitle>
            <DialogDescription>
              Upload competitor prices, promo calendars, or markdown schedules
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

export default Pricing;
