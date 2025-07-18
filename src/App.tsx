
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import Analytics from "./pages/Analytics";
import Crops from "./pages/Crops";
import Sensors from "./pages/Sensors";
import Weather from "./pages/Weather";
import Irrigation from "./pages/Irrigation";
import Alerts from "./pages/Alerts";
import ItwinViewer from "./pages/ItwinViewer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<Map />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="/sensors" element={<Sensors />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/irrigation" element={<Irrigation />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/itwin-viewer" element={<ItwinViewer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
