
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AirQualityData, HistoricalAirQualityData } from "@/services/airQualityService";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { format, parseISO } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface AirQualityChartProps {
  data?: HistoricalAirQualityData | AirQualityData[];
  isLoading?: boolean;
}

const AirQualityChart: React.FC<AirQualityChartProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="bg-white shadow-md border border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  // Process the data depending on its format
  const chartData = Array.isArray(data) 
    ? data.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map((item) => ({
          ...item,
          formattedTime: format(parseISO(item.timestamp), "h:mm a"),
        }))
    : data.data.map(item => ({
        aqi: item.aqi,
        timestamp: item.timestamp,
        formattedTime: format(parseISO(item.timestamp), "h:mm a"),
      }));

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "#4ade80";
    if (aqi <= 100) return "#fbbf24";
    if (aqi <= 150) return "#fb7185";
    return "#ef4444";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-md shadow-lg border border-gray-200 text-sm">
          <p className="font-semibold text-gray-800">{label}</p>
          <div className="mt-2 space-y-1">
            <p className="text-gray-700 flex justify-between">
              <span>AQI:</span> 
              <span className="font-medium">{data.aqi}</span>
            </p>
            {data.pm25 && (
              <p className="text-gray-700 flex justify-between">
                <span>PM2.5:</span> 
                <span className="font-medium">{data.pm25} µg/m³</span>
              </p>
            )}
            {data.pm10 && (
              <p className="text-gray-700 flex justify-between">
                <span>PM10:</span> 
                <span className="font-medium">{data.pm10} µg/m³</span>
              </p>
            )}
            {data.o3 && (
              <p className="text-gray-700 flex justify-between">
                <span>O₃:</span> 
                <span className="font-medium">{data.o3} ppb</span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white shadow-md border border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-gray-800">Historical AQI Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="formattedTime" 
                tick={{ fontSize: 12, fill: "#6b7280" }} 
                tickLine={{ stroke: "#e0e0e0" }}
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickLine={{ stroke: "#e0e0e0" }}
                axisLine={{ stroke: "#e0e0e0" }}
                domain={[0, 'dataMax + 20']}
                label={{ value: 'AQI Value', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Line
                type="monotone"
                name="AQI"
                dataKey="aqi"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4, strokeWidth: 1, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
              />
              {chartData[0]?.pm25 && (
                <Line
                  type="monotone"
                  name="PM2.5"
                  dataKey="pm25"
                  stroke="#64748b"
                  strokeWidth={2}
                  dot={{ fill: "#64748b", r: 3 }}
                  activeDot={{ r: 5, fill: "#475569" }}
                  strokeDasharray="5 5"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityChart;
