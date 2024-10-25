import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  TimeScale
);

const StatisticsCharts = () => {
  const [passengerGrowth, setPassengerGrowth] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Practical data for the current year
    const currentYear = new Date().getFullYear();
    setPassengerGrowth([
      { date: `${currentYear}-01-01`, passengers: 1200 },
      { date: `${currentYear}-02-01`, passengers: 1500 },
      { date: `${currentYear}-03-01`, passengers: 1800 },
      { date: `${currentYear}-04-01`, passengers: 2000 },
      { date: `${currentYear}-05-01`, passengers: 2200 },
      { date: `${currentYear}-06-01`, passengers: 2500 },
      { date: `${currentYear}-07-01`, passengers: 2800 },
      { date: `${currentYear}-08-01`, passengers: 3000 },
      { date: `${currentYear}-09-01`, passengers: 2700 },
      { date: `${currentYear}-10-01`, passengers: 2600 },
      { date: `${currentYear}-11-01`, passengers: 2400 },
      { date: `${currentYear}-12-01`, passengers: 3200 },
    ]);
    setUserGrowth([
      { date: `${currentYear}-01-01`, users: 300 },
      { date: `${currentYear}-02-01`, users: 350 },
      { date: `${currentYear}-03-01`, users: 400 },
      { date: `${currentYear}-04-01`, users: 450 },
      { date: `${currentYear}-05-01`, users: 500 },
      { date: `${currentYear}-06-01`, users: 550 },
      { date: `${currentYear}-07-01`, users: 600 },
      { date: `${currentYear}-08-01`, users: 650 },
      { date: `${currentYear}-09-01`, users: 700 },
      { date: `${currentYear}-10-01`, users: 750 },
      { date: `${currentYear}-11-01`, users: 800 },
      { date: `${currentYear}-12-01`, users: 850 },
    ]);
    setBookings([
      { date: `${currentYear}-01-01`, bookings: 500 },
      { date: `${currentYear}-02-01`, bookings: 600 },
      { date: `${currentYear}-03-01`, bookings: 700 },
      { date: `${currentYear}-04-01`, bookings: 800 },
      { date: `${currentYear}-05-01`, bookings: 900 },
      { date: `${currentYear}-06-01`, bookings: 1000 },
      { date: `${currentYear}-07-01`, bookings: 1100 },
      { date: `${currentYear}-08-01`, bookings: 1200 },
      { date: `${currentYear}-09-01`, bookings: 1300 },
      { date: `${currentYear}-10-01`, bookings: 1400 },
      { date: `${currentYear}-11-01`, bookings: 1500 },
      { date: `${currentYear}-12-01`, bookings: 1600 },
    ]);
  }, []);

  const passengerGrowthData = {
    labels: passengerGrowth.map(data => data.date),
    datasets: [
      {
        label: 'Passengers',
        data: passengerGrowth.map(data => data.passengers),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const userGrowthData = {
    labels: userGrowth.map(data => data.date),
    datasets: [
      {
        label: 'Users',
        data: userGrowth.map(data => data.users),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const bookingsData = {
    labels: bookings.map(data => data.date),
    datasets: [
      {
        label: 'Bookings',
        data: bookings.map(data => data.bookings),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          tooltipFormat: 'MMM yyyy',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full flex flex-col items-center space-y-8">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Passenger Growth</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Line data={passengerGrowthData} options={options} height={300} />
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">User Growth</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Line data={userGrowthData} options={options} height={300} />
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Bookings</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar data={bookingsData} options={options} height={300} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsCharts;