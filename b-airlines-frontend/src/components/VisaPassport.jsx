import React from 'react';

const VisaPassport = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Visa and Passport Information</h1>
      <ul style={styles.list}>
        <li>Visa requirements</li>
        <li>Passport rules</li>
        <li>Travel documents</li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    color: 'black',
    padding: '20px',
  },
  title: {
    color: 'blue',
  },
  list: {
    color: 'black',
    listStyleType: 'none',
  }
};

export default VisaPassport;
