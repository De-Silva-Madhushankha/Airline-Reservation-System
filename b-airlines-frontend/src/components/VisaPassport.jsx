import React from 'react';

const VisaPassport = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Visa and Passport Information</h1>
      <p style={styles.description}>
        Make sure you're travel-ready by understanding the visa and passport requirements before your journey. Here's a quick guide to essential documents.
      </p>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Visa Requirements</h2>
        <p>Check if your destination requires a visa. Make sure to apply well in advance to avoid any delays. Some destinations offer visa-on-arrival or e-visa options.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Passport Rules</h2>
        <p>Ensure your passport is valid for at least six months beyond your travel dates. Many countries have strict requirements, so double-check the expiration date before you depart.</p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Travel Documents</h2>
        <p>In addition to your passport, bring any other required travel documents, such as a return ticket, proof of accommodation, or health insurance. Keep copies of all important documents.</p>
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

export default VisaPassport;