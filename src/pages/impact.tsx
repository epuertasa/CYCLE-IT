import { useTranslation } from "@/hooks/use-translation";
import { equipments, totalCO2Saved } from "@/data/equipments";
import { motion } from "framer-motion";
import { TreePine, Car, Plane, Home, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Impact() {
  const { t } = useTranslation();

  const trees = Math.floor(totalCO2Saved / 21);
  const cars = Math.floor(totalCO2Saved / 0.12);
  const flights = (totalCO2Saved / 255).toFixed(2);
  const homes = Math.floor(totalCO2Saved / 1);

  const sortedEquipments = [...equipments].sort((a, b) => b.efficiencyScore - a.efficiencyScore);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold" data-testid="text-impact-title">{t("impact.title")}</h1>
        <p className="text-xl text-muted-foreground">
          {totalCO2Saved.toFixed(1)} kg {t("home.totalCo2")}
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={item}>
          <Card className="h-full border-green-500/20 bg-green-500/5">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                <TreePine className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold">{trees}</div>
              <div className="text-sm text-muted-foreground">{t("impact.trees")}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full border-blue-500/20 bg-blue-500/5">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Car className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold">{cars}</div>
              <div className="text-sm text-muted-foreground">{t("impact.carKm")}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full border-purple-500/20 bg-purple-500/5">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Plane className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold">{flights}</div>
              <div className="text-sm text-muted-foreground">{t("impact.flights")}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Home className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold">{homes}</div>
              <div className="text-sm text-muted-foreground">{t("impact.homesDays")}</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              {t("impact.ranking")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sortedEquipments.map((eq, index) => (
                <div key={eq.id} className="flex items-center gap-4">
                  <div className="w-8 text-center font-bold text-muted-foreground">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{eq.name}</span>
                      <span className="text-sm text-muted-foreground">{eq.efficiencyScore}/100</span>
                    </div>
                    <Progress value={eq.efficiencyScore} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}