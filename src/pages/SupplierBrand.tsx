import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2,
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  Target,
  Star,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  FileText,
  BarChart3,
  Upload,
  Plus,
} from "lucide-react";
import {
  ResponsiveContainer,
  Treemap,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  ComposedChart,
  Line,
  ReferenceLine,
} from "recharts";
import { ContractUploadModal } from "@/components/dashboard/ContractUploadModal";
import { toast } from "sonner";

// Mock data
const supplierData = [
  { id: 1, name: "Red Bull GmbH", sales: 1250000, margin: 23.5, growth: 8.2, fillRate: 98.2, promoROI: 2.4, contracts: 3, status: "strategic" },
  { id: 2, name: "Monster Beverage", sales: 980000, margin: 21.2, growth: 12.5, fillRate: 96.8, promoROI: 2.1, contracts: 2, status: "strategic" },
  { id: 3, name: "Coca-Cola", sales: 850000, margin: 19.8, growth: -2.1, fillRate: 99.1, promoROI: 1.8, contracts: 5, status: "core" },
  { id: 4, name: "Lucozade Ribena", sales: 720000, margin: 22.1, growth: 5.3, fillRate: 94.5, promoROI: 2.2, contracts: 2, status: "core" },
  { id: 5, name: "PepsiCo", sales: 680000, margin: 18.5, growth: 1.2, fillRate: 97.3, promoROI: 1.6, contracts: 4, status: "core" },
  { id: 6, name: "Boost Drinks", sales: 320000, margin: 25.2, growth: 18.5, fillRate: 92.1, promoROI: 2.8, contracts: 1, status: "emerging" },
  { id: 7, name: "Carabao UK", sales: 180000, margin: 24.8, growth: 32.1, fillRate: 88.5, promoROI: 1.9, contracts: 1, status: "emerging" },
];

const brandData = [
  { name: "Red Bull", sales: 1250000, margin: 23.5, share: 28.2, growth: 8.2 },
  { name: "Monster", sales: 980000, margin: 21.2, share: 22.1, growth: 12.5 },
  { name: "Lucozade Energy", sales: 520000, margin: 22.1, share: 11.7, growth: 3.2 },
  { name: "Boost", sales: 320000, margin: 25.2, share: 7.2, growth: 18.5 },
  { name: "Relentless", sales: 280000, margin: 19.8, share: 6.3, growth: -5.2 },
  { name: "Rockstar", sales: 240000, margin: 20.5, share: 5.4, growth: -8.1 },
  { name: "Emerge", sales: 180000, margin: 18.2, share: 4.1, growth: 2.1 },
  { name: "Carabao", sales: 180000, margin: 24.8, share: 4.1, growth: 32.1 },
];

const treemapData = brandData.map((b, i) => ({
  name: b.name,
  size: b.sales,
  fill: ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--info))", "hsl(var(--success))", "hsl(var(--warning))", "hsl(var(--accent))"][i % 6],
}));

const quadrantData = brandData.map((b) => ({
  name: b.name,
  x: b.growth,
  y: b.margin,
  z: b.sales,
}));

const negotiationData = [
  { supplier: "Red Bull GmbH", space: 18, contribution: 28.2, terms: "12% rebate", margin: 23.5, priority: "maintain" },
  { supplier: "Monster Beverage", space: 15, contribution: 22.1, terms: "10% rebate", margin: 21.2, priority: "grow" },
  { supplier: "Coca-Cola", space: 12, contribution: 19.2, terms: "8% rebate", margin: 19.8, priority: "optimize" },
  { supplier: "Lucozade Ribena", space: 10, contribution: 11.7, terms: "9% rebate", margin: 22.1, priority: "maintain" },
  { supplier: "PepsiCo", space: 8, contribution: 15.3, terms: "7% rebate", margin: 18.5, priority: "review" },
];

