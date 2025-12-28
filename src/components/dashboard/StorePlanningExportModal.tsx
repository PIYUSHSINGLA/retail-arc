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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  CheckCircle2,
  LayoutGrid,
  Download,
  Loader2,
  FileJson,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExportTool {
  id: string;
  name: string;
  format: string;
  description: string;
  icon: React.ReactNode;
}

const exportTools: ExportTool[] = [
  {
    id: "spaceman",
    name: "Nielsen Spaceman",
    format: "PSA",
    description: "Export planogram in Spaceman format",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    id: "apollo",
    name: "Blue Yonder Apollo",
    format: "APL",
    description: "Export for Apollo space planning",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    id: "smartdraw",
    name: "SmartDraw",
    format: "XML",
    description: "Universal XML planogram format",
    icon: <FileJson className="w-5 h-5" />,
  },
  {
    id: "excel",
    name: "Excel Template",
    format: "XLSX",
    description: "Planogram data in Excel format",
    icon: <FileSpreadsheet className="w-5 h-5" />,
  },
  {
    id: "pdf",
    name: "PDF Report",
    format: "PDF",
    description: "Visual planogram report with metrics",
    icon: <FileText className="w-5 h-5" />,
  },
];

interface StorePlanningExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planogramName?: string;
}

export const StorePlanningExportModal = ({
  open,
  onOpenChange,
  planogramName = "Planogram",
}: StorePlanningExportModalProps) => {
  const [selectedTool, setSelectedTool] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async () => {
    if (!selectedTool) {
      toast.error("Please select an export format");
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    for (let i = 0; i <= 100; i += 20) {
      await new Promise((r) => setTimeout(r, 400));
      setExportProgress(i);
    }

    setIsExporting(false);
    setExportComplete(true);
    const tool = exportTools.find((t) => t.id === selectedTool);
    toast.success(`Exported to ${tool?.name} format`);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSelectedTool("");
      setExportProgress(0);
      setExportComplete(false);
    }, 300);
  };

  const selectedToolData = exportTools.find((t) => t.id === selectedTool);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Export to Store Planning Tool
          </DialogTitle>
          <DialogDescription>
            Export "{planogramName}" to your preferred space planning system
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!exportComplete ? (
            <>
              <RadioGroup
                value={selectedTool}
                onValueChange={setSelectedTool}
                disabled={isExporting}
              >
                {exportTools.map((tool) => (
                  <div
                    key={tool.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer hover:bg-muted/50",
                      selectedTool === tool.id && "border-primary bg-primary/5"
                    )}
                    onClick={() => !isExporting && setSelectedTool(tool.id)}
                  >
                    <RadioGroupItem value={tool.id} id={tool.id} />
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor={tool.id}
                          className="font-medium cursor-pointer"
                        >
                          {tool.name}
                        </Label>
                        <Badge variant="outline" className="text-[10px]">
                          {tool.format}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>

              {isExporting && (
                <div className="space-y-2 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Exporting to {selectedToolData?.name}...
                    </span>
                    <span className="text-muted-foreground">
                      {exportProgress}%
                    </span>
                  </div>
                  <Progress value={exportProgress} />
                </div>
              )}

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleExport}
                  disabled={isExporting || !selectedTool}
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Export Complete!</h3>
              <p className="text-muted-foreground mb-4">
                Your planogram has been exported to {selectedToolData?.name}{" "}
                format.
              </p>
              <Badge variant="secondary" className="mb-6">
                {planogramName}.{selectedToolData?.format.toLowerCase()}
              </Badge>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={() => toast.info("Downloading file...")}>
                  <Download className="w-4 h-4 mr-2" />
                  Download File
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
