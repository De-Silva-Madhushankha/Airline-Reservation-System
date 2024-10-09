import React from "react";
import InitialData from "./InitialData";

const DashboardContent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white shadow rounded-lg">
      <strong className="text-3xl font-bold mb-4 text-center">Welcome to the admin Dashboard.</strong>

      {/* Center the InitialData component */}
      <div className="items-center">
        <InitialData />
      </div>
    </div>
  );
};

export default DashboardContent;
