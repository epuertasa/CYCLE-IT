import { useTranslation } from "@/hooks/use-translation";
import { Cpu, ShieldCheck } from "lucide-react";

export default function AulaVerde() {
  const { t } = useTranslation();

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

      </div>
    </div>
  );
}
