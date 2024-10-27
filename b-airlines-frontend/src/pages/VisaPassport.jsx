import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Innercomp from '../components/VisaPassport';

const VisaPassport = () => {
  return (
    <>
    <Navbar/>
    <Innercomp/>
    <a href="/manage" style={styles.button}>Move-Back</a>
    <Footer />
    </>
  );
};

const styles = {
  button: {
    maxWidth: '220px',
    margin: 'auto',
    fontSize: '1.5em',
    color: '#000',
    backgroundColor: '#fff',
    padding: '15px 20px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    transition: 'background-color 0.3s, color 0.3s',
  },  
};

export default VisaPassport;