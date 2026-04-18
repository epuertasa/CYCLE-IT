import * as React from "react";
// Changed @/ alias to relative paths to avoid IDE resolution issues
import { useTranslation } from "../hooks/use-translation";
import { type TranslationKey } from "../i18n/translations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { 
  Cpu, 
  Server, 
  Monitor, 
  Activity, 
  Layers, 
  Zap, 
  Lightbulb, 
  Wind, 
  Cable, 
  Armchair, 
  BrickWall, 
  TrendingDown, 
  Leaf, 
  DollarSign, 
  Trash2,
  type LucideIcon
} from "lucide-react";
import { motion, useInView } from "framer-motion";

/* ─── Animated Counter Hook ─── */
function useAnimatedValue(
  target: number,
  duration = 1800,
  externalRef?: React.RefObject<HTMLDivElement | null>
) {
  const [value, setValue] = React.useState(0);
  const internalRef = React.useRef<HTMLDivElement>(null);
  const targetRef = (externalRef ?? internalRef);
  
  // Refined typing: framer-motion useInView accepts RefObject<Element | null>
  const inView = useInView(targetRef as React.RefObject<Element | null>, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let frameId: number;

    const animate = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * ease));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };
    
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView, target, duration]);

  return { value, ref: targetRef };
}

/* ─── Data Definitions ─── */
interface ImpactItem {
  key: string;
  translationKey: TranslationKey;
  icon: LucideIcon;
  before: number;
  after: number;
  unit: string;
  color: string;
  bg: string;
}

