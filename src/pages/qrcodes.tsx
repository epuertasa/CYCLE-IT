import { useRef } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "@/hooks/use-translation";
import { equipments } from "@/data/equipments";
import { Printer, QrCode, Monitor, Cpu, MonitorPlay, Leaf, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const typeIcon: Record<string, React.ElementType> = {
  computer: Monitor,
  monitor: Monitor,
  projector: MonitorPlay,
  raspberry: Cpu,
  arduino: Zap,
};

const typeColor: Record<string, string> = {
  computer: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  monitor: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  projector: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  raspberry: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  arduino: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
};

export default function QrCodes() {
  const { t } = useTranslation();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-2" data-testid="text-qrcodes-title">
            <QrCode className="w-7 h-7 text-primary" />
            {t("qrcodes.title")}
          </h1>
          <p className="text-muted-foreground text-sm">{t("qrcodes.subtitle")}</p>
        </div>
        <Button variant="outline" onClick={handlePrint} className="shrink-0 print:hidden" data-testid="button-print-qrcodes">
          <Printer className="w-4 h-4 mr-2" />
          {t("qrcodes.print")}
        </Button>
      </div>

      <div ref={printRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        {equipments.map((eq, i) => {
          const Icon = typeIcon[eq.type] ?? Leaf;
          return (
            <motion.div
              key={eq.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow print:shadow-none print:border border-border">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{eq.type}</span>
                  </div>

                  <div className="flex justify-center">
                    <div className="p-2 bg-white rounded-xl border border-border inline-block">
                      <QRCodeSVG
                        value={eq.id}
                        size={130}
                        bgColor="#ffffff"
                        fgColor="#0f172a"
                        level="M"
                        data-testid={`qr-${eq.id}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-foreground text-sm leading-tight">{eq.name}</p>
                    <Badge variant="outline" className={`text-xs font-mono ${typeColor[eq.type]}`} data-testid={`badge-qr-id-${eq.id}`}>
                      {eq.id}
                    </Badge>
                  </div>

                  <div className="text-xs text-muted-foreground border-t border-border pt-2 space-y-0.5">
                    <p>{eq.location}</p>
                    <p className="text-primary font-semibold">{eq.powerWatts} W</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-center text-muted-foreground print:hidden">
        {t("qrcodes.hint")}
      </p>

      <style>{`
        @media print {
          body > *:not(#root) { display: none !important; }
          header, footer, nav, [data-testid="cookie-banner"] { display: none !important; }
        }
      `}</style>
    </div>
  );
}
