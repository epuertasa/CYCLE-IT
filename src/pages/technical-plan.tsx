import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, Server, Monitor, Activity, Radio, Layers, Zap, Thermometer, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Node {
  id: number;
  type: "raspberry" | "arduino" | "pc" | "sensor";
  x: string;
  y: string;
  label: string;
  status: "online" | "warning" | "offline";
  telemetry: {
    temp: string;
    load: string;
    uptime: string;
  };
}

export default function TechnicalPlan() {
  const { t } = useTranslation();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const nodes: Node[] = [
    { 
      id: 1, type: "raspberry", x: "50%", y: "25%", label: "Gateway RPi-01", status: "online",
      telemetry: { temp: "42°C", load: "12%", uptime: "14d 2h" }
    },
    { 
      id: 2, type: "arduino", x: "25%", y: "45%", label: "Sensor Node A1", status: "online",
      telemetry: { temp: "24°C", load: "2%", uptime: "32d 5h" }
    },
    { 
      id: 3, type: "arduino", x: "75%", y: "45%", label: "Sensor Node A2", status: "online",
      telemetry: { temp: "26°C", load: "3%", uptime: "32d 5h" }
    },
    { 
      id: 4, type: "pc", x: "20%", y: "75%", label: "WS-01", status: "online",
      telemetry: { temp: "38°C", load: "5%", uptime: "4h 20m" }
    },
    { 
      id: 5, type: "pc", x: "40%", y: "75%", label: "WS-02", status: "online",
      telemetry: { temp: "40°C", load: "8%", uptime: "4h 15m" }
    },
    { 
      id: 6, type: "pc", x: "60%", y: "75%", label: "WS-03", status: "warning",
      telemetry: { temp: "55°C", load: "92%", uptime: "4h 10m" }
    },
    { 
      id: 7, type: "pc", x: "80%", y: "75%", label: "WS-04", status: "online",
      telemetry: { temp: "37°C", load: "4%", uptime: "4h 05m" }
    },
  ];

  const getIcon = (type: string, size = "h-6 w-6") => {
    switch (type) {
      case "raspberry": return <Server className={`${size} text-emerald-400`} />;
      case "arduino": return <Cpu className={`${size} text-cyan-400`} />;
      case "pc": return <Monitor className={`${size} text-slate-400`} />;
      case "sensor": return <Zap className={`${size} text-amber-400`} />;
      default: return <Radio className={`${size}`} />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#020617] text-slate-200">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        {/* Header with futuristic glow */}
        <div className="relative mb-16 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[120px] rounded-full" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
              {t("technical_plan.title")}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light tracking-wide">
              {t("technical_plan.subtitle")}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visualizer Area */}
          <div className="lg:col-span-9 space-y-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/50 to-cyan-500/50 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <Card className="relative bg-slate-950/80 border-slate-800 rounded-3xl overflow-hidden backdrop-blur-xl">
                <CardHeader className="border-b border-slate-800/50 bg-slate-900/30 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Activity className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold tracking-tight text-white">{t("technical_plan.view.2d")}</CardTitle>
                        <CardDescription className="text-slate-500 font-mono text-xs">AULA_VERDE_OS_v2.0.4</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Latency</span>
                        <span className="text-xs font-mono text-emerald-400">14ms</span>
                      </div>
                      <div className="h-10 w-[1px] bg-slate-800 hidden md:block" />
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        <span className="text-[10px] font-bold text-emerald-500 tracking-tighter">DATA LINK STABLE</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="relative aspect-[21/9] md:aspect-[21/9] bg-[#020617] overflow-hidden cursor-crosshair">
                    
                    {/* Animated Grid Background */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{ 
                        backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                      }} 
                    />

                    {/* Connection Lines Container */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                          <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 50% 25% L 25% 45%" stroke="url(#lineGrad)" strokeWidth="1" fill="none" className="animate-pulse" />
                      <path d="M 50% 25% L 75% 45%" stroke="url(#lineGrad)" strokeWidth="1" fill="none" className="animate-pulse" />
                    </svg>

                    {/* Nodes mapping */}
                    <div className="relative w-full h-full">
                      {nodes.map((node) => (
                        <motion.div
                          key={node.id}
                          className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                          style={{ left: node.x, top: node.y }}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: node.id * 0.05 }}
                          whileHover={{ zIndex: 50 }}
                          onHoverStart={() => setSelectedNode(node)}
                          onHoverEnd={() => setSelectedNode(null)}
                        >
                          <div className="relative">
                            {/* Pulse effect for status */}
                            {node.status === "online" && (
                              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md animate-ping" />
                            )}
                            {node.status === "warning" && (
                              <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-md animate-pulse" />
                            )}

                            <div 
                              className={`p-4 rounded-2xl border-2 transition-all duration-300 shadow-2xl backdrop-blur-md
                                ${selectedNode?.id === node.id 
                                  ? 'bg-slate-900 border-white scale-125' 
                                  : 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/50'
                                }`}
                            >
                              {getIcon(node.type)}
                            </div>

                            {/* Label */}
                            <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-[9px] font-mono text-slate-400 tracking-tighter uppercase">
                                {node.label}
                              </span>
                            </div>

                            {/* Mini Telemetry Tooltip on Hover */}
                            <AnimatePresence>
                              {selectedNode?.id === node.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                  animate={{ opacity: 1, y: -80, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  className="absolute left-1/2 -translate-x-1/2 bottom-full z-50 pointer-events-none"
                                >
                                  <div className="bg-slate-900 border border-emerald-500/50 p-3 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] min-w-[120px]">
                                    <div className="flex gap-4">
                                       <div className="flex items-center gap-1.5">
                                          <Thermometer className="h-3 w-3 text-red-400" />
                                          <span className="text-[10px] font-mono text-white">{node.telemetry.temp}</span>
                                       </div>
                                       <div className="flex items-center gap-1.5">
                                          <Activity className="h-3 w-3 text-emerald-400" />
                                          <span className="text-[10px] font-mono text-white">{node.telemetry.load}</span>
                                       </div>
                                    </div>
                                    <div className="mt-1 flex items-center gap-1.5">
                                       <Wifi className="h-3 w-3 text-blue-400" />
                                       <span className="text-[9px] font-mono text-slate-400">UP: {node.telemetry.uptime}</span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card className="bg-slate-900/40 border-slate-800 overflow-hidden group">
                  <div className="p-6 flex items-center gap-4">
                     <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                        <Zap className="h-6 w-6 text-emerald-400" />
                     </div>
                     <div>
                        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Consumption</p>
                        <p className="text-2xl font-black text-white">12.4 kWh</p>
                     </div>
                  </div>
               </Card>
               <Card className="bg-slate-900/40 border-slate-800 overflow-hidden group">
                  <div className="p-6 flex items-center gap-4">
                     <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                        <Wifi className="h-6 w-6 text-cyan-400" />
                     </div>
                     <div>
                        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Network Load</p>
                        <p className="text-2xl font-black text-white">LOW</p>
                     </div>
                  </div>
               </Card>
               <Card className="bg-slate-900/40 border-slate-800 overflow-hidden group">
                  <div className="p-6 flex items-center gap-4">
                     <div className="p-3 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors">
                        <Activity className="h-6 w-6 text-amber-400" />
                     </div>
                     <div>
                        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Threat Level</p>
                        <p className="text-2xl font-black text-white">SECURE</p>
                     </div>
                  </div>
               </Card>
            </div>
          </div>

          {/* Right Sidebar Info */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-emerald-500">
                  <Layers className="h-4 w-4" />
                  LEGEND_SYSTEM
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    {getIcon("raspberry", "h-4 w-4")}
                    <span className="text-xs font-mono text-slate-300">Raspberry Pi</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">#01</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    {getIcon("arduino", "h-4 w-4")}
                    <span className="text-xs font-mono text-slate-300">Arduino Node</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">#02</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    {getIcon("pc", "h-4 w-4")}
                    <span className="text-xs font-mono text-slate-300">PC Station</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">#04</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-emerald-600 border-none shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden">
               <div className="p-8 text-white relative">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse" />
                  <div className="relative z-10 space-y-4">
                     <div className="h-10 w-10 bg-white text-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Zap className="h-6 w-6" />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black italic tracking-tighter">99.8%</h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">System Uptime</p>
                     </div>
                     <p className="text-xs leading-tight opacity-70">
                        Monitoring all nodes in real-time. Power saving mode active globally.
                     </p>
                  </div>
               </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
