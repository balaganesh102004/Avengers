import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AirQualityData, getAirQualityCategory, getAirQualityDescription } from "@/services/airQualityService";
import { Wind, Droplets, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface AirQualityCardProps {
  data?: AirQualityData;
  isLoading?: boolean;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-8 w-full rounded-full" />
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

  const aqiCategory = getAirQualityCategory(data.aqi);
  const aqiDescription = getAirQualityDescription(data.aqi);

  const aqiCategoryColors = {
    good: {
      bg: "bg-green-100",
      text: "text-green-800",
      progress: "bg-green-500",
    },
    moderate: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      progress: "bg-yellow-500",
    },
    unhealthy: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      progress: "bg-orange-500",
    },
    hazardous: {
      bg: "bg-red-100",
      text: "text-red-800",
      progress: "bg-red-500",
    },
  };

  return (
    <Card className="glass-card overflow-hidden">
      <div className={cn("h-1", aqiCategoryColors[aqiCategory].progress)} />
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Air Quality Index</span>
          <span 
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium",
              aqiCategoryColors[aqiCategory].bg,
              aqiCategoryColors[aqiCategory].text
            )}
          >
            {data.aqi} AQI
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className={cn("text-sm", aqiCategoryColors[aqiCategory].text)}>
          {aqiDescription}
        </p>
        
        <Progress 
          value={(data.aqi / 300) * 100} 
          className="h-2" 
          indicator={aqiCategoryColors[aqiCategory].progress} 
        />
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex flex-col items-center justify-center p-2 bg-white/60 rounded-lg border border-gray-100">
            <Droplets className="h-5 w-5 text-sky-600 mb-1" />
            <span className="text-xs text-gray-500">Humidity</span>
            <span className="font-semibold">{data.pm25} µg/m³</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 bg-white/60 rounded-lg border border-gray-100">
            <Wind className="h-5 w-5 text-sky-600 mb-1" />
            <span className="text-xs text-gray-500">Particles</span>
            <span className="font-semibold">{data.pm10} µg/m³</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 bg-white/60 rounded-lg border border-gray-100">
            <Activity className="h-5 w-5 text-sky-600 mb-1" />
            <span className="text-xs text-gray-500">Ozone</span>
            <span className="font-semibold">{data.o3} ppb</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityCard;
