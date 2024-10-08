
import SildeNav from "../components/SlideNav";
import InitialData from "../components/InitialData";
import React, { useState, useEffect } from 'react';
import DashboardContent from "../components/Dashboard";
import UsersContent from "../components/UserContent";
import AddAircraftContent from "../components/AddAircraftContent";
import Report1Content from "../components/Report1Content";
import Report2Content from "../components/Report2Content";
import Report3Content from "../components/Report3Content";
import Report4Content from "../components/Report4Content";
import Report5Content from "../components/Report5Content";
import AddFlightContent from "../components/AddFlightContent";

const Adminhome = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "report1":
        return <Report1Content />;
      case "report2":
        return <Report2Content/>
      case "report3":
        return <Report3Content/>
      case "report4":
        return <Report4Content/>
      case "report5":
        return <Report5Content/>
      case "addFlights":
        return <AddFlightContent />;
      case "users":
        return <UsersContent />;
      case "addAircraft":
        return <AddAircraftContent />;
      default:
        return <DashboardContent />;
    }
  };




  return (
    <nav className="flex w-screen min-h-screen">
  <div className="w-64">
    <SildeNav setActiveSection={setActiveSection} />
  </div>
  
  <div className="flex-1 p-4 bg-gray-100 ">
    {renderContent()}
  </div>
</nav>
  );
};

export default Adminhome;