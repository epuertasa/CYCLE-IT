import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, Server, Monitor, Activity, Layers, Zap, Wifi, Thermometer, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* ─── Types ─── */
interface FloorNode {
  id: string;
  type: "raspberry" | "arduino" | "pc" | "sensor";
  label: string;
  /** position inside the isometric floor (% based) */
  gridX: number;
  gridY: number;
  status: "online" | "warning";
  temp: string;
  load: string;
  uptime: string;
}

/* ─── Data ─── */
const NODES: FloorNode[] = [
  { id: "rpi-01", type: "raspberry", label: "Gateway RPi-01", gridX: 50, gridY: 18, status: "online", temp: "42°C", load: "12%", uptime: "14d 2h" },
  { id: "ard-01", type: "arduino",   label: "Sensor Node A1",  gridX: 22, gridY: 42, status: "online", temp: "24°C", load: "2%",  uptime: "32d 5h" },
  { id: "ard-02", type: "arduino",   label: "Sensor Node A2",  gridX: 78, gridY: 42, status: "online", temp: "26°C", load: "3%",  uptime: "32d 5h" },
  { id: "ws-01",  type: "pc",        label: "Workstation 01",  gridX: 16, gridY: 68, status: "online", temp: "38°C", load: "5%",  uptime: "4h 20m" },
  { id: "ws-02",  type: "pc",        label: "Workstation 02",  gridX: 38, gridY: 68, status: "online", temp: "40°C", load: "8%",  uptime: "4h 15m" },
  { id: "ws-03",  type: "pc",        label: "Workstation 03",  gridX: 62, gridY: 68, status: "warning",temp: "55°C", load: "92%", uptime: "4h 10m" },
  { id: "ws-04",  type: "pc",        label: "Workstation 04",  gridX: 84, gridY: 68, status: "online", temp: "37°C", load: "4%",  uptime: "4h 05m" },
];

/* ─── Helpers ─── */
const TYPE_COLORS: Record<string, { icon: string; ring: string; bg: string }> = {
  raspberry: { icon: "text-emerald-500", ring: "ring-emerald-500/40", bg: "bg-emerald-500/10" },
  arduino:   { icon: "text-cyan-500",    ring: "ring-cyan-500/40",    bg: "bg-cyan-500/10"    },
  pc:        { icon: "text-violet-500",  ring: "ring-violet-500/40",  bg: "bg-violet-500/10"  },
  sensor:    { icon: "text-amber-500",   ring: "ring-amber-500/40",   bg: "bg-amber-500/10"   },
};

function NodeIcon({ type, className = "h-5 w-5" }: { type: string; className?: string }) {
  const color = TYPE_COLORS[type]?.icon ?? "text-muted-foreground";
  switch (type) {
    case "raspberry": return <Server className={`${className} ${color}`} />;
    case "arduino":   return <Cpu    className={`${className} ${color}`} />;
    case "pc":        return <Monitor className={`${className} ${color}`} />;
    default:          return <Zap    className={`${className} ${color}`} />;
  }
}

