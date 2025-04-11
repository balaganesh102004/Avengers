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
  category: "Good" | "Moderate" | "Unhealthy" | "Hazardous";
}

export interface HistoricalAirQualityData {
  data: Array<{
    aqi: number;
    timestamp: string;
  }>;
  location: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  condition: "sunny" | "cloudy" | "rainy" | "stormy" | "snowy";
  timestamp: string;
}

export interface AirQualityResponse {
  currentAQI: AirQualityData;
  weather: WeatherData;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: "Health" | "Activity" | "Home" | "Travel";
  importance: "Low" | "Medium" | "High";
}

export interface RecommendationsResponse {
  recommendations: Recommendation[];
  location: string;
  timestamp: string;
}

function getAqiCategory(aqi: number): "Good" | "Moderate" | "Unhealthy" | "Hazardous" {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy";
  return "Hazardous";
}

function generateMockAirQualityData(): Omit<AirQualityData, 'location' | 'timestamp'> {
  const aqi = Math.floor(Math.random() * 300); // Mock AQI value
  const category = getAqiCategory(aqi);
  
  return {
    aqi,
    pm25: Math.floor(Math.random() * 150),
    pm10: Math.floor(Math.random() * 200),
    o3: Math.floor(Math.random() * 100),
    no2: Math.floor(Math.random() * 50),
    so2: Math.floor(Math.random() * 30),
    co: Math.floor(Math.random() * 10),
    category
  };
}

// Ensure weather condition is properly typed
const weatherConditions: Array<"sunny" | "cloudy" | "rainy" | "stormy" | "snowy"> = [
  "sunny", "cloudy", "rainy", "stormy", "snowy"
];

function generateMockDataForLocation(location: string): AirQualityResponse {
  const { aqi, pm25, pm10, o3, no2, so2, co, category } = generateMockAirQualityData();

  // Historical data generation
  const historicalData = Array.from({ length: 24 }, (_, i) => {
    const variation = Math.floor(Math.random() * 20) - 10;
    return {
      aqi: aqi - variation,
      timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
    };
  });

  // Random weather conditions - using typed array to ensure correct types
  const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  
  return {
    currentAQI: {
      aqi,
      pm25,
      pm10,
      o3,
      no2,
      so2,
      co,
      timestamp: new Date().toISOString(),
      location,
      category
    },
    weather: {
      temperature: Math.floor(Math.random() * 25) + 10, // 10-35°C
      humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
      windSpeed: Math.random() * 5 + 1, // 1-6 m/s
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      condition: randomCondition,
      timestamp: new Date().toISOString()
    }
  };
}

export const getCurrentAirQuality = async (location: string): Promise<AirQualityData> => {
  try {
    await simulateNetworkDelay();
    const mockData = generateMockDataForLocation(location);
    return mockData.currentAQI;
  } catch (error) {
    console.error("Error fetching current air quality:", error);
    toast.error("Failed to fetch air quality data");
    throw error;
  }
};

export const getHistoricalAirQuality = async (location: string): Promise<HistoricalAirQualityData> => {
  try {
    await simulateNetworkDelay();
    const mockData = generateMockDataForLocation(location);
    
    // Extract historical data from mock data
    const historicalData = Array.from({ length: 24 }, (_, i) => {
      const variation = Math.floor(Math.random() * 20) - 10;
      const aqi = Math.max(0, Math.min(300, mockData.currentAQI.aqi - variation)); // Ensure AQI stays within 0-300 range
      return {
        aqi: aqi,
        timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
      };
    });

    return {
      data: historicalData,
      location: location
    };
  } catch (error) {
    console.error("Error fetching historical air quality:", error);
    toast.error("Failed to fetch historical air quality data");
    throw error;
  }
};

export const getCurrentWeather = async (location: string): Promise<WeatherData> => {
  try {
    await simulateNetworkDelay();
    const mockData = generateMockDataForLocation(location);
    return mockData.weather;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    toast.error("Failed to fetch weather data");
    throw error;
  }
};

export const getAirQualityRecommendations = async (location: string): Promise<RecommendationsResponse> => {
  try {
    await simulateNetworkDelay();
    const mockData = generateMockDataForLocation(location);
    const aqi = mockData.currentAQI.aqi;
    const category = mockData.currentAQI.category;

    const recommendations: Recommendation[] = [];

    if (category === "Unhealthy" || category === "Hazardous") {
      recommendations.push({
        id: "health-001",
        category: "Health",
        importance: "High",
        title: "Limit Outdoor Activities",
        description: "Air quality is unhealthy. Reduce prolonged or heavy exertion outdoors."
      });
    }

    if (category === "Hazardous") {
      recommendations.push({
        id: "health-002",
        category: "Health",
        importance: "High",
        title: "Stay Indoors",
        description: "Air quality is hazardous. Stay indoors and keep windows closed."
      });
    }

    recommendations.push({
      id: "home-001",
      category: "Home",
      importance: "Medium",
      title: "Use Air Purifier",
      description: "Using an air purifier can help improve indoor air quality."
    });

    if (aqi > 50) {
      recommendations.push({
        id: "activity-001",
        category: "Activity",
        importance: "Medium",
        title: "Choose Less Strenuous Activities",
        description: "On days with moderate to high AQI, opt for less intense physical activities."
      });
    }

    return {
      recommendations: recommendations,
      location: location,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error fetching air quality recommendations:", error);
    toast.error("Failed to fetch air quality recommendations");
    throw error;
  }
};

function simulateNetworkDelay(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 200));
}

function getAqiCategory(aqi: number): "Good" | "Moderate" | "Unhealthy" | "Hazardous" {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy";
  return "Hazardous";
}
