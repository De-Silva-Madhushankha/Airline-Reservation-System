import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { PiAirplaneTiltLight } from "react-icons/pi";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            B Airways
            <i className='fab fa-typo3' />
            <PiAirplaneTiltLight />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/schedule/flight-search'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Schedule
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/book'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Book
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/help'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Help
              </Link>
            </li>

            <li>
              <Link
                to='/sign-in'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
          </ul>
          {button && <Button linkTo={'/sign-in'} buttonStyle='btn--outline'>SIGN IN</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;