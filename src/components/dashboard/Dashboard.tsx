import React, { useState } from "react";
import AirQualityCard from "./AirQualityCard";
import WeatherCard from "./WeatherCard";
import AirQualityChart from "./AirQualityChart";
import RecommendationsCard from "./RecommendationsCard";
import PollutionMap from "./PollutionMap";
import {
  getCurrentAirQuality,
  getHistoricalAirQuality,
  getCurrentWeather,
  getAirQualityRecommendations,
  AirQualityRecommendation,
} from "@/services/airQualityService";
import { useQuery } from "@tanstack/react-query";
import { Airplay, RefreshCw, MapPin, Search, Info, AlertTriangle, Thermometer, Wind, Droplets, Brain, Map, Factory, Car, TrafficCone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
    data: recommendationsResponse,
    isLoading: isLoadingRecommendations,
    refetch: refetchRecommendations
  } = useQuery({
    queryKey: ['recommendations', location],
    queryFn: () => getAirQualityRecommendations(location)
  });

  const recommendations = recommendationsResponse?.recommendations;

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

  const getCategoryColor = (aqi: number) => {
    if (aqi <= 50) return "bg-green-500";
    if (aqi <= 100) return "bg-yellow-500";
    if (aqi <= 150) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Airplay className="h-8 w-8 mr-2" />
              <h1 className="text-2xl font-bold">AQI.in Clone - Air Quality Index</h1>
            </div>
            <Button 
              onClick={refreshAllData} 
              variant="outline" 
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border-white/50"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Data</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-blue-700 py-6 px-4 shadow-md">
        <div className="container mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-3 md:items-end">
              <div className="flex-grow">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                        <FormControl>
                          <Input 
                            placeholder="Enter location (e.g., Delhi, Mumbai, Bangalore)" 
                            className="pl-10 h-12 rounded-md text-base" 
                            {...field} 
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="flex items-center gap-2 h-12 bg-green-600 hover:bg-green-700">
                <Search className="h-5 w-5" />
                <span>Check Air Quality</span>
              </Button>
            </form>
          </Form>
          <p className="text-sm text-white/80 mt-2">
            Current location: <span className="font-medium text-white">{location}</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-3">
            <Info className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Air Quality Index Scale</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-md p-3 bg-green-100 border border-green-200">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="font-medium text-green-800">Good (0-50)</span>
              </div>
              <p className="text-xs mt-1 text-green-700">Air quality is satisfactory</p>
            </div>
            <div className="rounded-md p-3 bg-yellow-100 border border-yellow-200">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                <span className="font-medium text-yellow-800">Moderate (51-100)</span>
              </div>
              <p className="text-xs mt-1 text-yellow-700">Acceptable quality</p>
            </div>
            <div className="rounded-md p-3 bg-orange-100 border border-orange-200">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                <span className="font-medium text-orange-800">Unhealthy (101-150)</span>
              </div>
              <p className="text-xs mt-1 text-orange-700">Everyone may begin to experience health effects</p>
            </div>
            <div className="rounded-md p-3 bg-red-100 border border-red-200">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                <span className="font-medium text-red-800">Hazardous (151+)</span>
              </div>
              <p className="text-xs mt-1 text-red-700">Health alert: everyone may experience serious health effects</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
              Current Air Quality
            </h2>
            <AirQualityCard data={currentAirQuality} isLoading={isLoadingCurrent} />
          </div>
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <Thermometer className="h-5 w-5 text-blue-500 mr-2" />
              Weather Conditions
            </h2>
            <WeatherCard data={weatherData} isLoading={isLoadingWeather} />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <Map className="h-5 w-5 text-blue-500 mr-2" />
            Pollution Map
          </h2>
          <PollutionMap location={location} isLoading={isLoadingCurrent} />
        </div>

        {currentAirQuality && !isLoadingCurrent && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <Wind className="h-5 w-5 text-blue-500 mr-2" />
              Detailed Air Quality Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <div className="flex items-center mb-2">
                  <Droplets className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium text-blue-800">PM2.5</h3>
                </div>
                <p className="text-2xl font-bold text-blue-900">{currentAirQuality.pm25} <span className="text-sm font-normal">µg/m³</span></p>
                <p className="text-xs text-blue-700 mt-1">Fine particulate matter</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100">
                <div className="flex items-center mb-2">
                  <Wind className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="font-medium text-indigo-800">PM10</h3>
                </div>
                <p className="text-2xl font-bold text-indigo-900">{currentAirQuality.pm10} <span className="text-sm font-normal">µg/m³</span></p>
                <p className="text-xs text-indigo-700 mt-1">Coarse particulate matter</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-md border border-teal-100">
                <div className="flex items-center mb-2">
                  <Wind className="h-5 w-5 text-teal-600 mr-2" />
                  <h3 className="font-medium text-teal-800">O₃</h3>
                </div>
                <p className="text-2xl font-bold text-teal-900">{currentAirQuality.o3} <span className="text-sm font-normal">ppb</span></p>
                <p className="text-xs text-teal-700 mt-1">Ozone</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-md border border-purple-100">
                <div className="flex items-center mb-2">
                  <Wind className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="font-medium text-purple-800">NO₂</h3>
                </div>
                <p className="text-2xl font-bold text-purple-900">{currentAirQuality.no2} <span className="text-sm font-normal">ppb</span></p>
                <p className="text-xs text-purple-700 mt-1">Nitrogen dioxide</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <Wind className="h-5 w-5 text-blue-500 mr-2" />
              Air Quality History
            </h2>
            <AirQualityChart data={historicalAirQuality} isLoading={isLoadingHistorical} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <div className="flex items-center">
                <Brain className="h-5 w-5 text-blue-500 mr-1" />
                <Factory className="h-5 w-5 text-slate-500 mr-1" />
                <Car className="h-5 w-5 text-indigo-500 mr-2" />
              </div>
              Recommendations & Preemptive Measures
            </h2>
            <RecommendationsCard data={recommendations} isLoading={isLoadingRecommendations} />
          </div>
        </div>

        <div className="mt-12 py-4 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>© 2025 AQI.in Clone. Air Quality data for information purposes only.</p>
          <p className="mt-1">
            <a href="#" className="text-blue-500 hover:underline mr-4">About</a>
            <a href="#" className="text-blue-500 hover:underline mr-4">FAQ</a>
            <a href="#" className="text-blue-500 hover:underline">Contact</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
