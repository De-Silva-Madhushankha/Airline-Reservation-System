
import SildeNav from "../components/SlideNav";
import InitialData from "../components/InitialData";
import React, { useState, useEffect } from 'react';
import DashboardContent from "../components/Dashboard";
import UsersContent from "../components/UserContent";
import AddAircraftContent from "../components/AddAircraftContent";
import PassengerAgeGroupReport from "../components/ReportComponents/PassengerAgeGroupReport";
import PaassengerCountToDestination from "../components/ReportComponents/PaassengerCountToDestination";
import BookingByPassengerType from "../components/ReportComponents/BookingByPassengerType";
import PastFlightsPassengerData from "../components/ReportComponents/PastFlightsPassengerData";
import RevenuebyAircraftType from "../components/ReportComponents/RevenuebyAircraftType";
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
        return <PaassengerCountToDestination/>
      case "report3":
        return <BookingByPassengerType/>
      case "report4":
        return <PastFlightsPassengerData/>
      case "report5":
        return <RevenuebyAircraftType/>
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