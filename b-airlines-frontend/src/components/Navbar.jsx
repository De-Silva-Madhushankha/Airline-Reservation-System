import React, { useState, useEffect } from 'react';
import UserNavbar from './UserNavbar';
import GuestNavbar from './GuestNavbar';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false); 
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? <UserNavbar /> : <GuestNavbar />}
    </div>
  );
};

export default Navbar;
