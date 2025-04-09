
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

// Mock data for different locations
const mockLocations = {
  "Living Room": {
    airQualityData: [
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
    ],
    weatherData: {
      temperature: 22.5,
      humidity: 45,
      windSpeed: 3.2,
      windDirection: 'NE',
      condition: 'sunny',
      timestamp: new Date().toISOString()
    }
  },
  "Bedroom": {
    airQualityData: [
      {
        aqi: 38,
        pm25: 11.2,
        pm10: 23.1,
        o3: 36.5,
        no2: 14.2,
        so2: 4.8,
        co: 0.7,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        location: 'Bedroom'
      },
      {
        aqi: 32,
        pm25: 9.5,
        pm10: 20.8,
        o3: 33.1,
        no2: 11.9,
        so2: 4.3,
        co: 0.6,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        location: 'Bedroom'
      },
      {
        aqi: 45,
        pm25: 14.2,
        pm10: 26.7,
        o3: 40.3,
        no2: 17.1,
        so2: 5.9,
        co: 0.8,
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        location: 'Bedroom'
      },
      {
        aqi: 25,
        pm25: 7.8,
        pm10: 17.2,
        o3: 28.5,
        no2: 9.7,
        so2: 3.5,
        co: 0.5,
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        location: 'Bedroom'
      },
      {
        aqi: 52,
        pm25: 16.5,
        pm10: 29.4,
        o3: 43.2,
        no2: 19.8,
        so2: 6.7,
        co: 0.9,
        timestamp: new Date(Date.now() - 18000000).toISOString(),
        location: 'Bedroom'
      },
      {
        aqi: 28,
        pm25: 8.7,
        pm10: 18.9,
        o3: 31.4,
        no2: 10.6,
        so2: 3.8,
        co: 0.6,
        timestamp: new Date().toISOString(),
        location: 'Bedroom'
      }
    ],
    weatherData: {
      temperature: 21.8,
      humidity: 42,
      windSpeed: 2.8,
      windDirection: 'N',
      condition: 'cloudy',
      timestamp: new Date().toISOString()
    }
  },
  "Kitchen": {
    airQualityData: [
      {
        aqi: 48,
        pm25: 14.8,
        pm10: 27.9,
        o3: 41.5,
        no2: 18.3,
        so2: 6.2,
        co: 0.9,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        location: 'Kitchen'
      },
      {
        aqi: 40,
        pm25: 12.3,
        pm10: 24.6,
        o3: 38.4,
        no2: 15.9,
        so2: 5.5,
        co: 0.8,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        location: 'Kitchen'
      },
      {
        aqi: 57,
        pm25: 17.9,
        pm10: 31.2,
        o3: 46.8,
        no2: 21.7,
        so2: 7.1,
        co: 1.0,
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        location: 'Kitchen'
      },
      {
        aqi: 35,
        pm25: 10.6,
        pm10: 21.7,
        o3: 34.9,
        no2: 13.5,
        so2: 4.6,
        co: 0.7,
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        location: 'Kitchen'
      },
      {
        aqi: 68,
        pm25: 21.3,
        pm10: 35.7,
        o3: 49.5,
        no2: 24.6,
        so2: 8.3,
        co: 1.2,
        timestamp: new Date(Date.now() - 18000000).toISOString(),
        location: 'Kitchen'
      },
      {
        aqi: 43,
        pm25: 13.5,
        pm10: 25.8,
        o3: 39.7,
        no2: 16.8,
        so2: 5.7,
        co: 0.8,
        timestamp: new Date().toISOString(),
        location: 'Kitchen'
      }
    ],
    weatherData: {
      temperature: 23.2,
      humidity: 48,
      windSpeed: 3.5,
      windDirection: 'E',
      condition: 'sunny',
      timestamp: new Date().toISOString()
    }
  }
};

// Recommendations are the same regardless of location for now
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

// Generate mock data for a new location if it doesn't exist
const generateMockDataForLocation = (location: string): typeof mockLocations.Bedroom => {
  console.log(`Generating mock data for new location: ${location}`);
  
  // Create historical data points
  const airQualityData = Array(6).fill(null).map((_, index) => {
    const randomAQI = Math.floor(Math.random() * 80) + 20; // Random AQI between 20-100
    return {
      aqi: randomAQI,
      pm25: randomAQI * 0.3,
      pm10: randomAQI * 0.6,
      o3: randomAQI * 0.8,
      no2: randomAQI * 0.4,
      so2: randomAQI * 0.15,
      co: randomAQI * 0.02,
      timestamp: new Date(Date.now() - (index * 3600000)).toISOString(),
      location
    };
  });

  // Random weather conditions
  const conditions: Array<'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy'> = ['sunny', 'cloudy', 'rainy', 'stormy', 'snowy'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    airQualityData,
    weatherData: {
      temperature: Math.floor(Math.random() * 15) + 15, // 15-30°C
      humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
      windSpeed: Math.random() * 5 + 1, // 1-6 m/s
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      condition: randomCondition,
      timestamp: new Date().toISOString()
    }
  };
};

// Function to get current air quality data for a specific location
export const getCurrentAirQuality = async (location: string = "Living Room"): Promise<AirQualityData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // In a real app, this would be an API call with the location parameter
    if (!mockLocations[location as keyof typeof mockLocations]) {
      // If location doesn't exist in our mock data, generate it
      mockLocations[location as keyof typeof mockLocations] = generateMockDataForLocation(location);
    }
    
    const locationData = mockLocations[location as keyof typeof mockLocations];
    return locationData.airQualityData[locationData.airQualityData.length - 1];
  } catch (error) {
    console.error('Failed to fetch air quality data:', error);
    toast.error('Failed to fetch air quality data');
    throw error;
  }
};

// Function to get historical air quality data for a specific location
export const getHistoricalAirQuality = async (location: string = "Living Room"): Promise<AirQualityData[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // In a real app, this would be an API call with the location parameter
    if (!mockLocations[location as keyof typeof mockLocations]) {
      // If location doesn't exist in our mock data, generate it
      mockLocations[location as keyof typeof mockLocations] = generateMockDataForLocation(location);
    }
    
    return mockLocations[location as keyof typeof mockLocations].airQualityData;
  } catch (error) {
    console.error('Failed to fetch historical air quality data:', error);
    toast.error('Failed to fetch historical air quality data');
    throw error;
  }
};

// Function to get current weather data for a specific location
export const getCurrentWeather = async (location: string = "Living Room"): Promise<WeatherData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  try {
    // In a real app, this would be an API call with the location parameter
    if (!mockLocations[location as keyof typeof mockLocations]) {
      // If location doesn't exist in our mock data, generate it
      mockLocations[location as keyof typeof mockLocations] = generateMockDataForLocation(location);
    }
    
    return mockLocations[location as keyof typeof mockLocations].weatherData;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    toast.error('Failed to fetch weather data');
    throw error;
  }
};

// Function to get air quality recommendations
export const getAirQualityRecommendations = async (location: string = "Living Room"): Promise<AirQualityRecommendation[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  try {
    // In a real app, this would be an AI-driven API call that generates recommendations based on location
    // For now, we'll return the same recommendations for all locations
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
