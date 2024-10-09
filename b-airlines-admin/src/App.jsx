import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Adminhome from './pages/Adminhome';
import SignIn from './components/SignIn';





function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/Adminhome" element={<Adminhome/>} />

        </Routes>
      </Router>
  );
}

export default App;