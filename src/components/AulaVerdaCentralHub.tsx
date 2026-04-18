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
  Lightbulb,
  Wifi,
  Database
} from "lucide-react";

/* ─── Main Component ─── */
export default function AulaVerdaCentralHub() {
  // States
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // IoT States
  const [watts, setWatts] = useState(384);
  const [co2Saved, setCo2Saved] = useState(89.42);
  const [brightness, setBrightness] = useState(80);
  const [temperature, setTemperature] = useState(22.5);
  const [isMainPowerOn, setIsMainPowerOn] = useState(true);

  // Simulación de conexión
  const handleUnlock = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsUnlocked(true);
    }, 2000);
  };

  // Efecto de actualización de datos IoT en tiempo real
  useEffect(() => {
    if (!isMainPowerOn || !isUnlocked) return;
    const interval = setInterval(() => {
      setWatts(prev => 350 + Math.random() * 50);
      setCo2Saved(prev => prev + 0.0001);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMainPowerOn, isUnlocked]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 font-sans">
      
      {/* ─── Hero Banner "Eco-Industrial" ─── */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950 z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070')] bg-cover bg-center mix-blend-overlay opacity-40 brightness-50" />
        </div>
        
        <motion.div 
          className="relative z-20 text-center space-y-4 px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black tracking-[0.3em] uppercase border border-emerald-500/20 rounded-full mb-4 inline-block">
            IoT Central Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Cicla l'Energia.<br/>
            <span className="text-emerald-500">Domina l'Aula Verda.</span>
          </h1>
          <p className="max-w-md mx-auto text-slate-400 font-medium">
            Control total de la infraestructura sostenible en temps real.
          </p>
        </motion.div>
      </section>

      <main className="container mx-auto px-4 -mt-20 pb-20 relative z-30">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            
            /* ─── ACCES ZONE (SCANNER) ─── */
            <motion.div 
              key="auth"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl text-center space-y-8">
                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <QrCode className="w-10 h-10 text-emerald-500" />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-black tracking-tight text-white">Validació de Seguretat</h2>
                  <p className="text-slate-400 text-sm">Escaneja el codi del concentrador per desbloquejar els controls de l'Aula Verda.</p>
                  
                  <button
                    onClick={handleUnlock}
                    disabled={isConnecting}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20 disabled:bg-slate-800"
                  >
                    {isConnecting ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Wifi className="w-5 h-5" />
                        Vincular amb Aula Verda
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

          ) : (
            
            /* ─── GRID DE WIDGETS ─── */
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              
              {/* Widget 1: Gestor Energètic */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-emerald-500/30 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <Zap className="w-6 h-6 text-emerald-500" />
                  </div>
                  <button 
                    onClick={() => setIsMainPowerOn(!isMainPowerOn)}
                    className={`p-2 rounded-lg transition-all ${isMainPowerOn ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}
                  >
                    <Power className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-lg font-black text-white mb-1">Gestor Energètic</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-6">Infraestructura RPi</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-400 text-sm">Consum Actual</span>
                    <span className="text-2xl font-black text-white">{Math.round(watts)}<span className="text-xs text-slate-500 ml-1">W</span></span>
                  </div>
                  <div className="flex justify-between items-baseline border-t border-slate-900 pt-4">
                    <span className="text-slate-400 text-sm">CO₂ Mitigat</span>
                    <span className="text-lg font-black text-emerald-400">{co2Saved.toFixed(3)}<span className="text-xs ml-1 font-bold">kg</span></span>
                  </div>
                </div>
              </div>

              {/* Widget 2: Il·luminació */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-emerald-500/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-yellow-500/10 rounded-xl">
                    <Sun className="w-6 h-6 text-yellow-500" />
                  </div>
                  <button 
                    onClick={() => setBrightness(0)}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                  >
                    Apagar Totes
                  </button>
                </div>
                
                <h3 className="text-lg font-black text-white mb-1">Il·luminació</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-6">Panells LED Intel·ligents</p>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Brillantor</span>
                    <span className="text-white font-black">{brightness}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={brightness} 
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex gap-2">
                    {[20, 50, 100].map(val => (
                      <button 
                        key={val}
                        onClick={() => setBrightness(val)}
                        className={`flex-1 py-1.5 rounded-lg border text-[10px] font-black uppercase transition-all ${brightness === val ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-transparent border-slate-800 text-slate-500'}`}
                      >
                        {val}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Widget 3: Climatització */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-emerald-500/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Thermometer className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="px-2 py-1 bg-slate-900 rounded-lg border border-slate-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-slate-300 uppercase">Auto</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-black text-white mb-1">Climatització</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-6">Ventilació Passiva</p>
                
                <div className="flex items-center justify-between gap-4">
                  <button 
                    onClick={() => setTemperature(p => p - 0.5)}
                    className="p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
                  >
                    <Minus className="w-5 h-5 text-white" />
                  </button>
                  
                  <div className="text-center flex-1">
                    <span className="text-4xl font-black text-white">{temperature.toFixed(1)}<span className="text-xl text-slate-500">°</span></span>
                  </div>

                  <button 
                    onClick={() => setTemperature(p => p + 0.5)}
                    className="p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-900 text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Humidity</p>
                    <p className="text-sm font-bold text-white">45%</p>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-900 text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Air Quality</p>
                    <p className="text-sm font-bold text-emerald-400">Excellent</p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Industrial */}
      <footer className="container mx-auto px-4 py-12 border-t border-slate-900">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 grayscale hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-4">
            <Database className="w-5 h-5 text-slate-400" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Log System: Active</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold text-slate-500 tracking-tighter">NODE-A1: ONLINE</span>
            <span className="text-[10px] font-bold text-slate-500 tracking-tighter">NODE-A2: ONLINE</span>
            <span className="text-[10px] font-bold text-slate-500 tracking-tighter">RPI-GATEWAY: READY</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
