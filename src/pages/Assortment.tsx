import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Package,
  Filter,
} from "lucide-react";

const Assortment = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Assortment Optimization</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage SKU width, depth, and category coverage
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Assortment Scenario
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Total SKUs</p>
                  <p className="text-2xl font-bold">247</p>
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
                  <p className="text-2xl font-bold text-success">+$180K</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Duplication Index</p>
                  <p className="text-2xl font-bold">12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="adds">Adds</TabsTrigger>
            <TabsTrigger value="drops">Drops</TabsTrigger>
            <TabsTrigger value="coverage">Coverage</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Assortment Health</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                Assortment treemap and overlap analysis coming soon...
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adds">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Add recommendations view coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="drops">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Drop recommendations view coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="coverage">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Store coverage analysis coming soon...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Assortment;
