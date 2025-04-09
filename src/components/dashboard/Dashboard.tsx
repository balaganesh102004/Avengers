
import React, { useState } from "react";
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
import { Airplay, RefreshCw, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface LocationFormValues {
  location: string;
}

const Dashboard: React.FC = () => {
  const [location, setLocation] = useState("Living Room");

  const form = useForm<LocationFormValues>({
    defaultValues: {
      location: "Living Room"
    }
  });

  const { 
    data: currentAirQuality,
    isLoading: isLoadingCurrent,
    refetch: refetchCurrent
  } = useQuery({
    queryKey: ['currentAirQuality', location],
    queryFn: () => getCurrentAirQuality(location)
  });

  const { 
    data: historicalAirQuality,
    isLoading: isLoadingHistorical,
    refetch: refetchHistorical
  } = useQuery({
    queryKey: ['historicalAirQuality', location],
    queryFn: () => getHistoricalAirQuality(location)
  });

  const { 
    data: weatherData,
    isLoading: isLoadingWeather,
    refetch: refetchWeather
  } = useQuery({
    queryKey: ['weatherData', location],
    queryFn: () => getCurrentWeather(location)
  });

  const { 
    data: recommendations,
    isLoading: isLoadingRecommendations,
    refetch: refetchRecommendations
  } = useQuery({
    queryKey: ['recommendations', location],
    queryFn: () => getAirQualityRecommendations(location)
  });

  const refreshAllData = () => {
    refetchCurrent();
    refetchHistorical();
    refetchWeather();
    refetchRecommendations();
    toast.success("Data refreshed successfully!");
  };

  const onSubmit = (data: LocationFormValues) => {
    setLocation(data.location);
    toast.success(`Location updated to ${data.location}`);
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

      <div className="mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-grow">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input 
                          placeholder="Enter location (e.g., Living Room, Bedroom)" 
                          className="pl-10" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Update Location</span>
            </Button>
          </form>
        </Form>
        <p className="text-sm text-muted-foreground mt-2">
          Current location: <span className="font-medium text-primary">{location}</span>
        </p>
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
