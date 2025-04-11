
import React, { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface PollutionMapProps {
  location: string;
  isLoading?: boolean;
}

const PollutionMap: React.FC<PollutionMapProps> = ({ location, isLoading = false }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current || isLoading) return;
    
    // This would be replaced with actual map initialization in a real application
    // For demo purposes, we're just showing a mock map with different pollution zones
    const renderMockMap = () => {
      const canvas = document.createElement('canvas');
      canvas.width = mapRef.current!.clientWidth;
      canvas.height = mapRef.current!.clientHeight;
      
      const ctx = canvas.getContext('2d')!;
      
      // Draw background
      ctx.fillStyle = '#E6F2F5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw some pollution zones (circles with different colors representing AQI)
      const zones = [
        { x: canvas.width * 0.3, y: canvas.height * 0.4, radius: 40, color: 'rgba(76, 175, 80, 0.6)', aqi: 42 }, // Good
        { x: canvas.width * 0.6, y: canvas.height * 0.3, radius: 55, color: 'rgba(255, 235, 59, 0.6)', aqi: 85 }, // Moderate
        { x: canvas.width * 0.5, y: canvas.height * 0.7, radius: 48, color: 'rgba(255, 152, 0, 0.6)', aqi: 125 }, // Unhealthy
        { x: canvas.width * 0.75, y: canvas.height * 0.6, radius: 35, color: 'rgba(244, 67, 54, 0.6)', aqi: 165 }, // Hazardous
      ];
      
      // Draw current location with bigger circle
      const currentLocationIndex = Math.floor(Math.random() * zones.length);
      zones.push({
        x: canvas.width * 0.5,
        y: canvas.height * 0.5,
        radius: 25,
        color: 'rgba(33, 150, 243, 0.7)',
        aqi: zones[currentLocationIndex].aqi
      });
      
      // Draw all zones
      zones.forEach(zone => {
        ctx.beginPath();
        ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2);
        ctx.fillStyle = zone.color;
        ctx.fill();
        
        // Add AQI text
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`AQI: ${zone.aqi}`, zone.x, zone.y);
      });
      
      // Draw some city names
      const cities = [
        { x: canvas.width * 0.2, y: canvas.height * 0.2, name: 'Delhi' },
        { x: canvas.width * 0.7, y: canvas.height * 0.2, name: 'Mumbai' },
        { x: canvas.width * 0.3, y: canvas.height * 0.8, name: 'Bangalore' },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, name: 'Chennai' }
      ];
      
      cities.forEach(city => {
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(city.name, city.x, city.y);
      });
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
      ctx.lineWidth = 1;
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Current location marker
      ctx.fillStyle = 'rgba(33, 150, 243, 1)';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Current location text
      ctx.fillStyle = '#333';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(location, canvas.width / 2, canvas.height / 2 - 15);
      
      // Clear previous content and append the new canvas
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
        mapRef.current.appendChild(canvas);
      }
    };
    
    renderMockMap();
    
    // Update map on window resize
    const handleResize = () => {
      if (mapRef.current) {
        renderMockMap();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location, isLoading]);
  
  return (
    <Card className="shadow-lg h-full">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-800">Air Quality Map</h3>
        </div>
        
        {isLoading ? (
          <div className="animate-pulse flex flex-col items-center justify-center h-[300px] bg-blue-50 rounded-md">
            <div className="w-16 h-16 rounded-full bg-blue-200 mb-4"></div>
            <div className="h-4 w-32 bg-blue-200 rounded mb-3"></div>
            <div className="h-3 w-48 bg-blue-100 rounded"></div>
          </div>
        ) : (
          <div ref={mapRef} className="h-[300px] w-full rounded-md bg-blue-50 overflow-hidden relative">
            {/* Map will be rendered here */}
            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm py-1 px-2 rounded text-xs text-gray-700">
              Pollution levels: <span className="font-medium">Live view</span>
            </div>
          </div>
        )}
        
        <div className="mt-3 grid grid-cols-4 gap-1 text-xs">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
            <span>Good</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
            <span>Moderate</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-orange-500 mr-1"></span>
            <span>Unhealthy</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
            <span>Hazardous</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PollutionMap;
