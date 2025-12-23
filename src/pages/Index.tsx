import { DollarSign, Package, TrendingUp, Percent, ArrowUpDown, Archive } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { CategoryMixChart } from "@/components/dashboard/CategoryMixChart";
import { WaterfallChart } from "@/components/dashboard/WaterfallChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";

const kpis = [
  {
    title: "Revenue",
    value: "$1.28M",
    change: 8.4,
    changeLabel: "vs LY",
    icon: <DollarSign className="w-4 h-4 text-primary" />,
    tooltip: "Net Revenue = Units × Price (excluding returns)",
  },
  {
    title: "Units Sold",
    value: "65.2K",
    change: 5.2,
    changeLabel: "vs LY",
    icon: <Package className="w-4 h-4 text-primary" />,
    tooltip: "Total units sold in selected period",
  },
  {
    title: "Gross Margin",
    value: "21.8%",
    change: 1.2,
    changeLabel: "vs LY",
    icon: <TrendingUp className="w-4 h-4 text-success" />,
    tooltip: "Gross Margin % = (Revenue - COGS) / Revenue",
  },
  {
    title: "Sell-Through",
    value: "84.6%",
    change: -2.1,
    changeLabel: "vs LY",
    icon: <Percent className="w-4 h-4 text-info" />,
    tooltip: "Sell-Through % = Units Sold / (Beginning Stock + Receipts)",
  },
  {
    title: "Stock Cover",
    value: "4.8 wks",
    change: 0.5,
    changeLabel: "vs LY",
    icon: <Archive className="w-4 h-4 text-warning" />,
    tooltip: "Weeks of Cover = On-hand / Avg Weekly Demand",
    variant: "warning" as const,
  },
  {
    title: "Promo Uplift",
    value: "+12.4%",
    change: 3.2,
    changeLabel: "vs baseline",
    icon: <ArrowUpDown className="w-4 h-4 text-primary" />,
    tooltip: "Promo Uplift % = (Promo Units - Baseline Units) / Baseline Units",
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Category performance overview and key metrics
            </p>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Charts Section */}
          <div className="xl:col-span-3 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart />
              <CategoryMixChart />
            </div>
            <WaterfallChart />
            <DataTable />
          </div>

          {/* AI Insights Panel */}
          <div className="xl:col-span-1">
            <AIInsightsPanel />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
