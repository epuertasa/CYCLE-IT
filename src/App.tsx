import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import { Layout } from "@/components/layout";

import Home from "@/pages/home";
import Scanner from "@/pages/scanner";
import Dashboard from "@/pages/dashboard";
import About from "@/pages/about";
import TechnicalPlan from "@/pages/technical-plan";
import QrCodes from "@/pages/qrcodes";
import NotFound from "@/pages/not-found";
import AulaVerde from "@/pages/aula-verde";
import RpiScript from "@/pages/rpi-script";
import AulaVerdaCentralHub from "@/components/AulaVerdaCentralHub";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/scanner" component={Scanner} />
        <Route path="/dashboard/:id" component={Dashboard} />

        <Route path="/about" component={About} />
        <Route path="/plano-tecnico" component={TechnicalPlan} />
        <Route path="/aula-verde" component={AulaVerde} />
        <Route path="/qrcodes" component={QrCodes} />
        <Route path="/rpi-script" component={RpiScript} />
        <Route path="/gestio-iot" component={AulaVerdaCentralHub} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="cycleit-theme">
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
