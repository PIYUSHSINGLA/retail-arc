import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  Target,
  AlertTriangle,
  Plus,
} from "lucide-react";

const Pricing = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Pricing Optimization</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Optimize price points based on elasticity and competition
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Pricing Scenario
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg. Price</p>
                  <p className="text-2xl font-bold">$2.47</p>
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
                  <p className="text-2xl font-bold text-success">+$65K</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-info" />
                <div>
                  <p className="text-xs text-muted-foreground">Margin Impact</p>
                  <p className="text-2xl font-bold text-info">+1.8pp</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Competitor Gaps</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="elasticity">Elasticity</TabsTrigger>
            <TabsTrigger value="competitor">Competitor</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Price Optimization Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                Price ladder and margin scatter analysis coming soon...
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="elasticity">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Elasticity curves by SKU coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="competitor">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Competitor price gaps coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="proposals">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Price change proposals coming soon...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Pricing;