/* ─── Simulated live uptime counter ─── */
function useUptimeCounter() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* ─── Component ─── */
export default function TechnicalPlan() {
  const { t } = useTranslation();
  const [active, setActive] = useState<FloorNode | null>(null);
  const sessionTime = useUptimeCounter();

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl animate-in fade-in duration-500">

      {/* ── Header ── */}
      <div className="mb-14 text-center space-y-4">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t("technical_plan.title")}
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          {t("technical_plan.subtitle")}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* ━━━━━━━━ MAIN 3-D ISOMETRIC FLOOR PLAN ━━━━━━━━ */}
        <div className="xl:col-span-9 space-y-8">
          <Card className="overflow-hidden border-2 shadow-xl">
            <CardHeader className="border-b bg-muted/30 px-6 py-5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{t("technical_plan.view.3d")}</CardTitle>
                    <CardDescription className="font-mono text-xs">AULA_VERDE // REF v2.1</CardDescription>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="hidden sm:block text-xs text-muted-foreground font-mono">SESSION {sessionTime}</span>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    ONLINE
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Isometric wrapper – CSS perspective + rotateX to simulate 3-D */}
              <div className="relative w-full overflow-hidden bg-muted/20" style={{ perspective: "1200px" }}>
                <div
                  className="relative w-full"
                  style={{
                    paddingBottom: "56%", /* 16:9 ratio */
                    transformStyle: "preserve-3d",
                    transform: "rotateX(45deg) rotateZ(-30deg) scale(0.72)",
                    transformOrigin: "50% 50%",
                  }}
                >
                  {/* ── Floor ── */}
                  <div
                    className="absolute inset-[5%] rounded-sm border-2 border-primary/30 bg-gradient-to-br from-primary/[0.04] to-primary/[0.08] shadow-[0_0_80px_-20px] shadow-primary/20"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(0deg, transparent, transparent 49px, hsl(var(--border)) 49px, hsl(var(--border)) 50px),
                        repeating-linear-gradient(90deg, transparent, transparent 49px, hsl(var(--border)) 49px, hsl(var(--border)) 50px)
                      `,
                      backgroundSize: "50px 50px",
                    }}
                  >
                    {/* ── Walls (3-D extruded divs) ── */}

                    {/* Back wall */}
                    <div
                      className="absolute top-0 left-0 right-0 bg-gradient-to-b from-foreground/[0.06] to-foreground/[0.02] border-b border-foreground/10"
                      style={{ height: "60px", transformOrigin: "top", transform: "rotateX(-90deg) translateZ(0px)" }}
                    />
                    {/* Left wall */}
                    <div
                      className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-foreground/[0.05] to-foreground/[0.02] border-r border-foreground/10"
                      style={{ width: "60px", transformOrigin: "left", transform: "rotateY(90deg) translateZ(0px)" }}
                    />

                    {/* ── Furniture: Desks (flat rectangles on the floor) ── */}
                    {/* Desk row 1 */}
                    <div className="absolute left-[8%] top-[55%] w-[18%] h-[20%] rounded bg-foreground/[0.06] border border-foreground/10" />
                    <div className="absolute left-[30%] top-[55%] w-[18%] h-[20%] rounded bg-foreground/[0.06] border border-foreground/10" />
                    <div className="absolute left-[53%] top-[55%] w-[18%] h-[20%] rounded bg-foreground/[0.06] border border-foreground/10" />
                    <div className="absolute left-[76%] top-[55%] w-[18%] h-[20%] rounded bg-foreground/[0.06] border border-foreground/10" />

                    {/* Server rack area */}
                    <div className="absolute left-[40%] top-[5%] w-[20%] h-[14%] rounded border-2 border-dashed border-primary/30 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-primary/50 uppercase tracking-widest">RACK ZONE</span>
                    </div>

                    {/* Door opening */}
                    <div className="absolute bottom-0 right-[10%] w-[15%] h-[2px] bg-primary/50 shadow-[0_0_12px_4px] shadow-primary/20" />
                    <span className="absolute bottom-[-18px] right-[13%] text-[7px] font-mono text-muted-foreground uppercase">DOOR</span>

                    {/* ── Node markers on the floor ── */}
                    {NODES.map((node, i) => {
                      const colors = TYPE_COLORS[node.type];
                      const isActive = active?.id === node.id;

                      return (
                        <motion.div
                          key={node.id}
                          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                          style={{ left: `${node.gridX}%`, top: `${node.gridY}%` }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.15 + i * 0.06, type: "spring", stiffness: 260, damping: 16 }}
                          onClick={() => setActive(isActive ? null : node)}
                        >
                          {/* Glow ring */}
                          <div className={`absolute inset-0 rounded-full ${colors.bg} blur-md animate-pulse`} />

                          {/* Extruded marker (simulated height) */}
                          <div
                            className={`relative p-2.5 rounded-xl border-2 bg-card shadow-lg transition-all duration-200
                              ${isActive ? `${colors.ring} ring-4 scale-125` : "ring-0 border-border hover:scale-110"}
                            `}
                            style={{
                              transform: `translateY(-${isActive ? 16 : 8}px)`,
                              boxShadow: `0 ${isActive ? 16 : 8}px 16px -4px rgba(0,0,0,0.25)`,
                            }}
                          >
                            <NodeIcon type={node.type} className="h-5 w-5" />

                            {/* Status dot */}
                            <span className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-card
                              ${node.status === "online" ? "bg-green-500" : "bg-amber-500 animate-pulse"}
                            `} />
                          </div>

                          {/* Label below */}
                          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold uppercase tracking-wider text-muted-foreground bg-card/80 px-1.5 py-0.5 rounded border border-border">
                            {node.label}
                          </span>
                        </motion.div>
                      );
                    })}

                    {/* Grid reference */}
                    <div className="absolute bottom-2 left-3 flex gap-3 text-[7px] font-mono text-muted-foreground/40 uppercase">
                      <span>grid_ref: aula_v1</span>
                      <span>scale 1:50</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Bottom telemetry cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {([
              { icon: Zap,      color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Consumption", value: "12.4 kWh" },
              { icon: Wifi,     color: "text-cyan-500",    bg: "bg-cyan-500/10",    label: "Network",     value: "LOW LOAD"  },
              { icon: Activity, color: "text-amber-500",   bg: "bg-amber-500/10",   label: "Threat",      value: "SECURE"    },
            ] as const).map((card) => (
              <Card key={card.label} className="group hover:shadow-lg transition-shadow">
                <div className="p-5 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${card.bg} group-hover:scale-110 transition-transform`}>
                    <card.icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{card.label}</p>
                    <p className="text-xl font-black">{card.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ━━━━━━━━ RIGHT SIDEBAR ━━━━━━━━ */}
        <div className="xl:col-span-3 space-y-6">

          {/* Legend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                {t("technical_plan.legend.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {([
                { type: "raspberry", label: t("technical_plan.legend.raspberry") },
                { type: "arduino",   label: t("technical_plan.legend.arduino") },
                { type: "pc",        label: t("technical_plan.legend.pc") },
                { type: "sensor",    label: t("technical_plan.legend.sensor") },
              ] as const).map((item) => (
                <div key={item.type} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`p-1.5 rounded-lg ${TYPE_COLORS[item.type].bg}`}>
                    <NodeIcon type={item.type} className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Node Detail Panel (click on a node) */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                <Card className="border-2 border-primary/30 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <NodeIcon type={active.type} className="h-4 w-4" />
                      {active.label}
                    </CardTitle>
                    <CardDescription className="font-mono text-[10px]">ID: {active.id.toUpperCase()}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5"><Thermometer className="h-3.5 w-3.5 text-red-400" /> Temp</span>
                      <span className="font-mono font-bold">{active.temp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-emerald-400" /> Load</span>
                      <span className="font-mono font-bold">{active.load}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5"><Wifi className="h-3.5 w-3.5 text-blue-400" /> Uptime</span>
                      <span className="font-mono font-bold">{active.uptime}</span>
                    </div>
                    {/* Load bar */}
                    <div className="pt-1">
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${parseInt(active.load) > 80 ? "bg-amber-500" : "bg-primary"}`}
                          initial={{ width: 0 }}
                          animate={{ width: active.load }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {!active && (
            <Card className="border-dashed">
              <CardContent className="py-10 text-center text-sm text-muted-foreground">
                <Monitor className="h-8 w-8 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Click a node on the plan</p>
                <p className="text-xs mt-1 opacity-60">to inspect real-time telemetry</p>
              </CardContent>
            </Card>
          )}

          {/* Uptime Card */}
          <Card className="bg-primary text-primary-foreground border-none shadow-lg overflow-hidden relative">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <CardContent className="p-6 relative z-10 space-y-3">
              <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-3xl font-black tracking-tight">99.8%</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1">System Uptime</p>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "99.8%" }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
              </div>
              <p className="text-[10px] opacity-60 leading-relaxed">
                All 7 nodes reporting nominal status. Power-saving mode engaged globally.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
