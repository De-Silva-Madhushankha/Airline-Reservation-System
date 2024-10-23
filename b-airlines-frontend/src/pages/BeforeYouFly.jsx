import React from 'react';

const BeforeYouFly = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Before You Fly</h1>
      <p style={styles.subtitle}>
        Preparing for your journey? Make sure you're fully informed before taking off. We've curated essential guidelines to ensure a smooth, safe, and enjoyable flight experience.
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <h3 style={styles.itemTitle}>Guide to Dangerous Goods</h3>
          <p style={styles.itemDescription}>
            Unsure about what you can bring onboard? Check out our guide to restricted items. Learn the rules on liquids, batteries, and other potentially hazardous goods to ensure a safe flight.
          </p>
        </li>
        <li style={styles.listItem}>
          <h3 style={styles.itemTitle}>Rules and Notices</h3>
          <p style={styles.itemDescription}>
            Stay updated with the latest travel regulations and safety protocols. Make sure you comply with both local and international aviation standards for a hassle-free journey.
          </p>
        </li>
        <li style={styles.listItem}>
          <h3 style={styles.itemTitle}>Health Information</h3>
          <p style={styles.itemDescription}>
            Flying soon? Be aware of any health precautions or vaccine requirements at your destination. Our health advisory section will help you stay well-prepared for your trip.
          </p>
        </li>
      </ul>
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
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#444',
    textAlign: 'center',
    marginBottom: '30px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  itemTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#000',
  },
  itemDescription: {
    fontSize: '16px',
    color: '#666',
  },
};

export default BeforeYouFly;
