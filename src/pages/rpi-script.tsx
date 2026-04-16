import { useTranslation } from "@/hooks/use-translation";
import { Download, Terminal, Cpu, Network, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RpiScript() {
  const { t } = useTranslation();

  const steps = [
    {
      title: t("rpi.step1.title"),
      desc: t("rpi.step1.desc"),
      icon: <Download className="w-8 h-8 text-primary" />,
    },
    {
      title: t("rpi.step2.title"),
      desc: t("rpi.step2.desc"),
      icon: <Network className="w-8 h-8 text-primary" />,
      snippet: "scp rpi-energy-saver.py pi@192.168.1.50:~/"
    },
    {
      title: t("rpi.step3.title"),
      desc: t("rpi.step3.desc"),
      icon: <Cpu className="w-8 h-8 text-primary" />,
      snippet: "nano rpi-energy-saver.py\n# Modifica PC_IP = '...'"
    },
    {
      title: t("rpi.step4.title"),
      desc: t("rpi.step4.desc"),
      icon: <Terminal className="w-8 h-8 text-primary" />,
      snippet: "nohup python3 rpi-energy-saver.py &"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="p-4 bg-primary/10 rounded-full mb-4 ring-1 ring-primary/20">
          <Terminal className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-foreground">
          {t("rpi.title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {t("rpi.subtitle")}
        </p>
      </div>

      <div className="bg-card border shadow-sm rounded-xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        {/* Subtle background element */}
        <div className="absolute opacity-[0.03] top-[-50px] right-[-50px] pointer-events-none">
          <Cpu className="w-64 h-64" />
        </div>
        
        <div className="flex-1 z-10">
          <h2 className="text-2xl font-bold mb-2">rpi-energy-saver.py</h2>
          <p className="text-muted-foreground">
            Aquest fitxer inclou tota la lògica per monitoritzar la xarxa local des de la Pi. 
            És completament de codi obert i no requereix més dependències que Python 3.
          </p>
        </div>
        
        <div className="z-10 shrink-0">
          <Button size="lg" className="w-full md:w-auto font-bold tracking-wide shadow-lg hover:shadow-primary/25 transition-all text-base" asChild>
            <a href="/rpi-energy-saver.py" download="rpi-energy-saver.py">
              <Download className="mr-2 w-5 h-5" />
              {t("rpi.downloadBtn")}
            </a>
          </Button>
        </div>
      </div>

      {/* Zona de vídeo explicatiu introduïda abans dels passos */}
      <div className="mb-16">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Videotutorial en acció</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              T'ho ensenyem visualment. Descobreix com preparar i desplegar el script dins de la Raspberry Pi en qüestió de minuts.
            </p>
        </div>
        <div className="relative aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] ring-1 ring-primary/20 bg-black group">
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/1WDagiA8fdU" 
            title="Raspberry Pi Setup Tutorial" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center mb-10">Instal·lació pas a pas</h2>
        
        <div className="flex flex-col gap-6">
          {steps.map((step, index) => (
            <div 
               key={index} 
               className="bg-card p-6 rounded-xl border shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6 transform transition-transform hover:-translate-y-1"
            >
               <div className="bg-primary/5 p-4 rounded-full border border-primary/10 shrink-0">
                 {step.icon}
               </div>
               <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
               </div>
               {step.snippet && (
                 <div className="w-full md:w-auto bg-black/90 dark:bg-black/50 text-green-400 p-4 rounded-lg font-mono text-sm shadow-inner shrink-0 md:min-w-[320px] overflow-x-auto border border-white/10">
                   <pre><code>{step.snippet}</code></pre>
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