const contractData = [
  { id: 1, supplier: "Red Bull GmbH", type: "Annual Trading Agreement", value: "£125K", start: "Jan 2025", end: "Dec 2025", status: "active", renewal: "45 days" },
  { id: 2, supplier: "Monster Beverage", type: "Promotional Agreement", value: "£85K", start: "Mar 2025", end: "Aug 2025", status: "active", renewal: "120 days" },
  { id: 3, supplier: "Coca-Cola", type: "Annual Trading Agreement", value: "£95K", start: "Apr 2025", end: "Mar 2026", status: "active", renewal: "180 days" },
  { id: 4, supplier: "Lucozade Ribena", type: "Joint Business Plan", value: "£72K", start: "Jan 2025", end: "Dec 2025", status: "active", renewal: "45 days" },
  { id: 5, supplier: "Boost Drinks", type: "Listing Agreement", value: "£32K", start: "Jun 2025", end: "May 2026", status: "pending", renewal: "N/A" },
];

const indexData = [
  { metric: "Price Index vs Market", value: 102.3, target: 100, status: "above" },
  { metric: "Fill Rate Index", value: 96.5, target: 98, status: "below" },
  { metric: "Promo ROI Index", value: 108.2, target: 100, status: "above" },
  { metric: "Growth Index vs Category", value: 112.5, target: 100, status: "above" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-sm">{payload[0].payload.name}</p>
        <p className="text-xs text-muted-foreground">Growth: {payload[0].payload.x.toFixed(1)}%</p>
        <p className="text-xs text-muted-foreground">Margin: {payload[0].payload.y.toFixed(1)}%</p>
        <p className="text-xs text-muted-foreground">Sales: £{(payload[0].payload.z / 1000).toFixed(0)}K</p>
      </div>
    );
  }
  return null;
};

