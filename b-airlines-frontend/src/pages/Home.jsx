import React from 'react';
import '../App.css';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const Home = () =>{
  return (
    <> 
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;