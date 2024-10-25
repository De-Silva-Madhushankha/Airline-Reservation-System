import React from 'react';
import './App.css';
import data from './data.json';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Book from './pages/Book';
import Help from './pages/Help';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import axiosSetup from './axiosSetup';
import Schedule from './pages/Schedule';
import NotFound from './pages/NotFound';
import Manage from './pages/Manage'; 
import BeforeYouFly from './pages/BeforeYouFly'; 
import Baggage from './pages/Baggage'; 
import VisaPassport from './pages/VisaPassport'; 
import CancelBooking from './pages/CancelBooking';
import ChangeBooking from './pages/ChangeBooking';
import ChooseSeat from './pages/ChooseSeat';

const path = data.backend;
axios.defaults.baseURL = path;

function App() {
  return (
      <Router>
        <Routes>
          {/* Existing Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/book" element={<Book />} />
          <Route path="/help" element={<Help />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/user-profile" element={<Profile />} />

          {/* New Pages for Manage Section */}
          <Route path="/manage" element={<Manage />} />
          <Route path="/manage/before-you-fly" element={<BeforeYouFly />} />
          <Route path="/manage/baggage" element={<Baggage />} />
          <Route path="/manage/visa-passport" element={<VisaPassport />} />
          <Route path="/manage/cancel-booking" element={<CancelBooking />} />
          <Route path="/manage/change-booking" element={<ChangeBooking />} />
          <Route path="/manage/change-seat" element={<ChooseSeat />} />


          {/* Catch-all Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
  );
}

export default App;
