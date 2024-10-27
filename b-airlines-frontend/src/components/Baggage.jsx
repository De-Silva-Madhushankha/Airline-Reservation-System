import React from 'react';

const Baggage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Baggage Information</h1>
      <p style={styles.description}>
      For a smooth journey, please familiarize yourself with our baggage policies. Here is a quick guide to help:
      </p>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Checked baggage</h2>
        <p>Ensure that your checked luggage meets the airline's weight and size requirements. If you need extra baggage, additional allowance can be purchased.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Cabin baggage</h2>
        <p>You are allowed one piece of cabin baggage. Make sure it meets size limits and contains only items permitted in the cabin.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Purchase more baggage</h2>
        <p>If you are carrying fragile, valuable, or restricted items, please inform the crew so we can handle them with care.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Delayed or damaged baggage</h2>
        <p>In case of any delays or damage, reach out to our baggage assistance team upon arrival.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '40px',
    fontFamily: "'Helvetica Neue', sans-serif",
    maxWidth: '900px',
    margin: 'auto',
    lineHeight: '1.6',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '10px',
  },
  title: {
    fontSize: '2em',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    margin: '20px 0',
    color: 'gray',
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
};

export default Baggage;