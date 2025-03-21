
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import BlogPage from "./pages/Blog";
import AboutPage from "./pages/About";
import AdminPage from "./pages/Admin";
import { PolicyType } from "./components/policy/PolicyManager";

const queryClient = new QueryClient();

const App = () => {
  const [policyToShow, setPolicyToShow] = useState<PolicyType | null>(null);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index initialPolicy={policyToShow} onPolicyClose={() => setPolicyToShow(null)} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin" element={<AdminPage />} />
            
            {/* Policy redirects */}
            <Route path="/privacy" element={<Navigate to="/" replace state={{ openPolicy: 'privacy' }} />} />
            <Route path="/terms" element={<Navigate to="/" replace state={{ openPolicy: 'terms' }} />} />
            <Route path="/cookies" element={<Navigate to="/" replace state={{ openPolicy: 'cookies' }} />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
