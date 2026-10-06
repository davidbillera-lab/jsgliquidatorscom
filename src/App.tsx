import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Auctions = lazy(() => import("./pages/Auctions"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const WhyWorkWithUs = lazy(() => import("./pages/WhyWorkWithUs"));
const Faq = lazy(() => import("./pages/Faq"));
const ServiceAreaPage = lazy(() => import("./pages/ServiceAreaPage"));
const ServiceLocationPage = lazy(() => import("./pages/ServiceLocationPage"));
const ServiceCategoryPage = lazy(() => import("./pages/ServiceCategoryPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Search = lazy(() => import("./pages/Search"));
const Pricing = lazy(() => import("./pages/Pricing"));


const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:categorySlug" element={<ServiceCategoryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blog-admin" element={<BlogAdmin />} />
            <Route path="/admin-auth" element={<AdminAuth />} />
            <Route path="/why-work-with-us" element={<WhyWorkWithUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/search" element={<Search />} />
            <Route path="/how-much-do-estate-sale-companies-charge" element={<Pricing />} />

            <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
            {/* Legacy URL redirects (one hop, no chains) */}
            <Route path="/why-us" element={<Navigate to="/why-work-with-us" replace />} />
            <Route path="/current-auctions.html" element={<Navigate to="/auctions" replace />} />
            <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
            <Route path="/areas/:slug" element={<ServiceAreaPage />} />
            <Route path="/areas/:slug/:serviceSlug" element={<ServiceLocationPage />} />
            <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
