import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  FlaskConical,
  Boxes,
  DollarSign,
  TrendingDown,
  ShoppingCart,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "AI Insights", url: "/insights", icon: Sparkles },
  { title: "Simulations", url: "/simulations", icon: FlaskConical },
  { title: "Assortment", url: "/assortment", icon: Boxes },
  { title: "Pricing", url: "/pricing", icon: DollarSign },
  { title: "Markdown", url: "/markdown", icon: TrendingDown },
  { title: "Buying & Inventory", url: "/buying", icon: ShoppingCart },
  { title: "Benchmarking", url: "/benchmarking", icon: BarChart3 },
  { title: "Reports & Exports", url: "/reports", icon: FileText },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm">Category Manager</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.url;
            const linkContent = (
              <NavLink
                to={item.url}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            );

            if (collapsed) {
              return (
                <li key={item.title}>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </li>
              );
            }

            return <li key={item.title}>{linkContent}</li>;
          })}
        </ul>
      </nav>

      {/* Admin Link */}
      <div className="px-2 pb-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <NavLink
              to="/admin"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                location.pathname === "/admin"
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>Admin</span>}
            </NavLink>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right" className="font-medium">
              Admin
            </TooltipContent>
          )}
        </Tooltip>
      </div>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
