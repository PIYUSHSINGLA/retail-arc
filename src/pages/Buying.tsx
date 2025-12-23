import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Package,
  TrendingUp,
  AlertTriangle,
  Plus,
} from "lucide-react";

const Buying = () => {
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
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Buy Plan
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Open Orders</p>
                  <p className="text-2xl font-bold">$1.2M</p>
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
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Open Orders</TabsTrigger>
            <TabsTrigger value="forecast">Demand Forecast</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Inventory Health Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                Inventory health visualization coming soon...
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Open orders table coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="forecast">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Demand forecast vs buy plan coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Supplier performance coming soon...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Buying;
