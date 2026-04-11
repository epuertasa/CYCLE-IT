import { useParams } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { equipments } from "@/data/equipments";
import { motion } from "framer-motion";
import { Leaf, Zap, MapPin, AlertCircle, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler
} from 'chart.js';
import { useTheme } from "next-themes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const equipment = equipments.find((e) => e.id === id);

  if (!equipment) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold" data-testid="text-not-found">{t("dashboard.notFound")}</h2>
      </div>
    );
  }

  const isDark = theme === "dark";

  const chartData = {
    labels: equipment.dailyConsumption.map((d) => d.day),
    datasets: [
      {
        label: t("dashboard.dailyChart"),
        data: equipment.dailyConsumption.map((d) => d.kwh),
        borderColor: isDark ? "hsl(160 84% 45%)" : "hsl(160 84% 39%)",
        backgroundColor: isDark ? "hsla(160, 84%, 45%, 0.1)" : "hsla(160, 84%, 39%, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" },
        ticks: { color: isDark ? "#aaa" : "#666" }
      },
      x: {
        grid: { display: false },
        ticks: { color: isDark ? "#aaa" : "#666" }
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500 text-white";
      case "idle": return "bg-amber-500 text-white";
      case "off": return "bg-slate-500 text-white";
      default: return "bg-slate-500 text-white";
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-eq-name">{equipment.name}</h1>
          <p className="text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="w-4 h-4" /> {equipment.location}
          </p>
        </div>
        <Badge className={`text-sm px-3 py-1 ${getStatusColor(equipment.status)}`} data-testid="badge-status">
          {t(`dashboard.${equipment.status}` as any)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="h-full bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Leaf className="w-5 h-5" />
                {t("dashboard.co2Saved")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-foreground tabular-nums">
                {equipment.co2SavedKg.toFixed(1)} <span className="text-2xl text-muted-foreground">kg</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                {t("dashboard.consumption")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-foreground tabular-nums">
                {equipment.powerWatts} <span className="text-2xl text-muted-foreground">W</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              {t("dashboard.efficiency")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Score</span>
              <span>{equipment.efficiencyScore}/100</span>
            </div>
            <Progress value={equipment.efficiencyScore} className="h-3" />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.dailyChart")}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}