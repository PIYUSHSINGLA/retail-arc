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
  ShoppingCart,
  Package,
  TrendingUp,
  AlertTriangle,
  Plus,
  Upload,
  Target,
  Clock,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Truck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  ComposedChart,
  Area,
} from "recharts";
import { cn } from "@/lib/utils";

// Forecast vs Actual Data
const forecastActualData = [
  { week: "W1", forecast: 12500, actual: 12200, variance: -2.4 },
  { week: "W2", forecast: 13200, actual: 13800, variance: 4.5 },
  { week: "W3", forecast: 11800, actual: 11500, variance: -2.5 },
  { week: "W4", forecast: 14500, actual: 14200, variance: -2.1 },
  { week: "W5", forecast: 13800, actual: 14500, variance: 5.1 },
  { week: "W6", forecast: 15200, actual: 15000, variance: -1.3 },
  { week: "W7", forecast: 14800, actual: null, variance: null },
  { week: "W8", forecast: 15500, actual: null, variance: null },
];

// Stock Health Data
const stockHealthData = [
  { category: "Energy Drinks", wos: 4.2, target: 4.0, status: "optimal" },
  { category: "Sports Drinks", wos: 6.8, target: 4.0, status: "overstock" },
  { category: "Flavored Water", wos: 2.1, target: 4.0, status: "understock" },
  { category: "Isotonic", wos: 3.8, target: 4.0, status: "optimal" },
];

// OOS & Lost Sales
const oosData = [
  { sku: "ED-001", name: "Red Bull 250ml", oosHours: 48, lostSales: "£8,500", rootCause: "Supplier delay", priority: "critical" },
  { sku: "FW-001", name: "Volvic Touch 500ml", oosHours: 24, lostSales: "£3,200", rootCause: "Demand spike", priority: "high" },
  { sku: "SD-002", name: "Lucozade Sport 500ml", oosHours: 12, lostSales: "£1,800", rootCause: "Forecast error", priority: "medium" },
];

// Supplier Fill Rate
const supplierFillRate = [
  { supplier: "Supplier A", fillRate: 98.2, trend: "up", onTime: 96, quality: 99 },
  { supplier: "Supplier B", fillRate: 94.5, trend: "down", onTime: 88, quality: 97 },
  { supplier: "Supplier C", fillRate: 97.8, trend: "stable", onTime: 95, quality: 98 },
  { supplier: "Supplier D", fillRate: 91.2, trend: "down", onTime: 82, quality: 95 },
];

// Open to Buy
const openToBuyData = [
  { category: "Energy Drinks", otb: "£125K", committed: "£98K", available: "£27K", utilization: 78 },
  { category: "Sports Drinks", otb: "£85K", committed: "£82K", available: "£3K", utilization: 96 },
  { category: "Flavored Water", otb: "£65K", committed: "£45K", available: "£20K", utilization: 69 },
];

// Aged Inventory
const agedInventory = [
  { sku: "ED-010", name: "Energy Lite 250ml", age: 12, value: "£15K", action: "Markdown" },
  { sku: "SD-005", name: "Sport Berry 500ml", age: 10, value: "£8K", action: "Markdown" },
  { sku: "FW-008", name: "Aqua Fresh 1L", age: 14, value: "£12K", action: "Donate/Dispose" },
];

