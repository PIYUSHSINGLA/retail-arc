import { MainLayout } from "@/components/layout/MainLayout";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  AlertTriangle,
  Target,
  Users,
  Clock,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const demandSurges = [
  {
    id: 1,
    category: "Energy Drinks",
    change: "+14%",
    location: "North London",
    timeframe: "WoW",
    confidence: "high",
  },
  {
    id: 2,
    category: "Flavored Water",
    change: "+8%",
    location: "Manchester",
    timeframe: "WoW",
    confidence: "medium",
  },
  {
    id: 3,
    category: "Sports Drinks",
    change: "+5%",
    location: "Birmingham",
    timeframe: "WoW",
    confidence: "high",
  },
];

const stockRisks = [
  {
    id: 1,
    sku: "ED-030",
    name: "Zero Sugar Boost",
    cover: "9.5 weeks",
    risk: "Overstock",
    action: "Markdown recommended",
  },
  {
    id: 2,
    sku: "SD-078",
    name: "Hydrate Plus Berry",
    cover: "11.2 weeks",
    risk: "Overstock",
    action: "Reduce buy quantity",
  },
  {
    id: 3,
    sku: "FW-015",
    name: "Spring Water 1L",
    cover: "1.2 weeks",
    risk: "Stockout",
    action: "Expedite order",
  },
];

const competitorAlerts = [
  {
    id: 1,
    competitor: "Competitor X",
    category: "Energy Drinks",
    change: "-5%",
    impact: "High elasticity sensitivity",
  },
  {
    id: 2,
    competitor: "Competitor Y",
    category: "Sports Drinks",
    change: "-8%",
    impact: "Medium elasticity sensitivity",
  },
];

const AIInsights = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Insights</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time AI-powered analysis and recommendations
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Last updated: 09:02 GMT
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demand">Demand Signals</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Risks</TabsTrigger>
            <TabsTrigger value="competitor">Competitor Intel</TabsTrigger>
            <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Demand Surges */}
                <Card className="shadow-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      Demand Surges Detected
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {demandSurges.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-success">{item.change}</span>
                            <div>
                              <p className="font-medium">{item.category}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.location} • {item.timeframe}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={item.confidence === "high" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {item.confidence}
                            </Badge>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Stock Risks */}
                <Card className="shadow-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      Stock Risk Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stockRisks.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                              <span className="text-xs font-mono text-muted-foreground">{item.sku}</span>
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Cover: {item.cover}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={item.risk === "Stockout" ? "destructive" : "outline"}
                              className="text-xs"
                            >
                              {item.risk}
                            </Badge>
                            <Button variant="ghost" size="sm" className="text-xs">
                              {item.action}
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Competitor Alerts */}
                <Card className="shadow-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Target className="w-4 h-4 text-info" />
                      Competitor Pricing Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {competitorAlerts.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-destructive">{item.change}</span>
                            <div>
                              <p className="font-medium">{item.competitor}</p>
                              <p className="text-sm text-muted-foreground">{item.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{item.impact}</span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Summary Panel */}
              <div className="lg:col-span-1">
                <AIInsightsPanel />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="demand">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Detailed demand signal analysis coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Inventory risk analysis coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="competitor">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Competitor intelligence coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="benchmarks">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Benchmark comparisons coming soon...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AIInsights;
