import React from 'react';
import './App.css';
import data from './data.json';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import FlightSearch from './pages/FlightSearch';
import UserHome from './pages/UserHome';



const path = data.backend;
axios.defaults.baseURL = path;

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/user/home" element={<UserHome/>} />
          <Route path="/schedule/flight-search" element={<FlightSearch/>} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </Router>
  );
}

export default App;