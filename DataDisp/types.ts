export interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  wind_speed: number;
  clouds: number;
}

export interface ForecastItem {
  dt: number;
  temp: number;
  description: string;
  icon: string;
  date: string;
}

export interface LocationCoords {
  latitude: number;
  longitude: number;
}
