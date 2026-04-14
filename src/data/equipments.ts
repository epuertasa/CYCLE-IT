export interface Equipment {
  id: string;
  name: string;
  type: "computer" | "monitor" | "projector" | "raspberry" | "arduino";
  powerWatts: number;
  co2SavedKg: number;
  status: "active" | "idle" | "off";
  dailyConsumption: { day: string; kwh: number }[];
  location: string;
  efficiencyScore: number;
}

export const equipments: Equipment[] = [
  {
    id: "PC-001",
    name: "Ordinador 01",
    type: "computer",
    powerWatts: 65,
    co2SavedKg: 12.4,
    status: "active",
    dailyConsumption: [
      { day: "Dl", kwh: 0.52 },
      { day: "Dt", kwh: 0.45 },
      { day: "Dc", kwh: 0.61 },
      { day: "Dj", kwh: 0.38 },
      { day: "Dv", kwh: 0.55 },
      { day: "Ds", kwh: 0.12 },
      { day: "Dg", kwh: 0.08 },
    ],
    location: "Fila A, Taula 1",
    efficiencyScore: 87,
  },
  {
    id: "PC-002",
    name: "Ordinador 02",
    type: "computer",
    powerWatts: 65,
    co2SavedKg: 10.1,
    status: "idle",
    dailyConsumption: [
      { day: "Dl", kwh: 0.48 },
      { day: "Dt", kwh: 0.52 },
      { day: "Dc", kwh: 0.44 },
      { day: "Dj", kwh: 0.50 },
      { day: "Dv", kwh: 0.46 },
      { day: "Ds", kwh: 0.05 },
      { day: "Dg", kwh: 0.03 },
    ],
    location: "Fila A, Taula 2",
    efficiencyScore: 79,
  },
  {
    id: "MON-001",
    name: 'Monitor LED 27"',
    type: "monitor",
    powerWatts: 24,
    co2SavedKg: 5.8,
    status: "active",
    dailyConsumption: [
      { day: "Dl", kwh: 0.19 },
      { day: "Dt", kwh: 0.21 },
      { day: "Dc", kwh: 0.18 },
      { day: "Dj", kwh: 0.22 },
      { day: "Dv", kwh: 0.20 },
      { day: "Ds", kwh: 0.04 },
      { day: "Dg", kwh: 0.02 },
    ],
    location: "Fila A, Taula 1",
    efficiencyScore: 94,
  },
  {
    id: "PROJ-001",
    name: "Projector Epson",
    type: "projector",
    powerWatts: 210,
    co2SavedKg: 3.2,
    status: "idle",
    dailyConsumption: [
      { day: "Dl", kwh: 0.84 },
      { day: "Dt", kwh: 0.63 },
      { day: "Dc", kwh: 1.05 },
      { day: "Dj", kwh: 0.42 },
      { day: "Dv", kwh: 0.84 },
      { day: "Ds", kwh: 0.00 },
      { day: "Dg", kwh: 0.00 },
    ],
    location: "Paret frontal",
    efficiencyScore: 52,
  },
  {
    id: "RPI-001",
    name: "Raspberry Pi 4",
    type: "raspberry",
    powerWatts: 6,
    co2SavedKg: 18.7,
    status: "active",
    dailyConsumption: [
      { day: "Dl", kwh: 0.05 },
      { day: "Dt", kwh: 0.05 },
      { day: "Dc", kwh: 0.05 },
      { day: "Dj", kwh: 0.05 },
      { day: "Dv", kwh: 0.05 },
      { day: "Ds", kwh: 0.05 },
      { day: "Dg", kwh: 0.05 },
    ],
    location: "Armari IoT",
    efficiencyScore: 99,
  },
  {
    id: "ARD-001",
    name: "Arduino UNO",
    type: "arduino",
    powerWatts: 0.5,
    co2SavedKg: 21.3,
    status: "active",
    dailyConsumption: [
      { day: "Dl", kwh: 0.004 },
      { day: "Dt", kwh: 0.004 },
      { day: "Dc", kwh: 0.004 },
      { day: "Dj", kwh: 0.004 },
      { day: "Dv", kwh: 0.004 },
      { day: "Ds", kwh: 0.002 },
      { day: "Dg", kwh: 0.001 },
    ],
    location: "Armari IoT",
    efficiencyScore: 100,
  },
];

export const totalCO2Saved = equipments.reduce((sum, e) => sum + e.co2SavedKg, 0);
