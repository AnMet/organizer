export type WeatherSnapshot = {
  condition: string; // e.g. 'Sunny'
  icon: string; // e.g. '☀️'
  temperature: {
    min: number;
    max: number;
    unit: "C" | "F";
  };
  humidity: number;
  wind: {
    speed: number;
    direction: string;
  };
};
