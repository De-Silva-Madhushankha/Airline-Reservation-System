import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Adminhome from './pages/Adminhome';





function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Adminhome/>} />
        </Routes>
      </Router>
  );
}

export default App;