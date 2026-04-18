import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useTheme } from "next-themes";
import { Sun, Moon, Info, QrCode, Menu, X, Home, Mail, Cpu, Terminal, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const { t, language, toggleLanguage } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem("cycleit-cookies");
    if (consent) {
      setCookieConsent(consent);
    } else {
      setCookieConsent("pending");
    }
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem("cycleit-cookies", "accepted");
    setCookieConsent("accepted");
  };

  const handleCookieReject = () => {
    localStorage.setItem("cycleit-cookies", "rejected");
    setCookieConsent("rejected");
  };

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/scanner", label: t("nav.scanner"), icon: QrCode },
    { href: "/gestio-iot", label: t("nav.iot_mgmt"), icon: Cpu },
    { href: "/plano-tecnico", label: t("nav.technical_plan"), icon: Layers },
    { href: "/aula-verde", label: t("nav.aula_verde"), icon: Cpu },
    { href: "/rpi-script", label: t("nav.rpi_script"), icon: Terminal },
    { href: "/about", label: t("nav.about"), icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-primary font-bold text-xl" data-testid="link-logo">
            <img src="/logo-cycle-it.svg" alt="Logo" className="h-8 w-8 object-contain" />
            <span>CYCLE-IT</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1 transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  data-testid={`link-nav-${link.href.replace("/", "") || "home"}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="font-bold tracking-wide"
              data-testid="button-lang-toggle"
            >
              {language === "ca" ? "CA / es" : "ca / ES"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              data-testid="button-theme-toggle"
            >
              {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4 bg-background">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-2 transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-muted-foreground"
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="outline" size="sm" onClick={toggleLanguage} data-testid="button-lang-toggle-mobile">
                {language === "ca" ? "Català → Español" : "Español → Català"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                data-testid="button-theme-toggle-mobile"
              >
                {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col relative">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/95 mt-auto" data-testid="footer">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-primary font-bold text-lg">
              <img src="/logo-cycle-it.svg" alt="Logo" className="h-6 w-6 object-contain" />
              <span>CYCLE-IT</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} CYCLE-IT. {t("footer.rights")}
            </p>
            <a
              href="mailto:cycleit@proton.me"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-footer-email"
            >
              <Mail className="h-4 w-4" />
              cycleit@proton.me
            </a>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      {cookieConsent === "pending" && (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-card text-card-foreground shadow-lg z-50" data-testid="cookie-banner">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              {t("cookies.message")}{" "}
              <Link href="/about" className="underline text-primary">
                {t("about.privacy")}
              </Link>
            </p>
            <div className="flex items-center space-x-2 shrink-0">
              <Button variant="outline" size="sm" onClick={handleCookieReject} data-testid="button-cookie-reject">
                {t("cookies.reject")}
              </Button>
              <Button size="sm" onClick={handleCookieAccept} data-testid="button-cookie-accept">
                {t("cookies.accept")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
