import React, { useState , useEffect } from 'react';
import axios from 'axios';


export default function InitialData() {
    const [counts, setCounts] = useState({
        users: 0,
        aircrafts: 0,
        airports: 0,
        routes: 0,
      });
      const [error, setError] = useState(null);
    
      useEffect(() => {
        const fetchCounts = async () => {
          try {
            const response = await axios.get('http://localhost:3001/api/admin/load-initial-data');
            setCounts(response.data);
          } catch (err) {
            setError('Error fetching counts');
          }
        };
    
        fetchCounts();
      }, []);
    

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-2 gap-4">
            <div className='m-6 z-40 '>
                <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <p className="mb-2 text-align-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Users</p>
                    <h1 className="mb-2 text-align-center text-9xl font-bold tracking-tight text-gray-900 dark:text-white"> {counts.users}+</h1>
                </a>
            </div>
            <div className='m-6 z-40 '>
                <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <p className="mb-2 text-align-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Aircrafts</p>
                    <h1 className="mb-2 text-align-center text-9xl font-bold tracking-tight text-gray-900 dark:text-white"> {counts.aircrafts}+</h1>
                </a>
            </div>
            <div className='m-6 z-40 '>
                <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <p className="mb-2 text-align-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Routes</p>
                    <h1 className="mb-2 text-align-center text-9xl font-bold tracking-tight text-gray-900 dark:text-white"> {counts.routes}+</h1>
                </a>
            </div>
            <div className='m-6 z-40 '>
                <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <p className="mb-2 text-align-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Airports</p>
                    <h1 className="mb-2 text-align-center text-9xl font-bold tracking-tight text-gray-900 dark:text-white"> {counts.airports}+</h1>
                </a>
            </div>
        </div>
    </div>
    </div>
  )
}
