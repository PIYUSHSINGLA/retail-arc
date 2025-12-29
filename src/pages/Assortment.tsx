import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Package,
  Upload,
  LayoutGrid,
  Target,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Grid3X3,
  Layers,
  ArrowUpRight,
  Download,
  Loader2,
} from "lucide-react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarChart,
  Bar,
  Legend,
  Treemap,
} from "recharts";
import { cn } from "@/lib/utils";
import { SimulationPushModal } from "@/components/dashboard/SimulationPushModal";
import { ScenarioModal } from "@/components/dashboard/ScenarioModal";
import { StorePlanningExportModal } from "@/components/dashboard/StorePlanningExportModal";
import { toast } from "sonner";

// SKU Productivity Data
const skuProductivityData = [
  { name: "ED-001", sales: 85000, margin: 28, space: 12, category: "hero" },
  { name: "ED-002", sales: 72000, margin: 25, space: 10, category: "hero" },
  { name: "ED-003", sales: 45000, margin: 22, space: 8, category: "standard" },
  { name: "ED-004", sales: 38000, margin: 18, space: 6, category: "standard" },
  { name: "SD-001", sales: 62000, margin: 24, space: 9, category: "hero" },
  { name: "SD-002", sales: 28000, margin: 15, space: 5, category: "passenger" },
  { name: "SD-003", sales: 15000, margin: 12, space: 4, category: "delist" },
  { name: "FW-001", sales: 52000, margin: 26, space: 8, category: "hero" },
  { name: "FW-002", sales: 18000, margin: 10, space: 6, category: "delist" },
  { name: "FW-003", sales: 8000, margin: 8, space: 5, category: "delist" },
];

// Pareto Data (80/20)
const paretoData = [
  { name: "Top 20%", sales: 82, cumulative: 82 },
  { name: "Next 30%", sales: 12, cumulative: 94 },
  { name: "Bottom 50%", sales: 6, cumulative: 100 },
];

// Space vs Contribution
const spaceContributionData = [
  { name: "Energy Drinks", space: 35, contribution: 42, gap: 7 },
  { name: "Sports Drinks", space: 28, contribution: 24, gap: -4 },
  { name: "Flavored Water", space: 22, contribution: 20, gap: -2 },
  { name: "Isotonic", space: 15, contribution: 14, gap: -1 },
];

// Rationalisation Candidates
const rationalisationCandidates = [
  { sku: "SD-003", name: "Sport Lite 330ml", sales: "£15K", margin: "12%", weeks: 12, flag: "Low velocity", action: "Delist" },
  { sku: "FW-002", name: "Aqua Plus 500ml", sales: "£18K", margin: "10%", weeks: 9, flag: "Margin erosion", action: "Review" },
  { sku: "FW-003", name: "Crystal Water 1L", sales: "£8K", margin: "8%", weeks: 14, flag: "Overstock", action: "Delist" },
  { sku: "ED-010", name: "Boost Lite 250ml", sales: "£12K", margin: "11%", weeks: 11, flag: "Cannibalisation", action: "Delist" },
  { sku: "SD-008", name: "Hydra Sport 750ml", sales: "£22K", margin: "14%", weeks: 8, flag: "Space inefficient", action: "Review" },
];

// New SKU Trials
const newSkuTrials = [
  { sku: "ED-NEW-01", name: "Tropical Blast 330ml", trial: 4, performance: 125, cannibal: "Low", status: "Keep" },
  { sku: "SD-NEW-02", name: "Berry Burst Sport", trial: 3, performance: 92, cannibal: "Medium", status: "Monitor" },
  { sku: "FW-NEW-01", name: "Citrus Splash 500ml", trial: 6, performance: 78, cannibal: "High", status: "Review" },
];

// Range Health Treemap
const rangeHealthData = [
  { name: "Heroes (20%)", size: 4200, fill: "hsl(var(--success))" },
  { name: "Standard (40%)", size: 3800, fill: "hsl(var(--primary))" },
  { name: "Passengers (25%)", size: 2200, fill: "hsl(var(--warning))" },
  { name: "Delist Candidates (15%)", size: 1400, fill: "hsl(var(--destructive))" },
];

// Planogram Templates
const planogramTemplates = [
  { id: 1, name: "Standard Gondola", bays: 4, shelves: 6, skus: 48 },
  { id: 2, name: "End Cap Display", bays: 2, shelves: 4, skus: 16 },
  { id: 3, name: "Chiller Unit", bays: 3, shelves: 5, skus: 30 },
];