const Buying = () => {
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
            <h1 className="text-2xl font-bold">Buying & Inventory</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Optimize buy quantities and manage inventory health
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setUploadModal(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Forecast
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Buy Plan
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Open Orders</p>
                  <p className="text-2xl font-bold">£1.2M</p>
                  <p className="text-xs text-muted-foreground">42 orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-info" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg. Cover</p>
                  <p className="text-2xl font-bold">4.8 wks</p>
                  <p className="text-xs text-success">Optimal</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Fill Rate</p>
                  <p className="text-2xl font-bold text-success">96.2%</p>
                  <p className="text-xs text-muted-foreground">+1.2pp vs LY</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-info" />
                <div>
                  <p className="text-xs text-muted-foreground">Forecast Accuracy</p>
                  <p className="text-2xl font-bold">92.4%</p>
                  <p className="text-xs text-muted-foreground">MAPE: 7.6%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <div>
                  <p className="text-xs text-muted-foreground">At-Risk SKUs</p>
                  <p className="text-2xl font-bold text-destructive">8</p>
                  <p className="text-xs text-destructive">£13.5K lost</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Aged Stock</p>
                  <p className="text-2xl font-bold text-warning">£35K</p>
                  <p className="text-xs text-muted-foreground">&gt;8 weeks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="forecast" className="space-y-4">
          <TabsList>
            <TabsTrigger value="forecast">Forecast vs Actual</TabsTrigger>
            <TabsTrigger value="stock">Stock Health</TabsTrigger>
            <TabsTrigger value="oos">OOS & Lost Sales</TabsTrigger>
            <TabsTrigger value="suppliers">Supplier Performance</TabsTrigger>
            <TabsTrigger value="otb">Open-to-Buy</TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Demand Forecast vs Actual</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openSimulation("recalculate-buy")}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Recalculate Buy Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastActualData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Forecast"
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="hsl(var(--success))"
                      strokeWidth={2}
                      name="Actual"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bias Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Forecast Bias</p>
                  <p className="text-2xl font-bold text-warning">-1.8%</p>
                  <p className="text-xs text-muted-foreground">Slightly under-forecasting</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">MAPE</p>
                  <p className="text-2xl font-bold">7.6%</p>
                  <p className="text-xs text-success">Within target (&lt;10%)</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Tracking Signal</p>
                  <p className="text-2xl font-bold text-success">0.82</p>
                  <p className="text-xs text-success">Stable</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stock" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Weeks of Supply by Category</CardTitle>
                <Button variant="outline" size="sm" onClick={() => openSimulation("rebalance-stock")}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Optimize Stock Levels
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {stockHealthData.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.category}</span>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-sm font-medium",
                            item.status === "optimal" && "text-success",
                            item.status === "overstock" && "text-warning",
                            item.status === "understock" && "text-destructive"
                          )}>
                            {item.wos} weeks
                          </span>
                          <Badge variant="outline" className={cn(
                            item.status === "optimal" && "bg-success/10 text-success",
                            item.status === "overstock" && "bg-warning/10 text-warning",
                            item.status === "understock" && "bg-destructive/10 text-destructive"
                          )}>
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            item.status === "optimal" && "bg-success",
                            item.status === "overstock" && "bg-warning",
                            item.status === "understock" && "bg-destructive"
                          )}
                          style={{ width: `${Math.min((item.wos / 8) * 100, 100)}%` }}
                        />
                        <div
                          className="absolute top-0 h-full w-0.5 bg-foreground"
                          style={{ left: `${(item.target / 8) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Target: {item.target} weeks</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Aged Inventory */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Aged Inventory (&gt;8 Weeks)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">Age (weeks)</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead>Recommended Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agedInventory.map((item) => (
                      <TableRow key={item.sku}>
                        <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="bg-warning/10 text-warning">
                            {item.age} wks
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">{item.value}</TableCell>
                        <TableCell>
                          <Badge variant={item.action === "Markdown" ? "secondary" : "destructive"}>
                            {item.action}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="oos" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Out-of-Stock & Lost Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">OOS Hours</TableHead>
                      <TableHead className="text-right">Lost Sales</TableHead>
                      <TableHead>Root Cause</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {oosData.map((item) => (
                      <TableRow key={item.sku}>
                        <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-center font-medium">{item.oosHours}h</TableCell>
                        <TableCell className="text-right text-destructive font-medium">{item.lostSales}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.rootCause}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            item.priority === "critical" ? "destructive" :
                            item.priority === "high" ? "secondary" : "outline"
                          }>
                            {item.priority}
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

            <div className="grid grid-cols-3 gap-4">
              <Card className="shadow-card bg-destructive/5">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Total Lost Sales (MTD)</p>
                  <p className="text-2xl font-bold text-destructive">£13.5K</p>
                  <p className="text-xs text-muted-foreground">8 incidents</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Avg OOS Duration</p>
                  <p className="text-2xl font-bold">28h</p>
                  <p className="text-xs text-warning">-4h vs LY</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Service Level</p>
                  <p className="text-2xl font-bold text-success">96.2%</p>
                  <p className="text-xs text-success">Target: 95%</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Supplier Performance Scorecard</CardTitle>
                <Button variant="outline" size="sm" onClick={() => openSimulation("supplier-delay")}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Simulate Supplier Delay
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-center">Fill Rate</TableHead>
                      <TableHead className="text-center">Trend</TableHead>
                      <TableHead className="text-center">On-Time %</TableHead>
                      <TableHead className="text-center">Quality %</TableHead>
                      <TableHead className="text-center">Overall</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplierFillRate.map((item) => (
                      <TableRow key={item.supplier}>
                        <TableCell className="font-medium">{item.supplier}</TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "font-medium",
                            item.fillRate >= 96 ? "text-success" :
                            item.fillRate >= 92 ? "text-warning" : "text-destructive"
                          )}>
                            {item.fillRate}%
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.trend === "up" && <ArrowUpRight className="w-4 h-4 text-success mx-auto" />}
                          {item.trend === "down" && <ArrowDownRight className="w-4 h-4 text-destructive mx-auto" />}
                          {item.trend === "stable" && <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell className="text-center">{item.onTime}%</TableCell>
                        <TableCell className="text-center">{item.quality}%</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={
                            item.fillRate >= 96 && item.onTime >= 90 ? "default" :
                            item.fillRate >= 92 ? "secondary" : "destructive"
                          }>
                            {item.fillRate >= 96 && item.onTime >= 90 ? "A" :
                             item.fillRate >= 92 ? "B" : "C"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="otb">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Open-to-Buy Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">OTB Budget</TableHead>
                      <TableHead className="text-right">Committed</TableHead>
                      <TableHead className="text-right">Available</TableHead>
                      <TableHead className="text-center">Utilization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {openToBuyData.map((item) => (
                      <TableRow key={item.category}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell className="text-right">{item.otb}</TableCell>
                        <TableCell className="text-right">{item.committed}</TableCell>
                        <TableCell className="text-right font-medium text-success">{item.available}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={item.utilization} className="flex-1" />
                            <span className={cn(
                              "text-xs font-medium w-10",
                              item.utilization > 90 ? "text-warning" : "text-muted-foreground"
                            )}>
                              {item.utilization}%
                            </span>
                          </div>
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
              Buying Simulation
            </DialogTitle>
            <DialogDescription>
              Running simulation: {simulationType}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Optimizing quantities...</span>
                <span className="text-muted-foreground">55%</span>
              </div>
              <Progress value={55} />
            </div>
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-sm">Preliminary Results:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Stock Reduction</p>
                  <p className="text-lg font-semibold text-success">-£45K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Service Level</p>
                  <p className="text-lg font-semibold">96.8%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">OOS Risk</p>
                  <p className="text-lg font-semibold text-success">-25%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cash Flow</p>
                  <p className="text-lg font-semibold text-success">+£120K</p>
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
              Upload Forecast Data
            </DialogTitle>
            <DialogDescription>
              Upload demand forecasts, buy plans, or supplier data
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex-col gap-2">
                <BarChart3 className="w-6 h-6" />
                <span>Demand Forecast</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <ShoppingCart className="w-6 h-6" />
                <span>Buy Plan</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Truck className="w-6 h-6" />
                <span>Supplier Data</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Package className="w-6 h-6" />
                <span>Stock Snapshot</span>
              </Button>
            </div>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Drop files here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Supports CSV, Excel, JSON</p>
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

export default Buying;
