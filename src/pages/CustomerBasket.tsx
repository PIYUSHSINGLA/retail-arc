import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CustomerBasket = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Customer & Basket Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Customer behavior, basket composition, and loyalty trends
          </p>
        </div>

        <Tabs defaultValue="behavior" className="space-y-6">
          <TabsList>
            <TabsTrigger value="behavior">Customer Behavior</TabsTrigger>
            <TabsTrigger value="basket">Basket Analysis</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="behavior">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Customer behavior analysis coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="basket">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Basket composition insights coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty">
            <Card className="shadow-card p-6">
              <p className="text-muted-foreground">Loyalty trends analysis coming soon...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CustomerBasket;