import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FlaskConical,
  Plus,
  Copy,
  GitCompare,
  Archive,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  BarChart3,
  Clock,
  CheckCircle2,
  PlayCircle,
  FileEdit,
} from "lucide-react";
import { cn } from "@/lib/utils";

const scenarios = [
  {
    id: "SCN-2025-00123",
    title: "Energy Drinks Assortment Q1",
    objective: "Assortment",
    goal: "Revenue-focused",
    status: "Completed",
    owner: "John Doe",
    created: "Dec 20, 2025",
    impact: {
      revenue: "+$100K",
      margin: "+1.2pp",
      type: "positive",
    },
  },
  {
    id: "SCN-2025-00122",
    title: "Sports Drinks Pricing Review",
    objective: "Pricing",
    goal: "Margin-focused",
    status: "Running",
    owner: "Jane Smith",
    created: "Dec 19, 2025",
    impact: {
      revenue: "Calculating...",
      margin: "~+2.0pp",
      type: "pending",
    },
  },
  {
    id: "SCN-2025-00121",
    title: "Flavored Water Markdown Plan",
    objective: "Markdown",
    goal: "Clearance",
    status: "Approved",
    owner: "John Doe",
    created: "Dec 18, 2025",
    impact: {
      revenue: "-$15K",
      margin: "+$45K recovery",
      type: "mixed",
    },
  },
  {
    id: "SCN-2025-00120",
    title: "Category-Wide Buying Plan",
    objective: "Buying",
    goal: "Inventory Health",
    status: "Draft",
    owner: "Mike Johnson",
    created: "Dec 17, 2025",
    impact: {
      revenue: "N/A",
      margin: "N/A",
      type: "draft",
    },
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle2 className="w-4 h-4 text-success" />;
    case "Running":
      return <PlayCircle className="w-4 h-4 text-primary animate-pulse" />;
    case "Approved":
      return <CheckCircle2 className="w-4 h-4 text-info" />;
    case "Draft":
      return <FileEdit className="w-4 h-4 text-muted-foreground" />;
    default:
      return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
};

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    Completed: "default",
    Running: "secondary",
    Approved: "outline",
    Draft: "outline",
  };
  return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
};

const getObjectiveIcon = (objective: string) => {
  switch (objective) {
    case "Assortment":
      return <BarChart3 className="w-4 h-4" />;
    case "Pricing":
      return <DollarSign className="w-4 h-4" />;
    case "Markdown":
      return <TrendingUp className="w-4 h-4" />;
    case "Buying":
      return <Archive className="w-4 h-4" />;
    default:
      return <FlaskConical className="w-4 h-4" />;
  }
};

const Simulations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedObjective, setSelectedObjective] = useState("all");

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Simulations</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage optimization scenarios
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <GitCompare className="w-4 h-4 mr-2" />
              Compare
            </Button>
            <Link to="/simulations/new">
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Scenario
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters Bar */}
        <Card className="shadow-card">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search scenarios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedObjective} onValueChange={setSelectedObjective}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Objective" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Objectives</SelectItem>
                  <SelectItem value="assortment">Assortment</SelectItem>
                  <SelectItem value="pricing">Pricing</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                  <SelectItem value="buying">Buying</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((scenario) => (
            <Link key={scenario.id} to={`/simulations/${scenario.id}`}>
              <Card className="shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer border-border/50 hover:border-primary/30">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {getObjectiveIcon(scenario.objective)}
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">{scenario.title}</CardTitle>
                        <p className="text-xs text-muted-foreground font-mono">{scenario.id}</p>
                      </div>
                    </div>
                    {getStatusBadge(scenario.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline" className="text-xs">
                        {scenario.objective}
                      </Badge>
                      <span className="text-muted-foreground">{scenario.goal}</span>
                    </div>

                    <div
                      className={cn(
                        "p-3 rounded-lg",
                        scenario.impact.type === "positive" && "bg-success/10",
                        scenario.impact.type === "pending" && "bg-primary/10",
                        scenario.impact.type === "mixed" && "bg-warning/10",
                        scenario.impact.type === "draft" && "bg-muted"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Revenue Impact</p>
                          <p className="font-semibold">{scenario.impact.revenue}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Margin Impact</p>
                          <p className="font-semibold">{scenario.impact.margin}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(scenario.status)}
                        <span>{scenario.owner}</span>
                      </div>
                      <span>{scenario.created}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Simulations;
