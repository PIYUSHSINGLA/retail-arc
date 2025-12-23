import { Link, useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Plus,
  Share2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Info,
  ChevronRight,
} from "lucide-react";
import { WaterfallChart } from "@/components/dashboard/WaterfallChart";
import { cn } from "@/lib/utils";

const scenarioResult = {
  id: "SCN-2025-00123",
  title: "Energy Drinks Assortment Q1",
  objective: "Assortment",
  goal: "Revenue-focused",
  status: "Completed",
  summary: {
    additionalRevenue: 120000,
    lostRevenue: 62000,
    retainedTransfer: 42000,
    netChange: 100000,
    marginPct: 21.0,
    marginDelta: 1.2,
    wastageReduction: 2.1,
  },
  actions: {
    add: [
      { sku: "ED-101", name: "Energy Rush Original", revenueDelta: 65000, marginPct: 23.5, transferScore: 0.71 },
      { sku: "ED-109", name: "Tropical Blast 500ml", revenueDelta: 55000, marginPct: 20.8, transferScore: 0.68 },
    ],
    drop: [
      { sku: "ED-015", name: "Citrus Kick 250ml", revenueLost: 18000, transferRetained: 65, reason: "Low velocity, high substitution" },
      { sku: "ED-022", name: "Power Surge Classic", revenueLost: 15000, transferRetained: 72, reason: "Duplicate with ED-101" },
      { sku: "ED-043", name: "Midnight Boost", revenueLost: 12000, transferRetained: 58, reason: "Low margin, declining trend" },
      { sku: "ED-078", name: "Berry Blast Mini", revenueLost: 10000, transferRetained: 70, reason: "Size rationalization" },
      { sku: "ED-110", name: "Zero Carb Original", revenueLost: 7000, transferRetained: 68, reason: "Poor shelf velocity" },
    ],
    retain: [
      { sku: "ED-030", name: "Zero Sugar Boost", reason: "High wastage but <60% demand transfer. Strategic for revenue.", wastageFlag: true },
    ],
  },
  explainability: {
    drivers: ["Elasticity", "Substitution patterns", "Promo history"],
    confidence: "High",
    model: "v2.4",
  },
};

const SimulationDetail = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/simulations">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{scenarioResult.title}</h1>
                <Badge variant="default" className="text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {scenarioResult.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {scenarioResult.id} • {scenarioResult.objective} • {scenarioResult.goal}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </div>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card bg-success/5 border-success/20">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Additional Revenue</p>
              <p className="text-2xl font-bold text-success">+${(scenarioResult.summary.additionalRevenue / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>
          <Card className="shadow-card bg-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Lost Revenue</p>
              <p className="text-2xl font-bold text-destructive">-${(scenarioResult.summary.lostRevenue / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>
          <Card className="shadow-card bg-info/5 border-info/20">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Transfer Retained</p>
              <p className="text-2xl font-bold text-info">+${(scenarioResult.summary.retainedTransfer / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>
          <Card className="shadow-card bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Net Impact</p>
              <p className="text-2xl font-bold text-primary">+${(scenarioResult.summary.netChange / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>
        </div>

        {/* Scenario Note */}
        <Card className="shadow-card border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Scenario Summary</p>
                <p className="text-muted-foreground">
                  Revenue-focused assortment adds 2 Flavored Energy Drinks, drops 5 products. 
                  Transfer/retain 67% of dropped demand (=${(scenarioResult.summary.retainedTransfer / 1000).toFixed(0)}K of ${(scenarioResult.summary.lostRevenue / 1000).toFixed(0)}K). 
                  Optimization retains some high-wastage products with {"<"}60% demand transferability to maximize revenue.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Waterfall Chart */}
        <WaterfallChart />

        {/* Actions Tabs */}
        <Tabs defaultValue="add" className="space-y-4">
          <TabsList>
            <TabsTrigger value="add" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Added Products
              <Badge variant="secondary" className="ml-1 text-xs">{scenarioResult.actions.add.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="drop" className="gap-2">
              <TrendingDown className="w-4 h-4" />
              Dropped Products
              <Badge variant="secondary" className="ml-1 text-xs">{scenarioResult.actions.drop.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="retain" className="gap-2">
              Retained Products
              <Badge variant="secondary" className="ml-1 text-xs">{scenarioResult.actions.retain.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Products to Add</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scenarioResult.actions.add.map((product) => (
                    <div
                      key={product.sku}
                      className="flex items-center justify-between p-4 rounded-lg bg-success/5 border border-success/20 hover:bg-success/10 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center">
                          <span className="text-xs font-mono text-muted-foreground">{product.sku}</span>
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>Margin: {product.marginPct}%</span>
                            <span>Transfer Score: {(product.transferScore * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-success">+${(product.revenueDelta / 1000).toFixed(0)}K</p>
                          <p className="text-xs text-muted-foreground">Expected Revenue</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drop">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Products to Drop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scenarioResult.actions.drop.map((product) => (
                    <div
                      key={product.sku}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center">
                          <span className="text-xs font-mono text-muted-foreground">{product.sku}</span>
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{product.reason}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium text-destructive">-${(product.revenueLost / 1000).toFixed(0)}K</p>
                          <p className="text-xs text-muted-foreground">Lost</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-info">{product.transferRetained}%</p>
                          <p className="text-xs text-muted-foreground">Transferred</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="retain">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Products Retained</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scenarioResult.actions.retain.map((product) => (
                    <div
                      key={product.sku}
                      className="flex items-center justify-between p-4 rounded-lg bg-warning/5 border border-warning/20 hover:bg-warning/10 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center">
                          <span className="text-xs font-mono text-muted-foreground">{product.sku}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{product.name}</p>
                            {product.wastageFlag && (
                              <Badge variant="outline" className="text-xs text-warning border-warning">
                                High Wastage
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{product.reason}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Explainability */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Info className="w-4 h-4" />
              Explainability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Top Drivers</p>
                <div className="flex gap-2">
                  {scenarioResult.explainability.drivers.map((driver) => (
                    <Badge key={driver} variant="secondary">{driver}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Confidence</p>
                <Badge variant="default">{scenarioResult.explainability.confidence}</Badge>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Model Version</p>
                <span className="font-mono">{scenarioResult.explainability.model}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Create New Scenario
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Approve & Execute
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SimulationDetail;
