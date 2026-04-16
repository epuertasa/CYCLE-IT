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
    },
    {
      title: t("rpi.step3.title"),
      desc: t("rpi.step3.desc"),
      icon: <Cpu className="w-8 h-8 text-primary" />,
    },
    {
      title: t("rpi.step4.title"),
      desc: t("rpi.step4.desc"),
      icon: <Terminal className="w-8 h-8 text-primary" />,
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

      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center mb-10">Instal·lació pas a pas</h2>
        
        <div className="grid md:grid-cols-2 gap-6 relative">
          {/* Timeline connecting line for desktop view */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/50 to-transparent -translate-x-1/2 z-0"></div>

          {steps.map((step, index) => (
            <div 
               key={index} 
               className={`bg-card p-6 rounded-xl border shadow-sm flex flex-col items-start gap-4 transform transition-transform hover:-translate-y-1 relative z-10 ${index % 2 === 0 ? "md:mr-6" : "md:ml-6 md:mt-24"}`}
            >
               <div className="bg-primary/5 p-3 rounded-2xl border border-primary/10 inline-flex">
                 {step.icon}
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
