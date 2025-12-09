import axios from 'axios';
import { WeatherData, ForecastItem, LocationCoords } from './types';

// API key is loaded from environment variables
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (
  coords: LocationCoords
): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: coords.latitude,
        lon: coords.longitude,
        appid: API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;
    return {
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      wind_speed: data.wind.speed,
      clouds: data.clouds.all,
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getCurrentWeatherByCity = async (
  cityName: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: cityName,
        appid: API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;
    return {
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      wind_speed: data.wind.speed,
      clouds: data.clouds.all,
    };
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    throw error;
  }
};

export const getForecast = async (
  coords: LocationCoords
): Promise<ForecastItem[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat: coords.latitude,
        lon: coords.longitude,
        appid: API_KEY,
        units: 'metric',
      },
    });

    // Get one forecast per day (every 8th item, as data is every 3 hours)
    const dailyForecasts = response.data.list.filter(
      (_: any, index: number) => index % 8 === 0
    ).slice(0, 5);

    return dailyForecasts.map((item: any) => ({
      dt: item.dt,
      temp: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      date: new Date(item.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    }));
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

export const getForecastByCity = async (
  cityName: string
): Promise<ForecastItem[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: cityName,
        appid: API_KEY,
        units: 'metric',
      },
    });

    // Get one forecast per day (every 8th item, as data is every 3 hours)
    const dailyForecasts = response.data.list.filter(
      (_: any, index: number) => index % 8 === 0
    ).slice(0, 5);

    return dailyForecasts.map((item: any) => ({
      dt: item.dt,
      temp: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      date: new Date(item.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    }));
  } catch (error) {
    console.error('Error fetching forecast by city:', error);
    throw error;
  }
};

export const getWeatherIconUrl = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
