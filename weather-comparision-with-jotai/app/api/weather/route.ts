import { NextResponse } from 'next/server';
import axios from 'axios';
import { WeatherData } from '@/types/weather';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * GET Handler for Weather API
 * 
 * Proxies requests to the OpenWeatherMap API to fetch current weather data.
 * This server-side route hides the API key from the client.
 * 
 * @param {Request} request - The incoming request object containing the city parameter.
 * @returns {Promise<NextResponse>} JSON response with weather data or error message.
 * 
 * Query Parameters:
 * - city: The name of the city to fetch weather for.
 * 
 * Behavior:
 * - Checks for 'city' parameter; returns 400 if missing.
 * - Checks for API_KEY; returns mock data if missing (development mode).
 * - Fetches data from OpenWeatherMap API.
 * - Normalizes the response to match the application's `WeatherData` interface.
 * - Handles 404 errors (City not found) and other API errors gracefully.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
  }

  // Debug log
  console.log(`Fetching weather for: ${city}`);

  if (!API_KEY) {
    // Return mock data if no API key is present
    console.warn('No API key found, returning mock data');
    const mockData: WeatherData = {
      city: city,
      temp: 20 + Math.random() * 10,
      humidity: 50 + Math.random() * 20,
      windSpeed: 5 + Math.random() * 5,
      condition: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
      icon: '01d'
    };
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json(mockData);
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

    const normalizedData: WeatherData = {
      city: data.name,
      temp: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
    };

    return NextResponse.json(normalizedData);
  } catch (error: any) {
    // Detailed error logging
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message;
    console.error(`Weather API Error for ${city}:`, status, message);
    console.error('Full error:', error.response?.data);

    if (status === 404) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}
