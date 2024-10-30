import React from 'react'
import { AiFillAccountBook, AiFillFileZip } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown, MdFlight, MdLogout, MdOutlineAddRoad } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";

export default function SlideNav({ setActiveSection }) {

    return (
        <div>
            <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900 text-white">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button onClick={() => setActiveSection("dashboard")} 
                                    className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group">
                                <RxDashboard />
                                <span className="ms-3">Dashboard</span>
                            </button>
                        </li>
                        <li className="group">
                            <button type="button" 
                                    className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg group hover:bg-gray-700" 
                                    aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <AiFillFileZip />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Reports</span>
                                <MdOutlineKeyboardArrowDown />
                            </button>
                            <ul id="dropdown-example" className="group-hover:block space-y-1 text-sm">
                                <li>
                                    <button onClick={() => setActiveSection("report1")} 
                                            className="flex items-center w-full text-left text-white transition duration-75 rounded-lg pl-4 py-2 hover:bg-gray-700">
                                        Passenger Age Group Report
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setActiveSection("report2")} 
                                            className="flex items-center w-full text-left text-white transition duration-75 rounded-lg pl-4 py-2 hover:bg-gray-700">
                                        Destination Passenger Count
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setActiveSection("report3")} 
                                            className="flex items-center w-full text-left text-white transition duration-75 rounded-lg pl-4 py-2 hover:bg-gray-700">
                                        Bookings by Passenger Type
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setActiveSection("report4")} 
                                            className="flex items-center w-full text-left text-white transition duration-75 rounded-lg pl-4 py-2 hover:bg-gray-700">
                                        Past Flights & Passenger Data
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setActiveSection("report5")} 
                                            className="flex items-center w-full text-left text-white transition duration-75 rounded-lg pl-4 py-2 hover:bg-gray-700">
                                        Revenue by Aircraft Type
                                    </button>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection("addFlights")} 
                                    className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group">
                                <MdOutlineAddRoad />
                                <span className="flex-1 ms-3 whitespace-nowrap">Add Flights</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection("users")} 
                                    className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group">
                                <FaUsers />
                                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection("addAircraft")} 
                                    className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group">
                                <MdFlight />
                                <span className="flex-1 ms-3 whitespace-nowrap">Add Aircrafts</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    sessionStorage.removeItem('token');
                                    navigate('/');
                                }}
                                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
                            >
                                <MdLogout />
                                <span className="flex-1 ms-3 whitespace-nowrap text-white">Log out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}
