import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Link } from "wouter";
import { Cpu, ShieldCheck, Leaf, TrendingDown, Eye, Activity, Server, LayoutDashboard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AulaVerde() {
  const { t } = useTranslation();
  
  const [pcs, setPcs] = useState<number>(10);
  const [hours, setHours] = useState<number>(12);

  const kwhSaved = Math.round(pcs * hours * 0.08 * 365);
  const eurosSaved = Math.round(kwhSaved * 0.20);
  const co2Saved = Math.round(kwhSaved * 0.25);

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Cpu className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {t("aula_verde.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("aula_verde.subtitle")}
          </p>
        </section>

        {/* Concept Image / Render 3D */}
        <section className="rounded-xl overflow-hidden shadow-2xl border border-border">
          <img
            src="/aula_verde.png"
            alt="Render 3D del Espacio Sostenible"
            className="w-full h-auto object-cover aspect-video hover:scale-[1.02] transition-transform duration-700"
          />
        </section>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Concept text */}
          <div className="bg-card text-card-foreground rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center space-x-3 mb-4">
              <Cpu className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("aula_verde.conceptTitle")}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t("aula_verde.conceptText")}
            </p>
          </div>

          {/* Safety text */}
          <div className="bg-card text-card-foreground rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center space-x-3 mb-4">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
              <h2 className="text-2xl font-bold">{t("aula_verde.safetyTitle")}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t("aula_verde.safetyText")}
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <section className="pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/50 p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors group">
              <Leaf className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl mb-2">{t("aula_verde.benefit1.title")}</h3>
              <p className="text-muted-foreground text-sm">{t("aula_verde.benefit1.desc")}</p>
            </div>
            <div className="bg-card/50 p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors group">
              <TrendingDown className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl mb-2">{t("aula_verde.benefit2.title")}</h3>
              <p className="text-muted-foreground text-sm">{t("aula_verde.benefit2.desc")}</p>
            </div>
            <div className="bg-card/50 p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors group">
              <Eye className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl mb-2">{t("aula_verde.benefit3.title")}</h3>
              <p className="text-muted-foreground text-sm">{t("aula_verde.benefit3.desc")}</p>
            </div>
          </div>
        </section>

        {/* Impact Calculator Section */}
        <section className="pt-8 pb-4">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20 shadow-inner text-card-foreground">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold inline-flex items-center space-x-3">
                <Activity className="h-8 w-8 text-primary" />
                <span>{t("aula_verde.calc.title")}</span>
              </h2>
              <p className="text-muted-foreground mt-2">{t("aula_verde.calc.desc")}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium flex justify-between">
                    <span>{t("aula_verde.calc.pcs")}</span>
                    <span className="text-primary font-bold">{pcs}</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={pcs} 
                    onChange={(e) => setPcs(Number(e.target.value))} 
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" 
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium flex justify-between">
                    <span>{t("aula_verde.calc.hours")}</span>
                    <span className="text-primary font-bold">{hours}h</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="24" 
                    value={hours} 
                    onChange={(e) => setHours(Number(e.target.value))} 
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-background rounded-xl p-6 border shadow-sm flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-black text-primary mb-1">{kwhSaved.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">{t("aula_verde.calc.kwh")}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-xl p-4 border shadow-sm flex flex-col items-center text-center">
                    <span className="text-2xl font-bold text-emerald-500 mb-1">{eurosSaved.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">{t("aula_verde.calc.euros")}</span>
                  </div>
                  <div className="bg-background rounded-xl p-4 border shadow-sm flex flex-col items-center text-center">
                    <span className="text-2xl font-bold text-blue-500 mb-1">{co2Saved.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">{t("aula_verde.calc.co2")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="pt-8 pb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">{t("aula_verde.workflow.title")}</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative">
             {/* Line that connects items on large screens */}
             <div className="hidden lg:block absolute top-[40%] left-10 right-10 h-1 bg-border z-0"></div>

             {/* Steps */}
             {([
               { icon: Activity, tTitle: "aula_verde.wf1.title", tDesc: "aula_verde.wf1.desc" },
               { icon: Server, tTitle: "aula_verde.wf2.title", tDesc: "aula_verde.wf2.desc" },
               { icon: LayoutDashboard, tTitle: "aula_verde.wf3.title", tDesc: "aula_verde.wf3.desc" },
             ] as const).map((sf, idx) => (
                <div key={idx} className="bg-background relative z-10 p-6 rounded-xl border w-full lg:w-1/3 shadow-sm h-full mx-2 flex flex-col items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <sf.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{t(sf.tTitle)}</h4>
                  <p className="text-sm text-muted-foreground">{t(sf.tDesc)}</p>
                </div>
             ))}
          </div>

          <div className="mt-12 flex justify-center">
             <Button size="lg" className="shadow-lg hover:shadow-primary/30" asChild>
               <Link href="/rpi-script">
                 <Cpu className="mr-2 h-5 w-5" />
                 {t("aula_verde.wf.btn")}
                 <ArrowRight className="ml-2 h-4 w-4" />
               </Link>
             </Button>
          </div>
        </section>

        {/* Technical Details FAQ */}
        <section className="pt-4 pb-12">
          <div className="bg-card text-card-foreground rounded-xl p-8 border border-border shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Server className="h-6 w-6 text-primary mr-3" />
              {t("aula_verde.faq.title")}
            </h2>
            <div className="space-y-6">
              {([
                { q: "aula_verde.faq.q1", a: "aula_verde.faq.a1" },
                { q: "aula_verde.faq.q2", a: "aula_verde.faq.a2" },
                { q: "aula_verde.faq.q3", a: "aula_verde.faq.a3" },
              ] as const).map((faq, i) => (
                <div key={i} className="pb-4 border-b border-border last:border-0 last:pb-0">
                  <h3 className="font-semibold text-lg mb-2">{t(faq.q)}</h3>
                  <p className="text-muted-foreground">{t(faq.a)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
