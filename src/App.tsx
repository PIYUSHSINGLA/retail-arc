import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import AIInsights from "./pages/AIInsights";
import Simulations from "./pages/Simulations";
import NewSimulation from "./pages/NewSimulation";
import SimulationDetail from "./pages/SimulationDetail";
import Assortment from "./pages/Assortment";
import Pricing from "./pages/Pricing";
import Buying from "./pages/Buying";
import SupplierBrand from "./pages/SupplierBrand";
import CustomerBasket from "./pages/CustomerBasket";
import Benchmarking from "./pages/Benchmarking";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/insights" element={<AIInsights />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/simulations/new" element={<NewSimulation />} />
            <Route path="/simulations/:id" element={<SimulationDetail />} />
            <Route path="/assortment" element={<Assortment />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/buying" element={<Buying />} />
            <Route path="/supplier-brand" element={<SupplierBrand />} />
            <Route path="/customer-basket" element={<CustomerBasket />} />
            <Route path="/benchmarking" element={<Benchmarking />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
