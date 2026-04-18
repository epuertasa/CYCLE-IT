import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Leaf, 
  Power, 
  Settings, 
  RefreshCw, 
  QrCode, 
  Sun, 
  Thermometer, 
  Plus, 
  Minus,
  TrendingDown,
  TrendingUp,
  Activity,
  Wind,
  Droplets,
  Cpu
} from "lucide-react";

/* ─── Main Component ─── */
export default function AulaVerdaCentralHub() {
  // States
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // IoT States
  const [watts, setWatts] = useState(420);
  const [co2Saved, setCo2Saved] = useState(74.42);
  const [brightness, setBrightness] = useState(75);
  const [temperature, setTemperature] = useState(22.5);
  const [isMainPowerOn, setIsMainPowerOn] = useState(true);
  const [efficiency, setEfficiency] = useState<"up" | "down">("up");

  // Simulated Connection
  const handleUnlock = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsUnlocked(true);
    }, 1500);
  };

  // Real-time Data Update Effect
  useEffect(() => {
    if (!isMainPowerOn || !isUnlocked) return;
    const interval = setInterval(() => {
      const newWatts = 380 + Math.random() * 80;
      setWatts(newWatts);
      setCo2Saved(prev => prev + (newWatts < 420 ? 0.0025 : 0.001));
      setEfficiency(newWatts < 420 ? "up" : "down");
    }, 2500);
    return () => clearInterval(interval);
  }, [isMainPowerOn, isUnlocked]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-all duration-700">
      
      {/* ─── Hero Banner "Ultra Professional" ─── */}
      <section className="relative h-[45vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070')] bg-cover bg-center brightness-[0.2] contrast-125 scale-110" />
          
          {/* Ambient Light Effects */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>
        
        <motion.div 
          className="relative z-20 text-center space-y-6 px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em]">Project: CYCLE-IT Hub</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-tight drop-shadow-2xl">
            Cicla l'Energia.<br/>
            <span className="text-emerald-500 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">Domina l'Aula Verda.</span>
          </h1>
          <p className="max-w-xl mx-auto text-white/50 text-lg font-medium leading-relaxed">
            Sistemes de monitorització avançada i control biomètric per a infraestructures d'Aula Verda 4.0.
          </p>
        </motion.div>
      </section>

      <main className="container mx-auto px-4 -mt-24 md:-mt-32 pb-32 relative z-30">
        <AnimatePresence mode="wait">
          
          {!isUnlocked ? (
            /* ─── AUTH ZONE ─── */
            <motion.div 
              key="auth"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-card/40 backdrop-blur-3xl border border-border/50 rounded-[2.5rem] p-8 md:p-16 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)] text-center space-y-10 group overflow-hidden relative">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700" />
                
                <div className="relative">
                  <div className="w-28 h-28 mx-auto relative flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-3xl" />
                    <div className="absolute inset-2 border border-emerald-500/40 rounded-2xl" />
                    <QrCode className="w-12 h-12 text-emerald-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-black tracking-tight">Accés al Terminal</h2>
                  <p className="text-muted-foreground leading-relaxed">Conecta amb el concentrador IoT per gestionar l'Aula Verda.</p>
                </div>

                <button
                  onClick={handleUnlock}
                  disabled={isConnecting}
                  className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-900/20 disabled:bg-muted/50 flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                >
                  {isConnecting ? (
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Zap className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      Inicia Sincronització IoT
                    </>
                  )}
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </button>
              </div>
            </motion.div>

          ) : (
            /* ─── DASHBOARD GRID ─── */
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              
              {/* WIDGET 1: Gestor d'Impacte i Energía */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card/40 backdrop-blur-3xl border border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden overflow-visible">
                  
                  {/* Status Bar */}
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                        <Zap className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black leading-none">Gestió d'Energia</h3>
                        <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mt-1">Sistemes de control</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {isMainPowerOn && (
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                          <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                          <span className="text-xs font-black text-emerald-500 uppercase">En viu</span>
                        </div>
                      )}
                      <button 
                        onClick={() => setIsMainPowerOn(!isMainPowerOn)}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isMainPowerOn ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-muted text-muted-foreground'}`}
                      >
                        <Power className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Ring Chart Metric */}
                    <div className="relative w-56 h-56 flex items-center justify-center group">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-muted/10" />
                        <motion.circle
                          cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="16" fill="transparent"
                          strokeDasharray={628.3}
                          animate={{ strokeDashoffset: 628.3 - (watts / 800) * 628.3 }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="text-emerald-500"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <motion.span 
                          key={Math.round(watts)}
                          initial={{ opacity: 0.5, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-5xl font-black block"
                        >
                          {Math.round(watts)}
                        </motion.span>
                        <span className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">Watts</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-8 text-center md:text-left w-full">
                      <div className="relative">
                        <h4 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                          <Leaf className="w-4 h-4 text-emerald-500" />
                          CO₂ estalviat avui
                        </h4>
                        <div className="flex items-baseline justify-center md:justify-start gap-3">
                          <motion.span 
                            className="text-6xl font-black text-emerald-500 tracking-tighter"
                            animate={{ scale: [1, 1.01, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            {co2Saved.toFixed(2)}
                          </motion.span>
                          <span className="text-xl font-bold text-muted-foreground">kg</span>
                        </div>
                        
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg mt-4 ${efficiency === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>
                          {efficiency === "up" ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                          <span className="text-xs font-black uppercase">
                            {efficiency === "up" ? "Alta Eficiència" : "Consum Elevat"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/40 border border-border/50 rounded-3xl">
                          <Cpu className="w-4 h-4 text-emerald-500 mb-2" />
                          <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">Processador</p>
                          <p className="text-xl font-black">12%</p>
                        </div>
                        <div className="p-4 bg-muted/40 border border-border/50 rounded-3xl">
                          <Activity className="w-4 h-4 text-emerald-500 mb-2" />
                          <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">Latència</p>
                          <p className="text-xl font-black">28ms</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                  {/* WIDGET 2: Il·luminació Avançada */}
                  <div className="bg-card/40 backdrop-blur-3xl border border-border/50 rounded-[2.5rem] p-8 shadow-xl">
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-500">
                        <Sun className="w-6 h-6" />
                      </div>
                      <button 
                        onClick={() => setBrightness(0)}
                        className="text-xs font-black text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors"
                      >
                        Apagar
                      </button>
                    </div>
                    
                    <h4 className="text-lg font-black mb-1">Il·luminació</h4>
                    <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-8">Panells de l'aula</p>
                    
                    <div className="space-y-8">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-bold">Intensity</span>
                        <span className="font-black text-xl">{brightness}%</span>
                      </div>
                      <div className="relative group/range">
                        <input 
                          type="range" min="0" max="100" value={brightness} 
                          onChange={(e) => setBrightness(parseInt(e.target.value))}
                          className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-emerald-500 group-hover/range:h-3 transition-all"
                        />
                      </div>
                      <div className="flex gap-2">
                        {[30, 60, 100].map(v => (
                          <button 
                            key={v} onClick={() => setBrightness(v)}
                            className={`flex-1 py-3 rounded-2xl border text-xs font-black tracking-widest uppercase transition-all ${brightness === v ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-900/20' : 'bg-transparent border-border/50 text-muted-foreground'}`}
                          >
                            {v}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* WIDGET 3: Climatització Industrial */}
                  <div className="bg-card/40 backdrop-blur-3xl border border-border/50 rounded-[2.5rem] p-8 shadow-xl">
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-500">
                        <Thermometer className="w-6 h-6" />
                      </div>
                      <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <span className="text-xs font-black text-emerald-500 uppercase">Auto</span>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-black mb-1">Climatització</h4>
                    <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-8">Temperatura ambiental</p>
                    
                    <div className="flex items-center justify-between gap-6 px-2">
                      <button 
                        onClick={() => setTemperature(t => Math.max(16, t - 0.5))}
                        className="w-14 h-14 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center transition-all shadow-md group/btn"
                      >
                        <Minus className="w-5 h-5 group-btn:scale-125" />
                      </button>
                      <div className="text-center flex-1">
                        <span className="text-5xl font-black tracking-tighter leading-none">{temperature.toFixed(1)}<span className="text-2xl text-muted-foreground -mt-4 ml-1">°</span></span>
                      </div>
                      <button 
                        onClick={() => setTemperature(t => Math.min(30, t + 0.5))}
                        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-emerald-900/10 group/btn"
                      >
                        <Plus className="w-5 h-5 group-btn:scale-125" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="flex items-center gap-3 p-3 bg-muted/20 border border-border/30 rounded-[1.5rem]">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        <div>
                          <p className="text-xs font-black text-muted-foreground uppercase">Humitat</p>
                          <p className="text-sm font-black">48%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/20 border border-border/30 rounded-[1.5rem]">
                        <Wind className="w-4 h-4 text-emerald-400" />
                        <div>
                          <p className="text-xs font-black text-muted-foreground uppercase">Aire</p>
                          <p className="text-sm font-black">Normal</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDEBAR: Metrics & Status */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-[2.5rem] p-10 shadow-3xl text-white relative overflow-hidden group">
                  <div className="absolute -top-20 -right-20 w-52 h-52 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                  <Settings className="w-10 h-10 mb-6 opacity-80" />
                  <h4 className="text-2xl font-black leading-tight mb-4 tracking-tight">Optimització <br/>Industrial</h4>
                  <p className="text-white/70 text-sm leading-relaxed mb-10 font-medium">El sistema està ajustant automàticament els cicles de potència per estalviar un 12% més que ahir.</p>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-white/60">
                      <span>Energia Renovable</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Limpio */}
      <footer className="container mx-auto px-4 py-20 border-t border-border opacity-40 mt-10">
        <div className="flex justify-center items-center text-xs font-black uppercase tracking-[0.4em]">
          <span>© 2026 CYCLE-IT • Aula Verda</span>
        </div>
      </footer>

    </div>
  );
}
