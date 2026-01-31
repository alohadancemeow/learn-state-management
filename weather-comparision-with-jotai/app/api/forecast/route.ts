import { NextResponse } from 'next/server';
import axios from 'axios';
import { ForecastData, ForecastPoint } from '@/types/weather';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

/**
 * GET Handler for Forecast API
 * 
 * Proxies requests to the OpenWeatherMap Forecast API to fetch 5-day weather trends.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} JSON response with forecast data or error.
 * 
 * Query Parameters:
 * - city: The name of the city to fetch forecast for.
 * 
 * Logic:
 * - Fetches raw 3-hour interval data from OpenWeatherMap.
 * - Filters data to approximate daily readings (every 8th entry, ~24 hours).
 * - Returns a list of 5 daily forecast points.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
  }

  if (!API_KEY) {
    // Mock data
    const mockList: ForecastPoint[] = Array.from({ length: 5 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().split('T')[0],
        temp: 18 + Math.random() * 8,
        condition: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
        icon: '01d'
      };
    });

    return NextResponse.json({
      city: city,
      list: mockList
    });
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;

    // OpenWeather returns data every 3 hours. We want daily trends.
    // We'll pick one reading per day (e.g., closest to noon) or just map them.
    // For simplicity, let's just take the first entry of each day (every 8th entry roughly).

    const list: ForecastPoint[] = data.list
      .filter((_: any, index: number) => index % 8 === 0) // Roughly every 24 hours
      .slice(0, 5) // Take 5 days
      .map((item: any) => ({
        date: item.dt_txt.split(' ')[0],
        temp: item.main.temp,
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
      }));

    const normalizedData: ForecastData = {
      city: data.city.name,
      list: list,
    };

    return NextResponse.json(normalizedData);
  } catch (error: any) {
    console.error('Forecast API Error:', error.response?.data || error.message);
    if (error.response?.status === 404) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to fetch forecast data' }, { status: 500 });
  }
}
