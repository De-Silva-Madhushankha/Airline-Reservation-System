import React from 'react'
import { AiFillAccountBook, AiFillFileZip } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown, MdFlight, MdLogout, MdOutlineAddRoad} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
//import axios from 'axios';
//import { useState, useEffect } from 'react';




export default function SildeNav() {

    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     axios.get('http://localhost:3001/api/users')
    //         .then(res => setData(res.data))
    //         .catch(err => console.log(err));
    // }, []);
    //const initialData = await axios.get('http://localhost:3001/api/user/load-initial-data', {});

  return (
    <div>
        <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <RxDashboard />
                        <button className="ms-3">Dashboard</button>
                    </a>
                </li>
                <li className=' group'>
                    <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <AiFillFileZip />
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Reports</span>
                        <MdOutlineKeyboardArrowDown />
                    </button>
                    <ul id="dropdown-example" className="hidden group-hover:block  py-2 space-y-2">
                        <li>
                            <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Report 1</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Report 2</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Report 3</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Report 4</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Report 5</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <MdOutlineAddRoad />
                        <span className="flex-1 ms-3 whitespace-nowrap">Add Flights</span>
                    </a>
                </li>
                
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <FaUsers />
                        <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <MdFlight />
                        <span className="flex-1 ms-3 whitespace-nowrap">Add aircrafts</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <MdLogout />
                        <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
                    </a>
                </li>
               
            </ul>
        </div>
    </aside>
    
    </div>

    

  )
}
