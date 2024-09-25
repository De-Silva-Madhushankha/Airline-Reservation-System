import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { PiAirplaneTiltLight } from "react-icons/pi";
import './UserNavbar.css';

const UserNavbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const toggleDropdown = () => setDropdown(!dropdown);
  const closeDropdown = () => setDropdown(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/sign-in');
  };

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='user-navbar'>
        <div className='user-navbar-container'>
          <Link to='/' className='user-navbar-logo' onClick={closeMobileMenu}>
            B Airways
            <i className='fab fa-typo3' />
            <PiAirplaneTiltLight />
          </Link>
          <div className='user-menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'user-nav-menu active' : 'user-nav-menu'}>
            <li className='user-nav-item'>
              <Link to='/user/home' className='user-nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='user-nav-item'>
              <Link
                to='/schedule/flight-search'
                className='user-nav-links'
                onClick={closeMobileMenu}
              >
                Schedule
              </Link>
            </li>
            <li className='user-nav-item'>
              <Link
                to='/book'
                className='user-nav-links'
                onClick={closeMobileMenu}
              >
                Book
              </Link>
            </li>
            <li className='user-nav-item'>
              <Link
                to='/help'
                className='user-nav-links'
                onClick={closeMobileMenu}
              >
                Help
              </Link>
            </li>
            <li className='user-nav-item'>
              <div className='user-nav-links' onClick={toggleDropdown}>
                <FaUserCircle size={26} />
              </div>
              {dropdown && (
                <ul className='user-dropdown-menu'>
                  <li className='user-dropdown-item'>
                    <Link to='/user/profile' onClick={closeDropdown}>Profile</Link>
                  </li>
                  <li className='user-dropdown-item'>
                    <Link to='/user/settings' onClick={closeDropdown}>Settings</Link>
                  </li>
                  <li className='user-dropdown-item'>
                    <Link to='/user/logout' onClick={handleLogout}>Logout</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default UserNavbar;