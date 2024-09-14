import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;