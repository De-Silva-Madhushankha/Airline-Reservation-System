import React from 'react';

const BeforeYouFly = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Before You Fly</h1>
      <ul style={styles.list}>
        <li>Guide to dangerous goods</li>
        <li>Rules and notices</li>
        <li>Health information</li>
        <li>Shuttle service in Dubai</li>
        <li>Emirates Terminal 3</li>
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

export default BeforeYouFly;
