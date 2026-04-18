import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Leaf, 
  Power, 
  Settings, 
  RefreshCw, 
  QrCode, 
  Unlink, 
  Link as LinkIcon,
  Cpu,
  ShieldCheck,
  TrendingDown,
  Activity
} from "lucide-react";

/* ─── Types ─── */
type OperationMode = "Normal" | "Eco" | "Reposo";

interface DeviceStatus {
  watts: number;
  co2Saved: number;
  online: boolean;
  mode: OperationMode;
  isActive: boolean;
}

/* ─── Simulated API Hook ─── */
const useRPiConnection = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCommand = async (command: string) => {
    setIsConnecting(true);
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Command sent to RPi: ${command}`);
    setIsConnecting(false);
    return true;
  };

  return { sendCommand, isConnecting, error };
};

/* ─── Main Component ─── */
export default function CentralGestionIoT() {
  // States
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "success">("idle");
  const [status, setStatus] = useState<DeviceStatus>({
    watts: 420,
    co2Saved: 124.5,
    online: true,
    mode: "Normal",
    isActive: true,
  });

  const { sendCommand, isConnecting } = useRPiConnection();

  // Pulse effect simulation
  useEffect(() => {
    if (!status.isActive) return;
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        watts: prev.mode === "Eco" 
          ? 180 + Math.random() * 10 
          : prev.mode === "Reposo" ? 15 : 400 + Math.random() * 50,
        co2Saved: prev.co2Saved + (prev.mode === "Eco" ? 0.001 : 0.0002)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [status.isActive, status.mode]);

  // Handle QR Scan
  const handleStartScan = () => {
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus("success");
    }, 2500);
  };

  // UI Helpers
  const getModeColor = () => {
    switch (status.mode) {
      case "Eco": return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
      case "Reposo": return "text-blue-400 border-blue-500/30 bg-blue-500/10";
      default: return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/30">
      
      {/* ─── Hero Banner ─── */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        {/* Placeholder for the generated IoT image */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a] z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070')] bg-cover bg-center brightness-50 contrast-125" />
        
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30 tracking-widest uppercase">
              Project: CYCLE-IT
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              Cicla l'Energia.<br/>
              <span className="text-emerald-500">Controla el Futur.</span>
            </h1>
            <p className="max-w-md mx-auto text-white/70 text-lg">
              Monitorització de hardware i control d'eficiència en temps real per a l'Aula Verda.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-16 pb-20 relative z-30">
        <AnimatePresence mode="wait">
          
          {/* ─── SCANNING ZONE ─── */}
            <motion.div
              key="scanner"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-8">
                <div className="relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 border-4 border-dashed border-emerald-500/20 rounded-2xl animate-spin-slow" />
                  <div className="absolute inset-4 border-2 border-emerald-500/40 rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <QrCode className={`w-20 h-20 ${scanStatus === "scanning" ? "text-emerald-400" : "text-slate-500"}`} />
                  </div>
                  
                  {scanStatus === "scanning" && (
                    <motion.div
                      className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10"
                      animate={{ top: ["10%", "90%", "10%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Vincular Dispositiu IoT</h2>
                  <p className="text-muted-foreground">Escaneja el codi QR de la Raspberry Pi per accedir al control de potència.</p>
                  
                  <button
                    onClick={handleStartScan}
                    disabled={scanStatus === "scanning"}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-3 overflow-hidden relative group"
                  >
                    {scanStatus === "scanning" ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <QrCode className="w-5 h-5" />
                        Inicia Escaneig de Seguretat
                      </>
                    )}
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            
            /* ─── IOT DASHBOARD PANEL ─── */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              
              {/* Device Main Info (Glassmorphism) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card/60 backdrop-blur-2xl border border-border rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6">
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">RPi Status: Online</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-12 pt-4">
                    {/* Ring Chart SVG */}
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted/30" />
                        <motion.circle
                          cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                          strokeDasharray={553}
                          animate={{ strokeDashoffset: 553 - (status.watts / 800) * 553 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="text-emerald-500 shadow-xl"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-4xl font-black">{Math.round(status.watts)}</span>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Watts</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-6 text-center md:text-left">
                      <div>
                        <h3 className="text-muted-foreground font-bold uppercase text-xs tracking-widest mb-1 flex items-center justify-center md:justify-start gap-2">
                          <Leaf className="w-3 h-3 text-emerald-500" />
                          Impacte Ambiental Estalviat
                        </h3>
                        <div className="flex items-baseline justify-center md:justify-start gap-2">
                          <motion.span className="text-5xl font-black text-emerald-500">
                            {status.co2Saved.toFixed(4)}
                          </motion.span>
                          <span className="text-xl font-bold text-muted-foreground">kg CO₂</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 border border-border rounded-2xl">
                          <Activity className="w-4 h-4 text-emerald-500 mb-2" />
                          <p className="text-[10px] text-muted-foreground uppercase font-black">Xarxa</p>
                          <p className="text-lg font-bold">Estable</p>
                        </div>
                        <div className="p-4 bg-muted/50 border border-border rounded-2xl">
                          <Cpu className="w-4 h-4 text-emerald-500 mb-2" />
                          <p className="text-[10px] text-muted-foreground uppercase font-black">CPU Load</p>
                          <p className="text-lg font-bold">12%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mode Selector */}
                  <div className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-6">
                    <h4 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2 uppercase tracking-widest">
                      <Settings className="w-4 h-4" />
                      Mode de Funcionament
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {(["Normal", "Eco", "Reposo"] as OperationMode[]).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => {
                            sendCommand(`SET_MODE_${mode.toUpperCase()}`);
                            setStatus(prev => ({ ...prev, mode }));
                          }}
                          className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                            status.mode === mode 
                              ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/40" 
                              : "bg-muted border-border hover:border-emerald-500/50"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hardware Switch */}
                  <div className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-6 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Interruptor PDU</h4>
                      <p className="text-xs text-muted-foreground mt-1">Control directe d'alimentació</p>
                    </div>
                    <button
                      onClick={() => {
                        sendCommand(status.isActive ? "POWER_OFF" : "POWER_ON");
                        setStatus(prev => ({ ...prev, isActive: !prev.isActive }));
                      }}
                      className={`w-20 h-10 rounded-full transition-all relative p-1 ${
                        status.isActive ? "bg-emerald-600" : "bg-muted-foreground/30"
                      }`}
                    >
                      <motion.div
                        className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
                        animate={{ x: status.isActive ? 40 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Power className={`w-4 h-4 ${status.isActive ? "text-emerald-600" : "text-slate-400"}`} />
                      </motion.div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-white group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                  <ShieldCheck className="w-10 h-10 mb-4 opacity-80" />
                  <h3 className="text-2xl font-black tracking-tight leading-tight mb-2">Seguretat Certificada</h3>
                  <p className="text-emerald-100/70 text-sm leading-relaxed mb-6">La teva connexió amb l'RPi-01 està xifrada de punta a punta mitjançant protocols industrials AES-256.</p>
                  <div className="flex items-center gap-3 py-2 px-4 bg-white/20 rounded-full w-fit">
                    <LinkIcon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Token Actiu</span>
                  </div>
                </div>

                <div className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-6">
                  <h4 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Eficiència del Sistema</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-bold">Consum Estimant (24h)</span>
                      <span className="text-sm font-black">10.2 kWh</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
                      <TrendingDown className="w-3 h-3" />
                      -15% menys que ahir
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isConnecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="bg-card p-6 rounded-2xl border border-emerald-500/30 flex flex-col items-center gap-4 shadow-2xl">
              <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin" />
              <p className="text-sm font-bold tracking-widest text-emerald-400 uppercase">Enviant Comandament...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
