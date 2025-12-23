import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Mail } from "lucide-react";

const reports = [
  { title: "Weekly Category Health", description: "Comprehensive weekly performance summary", lastRun: "Dec 22, 2025" },
  { title: "Monthly Assortment Review", description: "SKU performance and recommendations", lastRun: "Dec 1, 2025" },
  { title: "Price Change Outcomes", description: "Impact analysis of recent price changes", lastRun: "Dec 20, 2025" },
  { title: "Markdown Performance", description: "Clearance and margin recovery metrics", lastRun: "Dec 18, 2025" },
];

const Reports = () => (
  <MainLayout>
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Reports & Exports</h1><p className="text-sm text-muted-foreground mt-1">Generate and schedule reports</p></div>
        <Button><Calendar className="w-4 h-4 mr-2" />Schedule Report</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <Card key={report.title} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><FileText className="w-4 h-4 text-primary" />{report.title}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Last run: {report.lastRun}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Download className="w-3 h-3 mr-1" />Export</Button>
                  <Button variant="outline" size="sm"><Mail className="w-3 h-3 mr-1" />Send</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default Reports;
