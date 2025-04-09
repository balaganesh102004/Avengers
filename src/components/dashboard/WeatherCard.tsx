
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/services/airQualityService";
import { Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Wind, Droplets, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherCardProps {
  data?: WeatherData;
  isLoading?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Skeleton className="h-16 w-16 rounded-full" />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-16 w-16 text-yellow-500 animate-pulse-slow" />;
      case 'cloudy':
        return <Cloud className="h-16 w-16 text-gray-400 animate-pulse-slow" />;
      case 'rainy':
        return <CloudRain className="h-16 w-16 text-blue-400 animate-pulse-slow" />;
      case 'stormy':
        return <CloudLightning className="h-16 w-16 text-purple-500 animate-pulse-slow" />;
      case 'snowy':
        return <CloudSnow className="h-16 w-16 text-cyan-300 animate-pulse-slow" />;
      default:
        return <Sun className="h-16 w-16 text-yellow-500 animate-pulse-slow" />;
    }
  };

  return (
    <Card className="glass-card overflow-hidden">
      <div className="h-1 bg-sky-500" />
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Current Weather</span>
          <span className="text-sm rounded-full px-3 py-1 bg-sky-100 text-sky-800">
            {data.condition.charAt(0).toUpperCase() + data.condition.slice(1)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center">
          {getWeatherIcon(data.condition)}
          <span className="text-3xl font-bold mt-2">{data.temperature}°C</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex flex-col items-center justify-center p-2 bg-white/60 rounded-lg border border-gray-100">
            <Thermometer className="h-5 w-5 text-red-500 mb-1" />
            <span className="text-xs text-gray-500">Feels like</span>
            <span className="font-semibold">{(data.temperature - 1).toFixed(1)}°C</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 bg-white/60 rounded-lg border border-gray-100">
            <Droplets className="h-5 w-5 text-blue-500 mb-1" />
            <span className="text-xs text-gray-500">Humidity</span>
            <span className="font-semibold">{data.humidity}%</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 bg-white/60 rounded-lg border border-gray-100">
            <Wind className="h-5 w-5 text-sky-600 mb-1" />
            <span className="text-xs text-gray-500">Wind</span>
            <span className="font-semibold">{data.windSpeed} m/s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