const IMPACT_DATA: ImpactItem[] = [
  { key: "energy", translationKey: "technical_plan.impact.energy", icon: Zap as LucideIcon, before: 8760, after: 3504, unit: "kWh", color: "text-amber-500", bg: "bg-amber-500/10" },
  { key: "co2", translationKey: "technical_plan.impact.co2", icon: Leaf as LucideIcon, before: 2190, after: 876, unit: "kg", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { key: "waste", translationKey: "technical_plan.impact.waste", icon: Trash2 as LucideIcon, before: 120, after: 15, unit: "kg", color: "text-red-500", bg: "bg-red-500/10" },
  { key: "cost", translationKey: "technical_plan.impact.cost", icon: DollarSign as LucideIcon, before: 1752, after: 701, unit: "€", color: "text-blue-500", bg: "bg-blue-500/10" },
];

interface MaterialItem {
  key: string;
  nameKey: TranslationKey;
  descKey: TranslationKey;
  icon: LucideIcon;
}

const MATERIAL_KEYS: MaterialItem[] = [
  { key: "floor",     icon: Layers as LucideIcon,    nameKey: "technical_plan.mat.floor",    descKey: "technical_plan.mat.floor.desc" },
  { key: "walls",     icon: BrickWall as LucideIcon, nameKey: "technical_plan.mat.walls",    descKey: "technical_plan.mat.walls.desc" },
  { key: "lighting",  icon: Lightbulb as LucideIcon, nameKey: "technical_plan.mat.lighting", descKey: "technical_plan.mat.lighting.desc" },
  { key: "furniture", icon: Armchair as LucideIcon,  nameKey: "technical_plan.mat.furniture", descKey: "technical_plan.mat.furniture.desc" },
  { key: "cooling",   icon: Wind as LucideIcon,      nameKey: "technical_plan.mat.cooling",   descKey: "technical_plan.mat.cooling.desc" },
  { key: "cabling",   icon: Cable as LucideIcon,     nameKey: "technical_plan.mat.cabling",   descKey: "technical_plan.mat.cabling.desc" },
];

/* ─── ImpactCard Component ─── */
function ImpactCard({ item, index }: { item: ImpactItem; index: number }) {
  const { t } = useTranslation();
  const cardRef = React.useRef<HTMLDivElement>(null);
  const beforeAnimValue = useAnimatedValue(item.before, 1800, cardRef);
  const afterAnimValue  = useAnimatedValue(item.after,  1800, cardRef);
  const pctReduction = Math.round(((item.before - item.after) / item.before) * 100);
  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${item.bg}`}>
              <Icon className={`h-4 w-4 ${item.color}`} />
            </div>
            {t(item.translationKey)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-medium text-muted-foreground">{t("technical_plan.impact.before")}</span>
              <span className="text-lg font-black text-red-500/80">{beforeAnimValue.value.toLocaleString()} {item.unit}</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + index * 0.1 }}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-medium text-muted-foreground">{t("technical_plan.impact.after")}</span>
              <span className="text-lg font-black text-primary">{afterAnimValue.value.toLocaleString()} {item.unit}</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.after / item.before) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4 + index * 0.1 }}
              />
            </div>
          </div>
          <motion.div
            className="flex items-center justify-center gap-2 pt-2"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center gap-1.5 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <TrendingDown className="h-4 w-4 text-primary" />
              <span className="text-sm font-black text-primary">
                -{pctReduction}% {t("technical_plan.impact.reduction")}
              </span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function TechnicalPlan() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl animate-in fade-in duration-500">
      <div className="mb-16 text-center space-y-4">
        <motion.h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          {t("technical_plan.title")}
        </motion.h1>
        <motion.p className="text-xl text-muted-foreground max-w-2xl mx-auto" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          {t("technical_plan.subtitle")}
        </motion.p>
      </div>

      <motion.section className="mb-20" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="overflow-hidden border-2 shadow-xl">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg"><Activity className="h-5 w-5 text-primary" /></div>
                <div>
                  <CardTitle className="text-lg">{t("technical_plan.blueprint")}</CardTitle>
                  <CardDescription>{t("technical_plan.blueprint.desc")}</CardDescription>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-xs text-muted-foreground font-mono hidden sm:block">ESC 1:50</span>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  LIVE
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 relative">
            <div className="relative overflow-hidden group">
              <img src="/aula_floor_plan.png" alt="Plano" className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[18%] left-[72%] pointer-events-auto">
                  <motion.div className="relative" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
                    <div className="p-2 bg-card border-2 border-emerald-500 rounded-lg shadow-lg"><Server className="h-4 w-4 text-emerald-500" /></div>
                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-card" />
                    <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-card/90 px-1.5 py-0.5 rounded border">RPi-01</span>
                  </motion.div>
                </div>
                <div className="absolute top-[45%] left-[25%] pointer-events-auto">
                  <motion.div className="relative" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.3 }}>
                    <div className="p-1.5 bg-card border-2 border-cyan-500 rounded-lg shadow-lg"><Cpu className="h-3.5 w-3.5 text-cyan-500" /></div>
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500 border-2 border-card" />
                    <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[7px] font-bold uppercase text-cyan-600 dark:text-cyan-400 bg-card/90 px-1 py-0.5 rounded border">A1</span>
                  </motion.div>
                </div>
                <div className="absolute top-[45%] left-[80%] pointer-events-auto">
                  <motion.div className="relative" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.6 }}>
                    <div className="p-1.5 bg-card border-2 border-cyan-500 rounded-lg shadow-lg"><Cpu className="h-3.5 w-3.5 text-cyan-500" /></div>
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500 border-2 border-card" />
                    <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[7px] font-bold uppercase text-cyan-600 dark:text-cyan-400 bg-card/90 px-1 py-0.5 rounded border">A2</span>
                  </motion.div>
                </div>
                {([
                  { x: "22%", y: "70%", label: "WS-01" },
                  { x: "40%", y: "70%", label: "WS-02" },
                  { x: "58%", y: "70%", label: "WS-03" },
                  { x: "76%", y: "70%", label: "WS-04" },
                ] as const).map((pc, i) => (
                  <div key={pc.label} className="absolute pointer-events-auto" style={{ top: pc.y, left: pc.x }}>
                    <motion.div className="relative" animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: (i * 0.2) % 1 }}>
                      <div className="p-1.5 bg-card border border-violet-500/60 rounded shadow-md"><Monitor className="h-3 w-3 text-violet-500" /></div>
                      <span className="absolute top-full mt-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[6px] font-bold uppercase text-violet-600 dark:text-violet-400 bg-card/90 px-1 rounded">{pc.label}</span>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-muted/20 flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-emerald-500/10 rounded"><Server className="h-3 w-3 text-emerald-500" /></div>
                <span className="text-xs text-muted-foreground">{t("technical_plan.legend.raspberry")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-cyan-500/10 rounded"><Cpu className="h-3 w-3 text-cyan-500" /></div>
                <span className="text-xs text-muted-foreground">{t("technical_plan.legend.arduino")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-violet-500/10 rounded"><Monitor className="h-3 w-3 text-violet-500" /></div>
                <span className="text-xs text-muted-foreground">{t("technical_plan.legend.pc")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section className="mb-20" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
        <div className="text-center mb-10"><h2 className="text-3xl font-bold tracking-tight">{t("technical_plan.materials.title")}</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MATERIAL_KEYS.map((mat, i) => {
            const Icon = mat.icon;
            return (
              <motion.div key={mat.key} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6 space-y-3">
                    <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:scale-110 transition-transform"><Icon className="h-6 w-6 text-primary" /></div>
                    <h3 className="font-bold text-lg">{t(mat.nameKey)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(mat.descKey)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section className="mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">{t("technical_plan.impact.title")}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("technical_plan.impact.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{IMPACT_DATA.map((item, i) => (<ImpactCard key={item.key} item={item} index={i} />))}</div>
        <motion.div className="mt-10" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <Card className="bg-primary text-primary-foreground border-none shadow-xl overflow-hidden relative">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0"><Leaf className="h-8 w-8" /></div>
                  <div>
                    <p className="text-2xl md:text-3xl font-black tracking-tight">-60% {t("technical_plan.impact.reduction")}</p>
                    <p className="text-sm opacity-80 mt-1">{t("technical_plan.impact.subtitle")}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div><p className="text-2xl font-black">5.256</p><p className="text-[10px] font-bold uppercase tracking-wider opacity-70">kWh {t("technical_plan.impact.saving")}</p></div>
                  <div><p className="text-2xl font-black">1.314</p><p className="text-[10px] font-bold uppercase tracking-wider opacity-70">kg CO₂</p></div>
                  <div><p className="text-2xl font-black">1.051€</p><p className="text-[10px] font-bold uppercase tracking-wider opacity-70">€ {t("technical_plan.impact.saving")}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>
    </div>
  );
}
