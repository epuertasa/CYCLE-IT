import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, Server, Monitor, Activity, Radio, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function TechnicalPlan() {
  const { t } = useTranslation();

  const nodes = [
    { id: 1, type: "raspberry", x: "45%", y: "20%", label: "RPi Central" },
    { id: 2, type: "arduino", x: "20%", y: "45%", label: "Node A1" },
    { id: 3, type: "arduino", x: "70%", y: "45%", label: "Node A2" },
    { id: 4, type: "pc", x: "15%", y: "75%", label: "Workstation 1" },
    { id: 5, type: "pc", x: "35%", y: "75%", label: "Workstation 2" },
    { id: 6, type: "pc", x: "65%", y: "75%", label: "Workstation 3" },
    { id: 7, type: "pc", x: "85%", y: "75%", label: "Workstation 4" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "raspberry": return <Server className="h-6 w-6 text-primary" />;
      case "arduino": return <Cpu className="h-5 w-5 text-blue-500" />;
      case "pc": return <Monitor className="h-5 w-5 text-muted-foreground" />;
      default: return <Radio className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-12 text-center">
        <motion.h1
          className="text-4xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t("technical_plan.title")}
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {t("technical_plan.subtitle")}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card className="overflow-hidden border-2 shadow-xl bg-card/50 backdrop-blur">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t("technical_plan.view.2d")}</CardTitle>
                  <CardDescription>Live Infrastructure Map</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full border border-green-500/20">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    SYSTEM ONLINE
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-grid-slate-200/[0.05] dark:bg-grid-white/[0.05] bg-[length:40px_40px] flex items-center justify-center p-8 overflow-hidden">
                {/* SVG Blueprint Background */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 800 450">
                  <rect x="50" y="50" width="700" height="350" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="400" y1="50" x2="400" y2="400" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
                </svg>

                <div className="relative w-full h-full border-2 border-dashed border-primary/20 rounded-lg">
                  {nodes.map((node) => (
                    <motion.div
                      key={node.id}
                      className="absolute group"
                      style={{ left: node.x, top: node.y }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: node.id * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="relative flex flex-col items-center">
                        <div className="p-3 bg-background border-2 border-border rounded-xl shadow-lg group-hover:border-primary transition-colors cursor-pointer">
                          {getIcon(node.type)}
                        </div>
                        <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap bg-background/80 px-2 py-0.5 rounded border border-border">
                          {node.label}
                        </span>

                        {/* Connection Lines from Raspberry to Arduinos */}
                        {node.type === "arduino" && (
                          <svg className="absolute top-0 left-1/2 -ml-[1px] h-32 w-[2px] -translate-y-full pointer-events-none opacity-20">
                            <line x1="0" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
                          </svg>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 flex gap-4 text-[10px] font-mono text-muted-foreground/50">
                    <span>GRID_REF: AULA_V1</span>
                    <span>SCALE: 1:50</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                {t("technical_plan.legend.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Server className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">{t("technical_plan.legend.raspberry")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Cpu className="h-4 w-4 text-blue-500" />
                </div>
                <span className="text-sm">{t("technical_plan.legend.arduino")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-sm">{t("technical_plan.legend.pc")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Activity className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-sm">{t("technical_plan.legend.sensor")}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground border-none shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4" />
                IoT Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">99.8%</p>
              <p className="text-xs opacity-70">Infrastructure Uptime</p>
              <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: "99.8%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

