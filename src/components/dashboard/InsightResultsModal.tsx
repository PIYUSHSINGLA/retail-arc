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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
  Loader2,
  BarChart3,
  Target,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

type InsightType = "promo-reduction" | "growth-drivers" | "range-expansion" | "general";

interface InsightResultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  insightType: InsightType;
  title: string;
}

const insightResults = {
  "promo-reduction": {
    summary: "Reducing promo intensity by 12% to match market average will improve margins while maintaining sales velocity.",
    metrics: [
      { label: "Margin Improvement", value: "+£18K", trend: "up" },
      { label: "Sales Impact", value: "-2.3%", trend: "down" },
      { label: "Net Benefit", value: "+£12K", trend: "up" },
      { label: "ROI Improvement", value: "+0.4x", trend: "up" },
    ],
    recommendations: [
      { action: "Reduce BOGOF frequency on Energy Drinks", impact: "+£8K", priority: "High" },
      { action: "Switch to 25% off vs 50% off on Sports Drinks", impact: "+£5K", priority: "High" },
      { action: "Limit multi-buy to top 20 SKUs only", impact: "+£3K", priority: "Medium" },
      { action: "Increase everyday low pricing on Flavored Water", impact: "+£2K", priority: "Low" },
    ],
  },
  "growth-drivers": {
    summary: "Key growth is driven by premium energy drinks and emerging brands. Focus investment in these areas for continued outperformance.",
    metrics: [
      { label: "Top Driver", value: "Premium Energy", trend: "up" },
      { label: "Growth Contribution", value: "45%", trend: "up" },
      { label: "Emerging Brands", value: "+32%", trend: "up" },
      { label: "Market Share Gain", value: "+2.1pp", trend: "up" },
    ],
    recommendations: [
      { action: "Increase space for Monster & Red Bull premium range", impact: "+£22K", priority: "High" },
      { action: "List 3 new Carabao SKUs", impact: "+£8K", priority: "High" },
      { action: "Expand Boost range to all stores", impact: "+£12K", priority: "Medium" },
      { action: "Add premium chiller positioning", impact: "+£5K", priority: "Medium" },
    ],
  },
  "range-expansion": {
    summary: "Range depth is 5% below market. Adding 8-10 SKUs in Sports Drinks will close the gap and capture incremental sales.",
    metrics: [
      { label: "Range Gap", value: "-5%", trend: "down" },
      { label: "SKUs to Add", value: "8-10", trend: "up" },
      { label: "Revenue Potential", value: "+£22K", trend: "up" },
      { label: "Space Required", value: "+4%", trend: "up" },
    ],
    recommendations: [
      { action: "Add Lucozade Sport Zero range (3 SKUs)", impact: "+£8K", priority: "High" },
      { action: "List Gatorade Fit (2 SKUs)", impact: "+£6K", priority: "High" },
      { action: "Add Wow Hydrate (2 SKUs)", impact: "+£5K", priority: "Medium" },
      { action: "Expand Powerade Zero range", impact: "+£3K", priority: "Low" },
    ],
  },
  general: {
    summary: "General analysis indicates opportunities for optimization across pricing, promotions, and assortment.",
    metrics: [
      { label: "Overall Score", value: "78/100", trend: "up" },
      { label: "Opportunity", value: "+£45K", trend: "up" },
      { label: "Risk Areas", value: "3", trend: "down" },
      { label: "Priority Actions", value: "8", trend: "up" },
    ],
    recommendations: [
      { action: "Review promotional strategy", impact: "+£18K", priority: "High" },
      { action: "Optimize range depth", impact: "+£15K", priority: "High" },
      { action: "Adjust pricing vs competitors", impact: "+£8K", priority: "Medium" },
      { action: "Improve supplier terms", impact: "+£4K", priority: "Low" },
    ],
  },
};

export const InsightResultsModal = ({
  open,
  onOpenChange,
  insightType,
  title,
}: InsightResultsModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPushModal, setShowPushModal] = useState(false);

  const results = insightResults[insightType] || insightResults.general;

  // Simulate loading
  useState(() => {
    if (open) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1500);
    }
  });

  const handleClose = () => {
    onOpenChange(false);
    setIsLoading(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {title} - Full Results
          </DialogTitle>
          <DialogDescription>
            AI-powered analysis with actionable recommendations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
              <p className="text-muted-foreground">Analyzing data...</p>
            </div>
          ) : (
            <>
              {/* Summary */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Analysis Summary</h4>
                      <p className="text-sm text-muted-foreground">
                        {results.summary}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Key Metrics
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  {results.metrics.map((metric, idx) => (
                    <Card key={idx} className="shadow-card">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">
                          {metric.label}
                        </p>
                        <p
                          className={cn(
                            "text-xl font-bold",
                            metric.trend === "up"
                              ? "text-success"
                              : metric.trend === "down"
                              ? "text-destructive"
                              : ""
                          )}
                        >
                          {metric.value}
                        </p>
                        {metric.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-success mx-auto mt-1" />
                        ) : metric.trend === "down" ? (
                          <TrendingDown className="w-4 h-4 text-destructive mx-auto mt-1" />
                        ) : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Recommended Actions
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead className="text-right">Impact</TableHead>
                      <TableHead className="text-center">Priority</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.recommendations.map((rec, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">
                          {rec.action}
                        </TableCell>
                        <TableCell className="text-right text-success font-medium">
                          {rec.impact}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={
                              rec.priority === "High"
                                ? "default"
                                : rec.priority === "Medium"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {rec.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              toast.info(`Creating simulation for: ${rec.action}`)
                            }
                          >
                            Simulate
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end border-t pt-4">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.success("Report exported to PDF")}
                >
                  Export Report
                </Button>
                <Button
                  onClick={() => toast.info("Creating simulation scenario...")}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Simulation
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
