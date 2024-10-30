import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Adminhome from './pages/Adminhome';
import SignIn from './pages/SignIn';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={< SignIn/>} />
          <Route path="/Adminhome" element={< Adminhome/>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />

        </Routes>
      </Router>
  );
}

export default App;