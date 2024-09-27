import Navbar from "../components/GuestNavbar";
import Footer from "../components/Footer";
import FlightSchedule from "../components/FlightScheduleComponent";
import FlightSearch from "../components/FlightSearchComponent";
import React, { useState } from 'react';

const Schedule = () => {

    const [flightResults, setFlightResults] = useState(null); 
    const handleSearchResults = (results) => {
        setFlightResults(results); 
      };

    return (
        <>
            <Navbar />
            <>
              <FlightSearch onSearch={handleSearchResults} />
              {flightResults && (
                <FlightSchedule flights={flightResults} />
              )}
            </>
            <Footer />
        </>
    );
};  

export default Schedule;