import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { totalCO2Saved } from "@/data/equipments";
import { QrCode, Leaf, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

function useLiveCO2(base: number) {
  const [value, setValue] = useState(base);
  const [delta, setDelta] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const increment = parseFloat((Math.random() * 0.018 + 0.002).toFixed(3));
      setValue(prev => parseFloat((prev + increment).toFixed(3)));
      setDelta(increment);
      setTimeout(() => setDelta(null), 1400);
      schedule();
    };

    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = Math.random() * 4000 + 3000;
      timeout = setTimeout(tick, delay);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return { value, delta };
}

function AnimatedCounter({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);
  const initialDone = useRef(false);

  useEffect(() => {
    if (initialDone.current) {
      setDisplay(target);
      return;
    }
    initialDone.current = true;
    let start: number | null = null;
    const duration = 2200;
    const from = 0;

    const animate = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(parseFloat((from + (target - from) * ease).toFixed(3)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target]);

  return <span>{display.toFixed(1)}</span>;
}

export default function Home() {
  const { t } = useTranslation();
  const { value: liveCO2, delta } = useLiveCO2(totalCO2Saved);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full text-center space-y-10"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
            <Leaf className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground" data-testid="text-home-title">
            {t("home.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-home-subtitle">
            {t("home.subtitle")}
          </p>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-card text-card-foreground border rounded-3xl p-8 md:p-12 shadow-xl mx-auto max-w-md relative overflow-hidden"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-primary mb-2" data-testid="text-home-totalco2">
            {t("home.totalCo2")}
          </p>

          <div className="text-6xl md:text-7xl font-black text-foreground font-mono tabular-nums tracking-tighter relative">
            <AnimatedCounter target={liveCO2} />
            <span className="text-3xl md:text-4xl text-muted-foreground ml-2" data-testid="text-home-unit">
              {t("home.unit")}
            </span>
          </div>

          <AnimatePresence>
            {delta !== null && (
              <motion.div
                key={delta}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center gap-1 mt-3 text-sm font-semibold text-primary"
                data-testid="text-home-delta"
              >
                <TrendingUp className="w-4 h-4" />
                +{delta.toFixed(3)} kg
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 flex items-center justify-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs text-muted-foreground">{t("home.live")}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link href="/scanner">
            <Button size="lg" className="h-16 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all" data-testid="link-scan-cta">
              <QrCode className="mr-2 h-6 w-6" />
              {t("home.scanCta")}
            </Button>
          </Link>
          <Link href="/qrcodes">
            <Button size="lg" variant="outline" className="h-16 px-8 text-lg rounded-full" data-testid="link-qrcodes-cta">
              {t("home.viewQrCodes")}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
