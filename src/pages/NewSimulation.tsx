import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  DollarSign,
  TrendingDown,
  ShoppingCart,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const objectives = [
  {
    id: "assortment",
    title: "Assortment Optimization",
    description: "Add, drop, or retain SKUs to maximize category performance",
    icon: Boxes,
  },
  {
    id: "pricing",
    title: "Pricing Optimization",
    description: "Optimize price points based on elasticity and competition",
    icon: DollarSign,
  },
  {
    id: "markdown",
    title: "Markdown Optimization",
    description: "Plan markdowns for clearance and margin recovery",
    icon: TrendingDown,
  },
  {
    id: "buying",
    title: "Buying & Quantity Optimization",
    description: "Optimize buy quantities and inventory levels",
    icon: ShoppingCart,
  },
];

const goals = [
  { id: "revenue", label: "Revenue-focused", icon: TrendingUp },
  { id: "margin", label: "Margin-focused", icon: Target },
  { id: "clearance", label: "Aggressive Clearance", icon: AlertTriangle },
  { id: "budget", label: "Budget-constrained", icon: DollarSign },
  { id: "inventory", label: "Inventory Health", icon: CheckCircle2 },
];

const NewSimulation = () => {
  const [step, setStep] = useState(1);
  const [selectedObjective, setSelectedObjective] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRunSimulation = () => {
    toast({
      title: "Simulation Started",
      description: "Your scenario is being processed. You'll be notified when results are ready.",
    });
    navigate("/simulations/SCN-2025-00123");
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <Link to="/simulations">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Create New Scenario</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Step {step} of 4 - {step === 1 ? "Objective & Goal" : step === 2 ? "Scope & Inputs" : step === 3 ? "Constraints" : "Review & Run"}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  s < step
                    ? "bg-primary text-primary-foreground"
                    : s === step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={cn(
                    "flex-1 h-1 rounded",
                    s < step ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Objective Selection */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Select Optimization Objective</CardTitle>
                <CardDescription>Choose the type of optimization you want to run</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {objectives.map((obj) => (
                    <div
                      key={obj.id}
                      onClick={() => setSelectedObjective(obj.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 cursor-pointer transition-all",
                        selectedObjective === obj.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            selectedObjective === obj.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          <obj.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{obj.title}</p>
                          <p className="text-sm text-muted-foreground">{obj.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Goal Selection */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Select Optimization Goal</CardTitle>
                <CardDescription>What should the optimization prioritize?</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedGoal} onValueChange={setSelectedGoal}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {goals.map((goal) => (
                      <div key={goal.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={goal.id} id={goal.id} />
                        <Label
                          htmlFor={goal.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <goal.icon className="w-4 h-4 text-muted-foreground" />
                          {goal.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Define Scope</CardTitle>
                <CardDescription>Select the categories, geography, and channels to include</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select defaultValue="beverages">
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beverages">Beverages</SelectItem>
                        <SelectItem value="snacks">Snacks</SelectItem>
                        <SelectItem value="dairy">Dairy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Subcategory</Label>
                    <Select defaultValue="energy">
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="energy">Energy Drinks</SelectItem>
                        <SelectItem value="sports">Sports Drinks</SelectItem>
                        <SelectItem value="water">Flavored Water</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Geography</Label>
                    <Select defaultValue="all-uk">
                      <SelectTrigger>
                        <SelectValue placeholder="Select geography" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-uk">All UK</SelectItem>
                        <SelectItem value="london">London</SelectItem>
                        <SelectItem value="north">North</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Channel</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Channels</SelectItem>
                        <SelectItem value="store">Store</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <Label>Data Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="promo-history" defaultChecked />
                      <Label htmlFor="promo-history" className="text-sm font-normal">
                        Include promotion history
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="competitor-pricing" />
                      <Label htmlFor="competitor-pricing" className="text-sm font-normal">
                        Include competitor pricing (if available)
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Set Constraints</CardTitle>
                <CardDescription>Define guardrails for the optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Budget Cap ($)</Label>
                    <Input type="number" placeholder="e.g., 500000" defaultValue="500000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Space Cap (Shelf Meters)</Label>
                    <Input type="number" placeholder="e.g., 150" />
                  </div>
                  <div className="space-y-2">
                    <Label>Price Floor (%)</Label>
                    <Input type="number" placeholder="e.g., -15" defaultValue="-15" />
                  </div>
                  <div className="space-y-2">
                    <Label>Price Ceiling (%)</Label>
                    <Input type="number" placeholder="e.g., 20" defaultValue="20" />
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Label>Must-Keep SKUs</Label>
                  <Textarea placeholder="Enter SKU IDs separated by commas (e.g., ED-030, ED-045)" />
                  <p className="text-xs text-muted-foreground">These SKUs will not be dropped by the optimization</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Review & Run</CardTitle>
                <CardDescription>Review your scenario configuration before running</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Objective</p>
                    <p className="font-medium">Assortment Optimization</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Goal</p>
                    <p className="font-medium">Revenue-focused</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-medium">Beverages → Energy Drinks</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Geography</p>
                    <p className="font-medium">All UK</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Budget Cap</p>
                    <p className="font-medium">$500,000</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Price Range</p>
                    <p className="font-medium">-15% to +20%</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Estimated Runtime</p>
                      <p className="text-sm text-muted-foreground">~2-3 minutes for this scope</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)} disabled={step === 1 && !selectedObjective}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleRunSimulation}>
              <PlayCircle className="w-4 h-4 mr-2" />
              Run Simulation
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default NewSimulation;
