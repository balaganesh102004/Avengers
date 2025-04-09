import { toast } from "sonner";

// Types for air quality data
export interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
  timestamp: string;
  location: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';
  timestamp: string;
}

export interface AirQualityRecommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'ventilation' | 'purification' | 'behavior' | 'environment';
}

// Mock data for development
const mockAirQualityData: AirQualityData[] = [
  {
    aqi: 42,
    pm25: 12.5,
    pm10: 25.3,
    o3: 38.2,
    no2: 15.7,
    so2: 5.2,
    co: 0.8,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    location: 'Living Room'
  },
  {
    aqi: 35,
    pm25: 10.1,
    pm10: 22.4,
    o3: 35.6,
    no2: 12.3,
    so2: 4.7,
    co: 0.7,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    location: 'Living Room'
  },
  {
    aqi: 50,
    pm25: 15.6,
    pm10: 28.9,
    o3: 42.1,
    no2: 18.3,
    so2: 6.4,
    co: 0.9,
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    location: 'Living Room'
  },
  {
    aqi: 28,
    pm25: 8.2,
    pm10: 18.5,
    o3: 30.2,
    no2: 10.8,
    so2: 3.9,
    co: 0.6,
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    location: 'Living Room'
  },
  {
    aqi: 60,
    pm25: 18.9,
    pm10: 32.7,
    o3: 45.8,
    no2: 22.4,
    so2: 7.8,
    co: 1.1,
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    location: 'Living Room'
  },
  {
    aqi: 31,
    pm25: 9.4,
    pm10: 20.1,
    o3: 33.7,
    no2: 11.5,
    so2: 4.2,
    co: 0.7,
    timestamp: new Date().toISOString(),
    location: 'Living Room'
  }
];

const mockWeatherData: WeatherData = {
  temperature: 22.5,
  humidity: 45,
  windSpeed: 3.2,
  windDirection: 'NE',
  condition: 'sunny',
  timestamp: new Date().toISOString()
};

const mockRecommendations: AirQualityRecommendation[] = [
  {
    id: '1',
    title: 'Open windows for 15 minutes',
    description: 'Indoor CO2 levels are rising. Open windows to improve air circulation.',
    impact: 'high',
    category: 'ventilation'
  },
  {
    id: '2',
    title: 'Replace air purifier filter',
    description: 'Your air purifier filter has been running for 3 months. Consider replacing it for optimal performance.',
    impact: 'medium',
    category: 'purification'
  },
  {
    id: '3',
    title: 'Run air purifier on high',
    description: 'Outdoor pollution levels are elevated. Run your air purifier on high setting for the next 2 hours.',
    impact: 'high',
    category: 'purification'
  },
  {
    id: '4',
    title: 'Vacuum with HEPA filter',
    description: 'Dust levels are increasing. Vacuum using a HEPA filter vacuum to reduce particulate matter.',
    impact: 'medium',
    category: 'behavior'
  },
  {
    id: '5',
    title: 'Add air-purifying plants',
    description: 'Consider adding more spider plants or peace lilies to naturally filter indoor air.',
    impact: 'low',
    category: 'environment'
  }
];

// Function to get current air quality data
export const getCurrentAirQuality = async (): Promise<AirQualityData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // In a real app, this would be an API call
    return mockAirQualityData[mockAirQualityData.length - 1];
  } catch (error) {
    console.error('Failed to fetch air quality data:', error);
    toast.error('Failed to fetch air quality data');
    throw error;
  }
};

// Function to get historical air quality data
export const getHistoricalAirQuality = async (): Promise<AirQualityData[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // In a real app, this would be an API call
    return mockAirQualityData;
  } catch (error) {
    console.error('Failed to fetch historical air quality data:', error);
    toast.error('Failed to fetch historical air quality data');
    throw error;
  }
};

// Function to get current weather data
export const getCurrentWeather = async (): Promise<WeatherData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  try {
    // In a real app, this would be an API call
    return mockWeatherData;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    toast.error('Failed to fetch weather data');
    throw error;
  }
};

// Function to get air quality recommendations
export const getAirQualityRecommendations = async (): Promise<AirQualityRecommendation[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  try {
    // In a real app, this would be an API call that uses AI to generate recommendations
    return mockRecommendations;
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    toast.error('Failed to fetch recommendations');
    throw error;
  }
};

// Helper function to determine air quality category from AQI
export const getAirQualityCategory = (aqi: number): 'good' | 'moderate' | 'unhealthy' | 'hazardous' => {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'unhealthy';
  return 'hazardous';
};

// Helper function to get text description of air quality
export const getAirQualityDescription = (aqi: number): string => {
  const category = getAirQualityCategory(aqi);
  
  switch (category) {
    case 'good':
      return 'Good air quality - Enjoy your activities';
    case 'moderate':
      return 'Moderate air quality - Consider reducing prolonged outdoor exertion';
    case 'unhealthy':
      return 'Unhealthy air quality - Reduce outdoor activities';
    case 'hazardous':
      return 'Hazardous air quality - Avoid outdoor activities';
    default:
      return 'Unable to determine air quality';
  }
};
