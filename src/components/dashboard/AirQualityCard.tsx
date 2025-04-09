
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AirQualityData, getAirQualityCategory, getAirQualityDescription } from "@/services/airQualityService";
import { Skeleton } from "@/components/ui/skeleton";
import { Wind, Droplets, AlertTriangle } from "lucide-react";

interface AirQualityCardProps {
  data: AirQualityData | undefined;
  isLoading: boolean;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({ data, isLoading }) => {
  if (isLoading || !data) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const aqiCategory = getAirQualityCategory(data.aqi);
  
  // Color mapping based on AQI category
  const aqiCategoryColors = {
    good: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
      progress: "bg-green-500"
    },
    moderate: {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      border: "border-yellow-200",
      progress: "bg-yellow-500"
    },
    unhealthy: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
      progress: "bg-orange-500"
    },
    hazardous: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-200",
      progress: "bg-red-500"
    }
  };
  
  const formattedTimestamp = new Date(data.timestamp).toLocaleString();
  const aqiDescription = getAirQualityDescription(data.aqi);

  return (
    <Card className={`shadow-lg ${aqiCategoryColors[aqiCategory].bg} ${aqiCategoryColors[aqiCategory].border}`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-lg font-medium ${aqiCategoryColors[aqiCategory].text}`}>
          Air Quality - {data.location}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">{data.aqi}</span>
            <span className="ml-2 text-sm text-muted-foreground">AQI</span>
          </div>
          
          <p className={`text-sm ${aqiCategoryColors[aqiCategory].text}`}>
            {aqiDescription}
          </p>
          
          <Progress 
            value={(data.aqi / 300) * 100} 
            className="h-2" 
            indicatorClassName={aqiCategoryColors[aqiCategory].progress} 
          />
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-white/80 p-2 rounded border">
              <div className="flex items-center mb-1">
                <Wind className="h-4 w-4 mr-1 text-blue-500" />
                <span className="text-xs font-medium">PM2.5</span>
              </div>
              <div className="text-sm font-semibold">{data.pm25} µg/m³</div>
            </div>
            
            <div className="bg-white/80 p-2 rounded border">
              <div className="flex items-center mb-1">
                <Wind className="h-4 w-4 mr-1 text-blue-500" />
                <span className="text-xs font-medium">PM10</span>
              </div>
              <div className="text-sm font-semibold">{data.pm10} µg/m³</div>
            </div>
            
            <div className="bg-white/80 p-2 rounded border">
              <div className="flex items-center mb-1">
                <Droplets className="h-4 w-4 mr-1 text-blue-500" />
                <span className="text-xs font-medium">O₃</span>
              </div>
              <div className="text-sm font-semibold">{data.o3} ppb</div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            Last updated: {formattedTimestamp}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityCard;
