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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Upload,
  FileText,
  CheckCircle2,
  Loader2,
  Calendar,
  DollarSign,
  Building2,
} from "lucide-react";

interface ContractUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContractUploadModal = ({
  open,
  onOpenChange,
}: ContractUploadModalProps) => {
  const [formData, setFormData] = useState({
    supplier: "",
    contractType: "",
    value: "",
    startDate: "",
    endDate: "",
    file: null as File | null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleUpload = async () => {
    if (!formData.supplier || !formData.contractType) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    setProgress(0);

    for (let i = 0; i <= 100; i += 25) {
      await new Promise((r) => setTimeout(r, 400));
      setProgress(i);
    }

    setIsUploading(false);
    setIsComplete(true);
    toast.success("Contract uploaded successfully");
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setFormData({
        supplier: "",
        contractType: "",
        value: "",
        startDate: "",
        endDate: "",
        file: null,
      });
      setProgress(0);
      setIsComplete(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Upload New Contract
          </DialogTitle>
          <DialogDescription>
            Add a new supplier contract to the system
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!isComplete ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Supplier *
                  </Label>
                  <select
                    id="supplier"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={formData.supplier}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        supplier: e.target.value,
                      }))
                    }
                    disabled={isUploading}
                  >
                    <option value="">Select supplier...</option>
                    <option value="Red Bull GmbH">Red Bull GmbH</option>
                    <option value="Monster Beverage">Monster Beverage</option>
                    <option value="Coca-Cola">Coca-Cola</option>
                    <option value="Lucozade Ribena">Lucozade Ribena</option>
                    <option value="PepsiCo">PepsiCo</option>
                    <option value="Boost Drinks">Boost Drinks</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Contract Type *</Label>
                  <select
                    id="type"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={formData.contractType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        contractType: e.target.value,
                      }))
                    }
                    disabled={isUploading}
                  >
                    <option value="">Select type...</option>
                    <option value="Annual Trading Agreement">
                      Annual Trading Agreement
                    </option>
                    <option value="Promotional Agreement">
                      Promotional Agreement
                    </option>
                    <option value="Joint Business Plan">
                      Joint Business Plan
                    </option>
                    <option value="Listing Agreement">Listing Agreement</option>
                    <option value="Supply Agreement">Supply Agreement</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Value
                  </Label>
                  <Input
                    id="value"
                    placeholder="e.g., £125K"
                    value={formData.value}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, value: e.target.value }))
                    }
                    disabled={isUploading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Start Date
                  </Label>
                  <Input
                    id="start"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    disabled={isUploading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    End Date
                  </Label>
                  <Input
                    id="end"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    disabled={isUploading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Contract Document</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="contract-file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="contract-file"
                    className="cursor-pointer block"
                  >
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    {formData.file ? (
                      <p className="font-medium text-primary">
                        {formData.file.name}
                      </p>
                    ) : (
                      <>
                        <p className="font-medium">
                          Drop contract file or click to browse
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Supports PDF, DOC, DOCX
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading contract...
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
                <Button onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Contract
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Contract Uploaded Successfully!
              </h3>
              <p className="text-muted-foreground mb-6">
                The contract for {formData.supplier} has been added to the
                system.
              </p>
              <Button onClick={handleClose}>Done</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