const SupplierBrand = () => {
  const [selectedTab, setSelectedTab] = useState("suppliers");
  const [contractUploadModal, setContractUploadModal] = useState(false);

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Supplier & Brand Performance</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Supplier contribution, brand-level KPIs and performance analysis
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Active Suppliers</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-secondary" />
                <div>
                  <p className="text-xs text-muted-foreground">Active Brands</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Sales</p>
                  <p className="text-2xl font-bold">£4.4M</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Percent className="w-8 h-8 text-info" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg Margin</p>
                  <p className="text-2xl font-bold">21.8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Category Growth</p>
                  <p className="text-2xl font-bold text-success">+8.4%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Active Contracts</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
          </TabsList>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-6">
            {/* Index Benchmarks */}
            <div className="grid grid-cols-4 gap-4">
              {indexData.map((item) => (
                <Card key={item.metric} className="shadow-card">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{item.metric}</p>
                    <div className="flex items-center gap-2">
                      <p className={`text-2xl font-bold ${item.status === "above" ? "text-success" : "text-warning"}`}>
                        {item.value}
                      </p>
                      {item.status === "above" ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-warning" />
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">Target: {item.target}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Supplier Scorecard */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Supplier Scorecard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-right">Sales (£)</TableHead>
                      <TableHead className="text-right">Margin %</TableHead>
                      <TableHead className="text-right">Growth %</TableHead>
                      <TableHead className="text-right">Fill Rate %</TableHead>
                      <TableHead className="text-right">Promo ROI</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplierData.map((supplier) => (
                      <TableRow key={supplier.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell className="text-right">£{(supplier.sales / 1000).toFixed(0)}K</TableCell>
                        <TableCell className="text-right">{supplier.margin}%</TableCell>
                        <TableCell className="text-right">
                          <span className={supplier.growth >= 0 ? "text-success" : "text-destructive"}>
                            {supplier.growth >= 0 ? "+" : ""}{supplier.growth}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={supplier.fillRate >= 95 ? "text-success" : supplier.fillRate >= 90 ? "text-warning" : "text-destructive"}>
                            {supplier.fillRate}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{supplier.promoROI}x</TableCell>
                        <TableCell>
                          <Badge 
                            variant={supplier.status === "strategic" ? "default" : supplier.status === "core" ? "secondary" : "outline"}
                            className="text-[10px]"
                          >
                            {supplier.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Negotiation Readiness */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Negotiation Readiness - Space vs Contribution vs Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-right">Space %</TableHead>
                      <TableHead className="text-right">Contribution %</TableHead>
                      <TableHead className="text-right">Margin %</TableHead>
                      <TableHead>Current Terms</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {negotiationData.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.supplier}</TableCell>
                        <TableCell className="text-right">{item.space}%</TableCell>
                        <TableCell className="text-right">{item.contribution}%</TableCell>
                        <TableCell className="text-right">{item.margin}%</TableCell>
                        <TableCell>{item.terms}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.priority === "grow" ? "default" : item.priority === "maintain" ? "secondary" : "outline"}
                            className="text-[10px]"
                          >
                            {item.priority}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brands Tab */}
          <TabsContent value="brands" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Brand Share Treemap */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Brand Share of Category</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={treemapData}
                      dataKey="size"
                      aspectRatio={4 / 3}
                      stroke="hsl(var(--background))"
                    >
                      {treemapData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Treemap>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Growth vs Margin Quadrant */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Brand Growth vs Margin (Quadrant)</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" dataKey="x" name="Growth %" domain={[-15, 40]} tick={{ fontSize: 10 }} label={{ value: "Growth %", position: "bottom", fontSize: 11 }} />
                      <YAxis type="number" dataKey="y" name="Margin %" domain={[15, 30]} tick={{ fontSize: 10 }} label={{ value: "Margin %", angle: -90, position: "left", fontSize: 11 }} />
                      <ReferenceLine x={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                      <ReferenceLine y={20} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                      <Tooltip content={<CustomTooltip />} />
                      <Scatter name="Brands" data={quadrantData} fill="hsl(var(--primary))">
                        {quadrantData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.x > 0 && entry.y > 20 ? "hsl(var(--success))" : entry.x < 0 ? "hsl(var(--destructive))" : "hsl(var(--warning))"} 
                          />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-2 text-xs">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-success" /> Heroes</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-warning" /> Developing</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-destructive" /> Review</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Brand Performance Table */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Brand Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Brand</TableHead>
                      <TableHead className="text-right">Sales (£)</TableHead>
                      <TableHead className="text-right">Market Share</TableHead>
                      <TableHead className="text-right">Margin %</TableHead>
                      <TableHead className="text-right">Growth %</TableHead>
                      <TableHead>Classification</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brandData.map((brand, idx) => (
                      <TableRow key={idx} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{brand.name}</TableCell>
                        <TableCell className="text-right">£{(brand.sales / 1000).toFixed(0)}K</TableCell>
                        <TableCell className="text-right">{brand.share}%</TableCell>
                        <TableCell className="text-right">{brand.margin}%</TableCell>
                        <TableCell className="text-right">
                          <span className={brand.growth >= 0 ? "text-success" : "text-destructive"}>
                            {brand.growth >= 0 ? "+" : ""}{brand.growth}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={brand.growth > 10 && brand.margin > 20 ? "default" : brand.growth < 0 ? "destructive" : "secondary"}
                            className="text-[10px]"
                          >
                            {brand.growth > 10 && brand.margin > 20 ? "Hero" : brand.growth < 0 ? "Review" : "Core"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contracts Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-success" />
                    <div>
                      <p className="text-xs text-muted-foreground">Active Contracts</p>
                      <p className="text-2xl font-bold">4</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-warning" />
                    <div>
                      <p className="text-xs text-muted-foreground">Renewing Soon</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Total Value</p>
                      <p className="text-2xl font-bold">£409K</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Contract Management</CardTitle>
                <Button onClick={() => setContractUploadModal(true)}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Contract
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Contract Type</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead>Start</TableHead>
                      <TableHead>End</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Renewal In</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contractData.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.supplier}</TableCell>
                        <TableCell>{contract.type}</TableCell>
                        <TableCell className="text-right">{contract.value}</TableCell>
                        <TableCell>{contract.start}</TableCell>
                        <TableCell>{contract.end}</TableCell>
                        <TableCell>
                          <Badge variant={contract.status === "active" ? "default" : "secondary"} className="text-[10px]">
                            {contract.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={parseInt(contract.renewal) < 60 ? "text-warning font-medium" : ""}>
                            {contract.renewal}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
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

      <ContractUploadModal
        open={contractUploadModal}
        onOpenChange={setContractUploadModal}
      />
    </MainLayout>
  );
};

export default SupplierBrand;
