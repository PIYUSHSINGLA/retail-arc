import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => (
  <MainLayout>
    <div className="space-y-6 animate-fade-in">
      <div><h1 className="text-2xl font-bold">Admin Settings</h1><p className="text-sm text-muted-foreground mt-1">Manage users, roles, and system configuration</p></div>
      <Tabs defaultValue="users"><TabsList><TabsTrigger value="users">Users & Roles</TabsTrigger><TabsTrigger value="config">Configuration</TabsTrigger><TabsTrigger value="audit">Audit Log</TabsTrigger></TabsList>
        <TabsContent value="users"><Card className="shadow-card"><CardHeader><CardTitle className="text-base">User Management</CardTitle></CardHeader><CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">User management interface coming soon...</CardContent></Card></TabsContent>
        <TabsContent value="config"><Card className="shadow-card p-6"><p className="text-muted-foreground">System configuration coming soon...</p></Card></TabsContent>
        <TabsContent value="audit"><Card className="shadow-card p-6"><p className="text-muted-foreground">Audit log coming soon...</p></Card></TabsContent>
      </Tabs>
    </div>
  </MainLayout>
);

export default Admin;
