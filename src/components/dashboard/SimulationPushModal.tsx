import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  CheckCircle2,
  Cloud,
  Database,
  Server,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PushTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "available";
}

const pushTools: PushTool[] = [
  {
    id: "blueyonder",
    name: "Blue Yonder",
    description: "Push to JDA/Blue Yonder for demand planning",
    icon: <Cloud className="w-5 h-5" />,
    status: "connected",
  },
  {
    id: "oracle",
    name: "Oracle Retail",
    description: "Sync with Oracle Retail Merchandising",
    icon: <Database className="w-5 h-5" />,
    status: "connected",
  },
  {
    id: "sap",
    name: "SAP S/4HANA",
    description: "Export to SAP Retail for execution",
    icon: <Server className="w-5 h-5" />,
    status: "available",
  },
  {
    id: "relex",
    name: "RELEX Solutions",
    description: "Push to RELEX for supply chain optimization",
    icon: <Cloud className="w-5 h-5" />,
    status: "available",
  },
  {
    id: "symphony",
    name: "Symphony RetailAI",
    description: "Sync scenarios with Symphony EYC",
    icon: <Sparkles className="w-5 h-5" />,
    status: "connected",
  },
];

interface SimulationPushModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simulationName?: string;
  simulationType?: string;
}

export const SimulationPushModal = ({
  open,
  onOpenChange,
  simulationName = "Simulation Results",
  simulationType = "General",
}: SimulationPushModalProps) => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [isPushing, setIsPushing] = useState(false);
  const [pushProgress, setPushProgress] = useState(0);
  const [pushComplete, setPushComplete] = useState(false);

  const handleToolToggle = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handlePush = async () => {
    if (selectedTools.length === 0) {
      toast.error("Please select at least one tool to push to");
      return;
    }

    setIsPushing(true);
    setPushProgress(0);

    // Simulate push progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((r) => setTimeout(r, 500));
      setPushProgress(i);
    }

    setIsPushing(false);
    setPushComplete(true);
    toast.success(
      `Successfully pushed to ${selectedTools.length} system${selectedTools.length > 1 ? "s" : ""}`
    );
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after close animation
    setTimeout(() => {
      setSelectedTools([]);
      setPushProgress(0);
      setPushComplete(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary" />
            Push to External Systems
          </DialogTitle>
          <DialogDescription>
            Push "{simulationName}" ({simulationType}) to your connected retail
            systems for implementation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!pushComplete ? (
            <>
              <div className="space-y-3">
                {pushTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() =>
                      !isPushing &&
                      tool.status === "connected" &&
                      handleToolToggle(tool.id)
                    }
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border transition-all",
                      tool.status === "connected"
                        ? "cursor-pointer hover:bg-muted/50"
                        : "opacity-50 cursor-not-allowed",
                      selectedTools.includes(tool.id) &&
                        "border-primary bg-primary/5"
                    )}
                  >
                    <Checkbox
                      checked={selectedTools.includes(tool.id)}
                      disabled={isPushing || tool.status !== "connected"}
                      onCheckedChange={() =>
                        tool.status === "connected" && handleToolToggle(tool.id)
                      }
                    />
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        tool.status === "connected"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{tool.name}</span>
                        <Badge
                          variant={
                            tool.status === "connected" ? "default" : "outline"
                          }
                          className="text-[10px]"
                        >
                          {tool.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {isPushing && (
                <div className="space-y-2 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Pushing to {selectedTools.length} system
                      {selectedTools.length > 1 ? "s" : ""}...
                    </span>
                    <span className="text-muted-foreground">
                      {pushProgress}%
                    </span>
                  </div>
                  <Progress value={pushProgress} />
                </div>
              )}

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handlePush}
                  disabled={isPushing || selectedTools.length === 0}
                >
                  {isPushing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Pushing...
                    </>
                  ) : (
                    <>
                      Push to {selectedTools.length || ""} System
                      {selectedTools.length !== 1 ? "s" : ""}
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Push Complete!</h3>
              <p className="text-muted-foreground mb-6">
                Your simulation results have been successfully pushed to{" "}
                {selectedTools.length} system
                {selectedTools.length > 1 ? "s" : ""}.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {selectedTools.map((toolId) => {
                  const tool = pushTools.find((t) => t.id === toolId);
                  return (
                    <Badge key={toolId} variant="secondary">
                      {tool?.name}
                    </Badge>
                  );
                })}
              </div>
              <Button onClick={handleClose}>Done</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
