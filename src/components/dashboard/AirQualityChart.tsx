
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AirQualityData } from "@/services/airQualityService";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format, parseISO } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface AirQualityChartProps {
  data?: AirQualityData[];
  isLoading?: boolean;
}

const AirQualityChart: React.FC<AirQualityChartProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  const chartData = data
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .map((item) => ({
      ...item,
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
        <div className="bg-white p-2 rounded-md shadow border border-gray-200 text-sm">
          <p className="font-semibold">{label}</p>
          <p className="text-gray-600">AQI: {data.aqi}</p>
          <p className="text-gray-600">PM2.5: {data.pm25} µg/m³</p>
          <p className="text-gray-600">PM10: {data.pm10} µg/m³</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Historical Air Quality</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="formattedTime" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#e0e0e0" }}
                domain={[0, 'dataMax + 10']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ fill: "#0ea5e9", r: 4 }}
                activeDot={{ r: 6, fill: "#0284c7" }}
              />
              <Line
                type="monotone"
                dataKey="pm25"
                stroke="#64748b"
                strokeWidth={2}
                dot={{ fill: "#64748b", r: 4 }}
                activeDot={{ r: 6, fill: "#475569" }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityChart;
