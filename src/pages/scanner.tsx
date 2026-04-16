import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Scanner() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [manualId, setManualId] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        scanner.clear();
        setLocation(`/dashboard/${decodedText}`);
      },
      (error) => {
        // Handle scan error quietly
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [setLocation]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualId.trim()) {
      setLocation(`/dashboard/${manualId.trim()}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border shadow-xl rounded-2xl overflow-hidden"
      >
        <div className="p-6 text-center border-b">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-primary">
            <QrCode className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold" data-testid="text-scanner-title">{t("scanner.title")}</h2>
          <p className="text-muted-foreground mt-2" data-testid="text-scanner-subtitle">{t("scanner.subtitle")}</p>
        </div>

        <div className="p-6 bg-black/5 dark:bg-white/5">
          <div id="reader" className="rounded-xl overflow-hidden bg-black text-white" />
        </div>

        <div className="p-6 border-t">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground" data-testid="text-scanner-or">
                {t("scanner.or")}
              </span>
            </div>
          </div>

          <form onSubmit={handleManualSubmit} className="flex space-x-2">
            <Input
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
              placeholder={t("scanner.manualInput")}
              data-testid="input-manual-id"
            />
            <Button type="submit" data-testid="button-manual-submit">
              <Search className="w-4 h-4 mr-2" />
              {t("scanner.scanButton")}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}