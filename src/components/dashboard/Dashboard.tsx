
import React, { useState, useEffect } from "react";
import AirQualityCard from "./AirQualityCard";
import WeatherCard from "./WeatherCard";
import AirQualityChart from "./AirQualityChart";
import RecommendationsCard from "./RecommendationsCard";
import {
  getCurrentAirQuality,
  getHistoricalAirQuality,
  getCurrentWeather,
  getAirQualityRecommendations,
  AirQualityData,
  WeatherData,
  AirQualityRecommendation
} from "@/services/airQualityService";
import { useQuery } from "@tanstack/react-query";
import { Airplay, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const { 
    data: currentAirQuality,
    isLoading: isLoadingCurrent,
    refetch: refetchCurrent
  } = useQuery({
    queryKey: ['currentAirQuality'],
    queryFn: getCurrentAirQuality
  });

  const { 
    data: historicalAirQuality,
    isLoading: isLoadingHistorical,
    refetch: refetchHistorical
  } = useQuery({
    queryKey: ['historicalAirQuality'],
    queryFn: getHistoricalAirQuality
  });

  const { 
    data: weatherData,
    isLoading: isLoadingWeather,
    refetch: refetchWeather
  } = useQuery({
    queryKey: ['weatherData'],
    queryFn: getCurrentWeather
  });

  const { 
    data: recommendations,
    isLoading: isLoadingRecommendations,
    refetch: refetchRecommendations
  } = useQuery({
    queryKey: ['recommendations'],
    queryFn: getAirQualityRecommendations
  });

  const refreshAllData = () => {
    refetchCurrent();
    refetchHistorical();
    refetchWeather();
    refetchRecommendations();
    toast.success("Data refreshed successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <Airplay className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">AI Air Quality System</h1>
        </div>
        <Button 
          onClick={refreshAllData} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Data</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <AirQualityCard data={currentAirQuality} isLoading={isLoadingCurrent} />
        <WeatherCard data={weatherData} isLoading={isLoadingWeather} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AirQualityChart data={historicalAirQuality} isLoading={isLoadingHistorical} />
        <RecommendationsCard data={recommendations} isLoading={isLoadingRecommendations} />
      </div>
    </div>
  );
};

export default Dashboard;
