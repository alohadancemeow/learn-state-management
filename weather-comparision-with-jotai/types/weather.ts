export interface WeatherData {
  city: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
}

export interface ForecastPoint {
  date: string; // YYYY-MM-DD
  temp: number;
  condition: string;
  icon: string;
}

export interface ForecastData {
  city: string;
  list: ForecastPoint[];
}

export interface City {
  name: string;
  country?: string;
}
