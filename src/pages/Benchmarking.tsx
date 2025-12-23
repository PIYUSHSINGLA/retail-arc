import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Target } from "lucide-react";

const Benchmarking = () => (
  <MainLayout>
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Benchmarking</h1>
        <p className="text-sm text-muted-foreground mt-1">Compare performance vs internal and external benchmarks</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card className="shadow-card"><CardContent className="p-4 flex items-center gap-3"><BarChart3 className="w-8 h-8 text-primary" /><div><p className="text-xs text-muted-foreground">vs LY</p><p className="text-2xl font-bold text-success">+8.4%</p></div></CardContent></Card>
        <Card className="shadow-card"><CardContent className="p-4 flex items-center gap-3"><TrendingUp className="w-8 h-8 text-info" /><div><p className="text-xs text-muted-foreground">vs Market</p><p className="text-2xl font-bold text-success">+2.1pp</p></div></CardContent></Card>
        <Card className="shadow-card"><CardContent className="p-4 flex items-center gap-3"><Target className="w-8 h-8 text-warning" /><div><p className="text-xs text-muted-foreground">vs Target</p><p className="text-2xl font-bold">98%</p></div></CardContent></Card>
      </div>
      <Card className="shadow-card"><CardHeader><CardTitle className="text-base">Benchmark Comparison</CardTitle></CardHeader><CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">Benchmark analysis charts coming soon...</CardContent></Card>
    </div>
  </MainLayout>
);

export default Benchmarking;
