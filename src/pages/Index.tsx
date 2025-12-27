import { useState } from "react";
import { DollarSign, Package, TrendingUp, Percent, CheckCircle, Tag } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { CategoryMixChart } from "@/components/dashboard/CategoryMixChart";
import { CategoryPerformanceSnapshot } from "@/components/dashboard/CategoryPerformanceSnapshot";
import { ExceptionAlertsPanel } from "@/components/dashboard/ExceptionAlertsPanel";
import { TopDriversPanel } from "@/components/dashboard/TopDriversPanel";
import { DataTable } from "@/components/dashboard/DataTable";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { DashboardFilters, FilterState } from "@/components/filters/DashboardFilters";


const getKpis = (filters: FilterState) => {
  // Simulate different values based on filters
  const multiplier = filters.category === "beverages" ? 1 : 0.85;
  const isEnergyDrinks = filters.subcategory === "energy-drinks";
  
  return [
    {
      title: "Sales (£)",
      value: `£${(1.28 * multiplier).toFixed(2)}M`,
      change: isEnergyDrinks ? 8.4 : 5.2,
      changeLabel: "vs LY",
      secondaryChange: 2.1,
      secondaryLabel: "vs Budget",
      icon: <DollarSign className="w-4 h-4 text-primary" />,
      tooltip: "Net Revenue = Units × Price (excluding returns)",
    },
    {
      title: "Units",
      value: `${(65.2 * multiplier).toFixed(1)}K`,
      change: isEnergyDrinks ? 5.2 : 3.8,
      changeLabel: "vs LY",
      icon: <Package className="w-4 h-4 text-primary" />,
      tooltip: "Total units sold in selected period",
    },
    {
      title: "Gross Margin %",
      value: `${(21.8 * (isEnergyDrinks ? 1 : 0.95)).toFixed(1)}%`,
      change: isEnergyDrinks ? 1.2 : 0.8,
      changeLabel: "vs LY",
      icon: <TrendingUp className="w-4 h-4 text-success" />,
      tooltip: "Gross Margin % = (Revenue - COGS) / Revenue",
    },
    {
      title: "Contribution (£)",
      value: `£${(284 * multiplier).toFixed(0)}K`,
      change: isEnergyDrinks ? 6.8 : 4.2,
      changeLabel: "vs LY",
      icon: <DollarSign className="w-4 h-4 text-info" />,
      tooltip: "Contribution = Revenue - Variable Costs",
    },
    {
      title: "Availability %",
      value: `${(96.2 * (isEnergyDrinks ? 1 : 0.98)).toFixed(1)}%`,
      change: isEnergyDrinks ? 0.8 : -0.3,
      changeLabel: "vs LY",
      icon: <CheckCircle className="w-4 h-4 text-success" />,
      tooltip: "% of SKUs in stock across stores",
    },
    {
      title: "Promo % of Sales",
      value: `${(28.4 * (isEnergyDrinks ? 1 : 1.1)).toFixed(1)}%`,
      change: isEnergyDrinks ? 3.2 : 5.1,
      changeLabel: "vs LY",
      icon: <Tag className="w-4 h-4 text-warning" />,
      tooltip: "% of sales from promotional activity",
      variant: "warning" as const,
    },
  ];
};

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: "beverages",
    subcategory: "energy-drinks",
    brand: "all",
    geography: "uk",
    region: "london",
    zone: "all",
    city: "all",
    inventoryState: "all",
    timeFrame: "mtd",
    dateRange: { from: undefined, to: undefined },
  });

  const kpis = getKpis(filters);

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

        {/* Filters - Right aligned above KPIs */}
        <DashboardFilters onFilterChange={setFilters} />

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
            {/* Revenue & Category Mix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart />
              <CategoryMixChart />
            </div>

            {/* Category Performance Snapshot */}
            <CategoryPerformanceSnapshot />

            {/* Exception & Alerts + Top Drivers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExceptionAlertsPanel />
              <TopDriversPanel />
            </div>

            {/* Forecast vs Actual Table */}
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