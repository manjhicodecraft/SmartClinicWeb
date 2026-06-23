import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Services } from "@/components/services";
import { Doctors } from "@/components/doctors";
import { Testimonials } from "@/components/testimonials";
import { VirtualTour } from "@/components/virtual-tour";
import { Gallery } from "@/components/gallery";
import { Contact } from "@/components/contact";
import { ChatWidget } from "@/components/chat-widget";
import { WhatsAppButton } from "@/components/whatsapp";
import { AppointmentModal } from "@/components/appointment-modal";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero onBookClick={() => setBookingOpen(true)} />
      <Stats />
      <Services />
      <Doctors onBookClick={() => setBookingOpen(true)} />
      <Testimonials />
      <VirtualTour />
      <Gallery />
      <Contact />

      {/* Floating Widgets */}
      <WhatsAppButton />
      <ChatWidget />

      {/* Appointment Modal */}
      <AppointmentModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="elitecare-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CustomCursor />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
