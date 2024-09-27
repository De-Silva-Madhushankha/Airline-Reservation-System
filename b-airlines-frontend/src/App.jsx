import React from 'react';
import './App.css';
import data from './data.json';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import FlightSearch from './pages/FlightSearch';
import Book from './pages/Book';
import Help from './pages/Help';
import ForgotPasswordPage from './components/ForgotPassword';
import Profile from './pages/Profile';
import axiosSetup from './axiosSetup';
import FlightSchedules from './pages/FlightSchedules';



const path = data.backend;
axios.defaults.baseURL = path;

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/book" element={<Book/>} />
          <Route path="/help" element={<Help/>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
          <Route path="/schedule/flight-search" element={<FlightSearch/>} />
          <Route path="/schedule/flight-schedules" element={<FlightSchedules/>} />
          <Route path="/user/profile" element = {<Profile/>}/>
          <Route path="*" element={<Home/>} />
        </Routes>
      </Router>
  );
}

export default App;