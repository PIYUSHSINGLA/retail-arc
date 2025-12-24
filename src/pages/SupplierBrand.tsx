import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, TrendingUp, Package, DollarSign } from "lucide-react";

const SupplierBrand = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Supplier & Brand Performance</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Supplier contribution, brand-level KPIs and performance analysis
          </p>
        </div>

        <Tabs defaultValue="suppliers" className="space-y-6">
          <TabsList>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
          </TabsList>

          <TabsContent value="suppliers">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Supplier performance dashboard coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="brands">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Brand performance analysis coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Contract management coming soon...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SupplierBrand;