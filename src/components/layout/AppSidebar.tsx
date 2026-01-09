import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  FlaskConical,
  Boxes,
  DollarSign,
  ShoppingCart,
  Building2,
  Users,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Tag,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "AI Insights", url: "/insights", icon: Sparkles },
    ],
  },
  {
    title: "Category Management",
    items: [
      { title: "Assortment", url: "/assortment", icon: Boxes },
      { title: "Buying & Inventory", url: "/buying", icon: ShoppingCart },
      { title: "Pricing & Promotions", url: "/pricing", icon: Tag },
      { title: "Supplier & Brand", url: "/supplier-brand", icon: Building2 },
      { title: "Customer & Basket", url: "/customer-basket", icon: Users },
    ],
  },
  {
    title: "Planning & Analysis",
    items: [
      { title: "Simulations", url: "/simulations", icon: FlaskConical },
      { title: "Benchmarking", url: "/benchmarking", icon: BarChart3 },
    ],
  },
  {
    title: "Reporting",
    items: [
      { title: "Reports & Exports", url: "/reports", icon: FileText },
    ],
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(["Category Management", "Planning & Analysis", "Reporting"]);
  const location = useLocation();

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) =>
      prev.includes(title) ? prev.filter((g) => g !== title) : [...prev, title]
    );
  };

  const renderNavItem = (item: NavItem) => {
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
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.title}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight">
                ai<span className="text-primary">.Retail</span>
              </span>
              <span className="text-[10px] text-sidebar-foreground/50 uppercase tracking-widest">
                Category Intelligence
              </span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto shadow-glow">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-4 px-2">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              {group.title && !collapsed ? (
                <Collapsible
                  open={openGroups.includes(group.title)}
                  onOpenChange={() => toggleGroup(group.title)}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider hover:text-sidebar-foreground/70">
                    {group.title}
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 transition-transform",
                        openGroups.includes(group.title) && "rotate-180"
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="space-y-1 mt-1">
                      {group.items.map((item) => (
                        <li key={item.title}>{renderNavItem(item)}</li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.title}>{renderNavItem(item)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Admin Link */}
      <div className="px-2 pb-2">
        <div className={cn(!collapsed && "border-t border-sidebar-border pt-2 mb-2")}>
          {!collapsed && (
            <p className="px-3 py-1.5 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
              Admin Center
            </p>
          )}
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