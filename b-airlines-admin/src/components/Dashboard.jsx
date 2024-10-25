import React from "react";
import InitialData from "./InitialData";
import StatisticsCharts from "./StatisticsCharts";

const DashboardContent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white shadow rounded-lg">
      <strong className="text-3xl font-bold mb-4 text-center">Welcome to the admin Dashboard.</strong>

      <div className="items-center mb-8">
        <InitialData />
      </div>

      <div className="w-full">
        <StatisticsCharts />
      </div>
    </div>
  );
};

export default DashboardContent;