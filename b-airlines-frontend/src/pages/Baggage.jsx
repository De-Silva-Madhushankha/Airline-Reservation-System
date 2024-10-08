import React from 'react';

const Baggage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Baggage Information</h1>
      <ul style={styles.list}>
        <li>Checked baggage</li>
        <li>Cabin baggage</li>
        <li>Purchase more baggage</li>
        <li>Delayed or damaged baggage</li>
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

export default Baggage;
