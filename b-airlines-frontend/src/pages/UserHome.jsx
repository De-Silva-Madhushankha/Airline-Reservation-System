import React from 'react';
import '../App.css';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import UserNavbar from '../components/UserNavbar';

const UserHome = () =>{
  return (
    <>  
      <UserNavbar />
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default UserHome;