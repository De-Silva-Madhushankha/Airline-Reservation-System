import React from 'react'
import { AiFillAccountBook, AiFillFileZip } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown, MdFlight, MdLogout, MdOutlineAddRoad} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";





export default function SildeNav({ setActiveSection }) {

  return (
    <div>
        <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
                <li>
                    <button onClick={() => setActiveSection("dashboard")} href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <RxDashboard />
                        <span className="ms-3">Dashboard</span>
                    </button>
                </li>
                <li className=' group'>
                    <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <AiFillFileZip />
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Reports</span>
                        <MdOutlineKeyboardArrowDown />
                    </button>
                    <ul id="dropdown-example" className="hidden group-hover:block  py-2 space-y-2">
                        <li>
                            <button onClick={() => setActiveSection("report1")} href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Below/Over age 18</button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection("report2")} href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Num of passenger Travel to given destination</button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection("report3")} href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Num of Booking By passenger Types</button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection("report4")} href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Pasenger Count and manage Delay</button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection("report5")} href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Revenues By Aircrafts</button>
                        </li>
                    </ul>
                </li>
                <li>
                    <button onClick={() => setActiveSection("addFlights")}  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <MdOutlineAddRoad />
                        <span className="flex-1 ms-3 whitespace-nowrap">Add Flights</span>
                    </button>
                </li>
                
                {/* <li>
                    <button onClick={() => setActiveSection("users")} href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <FaUsers />
                        <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                    </button>
                </li> */}
                <li>
                    <button onClick={() => setActiveSection("addAircraft")} href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <MdFlight />
                        <span className="flex-1 ms-3 whitespace-nowrap">Add aircrafts</span>
                    </button>
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
