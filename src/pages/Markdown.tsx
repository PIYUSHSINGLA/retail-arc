import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingDown,
  Percent,
  Package,
  Calendar,
  Plus,
} from "lucide-react";

const Markdown = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Markdown Optimization</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Plan markdowns for clearance and margin recovery
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Markdown Plan
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Active Markdowns</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Percent className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg. Depth</p>
                  <p className="text-2xl font-bold">-18%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Units Cleared</p>
                  <p className="text-2xl font-bold text-success">4.2K</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-info" />
                <div>
                  <p className="text-xs text-muted-foreground">Margin Recovered</p>
                  <p className="text-2xl font-bold text-info">$45K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="forecast">Sell-Through Forecast</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Markdown Schedule</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                Gantt-style markdown schedule coming soon...
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Sell-through forecast coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Markdown performance analytics coming soon...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Markdown;
