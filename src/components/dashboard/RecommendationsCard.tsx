
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AirQualityRecommendation } from "@/services/airQualityService";
import { Wind, Droplets, Brain, Lightbulb, Check, AlertTriangle, ShieldAlert, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface RecommendationsCardProps {
  data?: AirQualityRecommendation[];
  isLoading?: boolean;
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="bg-white shadow-md border border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle>
            <Skeleton className="h-6 w-48" />
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
        return <Wind className="h-5 w-5 text-blue-500" />;
      case 'purification':
        return <Droplets className="h-5 w-5 text-green-500" />;
      case 'behavior':
        return <Brain className="h-5 w-5 text-purple-500" />;
      case 'environment':
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high':
        return <ShieldAlert className="h-4 w-4 text-red-500 mr-1" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />;
      case 'low':
        return <Check className="h-4 w-4 text-green-500 mr-1" />;
      default:
        return <Check className="h-4 w-4 text-blue-500 mr-1" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return "bg-red-100 text-red-800 border-red-200";
      case 'medium':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'low':
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="bg-white shadow-lg border border-gray-100 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-gray-800">
          <Brain className="h-5 w-5 text-blue-500 mr-2" />
          <span>Health Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[450px] overflow-y-auto custom-scrollbar pr-2">
        <motion.div 
          className="space-y-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {data.map((recommendation) => (
            <motion.div 
              key={recommendation.id} 
              className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
              variants={item}
            >
              <div className="flex-shrink-0 bg-white p-2 rounded-full shadow-sm">
                {getCategoryIcon(recommendation.category)}
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors flex items-center">
                    {recommendation.title}
                    <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <Badge variant="outline" className={cn("text-xs flex items-center", getImpactColor(recommendation.impact))}>
                    {getImpactIcon(recommendation.impact)}
                    <span>{recommendation.impact} impact</span>
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{recommendation.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;
