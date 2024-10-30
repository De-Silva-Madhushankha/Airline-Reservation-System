
import SildeNav from "../components/SlideNav";
import InitialData from "../components/InitialData";
import React, { useState, useEffect } from 'react';
import DashboardContent from "../components/Dashboard";
import UsersContent from "../components/UserContent";
import AddAircraftContent from "../components/AddAircraftContent";
import PassengerAgeGroupReport from "../components/ReportComponents/PassengerAgeGroupReport";
import Report2Content from "../components/ReportComponents/PaassengerCountToDestination";
import Report3Content from "../components/ReportComponents/BookingByPassengerType";
import Report4Content from "../components/ReportComponents/PastFlightsPassengerData";
import Report5Content from "../components/ReportComponents/RevenuebyAircraftType";
import AddFlightContent from "../components/AddFlightContent";

const Adminhome = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "report1":
        return <PassengerAgeGroupReport />;
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
  
  <div className="flex-1 p-4 bg-white ">
    {renderContent()}
  </div>
</nav>
  );
};

export default Adminhome;