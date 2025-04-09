
import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Dashboard />
      <Toaster />
    </div>
  );
};

export default Index;
