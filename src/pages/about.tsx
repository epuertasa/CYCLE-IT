import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { Shield, Cpu, Activity, Users, Mail, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Erik Puertas",
    role: { ca: "CEO & Founder", es: "CEO & Founder" },
    specialty: {
      ca: "Visió estratègica i gestió de projecte.",
      es: "Visión estratégica y gestión de proyecto.",
    },
  },
  {
    name: "Umar Sharif",
    role: { ca: "Co-Founder & CTO", es: "Co-Founder & CTO" },
    specialty: {
      ca: "Arquitectura tecnològica i sistemes IoT.",
      es: "Arquitectura tecnológica y sistemas IoT.",
    },
  },
  {
    name: "Luis de la Rosa",
    role: { ca: "Sostenibilitat", es: "Sostenibilidad" },
    specialty: {
      ca: "Anàlisi de dades i impacte ambiental.",
      es: "Análisis de datos e impacto ambiental.",
    },
  },
  {
    name: "Pablo Ávila",
    role: { ca: "Desenvolupament", es: "Desarrollo" },
    specialty: {
      ca: "Disseny d'interfície (UX/UI) i codi web.",
      es: "Diseño de interfaz (UX/UI) y código web.",
    },
  },
];

export default function About() {
  const { t, language } = useTranslation();

  return (
    <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold" data-testid="text-about-title">{t("about.title")}</h1>
        <p className="text-xl text-muted-foreground">{t("about.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                {t("about.iot")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              {language === "ca"
                ? "L'ecosistema IoT permet monitoritzar el consum en temps real. Cada dispositiu està connectat a una xarxa que registra l'energia utilitzada."
                : "El ecosistema IoT permite monitorizar el consumo en tiempo real. Cada dispositivo está conectado a una red que registra la energía utilizada."}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-secondary" />
                Raspberry Pi & Arduino
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed space-y-2">
              <p>{t("about.raspberry")}</p>
              <p>{t("about.arduino")}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Team Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              {t("team.title")}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{t("team.subtitle")}</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="table-team">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-6 font-semibold text-foreground">{t("team.col.name")}</th>
                    <th className="text-left py-3 pr-6 font-semibold text-foreground">{t("team.col.role")}</th>
                    <th className="text-left py-3 font-semibold text-foreground">{t("team.col.specialty")}</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member, index) => (
                    <motion.tr
                      key={member.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + index * 0.07 }}
                      className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
                      data-testid={`row-team-${index}`}
                    >
                      <td className="py-4 pr-6 font-semibold text-foreground">{member.name}</td>
                      <td className="py-4 pr-6 font-medium text-primary">{member.role[language]}</td>
                      <td className="py-4 text-muted-foreground">{member.specialty[language]}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              {t("contact.title")}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{t("contact.subtitle")}</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 bg-background border border-border rounded-lg px-4 py-3 flex-1 min-w-0">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground truncate" data-testid="text-contact-email">
                  cycleit@proton.me
                </span>
              </div>
              <a
                href="mailto:cycleit@proton.me"
                className="shrink-0 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                data-testid="button-contact-email"
              >
                <ExternalLink className="w-4 h-4" />
                {t("contact.cta")}
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Privacy / GDPR */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
        <Card className="border-border bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-foreground" />
              {t("about.privacy")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            <p>{t("about.gdpr")}</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
