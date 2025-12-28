import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Package,
  DollarSign,
  ShoppingCart,
  Sparkles,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

type ScenarioType = "assortment" | "pricing" | "buying";

interface ScenarioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: ScenarioType;
  onComplete?: (scenarioId: string) => void;
}

const scenarioConfig = {
  assortment: {
    title: "New Assortment Scenario",
    description: "Create a new assortment optimization scenario",
    icon: Package,
    fields: [
      { id: "name", label: "Scenario Name", type: "text", placeholder: "e.g., Q1 Range Optimization" },
      { id: "category", label: "Category Focus", type: "select", options: ["Energy Drinks", "Sports Drinks", "Flavored Water", "All Categories"] },
      { id: "objective", label: "Primary Objective", type: "select", options: ["Maximize Revenue", "Maximize Margin", "Optimize Space", "Reduce SKU Count"] },
      { id: "constraints", label: "Constraints", type: "textarea", placeholder: "e.g., Maintain min 2 SKUs per brand, max 250 total SKUs" },
    ],
  },
  pricing: {
    title: "New Pricing Scenario",
    description: "Create a new pricing optimization scenario",
    icon: DollarSign,
    fields: [
      { id: "name", label: "Scenario Name", type: "text", placeholder: "e.g., Competitive Price Match" },
      { id: "scope", label: "Pricing Scope", type: "select", options: ["All SKUs", "Top 50 SKUs", "Loss Leaders Only", "Premium Range"] },
      { id: "strategy", label: "Strategy", type: "select", options: ["Price Match Competitors", "Premium Positioning", "Value Leadership", "Dynamic Pricing"] },
      { id: "rules", label: "Pricing Rules", type: "textarea", placeholder: "e.g., Max 5% deviation from RRP, maintain min margin of 15%" },
    ],
  },
  buying: {
    title: "New Buy Plan",
    description: "Create a new buying and inventory plan",
    icon: ShoppingCart,
    fields: [
      { id: "name", label: "Plan Name", type: "text", placeholder: "e.g., Q2 2025 Buy Plan" },
      { id: "period", label: "Planning Period", type: "select", options: ["4 Weeks", "8 Weeks", "12 Weeks", "Seasonal"] },
      { id: "focus", label: "Planning Focus", type: "select", options: ["Minimize OOS", "Optimize Working Capital", "Seasonal Build", "Promotion Support"] },
      { id: "parameters", label: "Parameters", type: "textarea", placeholder: "e.g., Target stock cover 4 weeks, max overstock 20%, safety stock 1 week" },
    ],
  },
};

export const ScenarioModal = ({
  open,
  onOpenChange,
  type,
  onComplete,
}: ScenarioModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [scenarioId, setScenarioId] = useState("");

  const config = scenarioConfig[type];
  const Icon = config.icon;

  const handleCreate = async () => {
    if (!formData.name) {
      toast.error("Please enter a scenario name");
      return;
    }

    setIsCreating(true);
    setProgress(0);

    // Simulate creation progress
    for (let i = 0; i <= 100; i += 25) {
      await new Promise((r) => setTimeout(r, 400));
      setProgress(i);
    }

    const newScenarioId = `SCN-${Date.now().toString(36).toUpperCase()}`;
    setScenarioId(newScenarioId);
    setIsCreating(false);
    setIsComplete(true);
    toast.success(`${config.title} created successfully`);
    onComplete?.(newScenarioId);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setFormData({});
      setProgress(0);
      setIsComplete(false);
      setScenarioId("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            {config.title}
          </DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!isComplete ? (
            <>
              {config.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  {field.type === "text" && (
                    <Input
                      id={field.id}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.id]: e.target.value,
                        }))
                      }
                      disabled={isCreating}
                    />
                  )}
                  {field.type === "select" && (
                    <select
                      id={field.id}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={formData[field.id] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.id]: e.target.value,
                        }))
                      }
                      disabled={isCreating}
                    >
                      <option value="">Select...</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                  {field.type === "textarea" && (
                    <Textarea
                      id={field.id}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.id]: e.target.value,
                        }))
                      }
                      disabled={isCreating}
                      rows={3}
                    />
                  )}
                </div>
              ))}

              {isCreating && (
                <div className="space-y-2 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating scenario...
                    </span>
                    <span className="text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create Scenario
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Scenario Created!</h3>
              <p className="text-muted-foreground mb-2">
                Your scenario has been created with ID:
              </p>
              <p className="font-mono text-lg font-bold text-primary mb-6">
                {scenarioId}
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={() => toast.info("Opening scenario...")}>
                  Open Scenario
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
