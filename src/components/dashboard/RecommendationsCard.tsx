
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AirQualityRecommendation } from "@/services/airQualityService";
import { Wind, Droplets, Brain, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface RecommendationsCardProps {
  data?: AirQualityRecommendation[];
  isLoading?: boolean;
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start space-x-2 p-3 rounded-lg">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ventilation':
        return <Wind className="h-6 w-6 text-blue-500" />;
      case 'purification':
        return <Droplets className="h-6 w-6 text-green-500" />;
      case 'behavior':
        return <Brain className="h-6 w-6 text-purple-500" />;
      case 'environment':
        return <Lightbulb className="h-6 w-6 text-yellow-500" />;
      default:
        return <Lightbulb className="h-6 w-6 text-blue-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return "bg-green-100 text-green-800 border-green-200";
      case 'medium':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'low':
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 text-primary mr-2" />
          <span>AI Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
        {data.map((recommendation) => (
          <div 
            key={recommendation.id} 
            className="flex items-start space-x-3 p-3 rounded-lg bg-white/60 border border-gray-100 hover:bg-white/80 transition-colors"
          >
            <div className="flex-shrink-0 pt-1">
              {getCategoryIcon(recommendation.category)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                <Badge variant="outline" className={cn("text-xs", getImpactColor(recommendation.impact))}>
                  {recommendation.impact} impact
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{recommendation.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;