const Assortment = () => {
  const [simulationModal, setSimulationModal] = useState(false);
  const [simulationType, setSimulationType] = useState("");
  const [planogramModal, setPlanogramModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [scenarioModal, setScenarioModal] = useState(false);
  const [pushModal, setPushModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [isCreatingPlanogram, setIsCreatingPlanogram] = useState(false);
  const [planogramProgress, setPlanogramProgress] = useState(0);
  const [planogramComplete, setPlanogramComplete] = useState(false);
  const [planogramForm, setPlanogramForm] = useState({
    name: "",
    template: "Standard Gondola (4 bays)",
    cluster: "All Stores",
  });

  const openSimulation = (type: string) => {
    setSimulationType(type);
    setSimulationModal(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hero": return "hsl(var(--success))";
      case "standard": return "hsl(var(--primary))";
      case "passenger": return "hsl(var(--warning))";
      case "delist": return "hsl(var(--destructive))";
      default: return "hsl(var(--muted))";
    }
  };

  const handleCreatePlanogram = async () => {
    if (!planogramForm.name) {
      toast.error("Please enter a planogram name");
      return;
    }
    setIsCreatingPlanogram(true);
    setPlanogramProgress(0);
    for (let i = 0; i <= 100; i += 25) {
      await new Promise((r) => setTimeout(r, 400));
      setPlanogramProgress(i);
    }
    setIsCreatingPlanogram(false);
    setPlanogramComplete(true);
    toast.success("Planogram created successfully");
  };

  const resetPlanogramModal = () => {
    setPlanogramModal(false);
    setTimeout(() => {
      setPlanogramForm({ name: "", template: "Standard Gondola (4 bays)", cluster: "All Stores" });
      setPlanogramProgress(0);
      setPlanogramComplete(false);
    }, 300);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Assortment Optimization</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage SKU width, depth, category coverage & space planning
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setUploadModal(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Data
            </Button>
            <Button variant="outline" onClick={() => setPlanogramModal(true)}>
              <LayoutGrid className="w-4 h-4 mr-2" />
              Create Planogram
            </Button>
            <Button onClick={() => setScenarioModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Assortment Scenario
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Total SKUs</p>
                  <p className="text-2xl font-bold">247</p>
                  <p className="text-xs text-muted-foreground">Target: 240</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-info" />
                <div>
                  <p className="text-xs text-muted-foreground">Category Width</p>
                  <p className="text-2xl font-bold">18</p>
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
                  <p className="text-xs text-muted-foreground">Revenue Impact</p>
                  <p className="text-2xl font-bold text-success">+£180K</p>
                  <p className="text-xs text-muted-foreground">Potential</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Duplication</p>
                  <p className="text-2xl font-bold">12%</p>
                  <p className="text-xs text-warning">High</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Grid3X3 className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Space Efficiency</p>
                  <p className="text-2xl font-bold">86%</p>
                  <p className="text-xs text-muted-foreground">+2pp vs LY</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Layers className="w-8 h-8 text-info" />
                <div>
                  <p className="text-xs text-muted-foreground">Active Planograms</p>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-xs text-muted-foreground">3 pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Range Health</TabsTrigger>
            <TabsTrigger value="productivity">SKU Productivity</TabsTrigger>
            <TabsTrigger value="rationalization">Rationalisation</TabsTrigger>
            <TabsTrigger value="newsku">New SKU Trials</TabsTrigger>
            <TabsTrigger value="space">Space Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Range Health Treemap */}
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Range Health Overview</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-success/10 text-success">Heroes</Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary">Standard</Badge>
                    <Badge variant="outline" className="bg-warning/10 text-warning">Passengers</Badge>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive">Delist</Badge>
                  </div>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={rangeHealthData}
                      dataKey="size"
                      aspectRatio={4/3}
                      stroke="hsl(var(--background))"
                    >
                    </Treemap>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* 80/20 Pareto */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">80/20 Pareto Analysis</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={paretoData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="sales" fill="hsl(var(--primary))" name="% of Sales" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Space vs Contribution */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Space vs Contribution Gap</CardTitle>
                <Button variant="outline" size="sm" onClick={() => openSimulation("space-reallocation")}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Simulate Reallocation
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spaceContributionData.map((item) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className={cn(
                          "text-sm font-medium",
                          item.gap > 0 ? "text-success" : item.gap < -2 ? "text-destructive" : "text-muted-foreground"
                        )}>
                          {item.gap > 0 ? "+" : ""}{item.gap}pp gap
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Space: {item.space}%</span>
                            <span>Contribution: {item.contribution}%</span>
                          </div>
                          <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                            <div
                              className="absolute left-0 top-0 h-full bg-primary/30"
                              style={{ width: `${item.space}%` }}
                            />
                            <div
                              className="absolute left-0 top-0 h-full bg-success"
                              style={{ width: `${item.contribution}%`, opacity: 0.7 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="productivity">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">SKU Productivity Matrix (Sales vs Margin)</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openSimulation("delist-bottom")}>
                    Simulate Delist Bottom 10%
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openSimulation("add-private-label")}>
                    Simulate Add Private Label
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      type="number"
                      dataKey="sales"
                      name="Sales"
                      tick={{ fontSize: 12 }}
                      label={{ value: "Sales (£)", position: "bottom", fontSize: 12 }}
                      tickFormatter={(v) => `£${(v/1000).toFixed(0)}K`}
                    />
                    <YAxis
                      type="number"
                      dataKey="margin"
                      name="Margin"
                      tick={{ fontSize: 12 }}
                      label={{ value: "Margin %", angle: -90, position: "left", fontSize: 12 }}
                    />
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                              <p className="font-semibold">{data.name}</p>
                              <p className="text-sm">Sales: £{(data.sales/1000).toFixed(1)}K</p>
                              <p className="text-sm">Margin: {data.margin}%</p>
                              <p className="text-sm">Space: {data.space} facings</p>
                              <Badge variant="outline" className="mt-1">{data.category}</Badge>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter data={skuProductivityData} shape="circle">
                      {skuProductivityData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getCategoryColor(entry.category)}
                          r={Math.sqrt(entry.space) * 4}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rationalization" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Rationalisation Candidates</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">AI-flagged SKUs for range review</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openSimulation("delist-candidates")}>
                    Simulate Delist All Flagged
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead className="text-right">Sales</TableHead>
                      <TableHead className="text-right">Margin</TableHead>
                      <TableHead className="text-right">Weeks Cover</TableHead>
                      <TableHead>Flag</TableHead>
                      <TableHead>Recommendation</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rationalisationCandidates.map((item) => (
                      <TableRow key={item.sku}>
                        <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">{item.sales}</TableCell>
                        <TableCell className="text-right">{item.margin}</TableCell>
                        <TableCell className="text-right">{item.weeks}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-warning/10 text-warning">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {item.flag}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.action === "Delist" ? "destructive" : "secondary"}>
                            {item.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => openSimulation(`delist-${item.sku}`)}>
                            Simulate
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="newsku">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">New SKU Trial Performance</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Track trial performance and cannibalisation risk</p>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Trial SKU
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead className="text-center">Trial Week</TableHead>
                      <TableHead className="text-right">Performance vs Target</TableHead>
                      <TableHead className="text-center">Cannibal Risk</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newSkuTrials.map((item) => (
                      <TableRow key={item.sku}>
                        <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-center">{item.trial}</TableCell>
                        <TableCell className="text-right">
                          <span className={cn(
                            "font-semibold",
                            item.performance >= 100 ? "text-success" : item.performance >= 80 ? "text-warning" : "text-destructive"
                          )}>
                            {item.performance}%
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={cn(
                            item.cannibal === "Low" && "bg-success/10 text-success",
                            item.cannibal === "Medium" && "bg-warning/10 text-warning",
                            item.cannibal === "High" && "bg-destructive/10 text-destructive"
                          )}>
                            {item.cannibal}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            item.status === "Keep" ? "default" :
                            item.status === "Monitor" ? "secondary" : "outline"
                          }>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="space" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {planogramTemplates.map((template) => (
                <Card key={template.id} className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer" onClick={() => setPlanogramModal(true)}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <LayoutGrid className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.bays} bays × {template.shelves} shelves</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{template.skus} SKU positions</span>
                      <Button variant="ghost" size="sm">
                        Create <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Active Planograms</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setPlanogramModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Planogram
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Planogram ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Store Cluster</TableHead>
                      <TableHead className="text-center">SKUs</TableHead>
                      <TableHead className="text-center">Efficiency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-xs">PLN-001</TableCell>
                      <TableCell>Energy Main Gondola</TableCell>
                      <TableCell>Urban Metro</TableCell>
                      <TableCell className="text-center">48</TableCell>
                      <TableCell className="text-center">
                        <span className="text-success font-medium">92%</span>
                      </TableCell>
                      <TableCell><Badge>Active</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs">PLN-002</TableCell>
                      <TableCell>Sports Drinks End Cap</TableCell>
                      <TableCell>Suburban</TableCell>
                      <TableCell className="text-center">16</TableCell>
                      <TableCell className="text-center">
                        <span className="text-warning font-medium">78%</span>
                      </TableCell>
                      <TableCell><Badge variant="secondary">Review</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs">PLN-003</TableCell>
                      <TableCell>Flavored Water Chiller</TableCell>
                      <TableCell>All Stores</TableCell>
                      <TableCell className="text-center">30</TableCell>
                      <TableCell className="text-center">
                        <span className="text-success font-medium">88%</span>
                      </TableCell>
                      <TableCell><Badge>Active</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
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
              Assortment Simulation
            </DialogTitle>
            <DialogDescription>
              Running simulation: {simulationType}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Analyzing impact...</span>
                <span className="text-muted-foreground">45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-sm">Preliminary Results:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Revenue Impact</p>
                  <p className="text-lg font-semibold text-success">+£42K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Margin Impact</p>
                  <p className="text-lg font-semibold text-success">+1.2pp</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Space Freed</p>
                  <p className="text-lg font-semibold">8 facings</p>
                </div>
                <div>
                  <p className="text-muted-foreground">SKUs Affected</p>
                  <p className="text-lg font-semibold">5</p>
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

      {/* Planogram Creation Modal */}
      <Dialog open={planogramModal} onOpenChange={setPlanogramModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-primary" />
              Create New Planogram
            </DialogTitle>
            <DialogDescription>
              Design a new planogram based on optimized assortment recommendations
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Planogram Name</label>
              <Input 
                placeholder="Enter planogram name" 
                value={planogramForm.name}
                onChange={(e) => setPlanogramForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Template</label>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option>Standard Gondola (4 bays)</option>
                  <option>End Cap Display</option>
                  <option>Chiller Unit</option>
                  <option>Custom</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Store Cluster</label>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option>All Stores</option>
                  <option>Urban Metro</option>
                  <option>Suburban</option>
                  <option>Rural</option>
                </select>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-6 min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <LayoutGrid className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Planogram builder preview will appear here</p>
                <p className="text-sm text-muted-foreground mt-1">Drag and drop SKUs to positions</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setPushModal(true)}>
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Push to Systems
                </Button>
                <Button variant="outline" onClick={() => setExportModal(true)}>
                  <Download className="w-4 h-4 mr-2" />
                  Export to Space Planning
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetPlanogramModal}>Cancel</Button>
                <Button onClick={handleCreatePlanogram} disabled={isCreatingPlanogram}>
                  {isCreatingPlanogram ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {planogramComplete ? "Done" : "Create Planogram"}
                </Button>
              </div>
            </div>
            {isCreatingPlanogram && (
              <div className="space-y-2">
                <Progress value={planogramProgress} />
                <p className="text-sm text-muted-foreground text-center">Creating planogram...</p>
              </div>
            )}
            {planogramComplete && (
              <div className="text-center py-4">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-2" />
                <p className="font-medium">Planogram Created!</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Modal */}
      <Dialog open={uploadModal} onOpenChange={setUploadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload Assortment Data
            </DialogTitle>
            <DialogDescription>
              Upload SKU lists, space data, or planogram templates
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

      {/* Scenario Modal */}
      <ScenarioModal
        open={scenarioModal}
        onOpenChange={setScenarioModal}
        type="assortment"
      />

      {/* Push Modal */}
      <SimulationPushModal
        open={pushModal}
        onOpenChange={setPushModal}
        simulationName="Assortment Scenario"
        simulationType="Assortment"
      />

      {/* Export Modal */}
      <StorePlanningExportModal
        open={exportModal}
        onOpenChange={setExportModal}
        planogramName={planogramForm.name || "New Planogram"}
      />
    </MainLayout>
  );
};

export default Assortment;
