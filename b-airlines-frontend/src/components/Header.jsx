import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { PiAirplaneTiltLight } from 'react-icons/pi';
import './Header.css'; 

const { Header } = Layout;

const CommonHeader = ({ closeMobileMenu }) => {
  return (
    <Header className="common-header">
      <Link to='/' className='header-navbar-logo' onClick={closeMobileMenu}>
        B Airways
        <i className='fab fa-typo3' />
        <PiAirplaneTiltLight />
      </Link>
    </Header>
  );
};

export default CommonHeader;